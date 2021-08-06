using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebShopDB.Models
{
    public class Product
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string ImageUrl { get; set; }
        public Category Category { get; set; }
        public int CategoryIdFK { get; set; } //FK. This will hit Category PK.
        public ICollection<Review> Reviews { get; set; }

    }

}
