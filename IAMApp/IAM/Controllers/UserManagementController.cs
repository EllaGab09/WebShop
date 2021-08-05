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
        [HttpPost("CreateUserWithUserRole")]
        [AllowAnonymous]
        public async Task<ActionResult> CreateUserWithUserRole([FromBody] RegisterUser registerUser)
        {
            Debug.WriteLine("RegisterUser endpoint hit.");
            if (ModelState.IsValid)
            {
                var UserAlreadyExists = await userManager.FindByEmailAsync(registerUser.Email);
                if (UserAlreadyExists == null)
                {
                    var user = new ApplicationUser { UserName = registerUser.Email, Email = registerUser.Email, EmailConfirmed = true };
                    var resultCreateUser = await userManager.CreateAsync(user, registerUser.Password);
                    //Här skall jag ge user, user role
                    //modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = "1", Name = "User"  });
                    //var role = new ApplicationRole { Id = "1", Name = "User" };
                    //List<string> roles = new List<string> { "User" }; //This role = User. All new users are created with "User" role.
                    var resultAddRole = await userManager.AddToRoleAsync(user, "User");

                    if (resultCreateUser.Succeeded && resultAddRole.Succeeded)
                    {
                        Debug.WriteLine("User sussessfuly created");
                        return Ok("User sussessfuly created");
                    }
                    else
                    {
                        return BadRequest("Failed to create user");
                    }
                }
                else
                {
                    return BadRequest("User already exists");
                }
            }
            else
            {
                return Conflict(" ModelState.IsValid = false ");
            }
        }
    }
}
