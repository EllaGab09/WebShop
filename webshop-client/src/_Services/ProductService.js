
export class ProductService {
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
      const requestUrl = this.apiUrl + this.endpoints.getProductDetails;
      const requestBody = `{ "id": "${productId}"}`;
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const requestSettings = {
         method: 'POST',
         body: requestBody,
         headers: headers
      };
      let request = new Request(requestUrl, requestSettings);

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

   addProduct(product, onComplete = null) {
      const requestUrl = this.apiUrl + this.endpoints.createProduct;
      const body = JSON.stringify({
         name: product.name, 
         price: product.price, 
         imageUrl: product.imageUrl, 
         detailedProduct: { description: product.description } 
      });
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const requestSettings = {
         method: 'POST',
         body: body,
         headers: headers
      };
      let request = new Request(requestUrl, requestSettings);

      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
         })
         .then(function (response) {
            if (onComplete != null) onComplete();
         });
   }

   editProduct(product) {
      /*
         {
            name,
            price,
            imageUrl,
            detailedProduct: {
               description
            }
         }
      /**/
   }

   removeProduct(product) {
      /*
         {
            name,
            price,
            imageUrl,
            detailedProduct: {
               description
            }
         }
      /**/
   }
}