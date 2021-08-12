import React, { Component } from 'react';
import { UserBadge } from '.';

export class UserManagement extends Component {
   usersLoaded = false;
   constructor(props) {
      super(props);
      this.state = {
         users: [],
         roles: []
      };

      this.setUsers = this.setUsers.bind(this);
      this.setRoles = this.setRoles.bind(this);
   }

   componentDidMount() {
      const userService = this.props.userService;
      userService.getUsers(this.setUsers, this.props.accessDenied);
      userService.getRoles(this.setRoles);
   }

   render() {
      const users = this.state.users;
      return <div>
         <h3>Users:</h3>
         {this.renderUserList()}
      </div>
   }

   renderUserList() {
      if (!this.usersLoaded) return <i>Loading users...</i>;

      const userService = this.props.userService;
      const users = this.state.users;
      let n = 0;
      const userItems = users.map((user) =>
         <li className="list-group-item" key={n++}>
            <UserBadge 
               email = {user}
               userService={userService}
               allRoles={this.state.roles}
            />   
         </li>
      );
      return <ul className="list-group m-5 center">{userItems}</ul>
   }

   setUsers(users) {
      if (users == null) return;
      this.usersLoaded = true;
      this.setState({ users: users });
   }

   setRoles(roles) {
      if (roles == null) return;
      this.setState({roles: roles});
   }
}