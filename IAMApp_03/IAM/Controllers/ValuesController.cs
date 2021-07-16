﻿using IAM.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IAM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ValuesController : ControllerBase
    {
        [HttpGet("getFruits")]
        [AllowAnonymous]
        public ActionResult GetFruits()
        {
            List<string> MyFruits = new List<string>() { "Apples", "Oranges" };
            return Ok(MyFruits);
        }

        //[HttpGet("getFruitsAuth")]
        //public ActionResult GetFruitsAuth()
        //{
        //    List<string> MyFruits = new List<string>() { "Organic Apples", "Organic Oranges" };
        //    return Ok(MyFruits);
        //}


        [HttpPost("getToken60s")]
        [AllowAnonymous]
        public async Task<ActionResult> GetToken60s([FromBody] LoginCredentials loginCredentials)
        {
            if (loginCredentials.Email == "test@test.com" && loginCredentials.Password == "test")
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("SuperKeyToPlaceInKeyVaultOrSomeGoodPlace");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, loginCredentials.Email)
                        //new Claim(ClaimTypes.Email, identityUser.Email)
                    }),
                    Expires = DateTime.UtcNow.AddSeconds(60),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized("Try again my friend");
            }
        }

        [HttpPost("getToken7Days")]
        [AllowAnonymous]
        public async Task<ActionResult> GetToken7Days([FromBody] LoginCredentials loginCredentials)
        {
            if (loginCredentials.Email == "dev@dev.com" && loginCredentials.Password == "dev")
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("SuperKeyToPlaceInKeyVaultOrSomeGoodPlace");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, loginCredentials.Email)
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized("Try again my friend");
            }
        }

    }
}