using System.Collections.Generic;
using WebShop.Models;

namespace WebShop.Infrastructure
{
    public interface IDataAccess
    {
        List<Product> GetAllProducts();
        DetailedProduct GetProductDetails(int id);
    }
}