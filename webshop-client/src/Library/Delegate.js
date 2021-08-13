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
}