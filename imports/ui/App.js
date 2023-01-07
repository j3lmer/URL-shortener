import { Template } from 'meteor/templating';
import { Urls } from "../api/UrlCollection.js";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import popper from 'popper.js';
global.Popper = popper;

import './App.html';

Template.mainContainer.helpers({
    urls() {
        return Urls.find({});
    },
});