using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Models;
using WebShopDB.Models;

namespace WebShop.Infrastructure
{
    public class DataAccess : IDataAccess
    {
        public List<Product> GetAllProducts()
        {
            List<Product> MoqProductList = new List<Product>
            {
                new Product{Id = 1, Name="Skateboard", Price=499, ImageUrl="UrlToThumb"},
                new Product{Id = 2, Name="Keyboard", Price=300, ImageUrl="UrlToThumb"},
                new Product{Id = 3, Name="Mouse", Price=200, ImageUrl="UrlToThumb"},
                new Product{Id = 4, Name="Monitor", Price=5000, ImageUrl="UrlToThumb"},
            };
            return MoqProductList;
        }

        public DetailedProduct GetProductDetails(int id)
        {
            List<DetailedProduct> MoqProductList = new List<DetailedProduct>
            {
                new DetailedProduct{Id = 0, Name="Skateboard", Price=499, ImageUrl="UrlToFullSizeImage", Description="Skateboard with flames on it"},
                new DetailedProduct{Id = 1, Name="Keyboard", Price=300, ImageUrl="UrlToFullSizeImage", Description="Keyboard for 1337 games"},
                new DetailedProduct{Id = 2, Name="Mouse", Price=200, ImageUrl="UrlToFullSizeImage", Description="White std mouse"},
                new DetailedProduct{Id = 3, Name="Monitor", Price=5000, ImageUrl="UrlToFullSizeImage", Description="26'' 4K Monitor Siemens"},
            };
            return MoqProductList.ElementAt(id);
        }

    }
}
