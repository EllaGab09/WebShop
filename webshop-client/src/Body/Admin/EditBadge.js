import React, { Component } from 'react';

export class EditBadge extends Component {
   constructor(props) {
      super(props);
      this.clickEdit = this.clickEdit.bind(this);
      this.clickDelete = this.clickDelete.bind(this);
   }
   render() {
      return <li className="list-group-item">
         <p>{this.props.text}</p>
         <button type="button" 
            className="btn btn-primary" 
            onClick={this.clickEdit}>Edit
         </button>
         <button type="button"
            className="btn btn-warning"
            onClick={this.clickDelete}>Delete
         </button>
      </li>
   }

   clickEdit() {
      this.props.onClickEdit(this.props.id);
   }

   clickDelete() {
      this.props.onClickDelete(this.props.id);
   }
}