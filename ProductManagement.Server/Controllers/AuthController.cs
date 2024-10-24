using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProductManagement.Server;
using ProductManagement.Server.Models;

namespace ProductManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }


        [Authorize] // Protecting Endpoint
        [HttpGet("GetUser")]
        public ActionResult<User> GetUser()
        {
            return Ok("This is just a simple GET");
        }

        // Create Account
   


        [HttpPost("Signup")]
        public async Task<ActionResult<User>> Signup([FromBody] SignupRequest signupRequest)
        {
            var existsUser = await _context.Users.FirstOrDefaultAsync( u => u.Email == signupRequest.Email || u.Username == signupRequest.Username);
            if (existsUser != null) {
                return Conflict(new {message = "email or username already exists"});
            }
            // Hash password
            signupRequest.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(signupRequest.Password);
            
            _context.Users.Add(new User{ Username = signupRequest.Username, Email = signupRequest.Email, Password = signupRequest.Password });
            await _context.SaveChangesAsync();

            return Ok(new {message = "Success. user registered"});
        }


        // POST: api/Users/LoginUser
        [HttpPost("Authenticate")]
        public async Task<ActionResult<User>> Authenticate([FromBody] LoginRequestDto loginRequest)
        {
            var dataUser = await _context.Users.FirstOrDefaultAsync(p => loginRequest.Email == p.Email);

            if (dataUser == null)
            {
                return NotFound("User Not Found");
            }
            if (!BCrypt.Net.BCrypt.EnhancedVerify(loginRequest.Password, dataUser.Password))
            {
                return NotFound("Incorrect Password");
            }
            var token = GenerateJWT(dataUser);

            return Ok(new { 
                token = token,
                user = new {dataUser.Username, dataUser.Email, dataUser.Role}
            });
        }

        [Authorize]
        [HttpGet("RefreshToken")]
        public async Task<ActionResult> RefreshToken() {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim != null)
            {
                var userData = await _context.Users.FirstOrDefaultAsync(p => p.Id == int.Parse(userIdClaim.Value));
                var token = GenerateJWT(userData);
                return Ok(new {refreshToken = token});

            }
            return Unauthorized();

        }


        // Generate Token 
        private string GenerateJWT(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new []{ 
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("Id", user.Id.ToString()),
                new Claim("Role", user.Role)
            };

            var SecToken = new JwtSecurityToken(
                issuer:_config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims:claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(SecToken);
        }
    }
}
