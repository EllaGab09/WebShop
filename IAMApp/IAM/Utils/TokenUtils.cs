using IAM.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IAM.Utils
{
    public class TokenUtils : ITokenUtils
    {
        public JwtSecurityToken CreateTokenWithTheseRoles(IList<string> Roles)
        {
            //Notering Package System.IdentityModel.Tokens.Jwt; has chosed to call it claims, however in the rest of the program we user roles.
            //Also note, the tricky convention that inside the token we need the keyword "role", but when we decorate api endpoints in our controlelrs we must use "Roles"

            IList<Claim> Claims = new List<Claim>();
            foreach (string Role in Roles)
            {
                Claim claim = new Claim("role", Role);
                Claims.Add(claim);
            }

            var key = Encoding.ASCII.GetBytes("SuperKeyToPlaceInKeyVaultOrSomeGoodPlace");
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: "IAMApp",
                audience: "IAMApp-audience",
                claims: Claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: new SigningCredentials(
                    key: new SymmetricSecurityKey(key),
                    algorithm: SecurityAlgorithms.HmacSha256Signature
                )
            );
            return token;
        }
    }
}
