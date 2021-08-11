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
using WebShop.Models_DbSet;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class OrderController : ControllerBase
    {
        private readonly IDataAccess dataAccess;

        public OrderController(IDataAccess dataAccess)
        {
            this.dataAccess = dataAccess;
        }

        [HttpPost("CreateOrder")] //Tested in Postman with "WebShopApp : CreateOrder (Localhost)"
        //[Authorize(Roles = "Admin, User")]
        public ActionResult CreateOrder([FromBody] DetailedOrder detailedOrder)
        {
            dataAccess.CreateOrder(detailedOrder);
            return Ok("Order created");
        }

        [HttpPost("ReadOrder")] //Tested in postman with "WebShopApp : ReadOrder(Localhost)"
        //[Authorize(Roles = "Admin")]
        public ActionResult<DetailedOrder> ReadOrder([FromBody] Order order)
        {
            return Ok(dataAccess.ReadOrder(order));
        }

        [HttpPost("UpdateOrder")] //Tested in postman with "WebShopApp : UpdateOrder (Localhost)"
        //[Authorize(Roles = "Admin")]
        public ActionResult UpdateOrder([FromBody] DetailedOrder detailedOrder)
        {
            dataAccess.UpdateOrder(detailedOrder);
            return Ok("Order updated");
        }

        [HttpPost("DeleteOrder")] //Tested in postman with "WebShopApp : DeleteOrder (Localhost)"
        //[Authorize(Roles = "Admin")]
        public ActionResult DeleteOrder([FromBody] Order order)
        {
            dataAccess.DeleteOrder(order);
            return Ok("Order deleted");
        }

        [HttpGet("ReadAllOrders")] //Tested in postman with "WebShopApp : ReadAllOrders (Localhost)"
        //[AllowAnonymous]
        public ActionResult<List<Order>> ReadAllOrders()
        {
            return Ok(dataAccess.ReadAllOrders());
        }


    }
}
