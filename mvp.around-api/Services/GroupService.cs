using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using IdentityModel;
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
                var claim = context.GetHttpContext().User.Claims.FirstOrDefault(s => s.Type == JwtClaimTypes.Id);
                var user = await _groupStore.GetUserByIdentifier(claim.Value);
                if (user != null)
                {
                    result.UserId = user.Id;
                    var groups = await _groupStore.GetGroupsByUserId(user.Id);
                    if (groups.Any())
                    {
                        result.Groups.AddRange(groups.Select(s => new GroupDto
                        {
                            Id = s.GroupId,
                            Label = s.GroupLabel,
                            Password = s.UserRole == UserRole.Owner ? s.Group.Password : string.Empty,
                            Role = (int)s.UserRole
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

        public async override Task<CreateGroupResponse> CreateGroup(CreateGroupRequest request, ServerCallContext context)
        {
            try
            {
                var result = new CreateGroupResponse { Success = true };
                var claim = context.GetHttpContext().User.Claims.FirstOrDefault(s => s.Type == "sub");
                var user = await _groupStore.GetUserByIdentifier(claim.Value);
                if (user == null)
                {
                    user = new User
                    {
                        Identifier = claim.Value
                    };
                }
                var group = new Group
                {
                    Password = request.Group.Password,
                    UsersGroups = new List<UserGroup>
                    {
                        new UserGroup
                        {
                            GroupLabel = request.Group.Label,
                            UserRole = UserRole.Owner,
                            User = user
                        }
                    }
                };
                await _groupStore.CreateGroup(group);
                result.Id = group.Id;
                return result;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new CreateGroupResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }

        public async override Task<UpdateGroupResponse> UpdateGroup(UpdateGroupRequest request, ServerCallContext context)
        {
            try
            {
                var result = new UpdateGroupResponse { Success = true };
                var claim = context.GetHttpContext().User.Claims.FirstOrDefault(s => s.Type == "sub");
                var user = await _groupStore.GetUserByIdentifier(claim.Value);
                if (user != null)
                {
                    var userGroup = await _groupStore.GetUserGroup(user.Id, request.Group.Id);
                    if (userGroup != null)
                    {
                        userGroup.GroupLabel = request.Group.Label;
                        if (userGroup.UserRole == UserRole.Owner)
                        {
                            userGroup.Group.Password = request.Group.Password;
                        }
                        await _groupStore.SaveChanges();
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new UpdateGroupResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }

        public async override Task<LeaveGroupResponse> LeaveGroup(LeaveGroupRequest request, ServerCallContext context)
        {
            try
            {
                var result = new LeaveGroupResponse { Success = true };
                var claim = context.GetHttpContext().User.Claims.FirstOrDefault(s => s.Type == "sub");
                var user = await _groupStore.GetUserByIdentifier(claim.Value);
                if (user != null)
                {
                    var userGroup = await _groupStore.GetUserGroup(user.Id, request.Id);
                    if (userGroup != null)
                    {
                        await _groupStore.RemoveUserGroup(userGroup);
                    }
                }
                return result;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new LeaveGroupResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }
    }
}
