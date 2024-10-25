using Microsoft.Build.Framework;
using System.ComponentModel.DataAnnotations;

namespace ProductManagement.Server.Models
{
    public class AddProduct
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }

    }
}
