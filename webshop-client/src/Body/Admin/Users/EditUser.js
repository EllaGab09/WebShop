import React, { Component } from 'react';
import {OrderList} from './OrderList';

export class EditUser extends Component {
   render() {
      console.log("Edit user id:", this.props.userId);
      return <div>
         <h3>Editing User {this.props.userId}</h3>
         <h4>Orders</h4>
         <OrderList 
            services={this.props.services}
            customerId={this.props.userId}
         />
      </div>
   }
}