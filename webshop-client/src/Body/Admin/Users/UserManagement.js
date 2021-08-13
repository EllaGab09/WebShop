import React, { Component } from 'react';
import { UserBadge } from '.';
import {EditBadge} from '../EditBadge';

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
      this.openUserEdit = this.openUserEdit.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
   }

   componentDidMount() {
      const userService = this.props.userService;
      userService.getUsers(this.setUsers, ()=>this.props.accessDenied.invoke());
      userService.getRoles(this.setRoles);
   }

   render() {
      const users = this.state.users;
      return <div>
         {this.renderUserList()}
      </div>
   }

   renderUserList() {
      if (!this.usersLoaded) return <i>Loading users...</i>;

      // const userService = this.props.userService;
      const users = this.state.users;
      let n = 0;
      const userItems = users.map((user) => <EditBadge
               key={user}
               id={user}
               text={user}
               onClickEdit={this.props.onEditUser}
               onClickDelete={this.deleteUser}
            />
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

   openUserEdit(userId) {
      console.log("Opening edit page for user with id", userId);
      this.props.onEditUser(userId);
   }

   deleteUser(userId) {
      console.log("Deleting user with id", userId);
   }
}