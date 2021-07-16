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
}