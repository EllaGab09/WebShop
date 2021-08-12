import React, { Component } from 'react';
import { UserManagement } from './Users';
import { ProductList } from './Products';

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
         <UserManagement 
         userService = {this.props.userService} 
         accessDenied={this.accessDenied}/>
      </div>
   }

   accessDenied() {
      this.setState({accessDenied: true});
   }
}