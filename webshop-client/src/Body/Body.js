import React, { Component } from 'react';
import { ProductList } from './Product';
import { CreateUserForm, LoginForm } from './User';
import { AdminPage } from './Admin';

export class Body extends Component {
   onStateUpdatedId;

   constructor(props) {
      super(props);
      this.state = { renderMode: props.services.stateService.getCurrentState() }
   }

   componentDidMount() {
      const stateService = this.props.services.stateService;
      this.onStateUpdatedId = stateService.onStateUpdated.add((state) => {
         this.setState({ renderMode: state })
         console.log(this.state.renderMode);
      });
   }

   componentWillUnmount() {
      const stateService = this.props.services.stateService;
      stateService.onStateUpdated.remove(this.onStateUpdatedId);
   }

   render() {
      const renderStates = this.props.services.stateService.getStates();
      switch (this.state.renderMode) {
         case renderStates.CreateUser:
            return this.renderCreateUserForm();
         case renderStates.Login:
            return this.renderLoginForm();
         case renderStates.Admin:
            return this.renderAdmin();
         case renderStates.Products:
         default:
            return this.renderProductList();
      }
   }

   renderProductList() {
      const productService = this.props.services.productService;
      const imageService = this.props.services.imageService;
      const shoppingCartService = this.props.services.shoppingCartService;
      return <ProductList
         productService={productService}
         imageService={imageService}
         shoppingCartService={shoppingCartService}
      />
   }

   renderCreateUserForm() {
      const userService = this.props.services.userService;
      return <CreateUserForm userService = {userService}/>;
   }

   renderLoginForm() {
      const userService = this.props.services.userService;
      return <LoginForm userService = {userService}/>;
   }

   renderAdmin() {
      const userService = this.props.services.userService;
      return <AdminPage userService = {userService}/>
   }
}