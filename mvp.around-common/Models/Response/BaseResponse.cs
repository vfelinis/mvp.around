using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace mvp.around_common.Models.Response
{
    public class BaseResponse<T> where T: class
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }
        [JsonPropertyName("message")]
        public string Message { get; set; }
        [JsonPropertyName("data")]
        public T Data { get; set; }
    }
}
