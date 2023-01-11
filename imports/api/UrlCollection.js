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
            throw new Meteor.error("Not-Authorized");
        }

        if (linkText === "") {
            throw new Meteor.error("Link cannot be empty");
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
            throw new Meteor.error("Not-Authorized");
        }
        Urls.remove(url._id);
    }
});

