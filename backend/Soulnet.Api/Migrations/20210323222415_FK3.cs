using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Soulnet.Api.Migrations
{
    public partial class FK3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Learning_Dataset_DatasetId",
                table: "Learning");

            migrationBuilder.DropIndex(
                name: "IX_Learning_DatasetId",
                table: "Learning");

            migrationBuilder.AddColumn<Guid>(
                name: "LearningId",
                table: "Dataset",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dataset_LearningId",
                table: "Dataset",
                column: "LearningId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dataset_Learning_LearningId",
                table: "Dataset",
                column: "LearningId",
                principalTable: "Learning",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dataset_Learning_LearningId",
                table: "Dataset");

            migrationBuilder.DropIndex(
                name: "IX_Dataset_LearningId",
                table: "Dataset");

            migrationBuilder.DropColumn(
                name: "LearningId",
                table: "Dataset");

            migrationBuilder.CreateIndex(
                name: "IX_Learning_DatasetId",
                table: "Learning",
                column: "DatasetId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Learning_Dataset_DatasetId",
                table: "Learning",
                column: "DatasetId",
                principalTable: "Dataset",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
