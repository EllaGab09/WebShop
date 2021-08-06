using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebShopDB.Models
{
    public class Product_old
    {
        //[Key]
        public int ID { get; set; }
        //[Required]
        public string Name { get; set; }
        //[Required]
        //public string Type { get; set; } //virtual, physical 
        //[Required]
        public string Description { get; set; }
        //[Required]
        //public float UnitPrice { get; set; }
        //[Required]
        //public int Stock { get; set; }
        //[Required]
        //public int Ranking { get; set; }
        //public float Discount { get; set; }
        //[Required]
        //public string ImageURL { get; set; }
    
        //public int CategoryID { get; set; }
        public Category Category { get; set; }
        public int CategoryIdFK { get; set; } //FK. I think this need to be here in order to use Fluent
        public ICollection<Review> Reviews { get; set; }
        //public int OrderID { get; set; }
        //public Order Order { get; set; }


                                                    //Returns: IEnumerable<Product>
                                                    //Where Product should contain:

                                                    //Id(number)
                                                    //Name(string)
                                                    //Price(number)
                                                    //ImageUrl(string)
                                                    //And product may contain:

                                                    //Rating(number)
                                                    //InStock(boolean)
    }


}
