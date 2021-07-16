export class Action {
   constructor() {
       this._actions = [];
       this._nextId = 0;
   }
   add(delegateFunction, invoker) {
       this._actions.push({
           id: this._nextId,
           action: delegateFunction,
           invoker: invoker
       });
       return this._nextId++;
   }
   remove(actionId) {
       let index = this._actions.findIndex((value) => value.id === actionId);
       if (index === -1)
           return;
       this._actions.splice(index, 1);
   }
   invoke(...args) {
       for (let n = 0; n < this._actions.length; n++) {
           this._actions[n].action.call(this._actions[n].invoker, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
       }
   }
}