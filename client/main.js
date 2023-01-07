import { Urls } from '/imports/api/UrlCollection.js';
import '/imports/ui/App.js';

const insertUrl = urlLink => Urls.insert({text: urlLink});