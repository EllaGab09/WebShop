export class MockOrderService {
   customers = [];
   nextId = 0;
   makeOrder(customer, products, onComplete = null) {
      console.log("Making order:",customer,products);
      const order = {
         id: this.nextId++,
         customer: customer,
         products: products
      }
      for(let n = 0; n < this.customers.length; n++) {
         if (this.customers[n].id === customer) {
            this.customers[n].orders.push(order);
            if (onComplete != null) onComplete(order);
            return;
         }
      }

      const newCustomer = {
         id: customer,
         orders: [order]
      };
      this.customers.push(newCustomer);
      console.log(this.customers);
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
      for(let n = 0; n < this.customers.length; n++) {
         let customer = this.customers[n];
         for(let i = 0; i < customer.orders.length; i++) {
            if (customer.orders[i].id === orderId) {
               customer.orders.splice(i, 1);
               onComplete(customer.orders);
               return;
            }
         }
      }
   }

   getAllOrders(onComplete) {
      console.log("Getting all orders");
   }

   getAllOrdersFromCustomer(customerId, onComplete) {
      // console.log("Getting all orders from", customerId);
      console.log(customerId);
      console.log(this);
      let customerOrders = [];
      for(let n = 0; n < this.customers.length; n++) {
         if (this.customers[n].id === customerId) {
            customerOrders = this.customers[n];
            break;
         }
      }
      onComplete(customerOrders.orders);
   }


}