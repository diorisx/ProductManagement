﻿namespace ProductManagement.Server.Models
{
    public class EditUser
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string? Password { get; set; }
    }
}
