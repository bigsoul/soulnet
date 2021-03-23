using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Soulnet.Api.Migrations
{
    public partial class FK5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Testing_Dataset_DatasetId",
                table: "Testing");

            migrationBuilder.DropIndex(
                name: "IX_Testing_DatasetId",
                table: "Testing");

            migrationBuilder.AlterColumn<Guid>(
                name: "DatasetId",
                table: "Testing",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateIndex(
                name: "IX_Testing_DatasetId",
                table: "Testing",
                column: "DatasetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Testing_Dataset_DatasetId",
                table: "Testing",
                column: "DatasetId",
                principalTable: "Dataset",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Testing_Dataset_DatasetId",
                table: "Testing");

            migrationBuilder.DropIndex(
                name: "IX_Testing_DatasetId",
                table: "Testing");

            migrationBuilder.AlterColumn<Guid>(
                name: "DatasetId",
                table: "Testing",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Testing_DatasetId",
                table: "Testing",
                column: "DatasetId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Testing_Dataset_DatasetId",
                table: "Testing",
                column: "DatasetId",
                principalTable: "Dataset",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
