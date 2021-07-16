﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Models;

namespace WebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthTestController : ControllerBase
    {
        [HttpGet("getProducts")]
        [AllowAnonymous]
        public ActionResult getProducts()
        {
            List<Product> ProductList = new List<Product>();
            ProductList.Add(new Product(10, "Keyboard", 19.99, "someWorkingUrl"));
            ProductList.Add(new Product(11, "Mouse", 8.80, "someWorkingUrl"));
            ProductList.Add(new Product(12, "Monitor", 190.0, "someWorkingUrl"));
            return Ok(ProductList);
        }

        [HttpGet("getSectretProducts")]
        public ActionResult getSectretProducts()
        {
            List<Product> ProductList = new List<Product>();
            ProductList.Add(new Product(600, "Crispr gene editing kit", 400.0, "someWorkingUrl"));
            ProductList.Add(new Product(601, "Paperclip maximizer AI", 7000.80, "someWorkingUrl"));
            ProductList.Add(new Product(602, "Plutonium-239, (1kg bar)", 5000.0, "someWorkingUrl"));
            return Ok(ProductList);
        }

    }
}