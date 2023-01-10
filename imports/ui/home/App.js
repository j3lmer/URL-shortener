import {Template} from 'meteor/templating';
import {Urls} from "../../api/UrlCollection.js";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import popper from 'popper.js';

global.Popper = popper;

import './App.html';

Template.showExistingLinks.helpers({
    urls() {
        return Urls.find({});
    }
});

Template.url.helpers({
    getLink(crypt) {
        return `${window.location.origin}/redirect/${crypt.hash.crypt}`;
    }
});

Template.navBar.events({
    "click #loginBtn"(event) {
        window.location.replace("/entry");
    }
})

Template.userInputForm.events({
    "submit #submitForm"(event) {
        event.preventDefault();

        Urls.insert({
            hash: self.crypto.randomUUID().slice(0, 8),
            link: event.target.text.value,
            createdAt: new Date()
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
