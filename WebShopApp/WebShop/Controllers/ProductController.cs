using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using WebShop.Models;
using WebShop.Infrastructure;


namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController, EnableCors]
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
        /*
        [HttpPost("GetProductDetails")]
        [AllowAnonymous]
        public ActionResult<DetailedProduct> GetProductDetails([FromBody] string id) //continue here after weekend, minor bug here.
        {
            int test = Int32.Parse(id);
            return dataAccess.GetProductDetails(test);
        }/**/

        [HttpGet("GetProductDetails")]
        [AllowAnonymous]
        public ActionResult<DetailedProduct> GetProductDetails(string id)
        {
            int idParsed = Int32.Parse(id);
            return dataAccess.GetProductDetails(idParsed - 1);
        }

    }
}
