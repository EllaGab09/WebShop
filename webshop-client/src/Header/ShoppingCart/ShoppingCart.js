import './ShoppingCart.css';
import React, { Component } from 'react';

export class ShoppingCart extends Component {
   constructor(props) {
      super(props);
      this.state = {itemsInCart: 0}
   }

   render() {
      return <span className="shoppingCart">
         <i className="fas fa-shopping-cart"></i>
         {this.state.itemsInCart}
      </span>
   }

   componentDidMount() {
      const cartService = this.props.shoppingCartService;
      const delegate = this.updateItemsInCart;
      cartService.onItemsUpdated.add(delegate, this);
   }

   updateItemsInCart(cartService) {
      const itemCount = cartService.numberOfItems;
      this.setState({itemsInCart: itemCount});
   }
}