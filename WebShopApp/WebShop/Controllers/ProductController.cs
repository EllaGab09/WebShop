using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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

        [HttpGet("GetAllProducts")]
        [AllowAnonymous]
        public ActionResult<List<Product>> GetAllProducts()
        {
            return dataAccess.GetAllProducts();
        }

        [HttpPost("GetProductDetails")]
        [AllowAnonymous]
        public ActionResult<DetailedProduct> GetProductDetails([FromBody] string id) //continue here after weekend, minor bug here.
        {
            int test = Int32.Parse(id);
            return dataAccess.GetProductDetails(test);
        }

    }
}
