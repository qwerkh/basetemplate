import {Meteor} from 'meteor/meteor';
import {Sb_PurposeReact} from "../../imports/collections/sb_purpose";

if (Meteor.isServer) {
    Meteor.publish('sb_purposeReact', function () {
        if (this.userId) {
            return Sb_PurposeReact.find({});
        }
        return this.ready();

    });
}
