using System.ComponentModel.DataAnnotations;

namespace ProductManagement.Server.Models
{
    public class CreateUser
    {
        public string Username { get; set; }    
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
    }
}
