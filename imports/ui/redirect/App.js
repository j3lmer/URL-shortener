import "./App.html";
import {Urls} from "../../api/UrlCollection";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";


Template.redirectContainer.helpers({
    url: () => {
        return Urls.findOne({'hash': FlowRouter.getParam("hash")});
    },
})