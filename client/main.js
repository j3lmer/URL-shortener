import {FlowRouter} from 'meteor/ostrio:flow-router-extra';

import '/imports/ui/home/App.js';
import '/imports/ui/redirect/App.js';
import '/imports/ui/entry/App.js';

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

FlowRouter.route('/entry', {
    name: 'entry',
    action() {
        BlazeLayout.render("entryContainer")
    }
})