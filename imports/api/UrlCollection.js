import {Mongo} from 'meteor/mongo';
import SimpleSchema from "simpl-schema";

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