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
                var userIdentifier = GetUserIdentifier(context);
                var user = await _groupStore.GetUser(userIdentifier);
                if (user != null)
                {
                    result.UserId = user.Id;
                    var groups = await _groupStore.GetGroups(user.Id);
                    if (groups.Any())
                    {
                        result.Groups.AddRange(groups.Select(s => new GroupDto
                        {
                            Id = s.GroupId,
                            Label = s.GroupLabel,
                            Password = s.UserRole == UserRole.Owner ? s.Group.Password : string.Empty,
                            UserName = s.UserName,
                            UserRole = (int)s.UserRole,
                            UserIcon = s.UserIcon
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
            try
            {
                var result = new GetGroupResponse { Success = true };
                var userIdentifier = GetUserIdentifier(context);
                var user = await _groupStore.GetUser(userIdentifier);
                if (user != null)
                {
                    result.UserId = user.Id;
                    var userGroup = await _groupStore.GetUserGroup(user.Id, request.Id);
                    if (userGroup != null)
                    {
                        result.Group = new GroupDto
                        {
                            Id = userGroup.GroupId,
                            Label = userGroup.GroupLabel,
                            Password = userGroup.UserRole == UserRole.Owner ? userGroup.Group.Password : string.Empty,
                            UserName = userGroup.UserName,
                            UserRole = (int)userGroup.UserRole,
                            UserIcon = userGroup.UserIcon
                        };
                    }
                    else
                    {
                        result.Success = false;
                        result.Message = "User is not connected to group";
                    }
                }
                else
                {
                    result.Success = false;
                    result.Message = "User does not exist";
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new GetGroupResponse
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
                var valid = GroupValidate(request.Group);
                if (!valid.success)
                {
                    result.Success = false;
                    result.Message = valid.message;
                    return result;
                }

                var userIdentifier = GetUserIdentifier(context);
                var user = await _groupStore.GetUser(userIdentifier);
                if (user == null)
                {
                    user = new User
                    {
                        Identifier = userIdentifier
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
                            UserName = request.Group.UserName,
                            UserRole = UserRole.Owner,
                            UserIcon = request.Group.UserIcon,
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
                var valid = GroupValidate(request.Group);
                if (!valid.success)
                {
                    result.Success = false;
                    result.Message = valid.message;
                    return result;
                }

                var userIdentifier = GetUserIdentifier(context);
                var user = await _groupStore.GetUser(userIdentifier);
                if (user != null)
                {
                    var userGroup = await _groupStore.GetUserGroup(user.Id, request.Group.Id);
                    if (userGroup != null)
                    {
                        userGroup.GroupLabel = request.Group.Label;
                        userGroup.UserName = request.Group.UserName;
                        if (userGroup.UserRole == UserRole.Owner)
                        {
                            userGroup.Group.Password = request.Group.Password;
                        }
                        userGroup.UserIcon = request.Group.UserIcon;
                        await _groupStore.SaveChanges();
                    }
                    else
                    {
                        result.Success = false;
                        result.Message = "User is not connected to group";
                    }
                }
                else
                {
                    result.Success = false;
                    result.Message = "User does not exist";
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

        public async override Task<ConnectGroupResponse> ConnectGroup(ConnectGroupRequest request, ServerCallContext context)
        {
            try
            {
                var result = new ConnectGroupResponse { Success = true };
                var valid = GroupValidate(request.Group);
                if (!valid.success)
                {
                    result.Success = false;
                    result.Message = valid.message;
                    return result;
                }

                var userIdentifier = GetUserIdentifier(context);
                var user = await _groupStore.GetUser(userIdentifier);
                if (user == null)
                {
                    user = new User
                    {
                        Identifier = userIdentifier
                    };
                }
                else
                {
                    var userGroup = await _groupStore.GetUserGroup(user.Id, request.Group.Id);
                    if (userGroup != null)
                    {
                        result.Success = false;
                        result.Message = "Group is already connected";
                        return result;
                    }
                }
                var group = await _groupStore.GetGroup(request.Group.Id);
                if (group != null)
                {
                    if (group.Password == request.Group.Password)
                    {
                        var userGroup = new UserGroup
                        {
                            User = user,
                            GroupLabel = request.Group.Label,
                            UserName = request.Group.UserName,
                            UserRole = UserRole.User,
                            UserIcon = request.Group.UserIcon,
                            Group = group
                        };
                        await _groupStore.AddUserGroup(userGroup);
                    }
                    else
                    {
                        result.Success = false;
                        result.Message = "Group Password is not correct";
                    }
                }
                else
                {
                    result.Success = false;
                    result.Message = "Group does not exist";
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ConnectGroupResponse
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
                var userIdentifier = GetUserIdentifier(context);
                var user = await _groupStore.GetUser(userIdentifier);
                if (user != null)
                {
                    var userGroup = await _groupStore.GetUserGroup(user.Id, request.Id);
                    if (userGroup != null)
                    {
                        await _groupStore.RemoveUserGroup(userGroup);
                    }
                    else
                    {
                        result.Success = false;
                        result.Message = "User is not connected to group";
                    }
                }
                else
                {
                    result.Success = false;
                    result.Message = "User does not exist";
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

        private string GetUserIdentifier(ServerCallContext context)
        {
            return context.GetHttpContext().User.Claims.FirstOrDefault(s => s.Type == JwtClaimTypes.Id)?.Value;
        }

        private (bool success, string message) GroupValidate(GroupDto group)
        {
            var success = true;
            string message = null;
            if (string.IsNullOrWhiteSpace(group.UserName))
            {
                success = false;
                message = "User Name should be filled";
            }
            else if (string.IsNullOrWhiteSpace(group.Label))
            {
                success = false;
                message = "Group Label should be filled";
            }
            else if (group.Password == null)
            {
                success = false;
                message = "Password cannot be null";
            }
            return (success, message);
        }
    }
}
