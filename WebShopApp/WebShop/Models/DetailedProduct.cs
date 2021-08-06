using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShopDB.Models;

namespace WebShop.Models
{
    public class DetailedProduct
    {

        public int Id { get; set; }                 // Change to GUID in the future
        public string Name { get; set; }
        public int Price { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public Product Product { get; set; }        //For Fluent
        public int ProductIdFK { get; set; }        //For Fluent. Link between this, and to Product PK

    }
}
