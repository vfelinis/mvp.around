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
    }
}
