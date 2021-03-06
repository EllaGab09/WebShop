import './ProductDetails.css';
import React, { Component } from 'react';

export class ProductDetails extends Component {
   constructor(props) {
      super(props);

      const blankProduct = {id: 0, name: "", price: 0, imageUrl: ""};
      this.state = {imageSource:"", product: blankProduct}
      this.minimize = this.minimize.bind(this);
      this.addToCart=this.addToCart.bind(this);
   }
   render() {
      const product = this.props.product;
      const productDetails = this.state.product;
      const imgSrc = this.state.imageSource;
      const name = product.name;
      const description = productDetails.description;
      const price = product.price + " kr";

      return <div className="productDetails container m-1">
         <div className="detailsHeader" onClick={this.minimize}>
            <h1 className="nameHeader">{name}</h1>
         </div>
         <div className="row">
            <div className = "col-sm-6 m-0">
               <img src={imgSrc} alt={name} />
            </div>
            <div className = "col-sm-6 infoBox">
               <h1 className="boldPrice">{price}</h1>
               <p>{description}</p>
               <button className = "buyButton bg-warning"onClick={this.addToCart}><h1>Add to cart</h1></button>
            </div>
         </div>
      </div>
   }

   componentDidMount() {
      this.loadProductData();
   }

   addToCart() {
      const cartService = this.props.shoppingCartService;
      const product = this.props.product;
      const id = product.id;
      const price = product.price;
      const name = product.name;
      cartService.addItem(id, name, price, () => {});
   }

   minimize() {
      this.props.onClick(this.props.product);
   }

   loadProductData() {
      const productId = this.props.product.id;
      const me = this;
      const productService = this.props.productService;

      productService.getProduct(productId, (fetchedProduct) => {
         me.setState({ product: fetchedProduct }, me.loadImage);
      });
   }

   loadImage() {
      if (this.props.product.imageUrl === "") return;
      
      let imageService = this.props.imageService;
      let requestUrl = './images/' + this.props.product.imageUrl;

      let me = this;
      imageService.loadImage(requestUrl, (imageAddress => 
         me.setState({imageSource: imageAddress})));
   }
}