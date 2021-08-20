import {Action} from '../Library';

export class ProductService {
   apiUrl;
   endpoints; // GetAllProducts | GetProductDetails + ProductId
   onProductsUpdated;
   baseProducts = [];

   constructor(apiUrl, endpoints) {
      this.apiUrl = apiUrl;
      this.endpoints = endpoints;
      this.onProductsUpdated = new Action();
      this.onProductsUpdated.add((products)=>console.log(products), this);
      this.onProductsUpdated.add((products)=>this.baseProducts = products, this);
   }

   getProducts(onComplete) {
      const requestUrl = this.apiUrl + this.endpoints.getAllProducts;
      let request = new Request(requestUrl);
      const onProductsUpdated = this.onProductsUpdated;

      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
         })
         .then(function (response) {
            onProductsUpdated.invoke(response);
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
      let baseProduct = this.getBaseProductWithId(productId);
      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
         })
         .then(function (response) {
            if (baseProduct !== null) {
               response.name = baseProduct.name;
               response.price = baseProduct.price;
               response.imageUrl = baseProduct.imageUrl;
            }
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

   editProduct(product, onComplete = null) {
      const requestUrl = this.apiUrl + this.endpoints.editProduct;
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

   removeProduct(productId, onComplete = null) {
      const requestUrl = this.apiUrl + this.endpoints.deleteProduct;
      const body = JSON.stringify({
         id: productId
      });
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const requestSettings = {
         method: 'POST',
         body: body,
         headers: headers
      };
      let request = new Request(requestUrl, requestSettings);
      const onProductsUpdated = this.onProductsUpdated;

      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();
         })
         .then(function (response) {
            if (onComplete != null) onComplete();
         });
   }

   getBaseProductWithId(productId) {
      for(let n = 0; n < this.baseProducts.length; n++) {
         if (this.baseProducts[n].id === productId) return this.baseProducts[n];
      }
      return null;
   }
}