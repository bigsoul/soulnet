using System.ComponentModel.DataAnnotations;

namespace Soulnet.Api.ViewModels
{
    public class SignInViewModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}