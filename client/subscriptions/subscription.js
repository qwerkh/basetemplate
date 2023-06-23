import {Meteor} from 'meteor/meteor';

Tracker.autorun(() => {
    Meteor.subscribe('userLogin');
    Meteor.subscribe('exchangeActive');
    Meteor.subscribe('sb_counter');
    Meteor.subscribe('sb_repaymentReact');
    Meteor.subscribe('sb_loanCollectionSheet');
    Meteor.subscribe('countsCollectionSheet');

});

Meteor.subscribe('company');
Meteor.subscribe('sb_loanConfig');
Meteor.subscribe('sb_savingConfig');



