using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using mvp.around_webclient.Services;

namespace mvp.around_webclient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupService _groupService;
        private readonly ILogger<GroupsController> _logger;

        public GroupsController(IGroupService groupService, ILogger<GroupsController> logger)
        {
            _groupService = groupService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<object> Get()
        {
            var accessToken = Request.Headers["Authorization"];
            var result = await _groupService.GetGroups(accessToken);
            return Ok(result);
        }
    }
}
