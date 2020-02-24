using mvp.around_api.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace mvp.around_api.Data.Stores
{
    public interface IGroupStore
    {
        Task SaveChanges();
        Task<User> GetUserByIdentifier(string identifier);
        Task<List<UserGroup>> GetGroupsByUserId(int userId);
        Task<Group> GetGroupById(int id);
        Task CreateGroup(Group group);
        Task<UserGroup> GetUserGroup(int userId, int groupId);
        Task RemoveUserGroup(UserGroup userGroup);
    }
}