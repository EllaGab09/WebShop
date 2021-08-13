import React, { Component } from 'react';

export class EditBadge extends Component {
   constructor(props) {
      super(props);
      // this.clickEdit = this.clickEdit.bind(this);
      // this.clickDelete = this.clickDelete.bind(this);
   }

   render() {
      return <li className="list-group-item">
         <p>{this.props.text}</p>
         <button type="button" 
            className="btn btn-primary" 
            onClick={()=>this.props.onClickEdit.invoke(this.props.id)}>Edit
         </button>
         <button type="button"
            className="btn btn-warning"
            onClick={()=>this.props.onClickDelete.invoke(this.props.id)}>Delete
         </button>
      </li>
   }

   clickEdit(me) {
      this.props.onClickEdit(this.props.id);
   }

   clickDelete() {
      this.props.onClickDelete(this.props.id);
   }
}