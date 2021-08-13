using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Models_DbSet
{
    public class Product
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string ImageUrl { get; set; }

        public DetailedProduct DetailedProduct { get; set; }        //For Fluent
        public ICollection<ProductOrder> ProductOrder { get; set; }
    }

}
