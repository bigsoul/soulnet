using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Soulnet.Api.ViewModels
{
    public class SignUpViewModel
    {
        [Required]
        [StringLength(60, MinimumLength = 2)]
        public string Login { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string Password { get; set; }
    }
}