import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { UserRoleItem } from'./UserRoleItem';

export class UserBadge extends Component {
   userRolesLoaded = false;
   constructor(props) {
      super(props);
      this.state = { userRoles: [] };
      this.setUserRoles = this.setUserRoles.bind(this);
      this.fetchUserRoles = this.fetchUserRoles.bind(this);
   }

   render() {
      const me = this;
      return <span>
         <span> {this.props.email}</span>
      </span>
   }

   renderDropdown() {
      const rolesArrayFound = this.props.allRoles.length > 0;
      if (!rolesArrayFound) return <span></span>
      const dropDownMenuId = "dropDownMenu" + this.props.email;

      return <Dropdown onClick={this.fetchUserRoles}>
         <Dropdown.Toggle variant="success" id={dropDownMenuId}>
            Roles
         </Dropdown.Toggle>
         <Dropdown.Menu>
            {this.renderDropdownMenu()}
         </Dropdown.Menu>
      </Dropdown>
   }

   renderDropdownMenu() {
      const allRoles = this.props.allRoles;
      let n = 0;
      const baseId = "dropDownMenu" + this.props.email;
      const dropdownItems = allRoles.map((userRole) => {
         const hasRole = this.hasRole(userRole);
         n++;
         return <UserRoleItem 
            number={n}
            roleName={userRole}
            key={baseId + n.toString()}
            userHasRole={hasRole}
            />

         if (hasRole) {
            return <Dropdown.Item key={baseId+n.toString()} onClick={this.printClick} active>{userRole}</Dropdown.Item>
         }
         return <Dropdown.Item onClick={this.printClick}>{userRole}</Dropdown.Item>
      });
      return dropdownItems;
   }

   hasRole(role) {
      const userRoles = this.state.userRoles.map((role) => role.toUpperCase());
      return userRoles.includes(role);
   }

   fetchUserRoles() {
      if (this.userRolesLoaded) return;
      const userService = this.props.userService;
      const userName = this.props.email;
      userService.getRolesOfUser(userName, this.setUserRoles);
   }

   setUserRoles(roles) {
      this.userRolesLoaded = true;
      this.setState({ userRoles: roles });
   }

   printClick() {
      console.log("Cliick..!");
   }
}