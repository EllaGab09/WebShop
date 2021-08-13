using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Models_DbSet
{
    public class DetailedProduct
    {

        public int Id { get; set; }                 // Change to GUID in the future
        public string Description { get; set; }
        public Product Product { get; set; }        //For Fluent
        public int ProductIdFK { get; set; }        //For Fluent. Link between this, and to Product PK

    }
}
