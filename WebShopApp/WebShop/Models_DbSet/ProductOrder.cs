using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Models_DbSet
{
    public class ProductOrder
    {
        public int Id { get; set; }

        public int ProductFK { get; set; } //FK
        public Product Product { get; set; }

        public int OrderFK { get; set; } //FK
        public Order Order { get; set; }
    }
}
