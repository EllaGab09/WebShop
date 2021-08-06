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
        private readonly RoleManager<ApplicationRole> roleManager;

        public UserManagementController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
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
                    var resultAddRole = await userManager.AddToRoleAsync(user, "User"); //New users get "User" role by default
                    if (resultCreateUser.Succeeded && resultAddRole.Succeeded)
                    {
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


        [HttpPost("RemoveThisUser")]
        [Authorize(Roles = "Root")]
        public async Task<ActionResult> RemoveThisUser([FromBody] UserName userName)
        {
            var User = await userManager.FindByEmailAsync(userName.Email);
            if (User == null)
            {
                return BadRequest("User not found");
            }
            else
            {
                var result = await userManager.DeleteAsync(User);
                return Ok("User deleted");
            }
        }


        [HttpPost("GetAllUsers")]
        [Authorize(Roles = "Root")]
        public ActionResult GetAllUsers()
        {
            var Users = userManager.Users;
            var UsersUserName = Users.Select(n => n.Email).ToList();

            if (Users == null)
            {
                return BadRequest("No Users found");
            }
            else
            {
                return Ok(UsersUserName);
            }
        }


        [HttpPost("GetAllRoles")]
        [Authorize(Roles = "Root")]
        public ActionResult GetAllRoles()
        {
            var Roles = roleManager.Roles;
            var RolesOnlyName = Roles.Select(n => n.NormalizedName).ToList();

            if (Roles == null)
            {
                return BadRequest("No Roles found");
            }
            else
            {
                return Ok(RolesOnlyName);
            }
        }


        [HttpPost("ReadRolesFromUser")]
        [Authorize(Roles = "Root")]
        public async Task<ActionResult> ReadRolesFromUser([FromBody] UserName userName)
        {
            var User = await userManager.FindByNameAsync(userName.Email);
            if (User != null)
            {
                var UsersRoles = await userManager.GetRolesAsync(User);
                if (UsersRoles != null)
                {
                    return Ok(UsersRoles);
                }
                else
                {
                    return BadRequest("This user has no roles");
                }
            }
            else
            {
                return BadRequest("Cant find user");
            }
        }


        [HttpPost("WriteRolesToUser")]
        [Authorize(Roles = "Root")]
        public async Task<ActionResult> WriteRolesToUser([FromBody] UserWithRoles userWithRoles)
        {
            var User = await userManager.FindByNameAsync(userWithRoles.Email);
            if (User != null)
            {
                var UsersRoles = await userManager.GetRolesAsync(User);
                var RemoveRolesResult = await userManager.RemoveFromRolesAsync(User, UsersRoles);
                var AddRolesResult = await userManager.AddToRolesAsync(User, userWithRoles.Roles);
                if (RemoveRolesResult.Succeeded && AddRolesResult.Succeeded)
                {
                    return Ok("User roles are updated");
                }
                else
                {
                    return BadRequest("Unable to update roles for user");
                }
            }
            else
            {
                return BadRequest("Cant find user");
            }
        }


    }
}
