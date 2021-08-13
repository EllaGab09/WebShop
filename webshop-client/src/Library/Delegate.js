export class Delegate {
   invoker;
   action;
   constructor(invoker, action) {
      this.invoker = invoker;
      this.action = action;
   }

   invoke() {
      this.action.call(this.invoker);
   }

   invoke(...args) {
      this.action.call(this.invoker, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
  }
}