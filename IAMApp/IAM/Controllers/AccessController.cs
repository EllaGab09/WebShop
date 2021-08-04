using IAM.Areas.Identity.Data;
using IAM.Interfaces;
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
    public class AccessController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ITokenUtils tokenUtils;

        public AccessController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, ITokenUtils tokenUtils)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.tokenUtils = tokenUtils;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> login([FromBody] LoginCredentials loginCredentials)
        {
            if (ModelState.IsValid)
            {
                Debug.WriteLine($"loginCredentials.Email = {loginCredentials.Email}");
                Debug.WriteLine($"loginCredentials.Password = {loginCredentials.Password}");
                ApplicationUser User = await userManager.FindByNameAsync(loginCredentials.Email);

                if (User != null)
                {
                    var result = await signInManager.CheckPasswordSignInAsync(User, loginCredentials.Password, false);
                    if (result.Succeeded)
                    {
                        //IList<Claim> UserClaims = await userManager.GetClaimsAsync(User);
                        //Debug.WriteLine(UserClaims.Count());
                        //foreach (var item in UserClaims)
                        //{
                        //    Debug.WriteLine(item);
                        //}

                        IList<string> UserRoles = await userManager.GetRolesAsync(User);
                        Debug.WriteLine(UserRoles.Count());
                        foreach (var item in UserRoles)
                        {
                            Debug.WriteLine(item);
                        }
                        
                        JwtSecurityToken Token = tokenUtils.CreateTokenWithTheseRoles(UserRoles);
                        return Ok(new JwtSecurityTokenHandler().WriteToken(Token));
                    }
                    else
                    {
                        return BadRequest("Wrong password");
                    }
                }
                else
                {
                    return BadRequest("User not found");
                }
            }
            else
            {
                return Unauthorized("Invalid ModelState");
            }
        }
    }
}

//var result = await signInManager.PasswordSignInAsync(loginCredentials.Email, loginCredentials.Password, false, false); //Hårdare kontroll med verifierad email etc.


//var key = Encoding.ASCII.GetBytes("SuperKeyToPlaceInKeyVaultOrSomeGoodPlace");
//if (loginCredentials.Email == "admin@admin.com" && loginCredentials.Password == "admin")
//{
//    JwtSecurityToken token = new JwtSecurityToken(
//        issuer: "IAMApp",
//        audience: "IAMApp-audience",
//        claims: new[] {
//                        new Claim("role", "Admin"),
//                        new Claim("role", "User")
//        },
//        expires: DateTime.UtcNow.AddSeconds(60),
//        signingCredentials: new SigningCredentials(
//            key: new SymmetricSecurityKey(key),
//            algorithm: SecurityAlgorithms.HmacSha256Signature
//        )
//    );
//    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
//}