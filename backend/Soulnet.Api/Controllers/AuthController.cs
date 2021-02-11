using Microsoft.AspNetCore.Mvc;
using Soulnet.Api.ViewModels;
using Soulnet.Api.Services;

namespace Soulnet.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private AuthService authService;

        public AuthController(AuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("login")]
        public AuthData Post([FromBody]LoginViewModel model)
        {
            return authService.GetAuthData(model.Email);
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