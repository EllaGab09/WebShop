using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Infrastructure;
using WebShop.Models_DbSet;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ProductController : ControllerBase
    {
        private readonly IDataAccess dataAccess;

        public ProductController(IDataAccess dataAccess)
        {
            this.dataAccess = dataAccess;
        }

        [HttpPost("CreateProduct")] //Tested in postman with "WebShopApp : ReadAllProducts (Localhost)"
        //[Authorize(Roles = "Admin")]
        public ActionResult CreateProduct([FromBody] Product product)
        {
            dataAccess.CreateProduct(product);
            return Ok("Product added");
        }

        [HttpPost("ReadProduct")] //Tested in postman with "WebShopApp : ReadProduct (Localhost)"
        //[AllowAnonymous]
        public ActionResult<DetailedProduct> ReadProduct([FromBody] Product product)
        {
            return Ok(dataAccess.ReadProduct(product));
        }

        [HttpPost("UpdateProduct")] //Tested in postman with "WebShopApp : UpdateProduct (Localhost)"
        //[Authorize(Roles = "Admin")]
        public ActionResult UpdateProduct([FromBody] Product product)
        {
            dataAccess.UpdateProduct(product);
            return Ok("Product updated");
        }

        [HttpPost("DeleteProduct")] //Tested in postman with "WebShopApp : DeleteProduct (Localhost)"
        //[Authorize(Roles = "Admin")]
        public ActionResult DeleteProduct([FromBody] Product product)
        {
            dataAccess.DeleteProduct(product);
            return Ok("Product deleted");
        }

        [HttpGet("ReadAllProducts")] //Tested in postman with "WebShopApp : GetAllProducts (Localhost)"
        //[AllowAnonymous]
        public ActionResult<List<Product>> ReadAllProducts()
        {
            return Ok(dataAccess.ReadAllProducts());
        }


    }
}
