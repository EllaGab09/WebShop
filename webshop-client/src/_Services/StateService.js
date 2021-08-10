import {Action} from '../Library';

export class StateService {
   _currentState = 0;

   onStateUpdated = new Action();

   getStates() {
      return {
         Products: 0,
         Login: 1,
         CreateUser: 2
      }
   }

   getCurrentState() {
      return this._currentState;
   }

   setState(state) {
      this._currentState = state;
      this.onStateUpdated.invoke(state);
   }
}