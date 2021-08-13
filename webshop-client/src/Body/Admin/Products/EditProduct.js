import React, { Component } from 'react';
import {Delegate} from '../../../Library';
import {ProductForm} from './ProductForm';

export class EditProduct extends Component {
   onSubmit = new Delegate(this, this.submit);
   loaded = false;
   constructor(props) {
      super(props);
      this.state={product:null}
      this.setProduct = this.setProduct.bind(this);
   }

   componentDidMount() {
      const productService = this.props.productService;
      productService.getProduct(this.props.productId, this.setProduct);

   }
   render() {
      return <div>
      <h3>Edit product</h3>
         {this.body}
      </div>
   }

   get body() {
      if (!this.loaded) return <i>Loading...</i>
      return <ProductForm
      submit={this.onSubmit}
      existingProduct={this.state.product}
   />
   }

   submit(product) {
      const productService = this.props.productService;
      const redirect = this.props.submitRedirect;
      productService.editProduct(product);
      redirect.invoke();
   }

   setProduct(product) {
      this.loaded=true;
      this.setState({product:product});
   }
}