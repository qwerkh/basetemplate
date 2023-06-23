import {Mongo} from "meteor/mongo";

export const Branch = new Mongo.Collection("branch");
Branch.schema = new SimpleSchema({

    name: {
        type: String
    },
    enShortName: {
        type: String
    },
    isCompleteLastInstallment: {
        type: Boolean,
        defaultValue: true,
        optional: true
    },
    code: {
        type: String,
    },
    description: {
        type: String,
        optional: true
    },

    phoneNumber: {
        type: String,
        optional: true
    },
    expiredDay: {
        type: Number,
        optional: true
    },
    email: {
        type: String,
        optional: true
    },
    provinceId: {
        type: String
    },
    districtId: {
        type: String
    },
    communeId: {
        type: String
    },
    villageId: {
        type: String
    },
    provinceName: {
        type: String,
        optional: true
    },
    districtName: {
        type: String,
        optional: true
    },
    communeName: {
        type: String,
        optional: true
    },
    villageName: {
        type: String,
        optional: true
    },
    homeStreetGroupNo: {
        type: String,
        optional: true
    },
    analystTelegram: {
        type: String,
        optional: true
    },
    cfoTelegram: {
        type: String,
        optional: true
    },
    accountTelegram: {
        type: String,
        optional: true
    },
    contract: {
        type: String,
        optional: true
    },
    analystTelegramLoan: {
        type: String,
        optional: true
    },
    cfoTelegramLoan: {
        type: String,
        optional: true
    },
    accountTelegramLoan: {
        type: String,
        optional: true
    },
    paymentTelegramLoan: {
        type: String,
        optional: true
    },
    tokenTelegram: {
        type: String,
        optional: true
    },
    address: {
        type: String,
        optional: true
    },
    roundType: {
        type: String,
    },
    escapeType: {
        type: String,
    },
    escapeDay: {
        type: [Number]
    },
    usdDigit: {
        type: Number,
        defaultValue: 2
    },
    khrDigit: {
        type: Number,
        defaultValue: -2
    },
    thbDigit: {
        type: Number,
        defaultValue: 0
    },
    isNotPad: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isCanPayOffWhenHaveOldBalance: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    module: {
        type: [String],
    },
    createdAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    }
});
Branch.attachSchema(Branch.schema);


export const BranchReact = new Mongo.Collection('branchReact');
BranchReact.schema = new SimpleSchema({
    createdAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    },
    id: {
        type: String
    }
});

BranchReact.attachSchema(BranchReact.schema);

export const BranchAudit = new Mongo.Collection('branchAudit');
BranchAudit.schema = new SimpleSchema({
    createdAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    },
    type: {
        type: String,
        optional: true,
    },
    data: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

BranchAudit.attachSchema(BranchAudit.schema);
