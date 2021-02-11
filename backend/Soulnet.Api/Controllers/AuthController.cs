using Microsoft.AspNetCore.Mvc;
using Soulnet.Api.ViewModels;
using Soulnet.Api.Services;
using Soulnet.Data.Repositories;
using System;
using Soulnet.Model.Entity;

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

        [HttpPost("login")]
        public AuthData Post([FromBody]LoginViewModel model)
        {
            //if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = userRepository.GetSingle(u => u.Email == model.Email);

            if (user == null) {
                return authService.GetAuthData("user == null");
                //return BadRequest(new { email = "no user with this email" });
            }

            var passwordValid = authService.VerifyPassword(model.Password, user.Password);

            if (!passwordValid) {
                return authService.GetAuthData("!passwordValid");
                //return BadRequest(new { password = "invalid password" });
            }

            return authService.GetAuthData(user.Username);
        }

        [HttpPost("register")]
        public AuthData Post([FromBody]RegisterViewModel model)
        {
            //if (!ModelState.IsValid) return BadRequest(ModelState);

            var emailUniq = userRepository.IsEmailUniq(model.Email);

            //if (!emailUniq) return BadRequest(new { email = "user with this email already exists" });
            if (!emailUniq) return new AuthData() {
                Id = "!emailUniq",
                Token = "Token",
                TokenExpirationTime = 0
            };
            
            var usernameUniq = userRepository.IsUsernameUniq(model.Username);
            
            //if (!usernameUniq) return BadRequest(new { username = "user with this email already exists" });
            if (!usernameUniq) return new AuthData() {
                Id = "!usernameUniq",
                Token = "Token",
                TokenExpirationTime = 0
            };

            var id = Guid.NewGuid().ToString();
            
            var user = new User
            {
                Id = id,
                Username = model.Username,
                Email = model.Email,
                Password = authService.HashPassword(model.Password)
            };

            userRepository.Add(user);
            userRepository.Commit();

            return authService.GetAuthData(model.Email);
        }
    }
}