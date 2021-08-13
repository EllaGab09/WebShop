import {Action} from '.';

export class StateMachine {
   activeStateId = null;
   states = [];
   onStateUpdated = new Action();

   getStates() {
      return this.states;
   }

   get currentState() {
      if (this.currentStateIndex < 0) return null;
      return this.states[this.currentStateIndex];
   }

   addState(state) {
      const index = this.states.length;
      this.states.push(state);
      return index;
   }

   removeState(stateId) {
      for(let n = 0; n < this.states.length; n++) {
         if (this.states[n].id !== stateId) continue;
         this.states.splice(n, 1);
         return;
      }
   }

   setState(stateId) {
      this.activeStateId = stateId;
      let index = -1;
      for(let n = 0; n < this.states.length; n++) {
         if (this.states[n].id !== stateId) continue;
         index = n;
         break;
      }
      this.onStateUpdated.invoke(index >= 0 ? this.states[index] : null);
   }
}