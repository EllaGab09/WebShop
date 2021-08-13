import React, { Component } from 'react';
import { UserManagement, EditUser, EditOrder } from './Users';
import { ProductsList, AddProduct, EditProduct } from './Products';
import { Action } from '../../Library/Action';

export class AdminPage extends Component {
   Pages = {
      Overview: 0,
      EditUser: 1,
      EditOrder: 2,
      EditProduct: 3,
      AddProduct: 4
   };

   editUserClicked = new Action();
   editProductClicked = new Action();
   
   constructor(props) {
      super(props);
      this.state = {
         accessDenied: false,
         displayedPage: this.renderOverview()
      };

      this.editUserClicked.add(this.setBodyToRenderUser, this);
      this.editProductClicked.add(this.setBodyToRenderEditProduct, this);
      
      this.accessDenied = this.accessDenied.bind(this);
      this.setBodyToRenderAddProduct = this.setBodyToRenderAddProduct.bind(this);
      this.setBodyToRenderOverview = this.setBodyToRenderOverview.bind(this);
   }

   render() {
      if (this.state.accessDenied) return <p>
         Access denied! Login with an admin account to access.
      </p>
      return <div>
         <h2>Admininstration</h2>
         {this.renderAdminNavbar()}
         {this.renderAdminBody()}
      </div>
   }

   renderAdminBody() {
      return this.state.displayedPage;
   }

   renderAdminNavbar() {
      return <div className>
         <button className="btn btn-primary m-1" onClick={this.setBodyToRenderOverview}>Overview</button>
         <button className="btn btn-primary m-1" onClick={this.setBodyToRenderAddProduct}>Add Product</button>
         </div>
   }

   renderOverview() {
      return <div>
         <h2>Users</h2>
         <UserManagement 
            userService = {this.props.userService} 
            accessDenied={this.accessDenied}
            onEditUser={this.editUserClicked}
         />
         <h2>Products</h2>
         <ProductsList
            productService = {this.props.productService}
            onEditProduct={this.editProductClicked}
         />
      </div>
   }

   accessDenied() {
      this.setState({accessDenied: true});
   }

   setBodyToRenderOverview() {
      this.setState({displayedPage: this.renderOverview()});
   }

   setBodyToRenderUser(userName) {
      this.setState({displayedPage: <p>Editing {userName}</p>});
   }

   setBodyToRenderEditProduct(productId) {
      this.setState({displayedPage: <p>Editing Product with id {productId}</p>});
   }

   setBodyToRenderAddProduct() {
      this.setState({displayedPage: <p>Adding new product</p>});
   }
}