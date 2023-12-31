import {Meteor} from 'meteor/meteor';
import {Accounts} from "meteor/accounts-base";
import GlobalFn from "../../imports/libs/globalFn"
import _ from 'lodash'

import {UserReact, UserAudit} from "../../imports/collections/user"
import {Branch} from "../../imports/collections/branch";

let secret = Meteor.settings.private.secret;

Meteor.methods({
    base_fetchUser({q, filter, sort, options = {limit: 10, skip: 0}}) {
        let data = {
            content: [],
            countContent: 0,
        };
        let selector = {};
        let sortObj = {};
        if (sort.sortBy !== "") {
            //sortObj = sortBy.sort;
            let nameSort = sort.sortBy;
            sortObj[nameSort] = sort.sortDesc === true ? 1 : -1;
            //sortObj["createdAt"] = -1;
        } else {
            sortObj = {createdAt: -1};
        }
        if (!!q) {
            let reg = new RegExp(q);
            if (!!filter) {
                selector[filter] = {$regex: reg, $options: 'mi'}
            } else {
                selector.$or = [{username: {$regex: reg, $options: 'mi'}}, {desc: {$regex: reg, $options: 'mi'}}];
            }
        }
        selector.username = {$ne: "super"};
        data.content = Meteor.users.aggregate([
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
                },
            ],
            {
                allowDiskUse: true
            });
        data.countContent = Meteor.users.find(selector).count();
        return data;
    },
    base_insertUser(doc) {
        try {
            let id = Accounts.createUser({
                username: doc.username,
                email: doc.email,
                password: doc.password,
                profile: doc.profile,
                roles: doc.roles || [],
                branch: doc.branch || [],
                defaultBranch: doc.defaultBranch || "",
                module: doc.module || [],
                defaultModule: doc.defaultModule || "",
            });

            if (id) {
                let apiKey = GlobalFn.generateApiKey(id, doc.username, secret);
                Meteor.users.update({_id: id}, {$set: {apiKey: apiKey}});
                GlobalFn.collectionReact(UserReact, id);
            }
            return id;
        } catch (e) {
            throw new Meteor.Error(e.message);
        }

    },
    base_updateUser(id, doc) {
        let changePassword = doc.changePassword;
        delete doc.changePassword;
        delete doc.password;
        delete doc.confirmChangePassword;

        let oldDoc = Meteor.users.findOne({_id: id});
        doc.emails = oldDoc.emails.map((obj) => {
            obj.address = doc.email;
            return obj;
        })
        delete doc.email;
        delete doc._id;

        let newProfile = oldDoc.profile;
        newProfile.fullName = doc.profile.fullName;
        newProfile.url = doc.profile.url;
        newProfile.approved = doc.profile.approved;
        newProfile.workDayMorning = doc.profile.workDayMorning;
        newProfile.workDayAfternoon = doc.profile.workDayAfternoon;
        newProfile.workTimeMorningStart = doc.profile.workTimeMorningStart;
        newProfile.workTimeMorningEnd = doc.profile.workTimeMorningEnd;
        newProfile.workTimeAfternoonStart = doc.profile.workTimeAfternoonStart;
        newProfile.workTimeAfternoonEnd = doc.profile.workTimeAfternoonEnd;
        newProfile.maxUserLogin = doc.profile.maxUserLogin;

        doc.profile = newProfile;

        let isUpdated = Meteor.users.update({_id: id}, {$set: doc});
        if (isUpdated) {
            !!changePassword ? Accounts.setPassword(id, changePassword) : null;
            GlobalFn.collectionReact(UserReact, id, UserAudit, oldDoc, "Update");
        }
        return isUpdated;
    },
    base_finUserById() {
        if (Meteor.userId()) {
            return Meteor.users.findOne({_id: Meteor.userId()}, {
                fields: {
                    _id: 1,
                    branch: 1,
                    defaultBranch: 1,
                    profile: 1,
                    username: 1,
                    roles: 1,
                    module: 1,
                    apiKey: 1,
                    defaultModule: 1
                }
            });
        }
    },
    base_updateProfile(id, doc) {
        let oldDoc = Meteor.users.findOne({_id: id});
        doc.emails = oldDoc.emails.map((obj) => {
            obj.address = doc.email;
            return obj;
        })
        delete doc.email;
        delete doc._id;

        let isUpdated = Meteor.users.update({_id: id}, {
            $set: {
                "profile.fullName": doc.profile.fullName,
                emails: doc.emails
            }
        });
        if (isUpdated) {
            GlobalFn.collectionReact(UserReact, id, UserAudit, oldDoc, "Update");
        }
        return isUpdated;
    },
    base_updateProfileImg(id, url) {

        let oldDoc = Meteor.users.findOne({_id: id});
        let isUpdated = Meteor.users.update({_id: id}, {
            $set: {
                url: url
            }
        });
        if (isUpdated) {
            GlobalFn.collectionReact(UserReact, id, UserAudit, oldDoc, "Update");
        }
        return isUpdated;
    },
    base_updateLayout(id, layout) {
        let isUpdated = Meteor.users.update({_id: id}, {
            $set: {
                "profile.isDark": layout.isDark,
                "profile.sideColorFilter": layout.sideColorFilter,
                "profile.imgBackground": layout.imgBackground,
                "profile.isSideBarImage": layout.isSideBarImage,
                "profile.language": layout.language,
                "profile.dense": layout.dense,
            }
        });
        if (isUpdated) {
            GlobalFn.collectionReact(UserReact, id);
        }
        return isUpdated;
    },
    base_removeUser(doc) {
        let isRemoved = Meteor.users.remove({_id: doc._id});

        if (isRemoved) {
            GlobalFn.collectionReact(UserReact, doc._id, UserAudit, doc, "Remove");
        }
        return isRemoved;
    },
    base_fetchUserCashierOptionList(q, branch, accessToken) {
        if ((Meteor.userId() && accessToken === secret) || accessToken === secret) {
            try {
                let selector = {};
                if (q && q !== "" && q !== undefined && q !== null) {
                    q = q.replace(/[/\\]/g, '');
                    let reg = new RegExp(q, 'mi');
                    selector.$or = [
                        {username: {$regex: reg}},
                        {_id: q}
                    ];
                }
                if (Array.isArray(branch)) {
                    selector.branch = {$in: branch};
                } else {
                    selector.branch = branch;
                }

                selector.roles = {$elemMatch: {$eq: "Cashier"}};
                return Meteor.users.find(selector).fetch().map(obj => ({
                    label: (obj.profile.fullName || ""),
                    value: obj._id
                }));
            } catch (e) {
                throw new Meteor.Error(e.message);
            }

        }
    },
})