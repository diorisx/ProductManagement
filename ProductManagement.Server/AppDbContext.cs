using Microsoft.EntityFrameworkCore;
using ProductManagement.Server.Models;

namespace ProductManagement.Server
{
    public class AppDbContext: DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options): base(options) {
           
        }

        public DbSet<User> Users {  get; set; }
        public DbSet<Product> Products { get; set; } 


    }

}
