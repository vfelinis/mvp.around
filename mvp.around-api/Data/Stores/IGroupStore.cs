using mvp.around_api.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mvp.around_api.Data.Stores
{
    public interface IGroupStore
    {
        Task SaveChanges();
        Task<User> GetUser(string identifier);
        Task<List<UserGroup>> GetGroups(int userId);
        Task<Group> GetGroup(int groupId);
        Task CreateGroup(Group group);
        Task<UserGroup> GetUserGroup(int userId, int groupId);
        Task AddUserGroup(UserGroup userGroup);
        Task RemoveUserGroup(UserGroup userGroup);
    }
}