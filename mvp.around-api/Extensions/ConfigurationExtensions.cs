using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mvp.around_api.Extensions
{
    public static class ConfigurationExtensions
    {
        public static string AuthenticationAuthority(this IConfiguration config)
        {
            return config.GetValue<string>("Authentication:Authority");
        }
    }
}
