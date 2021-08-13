import './App.css';
import { Body } from './Body';
import { ImageService, ProductService, ShoppingCartService, UserService, MockProductService } from './_Services';
import { Header } from './Header';
import { MockOrderService } from './_Services/MockOrderService';
import { StateMachine } from './Library';

function App() {
  const apiUrl = "https://localhost:44373/api/";
  const apiEndpoints = {
    getAllProducts: "Product/GetAllProducts",
    getProductDetails: "Product/GetProductDetails/"
  };

  const authApiUrl = "https://localhost:44302/api/";
  const authApiEndpoints = {
    createUser: "UserManagement/CreateUserWithUserRole",
    login: "Access/GetTokenForThisUser",
    getUsers: "UserManagement/GetAllUsers",
    getUserRoles: "UserManagement/ReadRolesFromUser",
    setUserRoles: "UserManagement/WriteRolesToUser",
    removeUser: "UserManagement/RemoveThisUser",
    getRoles: "UserManagement/GetAllRoles"
  };

  const services = {
    imageService: new ImageService(),
    // productService: new ProductService(apiUrl, apiEndpoints),
    productService: new MockProductService(),
    userService: new UserService(authApiUrl, authApiEndpoints),
    shoppingCartService: new ShoppingCartService(),
    orderService: new MockOrderService()
  };
  const stateService = services.stateService;
  const bodyStateMachine = new StateMachine();

  return (
    <div className="App">
      <header>
        <Header name="Web Shop"
          stateMachine={bodyStateMachine}
          shoppingCartService={services.shoppingCartService} />
      </header>
      <div className="under">
        <Body
          services={services}
          stateMachine={bodyStateMachine}
        />
      </div>
    </div>
  );
}

export default App;
