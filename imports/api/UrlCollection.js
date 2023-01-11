import {Mongo} from 'meteor/mongo';
import SimpleSchema from "simpl-schema";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";

export const Urls = new Mongo.Collection('urls');

export const URLSchema = new SimpleSchema({
    hash: {
        type: String,
        label: "The hash generated for this url"
    },
    link: {
        type: String,
        label: "Original link the user submitted"
    },
    createdAt: {
        type: Date,
        label: "Created at",
        autoValue: function () {
            return new Date();
        }
    },
    userId: {
        type: String,
        label: "The user ID associated with this url"
    }
});
Urls.attachSchema(URLSchema);

Meteor.methods({
    'urls.insert'(linkText, hash) {
        check(linkText, String);

        if (!Meteor.userId()) {
            throw new Meteor.Error("Not-Authorized");
        }

        if (linkText === "") {
            throw new Meteor.Error("Link cannot be empty");
        }

        if(!isValidUrl(linkText)) {
            throw new Meteor.Error("URL is not valid");
        }

        Urls.insert({
            hash: hash,
            link: linkText,
            createdAt: new Date(),
            userId: Meteor.userId()
        });
    },
    'urls.remove'(url) {
        check(url._id, String);

        if (url.userId !== Meteor.userId()) {
            throw new Meteor.Error("Not-Authorized");
        }
        Urls.remove(url._id);
    }
});

const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

