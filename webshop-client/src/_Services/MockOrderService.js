export class MockOrderService {
   customers = [];

   makeOrder(customer, products, onComplete = null) {
      console.log("Making order:",customer,products);
      const order = {
         customer: customer,
         products: products
      }
      for(let n = 0; n < this.customers.length; n++) {
         if (this.customers[n].id === customer) {
            this.customers[n].push(order);
            if (onComplete != null) onComplete(order);
            return;
         }
      }

      const newCustomer = {
         id: customer,
         orders: [order]
      };
      this.customers.push(newCustomer);
      if (onComplete != null) onComplete(order);

      // Data to send: customer(email, string), [products {id, count}]
      /* 
      {
         order: {
            customer: customer,
         }
         products: [{id}]
      }
      /**/
   }

   getOrder(orderId, onComplete) {
      console.log("Retreiving order:", orderId);
      // Send order id in body {id} 

   }


   updateOrder(orderId, products, onComplete) {
      console.log("Updating order:",orderId, products);
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
      console.log("Deleting order:",orderId);
      /*
      {
         order: {id}
      }
      /**/
   }

   getAllOrders(onComplete) {
      console.log("Getting all orders");
   }

   getAllOrdersFromCustomer(customer, onComplete) {
      console.log("Getting all orders from",customer);
      // GetAllOrders() => filter by customer
   }


}