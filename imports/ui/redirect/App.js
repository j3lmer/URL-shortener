import "./App.html";
import {Urls} from "../../api/UrlCollection";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import popper from 'popper.js';

global.Popper = popper;



Template.redirectContainer.helpers({
    url: () => {
        return Urls.findOne({'hash': FlowRouter.getParam("hash")});
    },
})