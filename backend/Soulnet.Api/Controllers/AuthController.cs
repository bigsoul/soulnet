using Microsoft.AspNetCore.Mvc;
using Soulnet.Api.ViewModels;
using Soulnet.Api.Services;

namespace Soulnet.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public AuthData Post([FromBody]LoginViewModel model)
        {
            var auth = new AuthService("0e0d33b3-0a6e-4d64-ae34-a45d767ec480", 120);

            return auth.GetAuthData(model.Email);
        }

        [HttpPost("register")]
        public AuthData Post([FromBody]RegisterViewModel model)
        {
            return new AuthData() {
                Id = model.Password,
                Token = "Token",
                TokenExpirationTime = 0
            };
        }
    }
}