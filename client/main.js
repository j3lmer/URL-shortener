import { Urls } from '/imports/api/UrlCollection.js';
import '/imports/ui/home/App.js';
import '/imports/ui/redirect/App.js';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import popper from 'popper.js';
global.Popper = popper;

FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render("mainContainer");
    }
});

FlowRouter.route('/redirect/:id', {
    name: 'redirect',
    action() {

        const param = FlowRouter.getParam("id");
        // const entity = Urls.find({_id: param});
        // console.log(entity);

        BlazeLayout.render("redirectContainer", {data: entity});
    }
});