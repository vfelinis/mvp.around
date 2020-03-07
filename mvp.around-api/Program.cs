using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using mvp.around_api.Data;
using mvp.around_api.Extensions;
using Serilog;
using Serilog.Events;
using Serilog.Formatting.Compact;
using System.Text;
using System.Text.Json;
using System.Net;

namespace mvp.around_api
{
    public class Program
    {
        public static IConfiguration Configuration { get; } = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true)
            .AddEnvironmentVariables()
            .Build();

        public static int Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .MinimumLevel.Override("System", LogEventLevel.Information)
                .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.File(
                    formatter: new RenderedCompactJsonFormatter(),
                    path: Configuration.LogsPath(),
                    restrictedToMinimumLevel: Configuration.LogsMinLevel() == "Info" ? LogEventLevel.Information : LogEventLevel.Debug,
                    fileSizeLimitBytes: 1_000_000,
                    shared: true,
                    flushToDiskInterval: TimeSpan.FromSeconds(10),
                    rollOnFileSizeLimit: true
                )
                .CreateLogger();

            try
            {
                var seed = args.Contains("/seed");
                if (seed)
                {
                    args = args.Except(new[] { "/seed" }).ToArray();
                }

                var host = CreateHostBuilder(args).Build();

                var connectionString = Configuration.GetConnectionString("SQLiteConnection");
                SeedData.EnsureSeedData(connectionString);

                Log.Information("Starting host...");
                host.Run();
                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly.");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        // Additional configuration is required to successfully run gRPC on macOS.
        // For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseSerilog();
                    webBuilder.ConfigureKestrel(kestrel =>
                    {
                        kestrel.Listen(IPAddress.Loopback, 5004,
                            listenOptions =>
                            {
                                listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
                            });
                        kestrel.Listen(IPAddress.Loopback, 5005,
                            listenOptions =>
                            {
                                listenOptions.Protocols = HttpProtocols.Http2;
                                if (Configuration.IsDevelopment())
                                {
                                    listenOptions.UseHttps(new X509Certificate2(Configuration.CertificateDevFile(), Configuration.CertificateDevPass()));
                                }
                                else
                                {
                                    var jsonBytes = File.ReadAllBytes(Configuration.CertificateAcmeFile());
                                    using var jsonDoc = JsonDocument.Parse(jsonBytes);
                                    var root = jsonDoc.RootElement;
                                    var item = root.GetProperty("leresolver").GetProperty("Certificates").EnumerateArray()
                                        .First(s => s.GetProperty("domain").GetProperty("main").GetString() == Configuration.CertificateAcmeDomain());
                                    var certBase64 = item.GetProperty("certificate").GetString();
                                    var keyBase64 = item.GetProperty("key").GetString();
                                    using var publicKey = new X509Certificate2(Convert.FromBase64String(certBase64));
                                    var privateKey = UTF8Encoding.UTF8.GetString(Convert.FromBase64String(keyBase64));
                                    var privateKeyBlocks = privateKey.Split("-", StringSplitOptions.RemoveEmptyEntries);
                                    var privateKeyBytes = Convert.FromBase64String(privateKeyBlocks[1]);
                                    using var rsa = RSA.Create();
                                    rsa.ImportRSAPrivateKey(privateKeyBytes, out _);
                                    var keyPair = publicKey.CopyWithPrivateKey(rsa);
                                    listenOptions.UseHttps(new X509Certificate2(keyPair.Export(X509ContentType.Pfx)));
                                }
                            });
                        //kestrel.ConfigureEndpointDefaults(opt =>
                        //{
                        //    opt.Protocols = HttpProtocols.Http1AndHttp2;
                        //});
                        //kestrel.ConfigureHttpsDefaults(https =>
                        //{
                        //    if (Configuration.IsDevelopment())
                        //    {
                        //        https.ServerCertificate =
                        //            new X509Certificate2(Configuration.CertificateDevFile(), Configuration.CertificateDevPass());
                        //    }
                        //    else
                        //    {
                        //        var jsonBytes = File.ReadAllBytes(Configuration.CertificateAcmeFile());
                        //        using var jsonDoc = JsonDocument.Parse(jsonBytes);
                        //        var root = jsonDoc.RootElement;
                        //        var item = root.GetProperty("leresolver").GetProperty("Certificates").EnumerateArray()
                        //            .First(s => s.GetProperty("domain").GetProperty("main").GetString() == Configuration.CertificateAcmeDomain());
                        //        var certBase64 = item.GetProperty("certificate").GetString();
                        //        var keyBase64 = item.GetProperty("key").GetString();
                        //        using var publicKey = new X509Certificate2(Convert.FromBase64String(certBase64));
                        //        var privateKey = UTF8Encoding.UTF8.GetString(Convert.FromBase64String(keyBase64));
                        //        var privateKeyBlocks = privateKey.Split("-", StringSplitOptions.RemoveEmptyEntries);
                        //        var privateKeyBytes = Convert.FromBase64String(privateKeyBlocks[1]);
                        //        using var rsa = RSA.Create();
                        //        rsa.ImportRSAPrivateKey(privateKeyBytes, out _);
                        //        var keyPair = publicKey.CopyWithPrivateKey(rsa);
                        //        https.ServerCertificate = new X509Certificate2(keyPair.Export(X509ContentType.Pfx));
                        //    }
                        //});
                    });
                });
    }

    public class Acme
    {
        public int MyProperty { get; set; }
    }
}
