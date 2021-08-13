import React, { Component } from 'react';
import {ProductForm} from './ProductForm';
import {Action} from '../../../Library';

export class AddProduct extends Component {
   onSubmit = new Action();
   constructor(props) {
      super(props);
      this.onSubmit.add(this.submit, this);
   }

   render() {
      return <div>
         <h3>Add product</h3>
         <ProductForm
            submit={this.onSubmit}
         />
         </div>
   }

   submit(product) {
      const productService = this.props.productService;
      const redirect = this.props.submitRedirect;
      productService.addProduct(product);
      redirect.invoke();
   }
}