using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace mvp.around_common.Models.Request
{
    public class BaseRequest<T> where T: class
    {
        [JsonPropertyName("data")]
        public T Data { get; set; }
    }
}
