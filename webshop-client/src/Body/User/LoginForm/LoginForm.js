import '../User.css';
import React, { Component } from 'react';

export class LoginForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userName: '',
         password: '',
      };

      this.changeName = this.changeName.bind(this);
      this.changePassword = this.changePassword.bind(this);
      this.submit = this.submit.bind(this);
   }

   changeName(event) { this.setState({ userName: event.target.value }); }
   changePassword(event) { this.setState({ password: event.target.value }); }

   submit(event) {
      const userService = this.props.userService;
      const userName = this.state.userName;
      const password = this.state.password;
      userService.login(userName, password, (response) => console.log(userService.token));
      event.preventDefault();
   }

   render() {
      return <form onSubmit={this.submit} className = "w-25 center">
         {this.textForm("Name:", this.state.userName, this.changeName)}
         {this.textForm("Password:", this.state.password, this.changePassword)}
         <input type="submit" value="Submit" />
      </form>
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