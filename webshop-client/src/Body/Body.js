import React, { Component } from 'react';
import { ProductList } from './Product';
import { CreateUserForm, LoginForm, UserForm } from './User';

export class Body extends Component {
   constructor(props) {
      super(props);
      this.state = { renderMode: props.services.stateService.getCurrentState() }
   }

   componentDidMount() {
      this.props.services.stateService.onStateUpdated.add((state) => {
         this.setState({ renderMode: state })
         console.log(this.state.renderMode);
      });
   }

   render() {
      const renderStates = this.props.services.stateService.getStates();
      switch (this.state.renderMode) {
         case renderStates.CreateUser:
            return this.renderCreateUserForm();
         case renderStates.Login:
            return this.renderLoginForm();
         case renderStates.Products:
         default:
            console.log("Products List");
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
}