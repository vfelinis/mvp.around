using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mvp.around_webclient.Extensions
{
    public static class ConfigurationExtensions
    {
        public static string ApiEndpoint(this IConfiguration config)
        {
            return config.GetValue<string>("ApiEndpoint");
        }

        public static string LogsPath(this IConfiguration config)
        {
            return config.GetValue<string>("Logs:Path");
        }

        public static string LogsMinLevel(this IConfiguration config)
        {
            return config.GetValue<string>("Logs:MinLevel");
        }

        public static string AuthenticationAuthority(this IConfiguration config)
        {
            return config.GetValue<string>("Authentication:Authority");
        }
    }
}
