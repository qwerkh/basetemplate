import {Company} from "../imports/collections/company"
import {Meteor} from "meteor/meteor";

import Schedule from 'node-schedule';
import momentTz from 'moment-timezone';
let secret = Meteor.settings.private.secret;

momentTz.tz.setDefault("Asia/Bangkok");

Meteor.startup(function () {
    if (Company.find().count() === 0) {
        Company.insert({name: "ហ្ស៊ីប សូលូសិន", latinName: "ZIB Solution", shortName: "ZIB"});
    }
    Schedule.scheduleJob('30 05 * * *', Meteor.bindEnvironment(function () {
        //moment().format("YYYY-MM-DD")
        //console.log("Cron work" + moment().format("YYYY-MM-DD hh:mm"));
    }));

    //Sb_Disbursement
    //Sb_Disbursement.rawCollection().createIndex({clientId: 1});

})

