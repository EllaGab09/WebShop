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
      this.submit = this.submit.bind(this);
   }

   componentDidMount() {
      if (this.props.existingProduct != null) {
         const product = this.props.existingProduct;
         this.setState({
            name: this.validateString(product.name, "Null"),
            price: this.validateInteger(product.price, 0),
            imageThumb: this.validateString(product.imageThumb, ""),
            imageUrl: this.validateString(product.imageUrl, ""),
            description: this.validateString(product.description, "")
         });
      }
   }

   changeName(event) { this.setState({ name: event.target.value }); }
   changePrice(event) { this.setState({ price: event.target.value }); }
   changeImageThumb(event) { this.setState({ imageThumb: event.target.value }); }
   changeImageUrl(event) { this.setState({ imageUrl: event.target.value }); }
   changeDescription(event) { this.setState({ description: event.target.value }); }

   getEnteredProduct() {
      let id = -1;
      const existingProduct = this.props.existingProduct;
      if (existingProduct != null) id = existingProduct.id;
      return {
         id: id,
         name: this.state.name,
         price: this.state.price,
         imageThumb: this.state.imageThumb,
         imageUrl: this.state.imageUrl,
         description: this.state.description
      }
   }

   render() {
      return <form onSubmit={this.submit}>
         {this.textForm("Name:", this.state.name, this.changeName)}
         {this.textForm("Price:", this.state.price, this.changePrice)}
         {this.textForm("Image Thumbnail Url:", this.state.imageThumb, this.changeImageThumb)}
         {this.textForm("Image Url:", this.state.imageUrl, this.changeImageUrl)}
         {this.textForm("Description:", this.state.description, this.changeDescription)}
         <input type="submit" value="Submit" />
      </form>
   }

   textForm(label, value, onChange) {
      return <div className = "form-group"> 
      <label>
         {label}
      </label>
         <input type="text" className = "form-control" value={value} onChange={onChange} />
      </div>
   }

   submit(event) {
      const enteredValues = this.getEnteredProduct();
      let submitValues = {
         name: this.validateString(enteredValues.name, "Null"),
         price: this.validateInteger(enteredValues.price, 0),
         imageThumb: this.validateString(enteredValues.imageThumb, ""),
         imageUrl: this.validateString(enteredValues.imageUrl, ""),
         description: this.validateString(enteredValues.description, "Null Description")
      };

      this.props.submit.invoke(submitValues);
      event.preventDefault();
   }

   validateString(value, defaultValue) {
      if (value === "" || value === null || value === undefined) value = defaultValue;
      return value;
   }

   validateInteger(value, defaultValue) {
      if (value === null || value === undefined) value = "0";
      var intValue = parseInt(value);
      return intValue === NaN ? defaultValue : intValue;
   }
}