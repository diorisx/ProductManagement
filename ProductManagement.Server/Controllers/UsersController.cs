using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagement.Server;
using ProductManagement.Server.Models;

namespace ProductManagement.Server.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        // get all users, only admin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetUsers>>> GetUsers(
             [FromQuery] string? username = null,
             [FromQuery] int pageNumber = 1,
             [FromQuery] int pageSize = 10)
        {
            IQueryable<User> query = _context.Users;
           
            if (!string.IsNullOrWhiteSpace(username))
            {
                string searchFormat = username.ToLower();
                query = query.Where(user => user.Username.ToLower().Contains(searchFormat));
            }

            int totalItems = await query.CountAsync();
            var users = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            var response = new
            {
                TotalItems = totalItems,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize),
                Users = users.Select(user => new GetUsers
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    Role = user.Role,
                }).ToList()
            };

            return Ok(response);
        }



        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            var getUser = new GetUser { 
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role
            };

            return Ok(getUser);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id,[FromBody] EditUser editUser)
        {

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Username = editUser.Username;
            user.Email = editUser.Email;
            user.Role = editUser.Role;
            
            if (!string.IsNullOrWhiteSpace(editUser.Password))
            {
                user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(editUser.Password);
            }

           
            /*if (id != user.Id)
            {
                return BadRequest();
            }*/

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException != null && ex.InnerException.Message.Contains("duplicate key"))
                {
                    return Conflict("username or email already exists");
                }
                else
                {
                    throw; // Lanza la excepción si no es un problema de unicidad
                }
            }

            return NoContent();
        }


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromBody] CreateUser createUser)
        {
            var existsUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == createUser.Email || u.Username == createUser.Username);
            if (existsUser != null)
            {
                return Conflict("email or username already exists" );
            }
            // Hash password
            createUser.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(createUser.Password);

            _context.Users.Add(new User { Username = createUser.Username, Email = createUser.Email, Password = createUser.Password });
            await _context.SaveChangesAsync();

            return Ok(new { message = "Success. user registered" });
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
