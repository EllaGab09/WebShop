import React, { Component } from 'react';
import { ProductOrderCard } from './ProductOrderCard';

export class CheckoutPage extends Component {
   onItemsUpdatedId = -1;
   constructor(props) {
      super(props);
      this.state = { items: [] };
      this.setShoppingItems = this.setShoppingItems.bind(this);
      this.makeOrder = this.makeOrder.bind(this);
   }

   componentDidMount() {
      const shoppingCart = this.props.shoppingCartService;
      this.loadShoppingCartItems(shoppingCart);
      this.onItemsUpdatedId = shoppingCart.onItemsUpdated.add(this.loadShoppingCartItems, this);
   }
   componentWillUnmount() {
      const shoppingCart = this.props.shoppingCartService;
      shoppingCart.onItemsUpdated.remove(this.onItemsUpdatedId);
   }

   render() {
      const itemsInCart = this.state.items;
      if (itemsInCart.length === 0) {
         return this.renderEmptyCart();
      }

      const body = itemsInCart.length === 0 ? this.renderEmptyCart() : this.renderBody();

      return <div>
         <h3>Checkout</h3>
         {body}
      </div>

   }

   renderBody() {
      return <div>
         {this.renderItemList()}
         {this.renderTotals()}
         {this.renderCheckoutButton()}
      </div>
   }

   renderItemList() {
      const itemsInCart = this.state.items;
      const itemCards = itemsInCart.map(item => <li key={item.id}><ProductOrderCard
         productId={item.id}
         name={item.name}
         price={item.price}
         amount={item.amount}
         productService={this.props.productService}
         shoppingCartService={this.props.shoppingCartService}
      /></li>);

      return <ul>
         {itemCards}
      </ul>
   }

   renderTotals() {
      const itemsInCart = this.state.items;
      let totalCost = 0;
      for(let n = 0; n < itemsInCart.length; n++) {
         console.log(itemsInCart[n].price);
         totalCost += itemsInCart[n].price;
      }
      return <div>
         <h4>Total cost: {totalCost}</h4>
      </div>
   }

   renderCheckoutButton() {
      return <button className="btn btn-primary" onClick={this.makeOrder}>Make Order</button>
   }

   renderEmptyCart() {
      return <p>Your shopping cart is empty! Go to the products page to add items.</p>
   }

   loadShoppingCartItems(shoppingCart) {
      shoppingCart.getAllItems(this.setShoppingItems);
   }

   setShoppingItems(items) {
      this.setState({ items: items });
   }

   makeOrder() {
      const userService = this.props.userService;
      const orderService = this.props.orderService;
      const shoppingCartService = this.props.shoppingCartService
      const customerId = userService.currentUser;
      const products = this.state.items;

      orderService.makeOrder(customerId, products);
      this.printReceipt();
      shoppingCartService.clearItems();
   }

   printReceipt() {
      let items = this.state.items;
      let receipt = '';
      let total = 0;
      items.forEach(item => {
         receipt += item.name + ' - ' + item.price + ' x ' + item.amount + '\n'
         total += item.price * item.amount;
      });
      receipt +='Total: ' +  total;
      alert(receipt);
   }
}