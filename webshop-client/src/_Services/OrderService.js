export class OrderService {

   MakeOrder(customer, products) {
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

   GetOrder(orderId) {
      // Send order id in body {id} 

   }


   UpdateOrder(orderId, products) {
      /*
      {
         order: {
            id: orderId
         }
         products: [{id}]
      }
      /**/
   }

   DeleteOrder(orderId) {
      /*
      {
         order: {id}
      }
      /**/
   }

   GetAllOrders() {
      
   }

   GetAllOrdersFromCustomer(customer) {
      // GetAllOrders() => filter by customer
   }


}