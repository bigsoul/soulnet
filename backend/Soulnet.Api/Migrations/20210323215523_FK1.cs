using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Soulnet.Api.Migrations
{
    public partial class FK1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Learning_Testing_TestingId",
                table: "Learning");

            migrationBuilder.DropIndex(
                name: "IX_Learning_TestingId",
                table: "Learning");

            migrationBuilder.DropColumn(
                name: "TestingId",
                table: "Learning");

            migrationBuilder.CreateIndex(
                name: "IX_Testing_LearningId",
                table: "Testing",
                column: "LearningId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Testing_Learning_LearningId",
                table: "Testing",
                column: "LearningId",
                principalTable: "Learning",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Testing_Learning_LearningId",
                table: "Testing");

            migrationBuilder.DropIndex(
                name: "IX_Testing_LearningId",
                table: "Testing");

            migrationBuilder.AddColumn<Guid>(
                name: "TestingId",
                table: "Learning",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Learning_TestingId",
                table: "Learning",
                column: "TestingId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Learning_Testing_TestingId",
                table: "Learning",
                column: "TestingId",
                principalTable: "Testing",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
