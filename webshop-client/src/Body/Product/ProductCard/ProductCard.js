import './ProductCard.css';
import React, { Component } from 'react';

export class ProductCard extends Component {
   constructor(props) {
      super(props);
      const blankProduct = {id: 0, name: "", price: 0, imageUrl: ""};
      this.state = {
         imageSource: "", 
         product: blankProduct ,
         gridType: "col-lg-3 col-md-4 col-sm-6 col-xs-12"
      };
      this.handleClick = this.handleClick.bind(this);
   }
   
   
   render() {
      let imgSrc = this.state.imageSource;
      let product = this.state.product;

      let name = product.name;
      let price = product.price;
      return <div key={this.state.product.id} className={this.state.gridType} >
         <div className= "productCard card" onClick = {this.handleClick}>
            <img className="card-img-top" src = {imgSrc} alt = {name} width = '100%'></img>
            <h4 className="card-title text-primary"><b>{name}</b></h4>
            <p className="card-text price"><b>{price} Kr</b></p>
         </div>
      </div>
   }

   handleClick() {
      this.props.onClick(this.props.id);
   }

   componentDidMount() {
      this.loadProductData();
   }

   loadImage() {
      const imgUrl = this.state.product.imageThumb;
      if (imgUrl === "") return;
      
      // console.log(`Loading image url: ${imgUrl}`)

      let imageService = this.props.imageService;
      let requestUrl = './images/' + imgUrl;

      let me = this;
      imageService.loadImage(requestUrl, (imageAddress => 
         me.setState({imageSource: imageAddress})));
   }

   loadProductData() {
      let productId = this.props.id;
      let caller = this;
      this.props.productService.getProduct(productId, (fetchedProduct) => {
         caller.setState({ product: fetchedProduct }, caller.loadImage);
      });
   }
}