using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mvp.around_webclient.Hubs
{
    public class GroupsHub: Hub
    {
        public async Task JoinHub(GroupsHubMessage message)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, message.GroupId.ToString());
            await Clients.Group(message.GroupId.ToString()).SendAsync("JoinHub", message);
        }

        public async Task LeaveHub(GroupsHubMessage message)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, message.GroupId.ToString());
            await Clients.Group(message.GroupId.ToString()).SendAsync("LeaveHub", message);
        }

        public Task Send(GroupsHubMessage message)
        {
            return Clients.Group(message.GroupId.ToString()).SendAsync("Send", message);
        }
    }

    public class GroupsHubMessage
    {
        public int GroupId { get; set; }
        public string UserName { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
    }
}
