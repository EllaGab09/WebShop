import '../User.css';
import React, { Component } from 'react';

export class CreateUserForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userName: '',
         password: '',
         passwordValidate: '',

         billingAddress: '',
         zipCode: '',

         phone: '',
         email: ''
      };

      this.changeName = this.changeName.bind(this);
      this.changePassword = this.changePassword.bind(this);
      this.changePasswordValidate = this.changePasswordValidate.bind(this);
      this.changeBillingAddress = this.changeBillingAddress.bind(this);
      this.changeZipCode = this.changeZipCode.bind(this);
      this.changePhone = this.changePhone.bind(this);
      this.changeEmail = this.changeEmail.bind(this);

      this.submit = this.submit.bind(this);
   }

   changeName(event) { this.setState({ userName: event.target.value }); }
   changePassword(event) { this.setState({ password: event.target.value }); }
   changePasswordValidate(event) { this.setState({ passwordValidate: event.target.value }); }
   changeBillingAddress(event) { this.setState({ billingAddress: event.target.value }); }
   changeZipCode(event) { this.setState({ zipCode: event.target.value }); }
   changePhone(event) { this.setState({ phone: event.target.value }); }
   changeEmail(event) { this.setState({ email: event.target.value }); }

   submit(event) {
      const userService = this.props.userService;
      const userName = this.state.email;
      const password = this.state.password;
      userService.createUser(userName, password, (response) => console.log(response));
      event.preventDefault();
   }

   render() {
      return <form onSubmit={this.submit} className = "w-25 center">
         {this.textForm("Name:", this.state.email, this.changeEmail)}
         {this.textForm("Password:", this.state.password, this.changePassword)}
         <input type="submit" value="Submit" />
         
      </form>
      /*
      {this.textForm("Name:", this.state.userName, this.changeName)}
      {this.textForm("Password:", this.state.password, this.changePassword)}
      {this.textForm("Confirm Password:", this.state.passwordValidate, this.changePasswordValidate)}
      {this.textForm("Billing Address:", this.state.billingAddress, this.changeBillingAddress)}
      {this.textForm("Zip Code:", this.state.zipCode, this.changeZipCode)}
      {this.textForm("Phone Number:", this.state.phone, this.changePhone)}
      {this.textForm("Email:", this.state.email, this.changeEmail)}
      /**/
   }

   textForm(label, value, onChange) {
      return <div className = "form-group"> 
      <label>
         {label}
      </label>
         <input type="text" className = "form-control" value={value} onChange={onChange} />
      </div>
   }
}