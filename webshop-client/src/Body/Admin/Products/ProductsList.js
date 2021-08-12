import React, { Component } from 'react';
import {EditBadge} from '../EditBadge';

export class ProductsList extends Component {
   loaded = false;
   constructor(props) {
      super(props);
      this.state={products:[]};
      this.setProducts = this.setProducts.bind(this);
      this.deleteProduct = this.deleteProduct.bind(this);
      this.openProductEdit = this.openProductEdit.bind(this);
   }

   componentDidMount(){
      const productService = this.props.productService;
      productService.getProducts(this.setProducts);
   }

   render() {
      if (!this.loaded) return <i>Loading products...</i>;
      const productList = this.state.products.map(product => {
         return <EditBadge
            text={product.name}
            key={product.id}
            id={product.id}
            onClickEdit={this.openProductEdit}
            onClickDelete={this.deleteProduct}
         />
      });
      return <ul>
         {productList}
      </ul>
   }

   setProducts(products) {
      this.loaded = true;
      this.setState({products:products});
   }

   openProductEdit(productId) {
      console.log("Opening edit for product with id", productId);
   }

   deleteProduct(productId) {
      console.log("Deleting product with id", productId);
   }
}