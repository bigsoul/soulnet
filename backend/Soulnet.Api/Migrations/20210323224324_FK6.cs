using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Soulnet.Api.Migrations
{
    public partial class FK6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Testing_Learning_LearningId",
                table: "Testing");

            migrationBuilder.DropIndex(
                name: "IX_Testing_LearningId",
                table: "Testing");

            migrationBuilder.AlterColumn<Guid>(
                name: "LearningId",
                table: "Testing",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateIndex(
                name: "IX_Testing_LearningId",
                table: "Testing",
                column: "LearningId");

            migrationBuilder.AddForeignKey(
                name: "FK_Testing_Learning_LearningId",
                table: "Testing",
                column: "LearningId",
                principalTable: "Learning",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Testing_Learning_LearningId",
                table: "Testing");

            migrationBuilder.DropIndex(
                name: "IX_Testing_LearningId",
                table: "Testing");

            migrationBuilder.AlterColumn<Guid>(
                name: "LearningId",
                table: "Testing",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

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
    }
}
