import React, { Component } from 'react';
import './Header.css';
import {states} from '../States';
import { ShoppingCart } from './ShoppingCart/ShoppingCart';



export class Header extends Component {
   render() {
      const cartService = this.props.shoppingCartService;
      const stateMachine = this.props.stateMachine;
      return <div className="header">
         <h1>{this.props.name}</h1>
         <div className = "navbar">
            <button onClick = {()=>stateMachine.setState(states.shop)}>Products</button>
            <button onClick = {()=>stateMachine.setState(states.register)}>Register</button>
            <button onClick = {()=>stateMachine.setState(states.login)}>Login</button>
            <button onClick = {()=>stateMachine.setState(states.checkout)}>Checkout</button>
            <button onClick = {()=>stateMachine.setState(states.admin)}>Admin</button>
            <button onClick = {()=>stateMachine.setState(states.about)}>About</button>
            <ShoppingCart shoppingCartService={cartService} />
         </div>
      </div>
   }
}