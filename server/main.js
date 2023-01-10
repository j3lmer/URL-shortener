import { Meteor } from 'meteor/meteor';
import { Urls } from "../imports/api/UrlCollection";
import { Accounts } from 'meteor/accounts-base';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }
});
