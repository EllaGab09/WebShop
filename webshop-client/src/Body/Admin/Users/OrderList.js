import React, { Component } from 'react';

export class OrderList extends Component {
   loaded = false;
   
   constructor(props) {
      super(props);
      this.state = {orders:[]};
      this.updateOrders = this.updateOrders.bind(this);
   }

   componentDidMount() {
      const orderService = this.props.services.orderService;
      const customerId = this.props.customerId;
      orderService.getAllOrdersFromCustomer(customerId, this.updateOrders);
   }
   
   render() {
      const orderService = this.props.services.orderService;
      if (!this.loaded) return <p>Fetching customer orders...</p>
      let n = 0;
      const orderItems = this.state.orders.map(order => <li key = {"ASD"+n}>
         Number of products: {this.getOrderCount(order)}
         <button className="btn btn-warning" onClick={()=>orderService.deleteOrder(order.id, this.updateOrders)}>Delete</button>
      </li>);
      return <ul>
         {orderItems}
      </ul>
   }

   getOrderCount(order) {
      let count = 0;
      for(let n = 0; n < order.products.length; n++) {
         count += order.products[n].amount;
      }
      return count;
   }

   updateOrders(orders) {
      console.log(orders);
      if (orders == null || orders == undefined) return;
      this.loaded = true;
      this.setState({orders:orders});
   }
}