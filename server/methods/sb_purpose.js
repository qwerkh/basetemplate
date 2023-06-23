import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {Sb_Purpose, Sb_PurposeReact, Sb_PurposeAudit} from "../../imports/collections/sb_purpose";
import {Branch} from "../../imports/collections/branch";
import {Sb_OpenAccount} from "../../imports/collections/sb_openAccount";

let secret = Meteor.settings.private.secret;
Meteor.methods({
    sb_fetchPurpose({q, filter, sort, options = {limit: 10, skip: 0}, branchId, accessToken}) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            let data = {
                content: [],
                countContent: 0,
            };
            let selector = {};
            let sortObj = {};
            if (sort.sortBy !== "") {
                let nameSort = sort.sortBy;
                sortObj[nameSort] = sort.sortDesc === true ? 1 : -1;
            } else {
                sortObj = {createdAt: -1};
            }
            if (!!q) {
                let reg = new RegExp(q);
                if (!!filter) {
                    selector[filter] = {$regex: reg, $options: 'mi'}
                } else {

                    selector.$or = [{name: {$regex: reg, $options: 'mi'}}];
                }
            }
            selector.branchId = branchId;


            data.content = Sb_Purpose.aggregate([
                {
                    $match: selector
                }
                ,
                {
                    $sort: sortObj
                },

                {
                    $limit: options.limit
                },
                {
                    $skip: options.skip
                }
            ],
                {
                    allowDiskUse: true
                });
            data.countContent = Sb_Purpose.find(selector).count();
            return data;
        }
    },
    sb_insertPurpose(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let id = Sb_Purpose.insert(doc);

                if (id) {
                    GlobalFn.collectionReact(Sb_PurposeReact, id);
                }
                return id;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }

    },
    sb_updatePurpose(id, doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let oldDoc = Sb_Purpose.findOne({_id: id});
                let isUpdated = Sb_Purpose.update({_id: id}, {$set: doc});
                if (isUpdated) {
                    GlobalFn.collectionReact(Sb_PurposeReact, id, Sb_PurposeAudit, oldDoc, "Update");
                }
                return isUpdated;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },

    sb_removePurpose(doc, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let isRemoved = Sb_Purpose.remove({_id: doc._id});

                if (isRemoved) {
                    GlobalFn.collectionReact(Sb_PurposeReact, doc._id, Sb_PurposeAudit, doc, "Remove");

                }
                return isRemoved;
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    sb_findPurpose(branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                if (Array.isArray(branchId)) {
                    selector.branchId = {$in: branchId};
                } else {
                    selector.branchId = branchId;
                }
                return Sb_Purpose.find(selector).fetch();

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },
    sb_findPurposeById(id, branchId, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                if (Array.isArray(branchId)) {
                    selector.branchId = {$in: branchId};
                } else {
                    selector.branchId = branchId;
                }
                selector._id = id;
                return Sb_Purpose.findOne(selector);

            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    },

    sb_fetchPurposeOption(q, accessToken, branchId) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                if (Array.isArray(branchId)) {
                    selector.branchId = {$in: branchId};
                } else {
                    selector.branchId = branchId;
                }
                return Sb_Purpose.find(selector, {limit: 300}).fetch().map(obj => ({
                    label: (obj.name || ""),
                    value: obj._id
                }));
            } catch (e) {
                throw new Meteor.Error(e.message);
            }
        }
    }
})

//Unique

Sb_Purpose._ensureIndex({
    name: 1,
    branchId: 1
}, {unique: 1, name: "Sb_PurposeUnique"});