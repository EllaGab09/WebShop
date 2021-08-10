
export class ProductService {
   products;
   apiUrl;
   endpoints; // GetAllProducts | GetProductDetails + ProductId

   constructor(apiUrl, endpoints) {
      this.apiUrl = apiUrl;
      this.endpoints = endpoints;
   }

   getProducts(onComplete) {
      const requestUrl = this.apiUrl + this.endpoints.getAllProducts;
      let request = new Request(requestUrl);
      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
         })
         .then(function (response) {
            onComplete(response);
         });
   }

   getProduct(productId, onComplete) {
      const idUri = "?id=" + productId;
      const requestUrl = this.apiUrl + this.endpoints.getProductDetails + idUri;
      let request = new Request(requestUrl);

      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
         })
         .then(function (response) {
            onComplete(response);
         });
   }
}