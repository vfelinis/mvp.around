using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using mvp.around_api.Services;
using mvp.around_webclient.Extensions;

namespace mvp.around_webclient.Controllers
{
    [Authorize]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly ILogger<GroupsController> _logger;
        private readonly string _apiEndpoint;

        public GroupsController(IConfiguration config, ILogger<GroupsController> logger)
        {
            _logger = logger;
            _apiEndpoint = config.ApiEndpoint();
        }

        [HttpGet("api/groups")]
        public async Task<object> GetGroups()
        {
            try
            {
                var response = await GrpcClient.GetGroupsAsync(new GetGroupsRequest(), Headers);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return Problem(ex.Message, statusCode: 500);
            }
        }

        [HttpPost("api/groups")]
        public async Task<object> CreateGroup(CreateGroupRequest request)
        {
            if (request == null) return BadRequest("request is null");
            try
            {
                var response = await GrpcClient.CreateGroupAsync(request, Headers);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return Problem(ex.Message);
            }
        }

        [HttpGet("api/groups/{id}")]
        public async Task<object> GetGroup(int id)
        {
            try
            {
                var response = await GrpcClient.GetGroupAsync(new GetGroupRequest { Id = id }, Headers);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return Problem(ex.Message, statusCode: 500);
            }
        }

        [HttpPut("api/groups/{id}")]
        public async Task<object> UpdateGroup(UpdateGroupRequest request)
        {
            if (request == null) return BadRequest("request is null");
            try
            {
                var response = await GrpcClient.UpdateGroupAsync(request, Headers);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return Problem(ex.Message);
            }
        }

        [HttpPost("api/groups/{id}/connect")]
        public async Task<object> ConnectGroup(ConnectGroupRequest request)
        {
            if (request == null) return BadRequest("request is null");
            try
            {
                var response = await GrpcClient.ConnectGroupAsync(request, Headers);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return Problem(ex.Message);
            }
        }

        [HttpDelete("api/groups/{id}")]
        public async Task<object> LeaveGroup(int id)
        {
            try
            {
                var response = await GrpcClient.LeaveGroupAsync(new LeaveGroupRequest { Id = id }, Headers);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return Problem(ex.Message);
            }
        }

        private Metadata Headers => new Metadata {
            new Metadata.Entry("Authorization", Request.Headers["Authorization"])
        };

        private GrpcGroup.GrpcGroupClient GrpcClient => new GrpcGroup.GrpcGroupClient(GrpcChannel.ForAddress(_apiEndpoint));
    }
}
