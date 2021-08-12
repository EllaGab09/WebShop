import React, { Component } from 'react';
import { UserManagement } from './Users';
import { ProductsList } from './Products';

export class AdminPage extends Component {
   constructor(props) {
      super(props);
      this.state = {accessDenied: false}
      this.accessDenied = this.accessDenied.bind(this);
   }

   render() {
      if (this.state.accessDenied) return <p>
         Access denied! Login with an admin account to access.
      </p>

      return <div>
         <h2>Users</h2>
         <UserManagement 
            userService = {this.props.userService} 
            accessDenied={this.accessDenied}
         />
         <h2>Products</h2>
         <ProductsList
            productService = {this.props.productService}
         />
      </div>
   }

   accessDenied() {
      this.setState({accessDenied: true});
   }
}