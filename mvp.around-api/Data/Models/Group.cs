using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mvp.around_api.Data.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public int UsersLimit { get; set; }
        public DateTime DTU { get; set; }
        public DateTime DTC { get; set; }

        public List<UserGroup> UsersGroups { get; set; } = new List<UserGroup>();
    }

    public static class GroupExtension
    {
        public static void DescribeGroup(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Group>(c =>
            {
                c.Property(p => p.Password).IsRequired(true);
                c.Property(p => p.DTC).HasColumnType("datetime2");
                c.Property(p => p.DTU).HasColumnType("datetime2");

            });
            modelBuilder.Entity<Group>().ToTable("Groups");
        }
    }
}
