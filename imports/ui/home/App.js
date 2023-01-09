import {Template} from 'meteor/templating';
import {Urls} from "../../api/UrlCollection.js";

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

Template.userInputForm.events({
    "submit #submitForm"(event) {
        event.preventDefault();
        const text = event.target.text.value;

        Urls.insert({
            hash: self.crypto.randomUUID().slice(0, 8),
            link: text,
            createdAt: new Date()
        });

        return false;
    }
});

Template.url.events({
    "submit #removeForm"(event) {
        event.preventDefault();
        Urls.remove(this._id)
        return false;
    }
})