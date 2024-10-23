using System.ComponentModel.DataAnnotations;

namespace ProductManagement.Server.Models
{
    public class LoginRequestDto
    {
        [Required(ErrorMessage = "Insert an email")]
        [EmailAddress(ErrorMessage = "Please, insert a valid email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Please, insert your password")]
        public string Password { get; set; }
    }
}
