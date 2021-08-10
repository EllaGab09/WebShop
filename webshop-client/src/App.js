import './App.css';
import { Body } from './Body';
import { StateService, ImageService, ProductService, ShoppingCartService, UserService} from './_Services';
import { Header } from './Header';

function App() {
  const apiUrl = "https://localhost:44373/api/";
  const apiEndpoints = {
    getAllProducts: "Product/GetAllProducts",
    getProductDetails: "Product/GetProductDetails/"
  };

  const authApiUrl = "https://localhost:44302/api/";
  const authApiEndpoints = {
    createUser: "UserManagement/CreateUserWithUserRole",
    login: "Access/GetTokenForThisUser"
  };

  const services = {
    imageService: new ImageService(),
    productService: new ProductService(apiUrl, apiEndpoints),
    userService: new UserService(authApiUrl, authApiEndpoints),
    shoppingCartService: new ShoppingCartService(),
    stateService: new StateService()
  };
  const states = services.stateService.getStates();

  return (
    <div className="App">
      <header>
        <Header name="Web Shop"
          onClickCreateUser={()=>services.stateService.setState(states.CreateUser)}
          onClickProducts={()=>services.stateService.setState(states.Products)}
          onClickLogin={()=>services.stateService.setState(states.Login)}
          shoppingCartService={services.shoppingCartService} />
      </header>
      <div className="under">
        <Body services = {services}/>
      </div>
    </div>
  );
}

export default App;
