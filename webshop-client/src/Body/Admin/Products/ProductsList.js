import React, { Component } from 'react';
import { EditBadge } from '../EditBadge';

import { Action } from '../../../Library';

export class ProductsList extends Component {
   loaded = false;

   editClicked = new Action();
   deleteClicked = new Action();

   constructor(props) {
      super(props);
      this.state = { products: [] };
      this.setProducts = this.setProducts.bind(this);
      this.deleteProduct = this.deleteProduct.bind(this);
      this.openProductEdit = this.openProductEdit.bind(this);
      this.loadProducts = this.loadProducts.bind(this);

      this.editClicked.add(this.openProductEdit, this);
      this.deleteClicked.add(this.deleteProduct, this);
   }

   componentDidMount() {
      this.loadProducts();
   }

   render() {
      if (!this.loaded) return <i>Loading products...</i>;
      const productList = this.state.products.map(product => {
         return <EditBadge
            text={product.name}
            key={product.id}
            id={product.id}
            onClickEdit={this.props.onEditProduct}
            onClickDelete={this.deleteClicked}
         />
      });
      return <ul>
         {productList}
      </ul>
   }

   setProducts(products) {
      this.loaded = true;
      this.setState({ products: products });
   }

   openProductEdit(productId) {
      console.log("Opening edit for product with id", productId);
   }

   deleteProduct(productId) {
      const productService = this.props.productService;
      this.loaded = false;
      this.setState({ products: [] });
      productService.removeProduct(productId, this.loadProducts);
   }

   loadProducts() {
      const productService = this.props.productService;
      productService.getProducts(this.setProducts);
   }
}