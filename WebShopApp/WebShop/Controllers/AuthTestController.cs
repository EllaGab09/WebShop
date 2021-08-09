using Microsoft.AspNetCore.Authorization;
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

        [HttpPost("HasAttatchedTokenRootAccess")]
        [Authorize(Roles = "Root")]
        public async Task<ActionResult> HasAttatchedTokenRootAccess()
        {
            return Ok("The attatched token has correct Root role in it.");
        }

        [HttpPost("HasAttatchedTokenAdminAccess")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> HasAttatchedTokenAdminAccess()
        {
            return Ok("The attatched token has correct Admin role in it.");
        }

        [HttpPost("HasAttatchedTokenUserAccess")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult> HasAttatchedTokenUserAccess()
        {
            return Ok("The attatched token has correct User role in it.");
        }

    }
}
