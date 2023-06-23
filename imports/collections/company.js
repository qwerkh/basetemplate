import {Mongo} from "meteor/mongo";

export const Company = new Mongo.Collection("company");
Company.schema = new SimpleSchema({

    name: {
        type: String
    },
    latinName: {
        type: String
    },
    isSpecialLoan: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    //Insurance Fee with Admin Fee
    isInsuranceFee: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isFeeLaw: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isProductType: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    notRoundAmountPay: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isLotType: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isCustomPrinciple: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isCustomInterestRate: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    slogan: {
        type: String,
        optional: true
    },
    isCostOfFund: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isLongLogo: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    url: {
        type: String,
        optional: true
    },
    isIntegrateLoanAndAccount: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isIntegrateSavingAndAccount: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isOtherCommission: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isPaymentType: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isGroupLoan: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isTargetPlan: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isGuarantorInSchedule: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isHasQrcode: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isTotalBalanceInSchedule: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isHideTitle: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isProtectLoan: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isSavingInLoan: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isBatchPayment: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isAuthorizePayment: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isHasBanner: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isPayCode: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    //Show Operation fee as Insurance
    isInsurance: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isOtherInCollect: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isLoginBanner: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isLongLogoSchedule: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isHideBranchInReport: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isNotCalculateByDay: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isChangeColorSchedule: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    isAutoRunCollect: {
        type: Boolean,
        defaultValue: true,
        optional: true
    },
    telegramBotLink: {
        type: String,
        optional: true
    },
    baseCurrency: {
        type: String,
        defaultValue: "USD"
    },
    depreciationType: {
        type: String,
        defaultValue: "001"
    },
    depreciationPerTime: {
        type: Number,
        defaultValue: 1
    },
    shortName: {
        type: String
    },
    parentName: {
        type: String,
        optional: true
    },
    latinParentName: {
        type: String,
        optional: true
    },
    directorName: {
        type: String,
        optional: true
    },
    vision: {
        type: String,
        optional: true
    },
    mission: {
        type: String,
        optional: true
    },

    telegramToken: {
        type: String,
        optional: true
    },
    sendMessage: {
        type: Boolean,
        optional: true,
        defaultValue: false
    },
    values: {
        type: [String],
        optional: true
    }
});
Company.attachSchema(Company.schema);

