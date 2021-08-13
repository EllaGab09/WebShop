export class MockOrderService {
   customers = [];

   makeOrder(customer, products, onComplete) {
      console.log("Making order:",customer,products);
      for(let n = 0; n < products.length; n++) {
         
      }
      const order = {
         customer: customer,
         products: products
      }
      
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