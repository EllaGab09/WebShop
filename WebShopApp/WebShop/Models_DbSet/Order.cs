using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Models_DbSet
{
    public class Order
    {
        public int Id { get; set; }
        public string Customer { get; set; }
        public int TotalPrice { get; set; }
        public ICollection<ProductOrder> ProductOrder { get; set; }
    }
}
