import React, { Component } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductDetails } from '../ProductDetails/ProductDetails';

export class ProductList extends Component {
   constructor(props) {
      super(props);
      this.state = { products: [], displayItems: [] };
      this.expandProduct = this.expandProduct.bind(this);
      this.minimizeProduct = this.minimizeProduct.bind(this);
   }

   render() {
      const productCards = this.state.displayItems;

      return <div className="container">
         <div className="row">
            {productCards}
         </div>
      </div>
   }

   getProductCards(products) {
      const productCards = [];
      const productService = this.props.productService;
      const imageService = this.props.imageService;
      const expandProduct = this.expandProduct;

      for (let n = 0; n < products.length; n++) {
         productCards.push(<ProductCard
            product={products[n]}
            key={products[n].id}
            productService={productService}
            imageService={imageService}
            onClick={expandProduct}
         />);
      }
      this.setState({ displayItems: productCards });
      return productCards;
   }

   expandProduct(productKey) {
      const productService = this.props.productService;
      const imageService = this.props.imageService;
      const minimizeProduct = this.minimizeProduct;
      const cartService = this.props.shoppingCartService;
      let displayItems = this.state.displayItems;
      
      for (let n = 0; n < displayItems.length; n++) {
         if (displayItems[n].props.product.id === productKey) {
            const product = displayItems[n].props.product;
            const newItem = <ProductDetails 
               product={product}
               key={n}
               productService={productService}
               imageService={imageService}
               onClick={minimizeProduct}
               shoppingCartService={cartService}
            />
            displayItems.splice(n, 1, newItem);
            break;
         }
      }
      this.setState({ displayItems: displayItems });
   }

   minimizeProduct(product) {
      const productService = this.props.productService;
      const imageService = this.props.imageService;
      const expandProduct = this.expandProduct;
      const displayItems = this.state.displayItems;
      const productId = product.id;

      for (let n = 0; n < displayItems.length; n++) {
         if (displayItems[n].props.product.id === productId) {
            const newItem = <ProductCard
               product={product}
               key={n}
               productService={productService}
               imageService={imageService}
               onClick={expandProduct}
            />
            displayItems.splice(n, 1, newItem);
            break;
         }
      }
      this.setState({ displayItems: displayItems });
   }

   componentDidMount() {
      this.getItems();
   }

   getItems() {
      let productService = this.props.productService;
      productService.getProducts((fetchedProducts) => {
         this.setState({ products: fetchedProducts })
         this.getProductCards(fetchedProducts);
      });
   }
}