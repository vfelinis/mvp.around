using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mvp.around_api.Data.Models
{
    public class UserGroup
    {
        public int Id { get; set; }
        public string GroupLabel { get; set; }
        public string UserName { get; set; }
        public UserRole UserRole { get; set; }
        public DateTime DTU { get; set; } = DateTime.UtcNow;
        public DateTime DTC { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public User User { get; set; }

        public int GroupId { get; set; }
        public Group Group { get; set; }
    }

    public enum UserRole
    {
        User = 0,
        Owner = 1
    }

    public static class UserGroupExtension
    {
        public static void DescribeUserGroup(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserGroup>(c =>
            {
                c.Property(p => p.GroupLabel).IsRequired(true).HasMaxLength(50);
                c.Property(p => p.UserName).IsRequired(true).HasMaxLength(50);
                c.Property(p => p.DTC).HasColumnType("datetime2");
                c.Property(p => p.DTU).HasColumnType("datetime2");

            });
            modelBuilder.Entity<UserGroup>()
                .HasIndex(b => new { b.UserId, b.GroupId })
                .IsUnique(true)
                .HasName("IX_UsersGroups_UserId_GroupId");
            modelBuilder.Entity<UserGroup>()
                .HasIndex(b => new { b.GroupId, b.UserId })
                .IsUnique(true)
                .HasName("IX_UsersGroups_GroupId_UserId");
            modelBuilder.Entity<UserGroup>()
                .HasIndex(b => new { b.GroupId, b.UserName })
                .IsUnique(true)
                .HasName("IX_UsersGroups_GroupId_UserName");
            modelBuilder.Entity<UserGroup>()
                .HasOne(p => p.User)
                .WithMany(b => b.UsersGroups)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<UserGroup>()
                .HasOne(p => p.Group)
                .WithMany(b => b.UsersGroups)
                .HasForeignKey(p => p.GroupId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<UserGroup>().ToTable("UsersGroups");
        }
    }
}
