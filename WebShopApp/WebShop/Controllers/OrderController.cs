using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Infrastructure;
using WebShop.Models;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IDataAccess dataAccess;

        public ProductController(IDataAccess dataAccess)
        {
            this.dataAccess = dataAccess;
        }

        [HttpPost("CreateProduct")]
        [Authorize(Roles = "Admin")]
        public ActionResult CreateProduct()
        {
            return Ok("Still in dev!!");
        }

        [HttpPost("ReadProduct")]
        [AllowAnonymous]
        public ActionResult<DetailedProduct> ReadProduct([FromBody] GenericObjectId id)
        {
            return dataAccess.GetProductDetails(Int32.Parse(id.id));
        }

        [HttpPost("UpdateProduct")]
        [Authorize(Roles = "Admin")]
        public ActionResult UpdateProduct()
        {
            return Ok("Still in dev!!");
        }

        [HttpPost("DeleteProduct")]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteProduct()
        {
            return Ok("Still in dev!!");
        }

        [HttpGet("ReadAllProducts")]
        [AllowAnonymous]
        public ActionResult<List<Product>> ReadAllProducts()
        {
            return dataAccess.GetAllProducts();
        }


    }
}
