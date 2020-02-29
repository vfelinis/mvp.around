using Microsoft.EntityFrameworkCore;
using mvp.around_api.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mvp.around_api.Data.Stores
{
    public class GroupStore: IGroupStore
    {
        private readonly ApplicationDbContext _dbContext;
        private DbSet<User> Users => _dbContext.Users;
        private DbSet<Group> Groups => _dbContext.Groups;
        private DbSet<UserGroup> UsersGroups => _dbContext.UsersGroups;

        public GroupStore(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SaveChanges()
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User> GetUserByIdentifier(string identifier)
        {
            return await Users.FirstOrDefaultAsync(s => s.Identifier == identifier);
        }

        public async Task<List<UserGroup>> GetGroupsByUserId(int userId)
        {
            return await UsersGroups
                .Include(s => s.Group)
                .Where(s => s.UserId == userId)
                .ToListAsync();
        }

        public async Task CreateGroup(Group group)
        {
            await Groups.AddAsync(group);
            await SaveChanges();
        }

        public async Task<UserGroup> GetUserGroup(int userId, int groupId)
        {
            return await UsersGroups.Include(s => s.Group)
                .FirstOrDefaultAsync(s => s.UserId == userId && s.GroupId == groupId);
        }

        public async Task RemoveUserGroup(UserGroup userGroup)
        {
            UsersGroups.Remove(userGroup);
            await SaveChanges();
        }
    }
}
