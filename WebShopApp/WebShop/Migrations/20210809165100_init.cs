using Microsoft.EntityFrameworkCore.Migrations;

namespace WebShop.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Customer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalPrice = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Productname = table.Column<string>(name: "Product name", type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DetailedProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductIdFK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailedProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailedProducts_Products_ProductIdFK",
                        column: x => x.ProductIdFK,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductOrder",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductFK = table.Column<int>(type: "int", nullable: false),
                    OrderFK = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOrder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductOrder_Orders_OrderFK",
                        column: x => x.OrderFK,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductOrder_Products_ProductFK",
                        column: x => x.ProductFK,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "Customer", "TotalPrice" },
                values: new object[,]
                {
                    { 1, "Admin@Admin.com", 2399 },
                    { 2, "Admin@Admin.com", 4000 },
                    { 3, "root@root.com", 199 }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "ImageUrl", "Product name", "Price" },
                values: new object[,]
                {
                    { 1, "SomeURL", "Mini-Keyboard", 199 },
                    { 2, "SomeURL", "Gaming-keyboard", 399 },
                    { 3, "SomeURL", "LG 23' HD", 2000 },
                    { 4, "SomeURL", "Siemens 28' 4K", 4000 }
                });

            migrationBuilder.InsertData(
                table: "DetailedProducts",
                columns: new[] { "Id", "Description", "ProductIdFK" },
                values: new object[,]
                {
                    { 1, "Slim keyboard", 1 },
                    { 2, "Kickass keyboard, solid buy", 2 },
                    { 3, "Small but an exellent second monitor.", 3 },
                    { 4, "Quick delivery, almost to big", 4 }
                });

            migrationBuilder.InsertData(
                table: "ProductOrder",
                columns: new[] { "Id", "OrderFK", "ProductFK" },
                values: new object[,]
                {
                    { 4, 3, 1 },
                    { 1, 1, 2 },
                    { 2, 1, 3 },
                    { 3, 2, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_DetailedProducts_ProductIdFK",
                table: "DetailedProducts",
                column: "ProductIdFK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrder_OrderFK",
                table: "ProductOrder",
                column: "OrderFK");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrder_ProductFK",
                table: "ProductOrder",
                column: "ProductFK");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DetailedProducts");

            migrationBuilder.DropTable(
                name: "ProductOrder");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
