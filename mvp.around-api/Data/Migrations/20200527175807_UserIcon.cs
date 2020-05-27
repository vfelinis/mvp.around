using Microsoft.EntityFrameworkCore.Migrations;

namespace mvp.aroundapi.Data.Migrations
{
    public partial class UserIcon : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserIcon",
                table: "UsersGroups",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserIcon",
                table: "UsersGroups");
        }
    }
}
