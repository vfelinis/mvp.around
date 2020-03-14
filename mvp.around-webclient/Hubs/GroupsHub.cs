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
            await Clients.Client(Context.ConnectionId).SendAsync("Send", message);
        }

        public Task LeaveHub(GroupsHubMessage message)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, message.GroupId.ToString());
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
