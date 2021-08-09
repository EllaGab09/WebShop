using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Models
{
    public class Review
    {
        public int ID { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
        public Product Product { get; set; }
        public int ProductIdFK { get; set; } //FK. I think this need to be here in order to use Fluent

    }
}
