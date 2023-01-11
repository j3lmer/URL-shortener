import {Accounts} from "meteor/accounts-base";
import "./App.html";
import {Meteor} from "meteor/meteor";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";


Template.entryContainer.onCreated(function entryOnCreated() {
    this.isLoggingIn = new ReactiveVar(true);
});

Template.entryContainer.events({
    "click .changeMode"(event, instance) {
        instance.isLoggingIn.set(!instance.isLoggingIn.get());
    }
});

Template.entryContainer.helpers({
    isLoggingIn() {
        return Template.instance().isLoggingIn.get();
    }
});

Template.login.events({
    "submit #loginForm"(event) {
        event.preventDefault();
        const children = event.target.children;
        Meteor.loginWithPassword(children[0].value, children[1].value);

        if (Meteor.user() !== null) {
            FlowRouter.go('/');
        }
        return false;
    }
});

Template.register.events({
    async "submit #registerForm"(event) {
        event.preventDefault();
        const children = event.target.children;

        if (children[1].value !== children[2].value) {
            return false;
        }

        await Accounts.createUser({username: children[0].value, password: children[1].value});

        if (Meteor.user() !== null) {
            FlowRouter.go('/');
        }
        return false;
    }
});