import {Template} from 'meteor/templating';
import {Urls} from "../../api/UrlCollection.js";
import './App.html';

Template.showExistingLinks.helpers({
    urls() {
        return Urls.find({userId: Meteor.userId()});
    }
});

Template.url.helpers({
    getLink(crypt) {
        return `${window.location.origin}/redirect/${crypt.hash.crypt}`;
    }
});

Template.navBar.helpers({
    isUserLogged() {
        return !!Meteor.user();
    },
    getUserName(){
        return Meteor.user();
    }
});

Template.navBar.events({
    "click #loginBtn"(event) {
        window.location.replace("/entry");
    },
    "click #logoutBtn"(event){
        Meteor.logout();
    }
});

Template.userInputForm.events({
    "submit #submitForm"(event) {
        event.preventDefault();

        Urls.insert({
            hash: self.crypto.randomUUID().slice(0, 8),
            link: event.target.text.value,
            createdAt: new Date(),
            userId: Meteor.userId()
        });

        return false;
    }
});

Template.url.events({
    "submit #removeForm"(event) {
        event.preventDefault();
        Urls.remove(this._id);
        return false;
    }
});
