// import logo from './logo.svg';
import './App.css';
import { ProductList } from './Product';
import { ImageService, MockProductService, ShoppingCartService } from './_Services';
import { Header } from './Header';

function App() {
  const imageService = new ImageService();
  const productService = new MockProductService();
  const shoppingCartService = new ShoppingCartService();
  return (
    <div className="App">
      <header>
        <Header name="Web Shop" 
          shoppingCartService={shoppingCartService}/>
      </header>
      <div className="under">
        <ProductList 
          imageService={imageService} 
          productService={productService} 
          shoppingCartService={shoppingCartService}
        />
      </div>
    </div>
  );
}

//<ProductCard id = {1} productService = {productService} imageService = {imageService}/>
export default App;
