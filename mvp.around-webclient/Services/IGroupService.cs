using mvp.around_api.Services;
using System.Threading.Tasks;

namespace mvp.around_webclient.Services
{
    public interface IGroupService
    {
        Task<GetGroupsResponse> GetGroups(string token);
    }
}