import { Action } from '../Library';

export class ShoppingCartService {
   products = [];
   onItemsUpdated = new Action();
   
   get numberOfItems() { 
      return this.products.length; 
   }

   getAllItems(callback) { 
      callback(this.products); 
   }

   removeItem(product, callback) {
      console.log("Removing product from cart:", product.name);
      this.onItemsUpdated.invoke(this);
   }

   addItem(productId, callback) {
      console.log("Adding product to cart:", productId);
      this.products.push(productId);
      callback();
      this.onItemsUpdated.invoke(this);
   }
}