import "./App.html";

Template.entryContainer.onCreated(function entryOnCreated(){
   this.isLoggingIn = new ReactiveVar(true);
});

Template.entryContainer.events({
   "click .changeMode"(event, instance) {
       instance.isLoggingIn.set(!instance.isLoggingIn.get());
       console.log(instance.isLoggingIn.get());
   }
});

Template.entryContainer.helpers({
   isLoggingIn(){
       return Template.instance().isLoggingIn.get();
   }
});

Template.login.events({
    "submit .loginForm"(event) {
        event.preventDefault();
        const children = event.target.children;
        const data = {
            username: children[0].value,
            password: children[1].value
        };
    }


});