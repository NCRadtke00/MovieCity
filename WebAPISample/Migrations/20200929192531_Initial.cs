using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPISample.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    MovieId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Director = table.Column<string>(nullable: true),
                    Genre = table.Column<string>(nullable: true),
                    Synopsis = table.Column<string>(nullable: true),
                    RunTime = table.Column<int>(nullable: false),
                    ImageLocation = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.MovieId);
                });

            migrationBuilder.InsertData(
                table: "Movies",
                columns: new[] { "MovieId", "Director", "Genre", "ImageLocation", "RunTime", "Synopsis", "Title" },
                values: new object[,]
                {
                    { 1, "Martin Scorsese", "Drama", null, 0, null, "The Departed" },
                    { 2, "Christopher Nolan", "Drama", null, 0, null, "The Dark Knight" },
                    { 3, "Christopher Nolan", "Drama", null, 0, null, "Inception" },
                    { 4, "David Gordon Green", "Comedy", null, 0, null, "Pineapple Express" },
                    { 5, "John McTiernan", "Action", null, 0, null, "Die Hard" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Movies");
        }
    }
}
