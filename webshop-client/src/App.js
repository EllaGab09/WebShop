// import logo from './logo.svg';
import './App.css';
import { ProductList } from './Product';
import { ImageService, ProductService, ShoppingCartService } from './_Services';
import { Header } from './Header';

function App() {
  const apiUrl = "https://localhost:44373/api/";
  const endpoints = {
    getAllProducts: "Product/GetAllProducts",
    getProductDetails: "Product/GetProductDetails/"
  };
  const imageService = new ImageService();
  const productService = new ProductService(apiUrl, endpoints);
  const shoppingCartService = new ShoppingCartService();
  return (
    <div className="App">
      <header>
        <Header name="Web Shop"
          shoppingCartService={shoppingCartService} />
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
