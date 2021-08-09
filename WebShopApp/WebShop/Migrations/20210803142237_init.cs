using Microsoft.EntityFrameworkCore.Migrations;

namespace WebShop.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Categoryname = table.Column<string>(name: "Category name", type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Productname = table.Column<string>(name: "Product name", type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryIdFK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryIdFK",
                        column: x => x.CategoryIdFK,
                        principalTable: "Categories",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Authorname = table.Column<string>(name: "Author name", type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductIdFK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Reviews_Products_ProductIdFK",
                        column: x => x.ProductIdFK,
                        principalTable: "Products",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "ID", "Description", "Category name" },
                values: new object[] { 1, null, "Keyboards" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "ID", "Description", "Category name" },
                values: new object[] { 2, null, "Monitors" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ID", "CategoryIdFK", "Description", "Product name" },
                values: new object[,]
                {
                    { 1, 1, null, "Mini-Keyboard" },
                    { 2, 1, null, "Gaming-keyboard" },
                    { 3, 2, null, "LG 23' HD" },
                    { 4, 2, null, "Siemens 28' 4K" }
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "ID", "Author name", "ProductIdFK", "Text" },
                values: new object[,]
                {
                    { 1, "1337 gamer", 2, "Kickass keyboard, solid buy" },
                    { 2, "1337 gamer", 3, "Works as a second monitor" },
                    { 3, "1337 gamer", 4, "Loads of dead pixels :(" },
                    { 4, "Mamma Berit", 4, "Quick delivery, almost to big" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryIdFK",
                table: "Products",
                column: "CategoryIdFK");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ProductIdFK",
                table: "Reviews",
                column: "ProductIdFK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
