import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import popper from 'popper.js';

global.Popper = popper;

import '/imports/ui/home/App.js';
import '/imports/ui/redirect/App.js';

FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render("mainContainer");
    }
});

FlowRouter.route('/redirect/:hash', {
    name: 'redirect',
    action() {
        BlazeLayout.render("redirectContainer");
    }
});