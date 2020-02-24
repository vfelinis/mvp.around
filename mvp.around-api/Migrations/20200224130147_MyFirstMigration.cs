﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace mvp.aroundapi.Migrations
{
    public partial class MyFirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Password = table.Column<string>(nullable: false),
                    UsersLimit = table.Column<int>(nullable: false),
                    DTU = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DTC = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Identifier = table.Column<string>(nullable: false),
                    DTU = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DTC = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsersGroups",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupLabel = table.Column<string>(nullable: false),
                    UserRole = table.Column<int>(nullable: false),
                    UserName = table.Column<string>(nullable: false),
                    DTU = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DTC = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    GroupId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsersGroups_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersGroups_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_OpenId",
                table: "Users",
                column: "Identifier",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UsersGroups_GroupId_UserId",
                table: "UsersGroups",
                columns: new[] { "GroupId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UsersGroups_GroupId_UserName",
                table: "UsersGroups",
                columns: new[] { "GroupId", "UserName" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UsersGroups_UserId_GroupId",
                table: "UsersGroups",
                columns: new[] { "UserId", "GroupId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsersGroups");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
