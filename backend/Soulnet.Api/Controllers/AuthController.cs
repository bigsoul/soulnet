using Microsoft.AspNetCore.Mvc;
using Soulnet.Api.ViewModels;
using Soulnet.Api.Services;
using Soulnet.Data.Repositories;
using System;
using Soulnet.Model.Entity;
using Microsoft.AspNetCore.Cors;

namespace Soulnet.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private AuthService authService;
        private UserRepository userRepository;

        public AuthController(AuthService authService, UserRepository userRepository)
        {
            this.authService = authService;
            this.userRepository = userRepository;
        }

        [HttpPost("signin")]
        public ActionResult<AuthData> Post([FromBody]SignInViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = userRepository.ReadFirstOrDefault(new UserFilter { Username = model.Username });
            
            if (user.Id == Guid.Empty) {
                return BadRequest(new { username = "no user with this login" });
            }

            var passwordValid = authService.VerifyPassword(model.Password, user.Password);

            if (!passwordValid) {
                return BadRequest(new { password = "invalid password" });
            }

            return Ok(authService.GetAuthData(user.Username));
        }

        [HttpPost("signup")]
        public ActionResult<AuthData> Post([FromBody]SignUpViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var emailUniq = userRepository.IsEmailUniq(model.Email);

            if (!emailUniq) return BadRequest(new { email = "user with this email already exists" });
            
            var usernameUniq = userRepository.IsUsernameUniq(model.Username);
            
            if (!usernameUniq) return BadRequest(new { username = "user with this email already exists" });

            var id = Guid.NewGuid().ToString();
            
            var user = new User
            {
                Id = new Guid(id),
                Username = model.Username,
                Email = model.Email,
                Password = authService.HashPassword(model.Password)
            };

            userRepository.Create(user);

            return Ok(authService.GetAuthData(model.Username));
        }
    }
}