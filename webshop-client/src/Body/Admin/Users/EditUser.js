import React, { Component } from 'react';
import {OrderList} from './OrderList';

export class EditUser extends Component {
   render() {
      return <div>
         <p>Editing User {this.props.userId}</p>
         <OrderList 
            services={this.props.services}
            userId={this.props.userId}
         />
      </div>
   }
}