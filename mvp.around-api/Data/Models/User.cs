using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mvp.around_api.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Identifier { get; set; }
        public DateTime DTU { get; set; } = DateTime.UtcNow;
        public DateTime DTC { get; set; } = DateTime.UtcNow;

        public List<UserGroup> UsersGroups { get; set; } = new List<UserGroup>();
    }

    public static class UserExtension
    {
        public static void DescribeUser(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(c =>
            {
                c.Property(p => p.Identifier).IsRequired(true);
                c.Property(p => p.DTC).HasColumnType("datetime2");
                c.Property(p => p.DTU).HasColumnType("datetime2");

            });
            modelBuilder.Entity<User>()
                .HasIndex(b => b.Identifier)
                .IsUnique(true)
                .HasName("IX_Users_OpenId");
            modelBuilder.Entity<User>().ToTable("Users");
        }
    }
}
