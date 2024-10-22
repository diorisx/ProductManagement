using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProductManagement.Server.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        [EmailAddress(ErrorMessage = "please, insert a valid email")]
        public string Email { get; set; }
        public string Role { get; set; } = "user";
    }
}
