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
    [ApiController]
    [Route("api/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly ILogger<GroupsController> _logger;
        private readonly string _apiEndpoint;

        public GroupsController(IConfiguration config, ILogger<GroupsController> logger)
        {
            _logger = logger;
            _apiEndpoint = config.ApiEndpoint();
        }

        [HttpGet]
        public async Task<object> Get()
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

        [HttpPost]
        public async Task<object> Post(CreateGroupRequest request)
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

        [HttpPut]
        public async Task<object> Put(UpdateGroupRequest request)
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

        [HttpDelete]
        public async Task<object> Delete(LeaveGroupRequest request)
        {
            if (request == null) return BadRequest("request is null");
            try
            {
                var response = await GrpcClient.LeaveGroupAsync(request, Headers);
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
