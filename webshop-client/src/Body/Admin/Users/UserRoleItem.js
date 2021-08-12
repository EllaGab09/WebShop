import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';

export class UserRoleItem extends Component {
   constructor(props) {
      super(props);
      this.printNumber = this.printNumber.bind(this);
   }

   render() {
      return <Dropdown.Item href={this.props.href}
         onClick={this.printNumber}>{this.props.roleName}: {this.getHasRoleText()}</Dropdown.Item>

   }

   printNumber() {
      console.log(this.props.number);
   }

   getHasRoleText() {
      return this.props.userHasRole ? "YES" : "NO";
   }
}