import { Action } from '../Library';

export class ShoppingCartService {
   products = [];
   onItemsUpdated = new Action();

   get numberOfItems() {
      let count = 0;
      for(let n = 0; n < this.products.length; n++) {
         count += this.products[n].amount;
      }
      return count; 
   }

   getAllItems(callback) { 
      callback(this.products); 
   }

   removeItem(productId, callback) {
      // console.log("Removing product from cart:", product.name);
      for(let n = 0; n < this.products.length; n++) {
         if (this.products[n].id !== productId) continue;
         this.products[n].amount--;
         if (this.products[n].amount < 1) {
            this.products.splice(n, 1);
         }
      }
      callback();
      this.onItemsUpdated.invoke(this);
   }

   addItem(productId, name, price, callback) {
      // console.log("Adding product to cart:", productId);
      
      for(let n = 0; n < this.products.length; n++) {
         if (this.products[n].id !== productId) continue;
         this.products[n].amount++;
         callback();
         this.onItemsUpdated.invoke(this);
         return;
      }

      this.products.push({id:productId, name: name, amount: 1, price: price});
      callback();
      this.onItemsUpdated.invoke(this);
   }

   clearItems() {
      console.log("Clearing shopping cart");
      this.products = [];
      this.onItemsUpdated.invoke(this);
   }
}