using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using mvp.around_api.Services;
using mvp.around_webclient.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mvp.around_webclient.Services
{
    public class GroupService: IGroupService
    {
        private readonly string _apiEndpoint;
        public GroupService(IConfiguration config)
        {
            _apiEndpoint = config.ApiEndpoint();
        }

        public async Task<GetGroupsResponse> GetGroups(string token)
        {
            var channel = GrpcChannel.ForAddress(_apiEndpoint);
            var client = new GrpcGroup.GrpcGroupClient(channel);
            var headers = new Metadata();
            headers.Add("Authorization", token);
            var response = await client.GetGroupsAsync(new GetGroupsRequest(), headers);
            return response;
        }
    }
}
