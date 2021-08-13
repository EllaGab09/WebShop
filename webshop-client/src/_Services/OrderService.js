export class OrderService {

   makeOrder(customer, products) {
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

   deleteOrder(orderId) {
      /*
      {
         order: {id}
      }
      /**/
   }

   getAllOrders() {
      
   }

   getAllOrdersFromCustomer(customer) {
      // GetAllOrders() => filter by customer
   }


}