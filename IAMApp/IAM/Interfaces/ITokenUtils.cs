using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace IAM.Interfaces
{
    public interface ITokenUtils
    {
        JwtSecurityToken CreateTokenWithTheseRoles(IList<string> Claims);
    }
}