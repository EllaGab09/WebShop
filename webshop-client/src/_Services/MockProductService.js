import { mockProducts } from './mocks/ProductMocks';

export class MockProductService {
   products =  mockProducts;

   getProducts(onComplete) {
      let products = [];
      this.products.forEach(product => {
         products.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl
         });
      });
      onComplete(products);
   }

   getProduct(id, onComplete) {
      for (let n = 0; n < this.products.length; n++) {
         let product = this.products[n];
         if (product.id === id) {
            // console.log("Found product with id", id, ":", product);
            onComplete(product);
            return;
         }
      } 
      // console.log("Could not find any product with id", id);  
   }

   addProduct(product, onComplete = null) {
      product.id = this.products.length;
      this.products.push(product);
      if (onComplete != null) onComplete();
   }

   editProduct(product, onComplete = null) {
      for (let n = 0; n < this.products.length; n++) {
         const storedProduct = this.products[n];
         if (storedProduct.id != product.id) continue;

         storedProduct.name = product.name;
         storedProduct.price = product.price;
         storedProduct.imageUrl = product.imageUrl;
         storedProduct.description = product.description;
         console.log(storedProduct.name);
         break;
      }
      if (onComplete != null) onComplete();
   }

   removeProduct(productId, onComplete) {
      let n = 0;
      let index = -1;
      const products = this.products;
      for(n = 0; n <products.length; n++) {
         if (products[n].id !== productId) continue;
         index = n;
         break;
      }
      if (index >= 0) {
         if (index >= 0) products.splice(index, 1);
      } 
      onComplete();
   }
}