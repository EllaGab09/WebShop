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
      orderService.GetAllOrdersFromCustomer(customerId, this.updateOrders);
   }
   
   render() {
      if (!this.loaded) return <p>Fetching customer orders...</p>
      return <p>Order List</p>
   }

   updateOrders(orders) {
      this.loaded = true;
      this.setState({orders:orders});
   }
}