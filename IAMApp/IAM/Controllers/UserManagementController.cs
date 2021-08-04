using IAM.Areas.Identity.Data;
using IAM.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
    public class UserManagementController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;

        public UserManagementController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }



        //If username/password is valid, the user is added to the AspNetUsers table.
        [HttpPost("RegisterUser")]
        [AllowAnonymous]
        public async Task<ActionResult> RegisterUser([FromBody] RegisterUser registerUser)
        {
            Debug.WriteLine("RegisterUser endpoint hit.");
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = registerUser.Email, Email = registerUser.Email, EmailConfirmed = true };
                var result = await userManager.CreateAsync(user, registerUser.Password);
                if (result.Succeeded)
                {
                    Debug.WriteLine("User sussessfuly created");
                    return Ok("User sussessfuly created");
                }
                else
                {
                    return BadRequest("Failed to create user. result.Succeeded = false");
                }
            }
            else
            {
                return Conflict(" ModelState.IsValid = false ");
            }
        }
    }
}
