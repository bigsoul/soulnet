using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Soulnet.Api.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dataset",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    IsLoaded = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dataset", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Username = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    Email = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    Password = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Testing",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    State = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    IsArchive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IterationCount = table.Column<int>(type: "integer", nullable: false),
                    IterationCurrent = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    StopLossPercent = table.Column<float>(type: "real", nullable: false),
                    StartDeposit = table.Column<float>(type: "real", nullable: false),
                    EndDeposit = table.Column<float>(type: "real", nullable: false),
                    LearningId = table.Column<Guid>(type: "uuid", nullable: false),
                    DatasetId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Testing", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Testing_Dataset_DatasetId",
                        column: x => x.DatasetId,
                        principalTable: "Dataset",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Learning",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    State = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    IsArchive = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    IterationCount = table.Column<int>(type: "integer", nullable: false),
                    IterationCurrent = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    InputNeuronsCount = table.Column<int>(type: "integer", nullable: false),
                    DeepLayersCount = table.Column<int>(type: "integer", nullable: false, defaultValue: 0),
                    DatasetId = table.Column<Guid>(type: "uuid", nullable: false),
                    TestingId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Learning", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Learning_Dataset_DatasetId",
                        column: x => x.DatasetId,
                        principalTable: "Dataset",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Learning_Testing_TestingId",
                        column: x => x.TestingId,
                        principalTable: "Testing",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Learning_DatasetId",
                table: "Learning",
                column: "DatasetId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Learning_TestingId",
                table: "Learning",
                column: "TestingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Testing_DatasetId",
                table: "Testing",
                column: "DatasetId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Learning");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Testing");

            migrationBuilder.DropTable(
                name: "Dataset");
        }
    }
}
