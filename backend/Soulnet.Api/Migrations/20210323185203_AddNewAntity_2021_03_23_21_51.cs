using Microsoft.EntityFrameworkCore.Migrations;

namespace Soulnet.Api.Migrations
{
    public partial class AddNewAntity_2021_03_23_21_51 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dataset",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    IsLoaded = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dataset", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Learning",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    State = table.Column<int>(type: "integer", nullable: false),
                    IsArchive = table.Column<bool>(type: "boolean", nullable: false),
                    IterationCount = table.Column<int>(type: "integer", nullable: false),
                    IterationCurrent = table.Column<int>(type: "integer", nullable: false),
                    InputNeuronsCount = table.Column<int>(type: "integer", nullable: false),
                    DeepLayersCount = table.Column<int>(type: "integer", nullable: false),
                    DatasetId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Learning", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Testing",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    State = table.Column<int>(type: "integer", nullable: false),
                    IsArchive = table.Column<bool>(type: "boolean", nullable: false),
                    IterationCount = table.Column<int>(type: "integer", nullable: false),
                    IterationCurrent = table.Column<int>(type: "integer", nullable: false),
                    StopLossPercent = table.Column<float>(type: "real", nullable: false),
                    StartDeposit = table.Column<float>(type: "real", nullable: false),
                    EndDeposit = table.Column<float>(type: "real", nullable: false),
                    LearningId = table.Column<string>(type: "text", nullable: true),
                    DatasetId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Testing", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dataset");

            migrationBuilder.DropTable(
                name: "Learning");

            migrationBuilder.DropTable(
                name: "Testing");
        }
    }
}
