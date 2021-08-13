import React, { Component } from 'react';

export class OrderList extends Component {
   loaded = false;
   
   constructor(props) {
      super(props);
      this.state = {orders:[]};
      this.fetchOrders = this.fetchOrders.bind(this);
      this.updateOrders = this.updateOrders.bind(this);
   }

   componentDidMount() {
      this.fetchOrders();
   }
   
   render() {
      const orderService = this.props.services.orderService;
      if (!this.loaded) return <p>Fetching customer orders...</p>
      let n = 0;
      const orderItems = this.state.orders.map(order => <li key = {"ASD"+n++}>
         ID: {order.id}
         <button className="btn btn-warning m-3" onClick={()=>
            orderService.deleteOrder(order.id, this.fetchOrders)}>Delete</button>
      </li>);
      return <ul>
         {orderItems}
      </ul>
   }

   getOrderCount(order) {
      let count = 0;
      if (order.productOrder == null) return count;
      for(let n = 0; n < order.productOrder.length; n++) {
         count++;
      }
      return count;
   }

   fetchOrders() {
      console.log("Fetching orders...:!!")
      this.loaded = false;
      const orderService = this.props.services.orderService;
      const customerId = this.props.customerId;
      orderService.getAllOrdersFromCustomer(customerId, this.updateOrders);
   }

   updateOrders(orders) {
      if (orders == null || orders == undefined) return;
      this.loaded = true;
      this.setState({orders:orders});
   }
}