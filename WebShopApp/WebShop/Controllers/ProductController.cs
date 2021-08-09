﻿using Microsoft.AspNetCore.Authorization;
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
    public class OrderController : ControllerBase
    {
        private readonly IDataAccess dataAccess;

        public OrderController(IDataAccess dataAccess)
        {
            this.dataAccess = dataAccess;
        }

        [HttpPost("CreateOrder")]
        [Authorize(Roles = "Admin, User")]
        public ActionResult CreateOrder()
        {
            return Ok("Still in dev!!");
        }

        [HttpPost("ReadOrder")]
        [Authorize(Roles = "Admin")]
        public ActionResult ReadOrder()
        {
            return Ok("Still in dev!!");
        }

        [HttpPost("UpdateOrder")]
        [Authorize(Roles = "Admin")]
        public ActionResult UpdateOrder()
        {
            return Ok("Still in dev!!");
        }

        [HttpPost("DeleteOrder")]
        [Authorize(Roles = "Admin")]
        public ActionResult DeleteOrder()
        {
            return Ok("Still in dev!!");
        }

        [HttpGet("ReadAllOrder")]
        [AllowAnonymous]
        public ActionResult ReadAllOrder()
        {
            return Ok("Still in dev!!");
        }


    }
}
