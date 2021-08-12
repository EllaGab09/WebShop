import React, { Component } from 'react';

export class ProductForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: '',
         price: '',
         imageThumb: '',
         imageUrl: '',
         description: ''
      };

      this.changeName = this.changeName.bind(this);
      this.changePrice = this.changePrice.bind(this);
      this.changeImageThumb = this.changeImageThumb.bind(this);
      this.changeImageUrl = this.changeImageUrl.bind(this);
      this.changeDescription = this.changeDescription.bind(this);
      this.getEnteredProduct = this.getEnteredProduct.bind(this);
   }

   componentDidMount() {
      if (this.props.existingProduct != null) {
         const product = this.props.existingProduct;
         this.setState({
            name: product.name,
            price: product.price,
            imageThumb: product.imageThumb,
            imageUrl: product.imageUrl,
            description: product.description
         });
      }
   }

   changeName(event) { this.setState({ name: event.target.value }); }
   changePrice(event) { this.setState({ price: event.target.value }); }
   changeImageThumb(event) { this.setState({ imageThumb: event.target.value }); }
   changeImageUrl(event) { this.setState({ imageUrl: event.target.value }); }
   changeDescription(event) { this.setState({ description: event.target.value }); }

   getEnteredProduct() {
      const product = {
         name: this.state.name,
         price: this.state.price,
         imageThumb: this.state.imageThumb,
         imageUrl: this.state.imageUrl,
         description: this.state.description
      }
   }
}