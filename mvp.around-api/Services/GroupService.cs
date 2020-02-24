using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using mvp.around_api.Data.Models;
using mvp.around_api.Data.Stores;

namespace mvp.around_api.Services
{
    [Authorize]
    public class GroupService : GrpcGroup.GrpcGroupBase
    {
        private readonly IGroupStore _groupStore;
        private readonly ILogger<GroupService> _logger;
        public GroupService(IGroupStore groupStore, ILogger<GroupService> logger)
        {
            _groupStore = groupStore;
            _logger = logger;
        }

        public async override Task<GetGroupsResponse> GetGroups(GetGroupsRequest request, ServerCallContext context)
        {
            try
            {
                var result = new GetGroupsResponse { Success = true };
                var claim = context.GetHttpContext().User.Claims.FirstOrDefault(s => s.Type == "sub");
                var user = await _groupStore.GetUserByIdentifier(claim.Value);
                if (user != null)
                {
                    var groups = await _groupStore.GetGroupsByUserId(user.Id);
                    if (groups.Any())
                    {
                        result.Data.AddRange(groups.Select(s => new GroupDto
                        {
                            Id = s.GroupId,
                            Label = s.GroupLabel,
                            Password = s.UserRole == UserRole.Owner ? s.Group.Password : string.Empty,
                            CurrentUser = new UserDto
                            {
                                Id = s.UserId,
                                Name = s.UserName,
                                Role = (int)s.UserRole
                            }
                        }));
                    }
                }

                return result;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new GetGroupsResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }

        public async override Task<GetGroupResponse> GetGroup(GetGroupRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }

        public async override Task<CreateGroupResponse> CreateGroup(CreateGroupRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }

        public async override Task<LeaveGroupResponse> LeaveGroup(LeaveGroupRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }

        public async override Task<SaveUserGroupResponse> SaveUserGroup(SaveUserGroupRequest request, ServerCallContext context)
        {
            throw new NotImplementedException();
        }
    }
}
