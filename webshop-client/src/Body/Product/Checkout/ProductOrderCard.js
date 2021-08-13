import React, { Component } from 'react';

export class ProductOrderCard extends Component {
   loading = true;
   constructor(props) {
      super(props);
      this.state={productName: '', amount: 0, productCost: 0};
      this.loadProduct = this.loadProduct.bind(this);
      this.addOne = this.addOne.bind(this);
      this.removeOne = this.removeOne.bind(this);
   }
   
   componentDidMount() {
      const productService = this.props.productService;
      const productId = this.props.productId;
      productService.getProduct(productId, this.loadProduct);
      this.setState({amount: this.props.amount})
   }

   render() {
      if (this.loading) return <p>Product Order Card</p>
      const name = this.state.productName;
      const amount = this.state.amount;
      const totalCost = this.state.productCost * this.state.amount;
      const costPer = this.state.productCost;
      const addButton = <button className="btn btn-primary" onClick={this.addOne}>Add</button>
      const removeButton = <button className="btn btn-primary" onClick={this.removeOne}>Remove</button>
      return <div>
         {name}: {amount} * {costPer} = {totalCost} {addButton} {removeButton}
      </div>
   }

   loadProduct(product) {
      if (product === null) return;
      this.loading = false;
      this.setState({
         productName: product.name,
         productCost: product.price
      });
   }

   addOne() {
      const shoppingCart = this.props.shoppingCartService;
      let amount = this.state.amount + 1;
      shoppingCart.addItem(this.props.productId, ()=>{});
      this.setState({amount: amount});
   }

   removeOne() {
      const shoppingCart = this.props.shoppingCartService;
      const productId = this.props.productId;
      let amount = this.state.amount - 1;
      shoppingCart.removeItem(productId, ()=>{});
      if (amount < 0) {
         return;
      }
      this.setState({amount: amount});
   }
}