import './Header.css';
import { ShoppingCart } from './ShoppingCart/ShoppingCart';
import React, { Component } from 'react';

export class Header extends Component {
   render() {
      const cartService = this.props.shoppingCartService;
      return <div className="header">
         <h1>{this.props.name}</h1>
         <div className = "navbar">
            <button onClick = {this.props.onClickProducts}>Products</button>
            <button onClick = {this.props.onClickCreateUser}>Register</button>
            <button onClick = {this.props.onClickLogin}>Login</button>
            <ShoppingCart shoppingCartService={cartService} />
         </div>
      </div>
   }
}