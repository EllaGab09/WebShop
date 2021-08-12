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
    login: "Access/GetTokenForThisUser",
    getUsers: "UserManagement/GetAllUsers",
    getUserRoles: "UserManagement/ReadRolesFromUser",
    setUserRoles: "UserManagement/WriteRolesToUser",
    removeUser: "UserManagement/RemoveThisUser",
    getRoles: "UserManagement/GetAllRoles"
  };

  const services = {
    imageService: new ImageService(),
    productService: new ProductService(apiUrl, apiEndpoints),
    userService: new UserService(authApiUrl, authApiEndpoints),
    shoppingCartService: new ShoppingCartService(),
    stateService: new StateService()
  };
  const stateService = services.stateService;
  const states = stateService.getStates();


  return (
    <div className="App">
      <header>
        <Header name="Web Shop"
          onClickCreateUser={()=>stateService.setState(states.CreateUser)}
          onClickProducts={()=>stateService.setState(states.Products)}
          onClickLogin={()=>stateService.setState(states.Login)}
          onClickAdmin={()=>stateService.setState(states.Admin)}
          shoppingCartService={services.shoppingCartService} />
      </header>
      <div className="under">
        <Body services = {services}/>
      </div>
    </div>
  );
}

export default App;
