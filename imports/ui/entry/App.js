import {Accounts} from "meteor/accounts-base";
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
    "submit #loginForm"(event) {
        event.preventDefault();
        const children = event.target.children;
        Meteor.loginWithPassword(children[0].value, children[1].value);
        return false;
    }
});


Template.register.events({
    "submit #registerForm"(event) {
        event.preventDefault();
        const children = event.target.children;

        if(children[1].value !== children[2].value) {
            return false;
        }

        Accounts.createUser({username: children[0].value, password: children[1].value});
        return false;
    }
});