export class OrderService {
   apiUrl;
   apiEndpoints;
   constructor(apiUrl, apiEndpoints) {
      this.apiUrl = apiUrl;
      this.apiEndpoints = apiEndpoints;
   }

   makeOrder(customerId, products, onComplete = null) {
      const url = this.apiUrl + this.apiEndpoints.addOrder;
      const headers = this.postHeaders;
      const id = customerId;
      const flatProducts = this.getFlatProducts(products);
      const body = JSON.stringify({ order: { customer: id }, products: flatProducts });
      const settings = this.makePostSettings(headers, body);
      const request = new Request(url, settings);

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

   getFlatProducts(products) {
      let result = [];
      for(let n = 0; n < products.length; n++) {
         const product = products[n];
         for(let i = 0; i < product.amount; i++) {
            result.push({
               id: product.id,
               name: product.name,
               price: product.price
            });
         }
      }
      return result;
   }

   getOrder(orderId) {
      // Send order id in body {id} 

   }


   updateOrder(orderId, products) {
      /*
      {
         order: {
            id: orderId
         }
         products: [{id}]
      }
      /**/
   }

   deleteOrder(orderId, onComplete) {
      // Data to send: customer(email, string), [products {id, count}]
      const url = this.apiUrl + this.apiEndpoints.removeOrder;
      const headers = this.postHeaders;
      const body = JSON.stringify({ id: orderId } );
      const settings = this.makePostSettings(headers, body);
      const request = new Request(url, settings);
    
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

   getAllOrders(onComplete) {
      const url = this.apiUrl + this.apiEndpoints.getAllOrders;
      const headers = this.postHeaders;
      const body = {};
      const settings = this.makePostSettings(headers, body);
      const request = new Request(url);
    
      fetch(request)
         .then(function (response) {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
         })
         .then(function (response) {
            if (onComplete != null) onComplete(response);
         });
   }

   getAllOrdersFromCustomer(customerId, onComplete) {
      // GetAllOrders() => filter by customer
      this.getAllOrders((response) => {
         let orders = [];
         for(let n = 0; n < response.length; n++) {
            if(response[n].customer === customerId) orders.push(response[n]);
         }
         onComplete(orders);
      });
   }

   get postHeaders() {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return headers;
   }

   makePostSettings(headers, body) {
      return {
      method: 'POST',
      headers: headers,
      body: body
      };
   }
}