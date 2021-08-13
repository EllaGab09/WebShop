using System.Collections.Generic;
using WebShop.Models;
using WebShop.Models_DbSet;

namespace WebShop.Infrastructure
{
    public interface IDataAccess
    {
        void CreateOrder(DetailedOrder detailedOrder);
        void CreateProduct(Product product);
        void DeleteOrder(Order order);
        void DeleteProduct(Product product);
        List<Order> ReadAllOrders();
        List<Product> ReadAllProducts();
        DetailedOrder ReadOrder(Order order);
        DetailedProduct ReadProduct(Product product);
        void UpdateOrder(DetailedOrder detailedOrder);
        void UpdateProduct(Product product);
    }
}