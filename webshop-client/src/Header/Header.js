import './Header.css';
import { ShoppingCart } from './ShoppingCart/ShoppingCart';
import React, { Component } from 'react';

export class Header extends Component {
   render() {
      const cartService = this.props.shoppingCartService;
      return <div className="header">
         <h1>{this.props.name}</h1>
         <ShoppingCart shoppingCartService={cartService} />
      </div>
   }
}