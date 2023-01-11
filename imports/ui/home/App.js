import {Template} from 'meteor/templating';
import {Urls} from "../../api/UrlCollection.js";
import './App.html';

Template.mainContainer.helpers({
    isUserLogged() {
        return !!Meteor.user();
    },
})

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
        let tmpHash = self.crypto.randomUUID().slice(0, 8);

        while (Urls.find({hash: tmpHash}).count() !== 0) {
            tmpHash = self.crypto.randomUUID().slice(0, 8);
        }

        Meteor.call('urls.insert', event.target.text.value, tmpHash);
        return false;
    }
});

Template.url.events({
    "submit #removeForm"(event) {
        event.preventDefault();
        Meteor.call('urls.remove', this);
        return false;
    }
});
