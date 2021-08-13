using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Models_DbSet;

namespace WebShop.Models
{
    public class DetailedOrder
    {

        public Order Order { get; set; }
        public ICollection<Product> Products { get; set; }


    }
}
