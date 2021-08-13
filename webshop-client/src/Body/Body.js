import React, { Component } from 'react';
import { ProductList } from './Product';
import { CreateUserForm, LoginForm } from './User';
import { AdminPage } from './Admin';

export class Body extends Component {
   onStateUpdatedId;

   constructor(props) {
      super(props);
      this.state = { bodyRender: null }
      this.renderProductList = this.renderProductList.bind(this);
      this.renderCreateUserForm = this.renderCreateUserForm.bind(this);
      this.renderLoginForm = this.renderLoginForm.bind(this);
      this.renderAdmin = this.renderAdmin.bind(this);
      this.renderCheckout = this.renderCheckout.bind(this);
      this.renderAbout = this.renderAbout.bind(this);
   }

   componentDidMount() {
      this.addStatesToStatemachine();
      const stateMachine = this.props.stateMachine;
      this.onStateUpdatedId = stateMachine.onStateUpdated.add((state) => 
         this.setState({ bodyRender: state.render })
      );
   }

   addStatesToStatemachine() {
      const stateMachine = this.props.stateMachine;
      const states = [
         {
            id:'login',
            render: this.renderLoginForm
         }, {
            id: 'register',
            render: this.renderCreateUserForm
         }, {
            id: 'admin',
            render: this.renderAdmin
         }, {
            id: 'shop',
            render: this.renderProductList
         }, {
            id: 'checkout',
            render: this.renderCheckout
         }, {
            id: 'about',
            render: this.renderAbout
         }
      ]
      stateMachine.states = states;
   }

   componentWillUnmount() {
      const stateService = this.props.services.stateService;
      stateService.onStateUpdated.remove(this.onStateUpdatedId);
   }

   render() {
      if (this.state.bodyRender == null) return <div></div>
      return this.state.bodyRender();
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
      
      return <div>
         <h2>Register</h2>
         <CreateUserForm userService = {userService}/>;
         </div>
   }

   renderLoginForm() {
      const userService = this.props.services.userService;
      return <div>
         <h2>Login</h2>
         <LoginForm userService = {userService}/>;
      </div>
      
   }

   renderAdmin() {
      const userService = this.props.services.userService;
      const productService = this.props.services.productService;
      const services = this.props.services;
      return <AdminPage
         services = {services}
         userService = {userService}
         productService = {productService}
      />
   }

   renderCheckout() {
      return <p>Checkout</p>
   }

   renderAbout() {
      return <p>About</p>
   }
}