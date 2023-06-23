import {Branch} from "../collections/branch";

var jwt = require('jsonwebtoken');
import numeral from "numeral";
import math from "mathjs";
import {Company} from "../collections/company";
import XLSX from "xlsx";
import crypto from "crypto";
//import {BL_Counter} from "../collections/bl_counter"

export default class GlobalFn {
    static CheckRoles({userId, roles}) {
        let currentUser = Meteor.user();
        if (userId) {
            currentUser = Meteor.users.findOne({_id: userId}); //use to check on server only
            if (currentUser && !currentUser.profile.approved) {
                return false;
            }
        }
        if (currentUser) {
            return Roles.userIsInRole(currentUser._id, roles);
        }
    }

    static Namespace1(route) {
        return '/api/v1' + route;
    }

    static verifyToken(token, secret) {
        return jwt.verify(token, secret);
    };

    static collectionReact = (collectionReactName, id, collectionAuditName, oldDoc, type) => {
        let doc = collectionReactName.findOne();
        !!doc ? collectionReactName.update({_id: doc._id}, {
            $set: {
                id: id
            }
        }) : collectionReactName.insert({
            id: id
        });
        if (type && type !== undefined && oldDoc && oldDoc !== undefined) {
            let od = {};
            od.type = type;
            od.data = oldDoc;
            collectionAuditName.insert(od);
        }
    };

    static exportExcelFile(workbook, fileName) {
        return XLSX.writeFile(workbook, fileName);
    }

    /*static generateCodePrefix = ({prefix, branchId, collectionName, length}) => {
        let doc = BL_Counter.findOne({branchId: branchId, type: collectionName + ""});
        let padCount = pad(1, length);
        if (!!doc) {
            BL_Counter.update({branchId: branchId, type: collectionName + ""}, {$inc: {count: 1}});
            padCount = pad(doc.count + 1, length);
        } else {
            BL_Counter.insert({branchId: branchId, type: collectionName + "", count: 1});
        }
        return !!prefix ? prefix + padCount : padCount;

    }*/

    static formatNumber = (val) => {
        return val !== "" && val !== null && val !== undefined ? numeral(val).format("0,00") : "";
    }
    static formatFloatNumber = (val) => {
        return val !== "" && val !== null && val !== undefined ? numeral(val).format("0,00.00") : "";
    }

    static formatCurrency = (val, currencyId) => {
        val = math.round(val, 3);
        let newVal;
        switch (currencyId) {
            case "KHR":
                newVal = val !== "" && val !== null && val !== undefined ? numeral(Math.round(val / 100) * 100).format("0,00") : "";
                break;
            case "USD":
                newVal = val !== "" && val !== null && val !== undefined ? numeral(val).format("0,00.000") : "";
                break;
            case "THB":
                newVal = val !== "" && val !== null && val !== undefined ? numeral(val).format("0,00") : "";
                break;
            default :
                newVal = "";
                break;

        }
        return GlobalFn.seperateNumber(newVal);
    }


    static formatCurrencyLast = (amount, currencyId, branchId, settingDoc, branchDoc) => {
        if (!settingDoc) {
            settingDoc = Company.findOne();
        }
        if (!branchDoc) {
            if (branchId && branchId !== undefined) {
                branchDoc = Branch.findOne({_id: branchId});
            }
        }

        if (currencyId === undefined) {
            currencyId = settingDoc.baseCurrency;
        }
        let newAmount = math.round(numeral(amount).value(), 5);
        if (currencyId === "KHR") {
            newAmount = roundKhrUp(newAmount, -2);
        }
        let newForm = "";
        switch (currencyId) {
            case "USD":
                newForm = newFormFormat(branchDoc && branchDoc.usdDigit || 2);
                break;
            case "KHR":
                newForm = newFormFormat(branchDoc && branchDoc.khrDigit || -2);
                break;
            case "THB":
                newForm = newFormFormat(branchDoc && branchDoc.thbDigit || 0);
                break;
        }
        return GlobalFn.seperateNumber(numeral(newAmount).format(newForm));

    };

    static formatDate = (date) => {
        if (!date) return "";

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
    }
    static formatMonthYearKhmer = (date) => {
        if (!date) return null

        const d = date.split('/')
        return getMonth(d[0]) + " " + d[1];
    }

    static numberKhmer = (num) => {
        if (!num && num !== 0) return null;
        let newNum = "";
        switch (num) {
            case 0:
                newNum = "0";
                break;
            case 1:
                newNum = "១";
                break;
            case 2:
                newNum = "២";
                break;
            case 3:
                newNum = "៣";
                break;
            case 4:
                newNum = "៤";
                break;
            case 5:
                newNum = "៥";
                break;
            case 6:
                newNum = "៦";
                break;
            case 7:
                newNum = "៧";
                break;
            case 8:
                newNum = "៨";
                break;
            case 9:
                newNum = "៩";
                break;
            default:
                newNum = "0";
                break;
        }


        return newNum;
    }

    static convertNumtoKhmerNum(num) {
        let newNum = num.toString();
        let numList = newNum.split("");
        let numRet = "";
        numList.forEach((d) => {
            numRet += GlobalFn.numberKhmer(parseInt(d));
        })
        return numRet;
    }

    static getMonthKH = (date) => {
        if (!date) return null;
        let month = moment(date).format("MM");
        return getMonth(month);
    }

    static getDateKH = (date) => {
        if (!date) return null;
        let month = moment(date).format("MM");
        let day = moment(date).format("DD")
        let year = moment(date).format("YYYY")
        return day + " ខែ " + getMonth(month) + " ឆ្នាំ " + year;
    }

    static getMonth = (val, lang) => {
        if (!val) return null;
        if (lang === "km") {
            return getMonth(val);
        } else {
            return getMonthEn(val);

        }
    }

    static getCurrencySymbol = (val) => {
        let symbol = "";
        switch (val) {
            case "KHR":
                symbol = "៛";
                break;
            case "USD":
                symbol = "$";
                break;
            case "THB":
                symbol = "B";
                break;
            default:
                symbol = "";
                break;
        }
        return symbol;
    }


    static exchangeCoefficient = function ({exchange, fieldToCalculate, baseCurrency}) {
        let coefficient = {
            KHR: {},
            THB: {},
            USD: {}
        };
        if (baseCurrency === 'USD') {
            coefficient.KHR.$divide = [fieldToCalculate, exchange.rates.KHR];
            coefficient.THB.$divide = [fieldToCalculate, exchange.rates.THB];
            coefficient.USD.$multiply = [fieldToCalculate, 1];
        } else if (baseCurrency === 'THB') {
            coefficient.KHR.$divide = [fieldToCalculate, exchange.rates.THB / exchange.rates.KHR];
            coefficient.USD.$multiply = [fieldToCalculate, exchange.rates.THB];
            coefficient.THB.$multiply = [fieldToCalculate, 1];
        } else {
            coefficient.THB.$multiply = [fieldToCalculate, exchange.rates.KHR / exchange.rates.THB];
            coefficient.USD.$multiply = [fieldToCalculate, exchange.rates.KHR];
            coefficient.KHR.$multiply = [fieldToCalculate, 1];
        }
        return coefficient;
    };

    static seperateNumber(val) {
        if (val !== "" && val !== undefined && val !== 0 && val !== '0' && val !== null) {
            val = math.round(numeral(val || 0).value(), 2);
            val = numeral(val).value() + "";
            let newVal = val.split(".");
            return newVal[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (!!newVal[1] ? "." + newVal[1] : "");
        }
        return "0";
    }


    static getTermType(val) {
        return val === "Monthly" ? "ខែ" : val === "Weekly" ? "សប្តាហ៍" : val === "Yearly" ? "ឆ្នាំ" : "";
    }


    static exchange(curFrom, curTo, val, exchangeDocParam) {
        if (val === 0) {
            return val;
        } else {
            let exchangeDoc = {};
            if (exchangeDocParam) {
                exchangeDoc = exchangeDocParam;
            } else {
                exchangeDoc = Exchange.findOne({status: true});
            }
            let result = 0;
            if (exchangeDoc) {
                if (curFrom === "USD") {
                    if (curTo === "KHR") {
                        result = numeral(GlobalFn.formatCurrency(val * exchangeDoc.rates.KHR, "KHR")).value();
                    } else if (curTo === "THB") {
                        result = numeral(GlobalFn.formatCurrency(val * exchangeDoc.rates.THB, "THB")).value();
                    } else {
                        result = val;
                    }

                } else if (curFrom === "KHR") {
                    if (curTo === "USD") {
                        result = numeral(GlobalFn.formatCurrency(val / exchangeDoc.rates.KHR, "USD")).value();
                    } else if (curTo === "THB") {
                        result = numeral(GlobalFn.formatCurrency(val * exchangeDoc.rates.THB / exchangeDoc.rates.KHR, "THB")).value();
                    } else {
                        result = val;
                    }
                } else if (curFrom === "THB") {
                    if (curTo === "USD") {
                        result = numeral(GlobalFn.formatCurrency(val / exchangeDoc.rates.THB, "USD")).value();
                    } else if (curTo === "KHR") {
                        result = numeral(GlobalFn.formatCurrency(val * exchangeDoc.rates.KHR / exchangeDoc.rates.THB, "KHR")).value();
                    } else {
                        result = val;
                    }
                }
            }
            return result;
        }
    }


    static roundCurrency = (amount, currencyId, branchId, settingDoc) => {

        if (!settingDoc) {
            if (branchId && branchId !== undefined) {
                settingDoc = Branch.findOne({_id: branchId});
            }
        }
        let newAmount;
        settingDoc.usdDigit = settingDoc.usdDigit || 2;
        settingDoc.khrDigit = settingDoc.khrDigit || -2;
        settingDoc.thbDigit = settingDoc.thbDigit || 0;
        if (settingDoc.roundType === "Normal") {
            switch (currencyId) {
                case "USD":
                    newAmount = math.round(amount, settingDoc.usdDigit);
                    break;
                case "KHR":
                    newAmount = roundKhr(amount, settingDoc.khrDigit);
                    break;
                case "THB":
                    newAmount = math.round(amount, settingDoc.thbDigit);
            }
        } else if (settingDoc.roundType === "Up") {
            switch (currencyId) {
                case "USD":
                    newAmount = Math.ceil(amount * digitToInt(settingDoc.usdDigit)) / digitToInt(settingDoc.usdDigit);
                case "KHR":
                    newAmount = roundKhrUp(amount, settingDoc.khrDigit);
                case "THB":
                    newAmount = Math.ceil(amount * digitToInt(settingDoc.thbDigit)) / digitToInt(settingDoc.thbDigit);
            }

        } else if (settingDoc.roundType === "Down") {
            switch (currencyId) {
                case "USD":
                    newAmount = Math.floor(amount * digitToInt(settingDoc.usdDigit)) / digitToInt(settingDoc.usdDigit);
                case "KHR":
                    newAmount = roundKhrDown(amount, settingDoc.khrDigit);
                case "THB":
                    newAmount = Math.floor(amount * digitToInt(settingDoc.thbDigit)) / digitToInt(settingDoc.thbDigit);
            }
        }
        return newAmount;
    }

    static roundCurrencyNature = (amount, currencyId, branchId, settingDoc) => {
        let area;
        if (!settingDoc) {
            if (branchId && branchId !== undefined) {
                settingDoc = Branch.findOne({_id: branchId});
            }
        }
        let newAmount;
        settingDoc.usdDigit = 0;
        settingDoc.khrDigit = settingDoc.khrDigit || -2;
        settingDoc.thbDigit = settingDoc.thbDigit || 0;
        if (settingDoc.roundType === "Normal") {
            switch (currencyId) {
                case "USD":
                    newAmount = math.round(amount, settingDoc.usdDigit);
                    break;
                case "KHR":
                    newAmount = roundKhr(amount, settingDoc.khrDigit);
                    break;
                case "THB":
                    newAmount = math.round(amount, settingDoc.thbDigit);
            }
        } else if (settingDoc.roundType === "Up") {
            switch (currencyId) {
                case "USD":
                    newAmount = Math.ceil(amount * digitToInt(settingDoc.usdDigit)) / digitToInt(settingDoc.usdDigit);
                case "KHR":
                    newAmount = roundKhrUp(amount, settingDoc.khrDigit);
                case "THB":
                    newAmount = Math.ceil(amount * digitToInt(settingDoc.thbDigit)) / digitToInt(settingDoc.thbDigit);
            }

        } else if (settingDoc.roundType === "Down") {
            switch (currencyId) {
                case "USD":
                    newAmount = Math.floor(amount * digitToInt(settingDoc.usdDigit)) / digitToInt(settingDoc.usdDigit);
                case "KHR":
                    newAmount = roundKhrDown(amount, settingDoc.khrDigit);
                case "THB":
                    newAmount = Math.floor(amount * digitToInt(settingDoc.thbDigit)) / digitToInt(settingDoc.thbDigit);
            }
        }
        return newAmount;
    }

    static addDay = (dateString, num, type) => {
        return moment(moment(dateString, "YYYY-MM-DD").add(num, type).toDate()).format("YYYY-MM-DD")
    }

    static switchDay = (val) => {
        let day = moment(val).format("ddd");
        let str;
        switch (day) {
            case "Mon":
                str = 'ច័ន្ទ';
                break;
            case "Tue":
                str = 'អង្គារ៍';
                break;

            case "Wed":
                str = 'ពុធ';
                break;
            case "Thu":
                str = 'ព្រហស្បត្តិ៍';
                break;
            case "Fri":
                str = 'សុក្រ';
                break;
            case "Sat":
                str = 'សៅរ៍';
                break;
            case "Sun":
                str = 'អាទិត្យ';
                break;
            default:
                str = "";
                break;
        }
        return str;
    }

    static space = function (num) {
        let char = '';
        let i = 1;
        for (i = 1; i <= num; i++) {
            char += '\u00A0';
        }
        return char;
    }

    static getNationType(val) {
        return val === "IdentityCard" ? "អត្តសញ្ញាណប័ណ្ណ" : val === "FamilyBook" ? "សៀវភៅគ្រួសារ" : val === "Passport" ? "លិខិតឆ្លងដែន" : val === "BirthCertificate" ? "សំបុត្រកំណើត" : "........................";
    }

    static getCurrencyKH(val, amount) {
        let isKot = Number.isInteger(amount) ? "គត់" : "";
        return (val === "USD" ? "ដុល្លា" : val === "KHR" ? "រៀល" : val === "THB" ? "បាត" : "") + isKot;
    }

    static numberInKhmer(val) {
        let newVal = val + "";
        let divideDot = newVal.split(".");

        let newValArr = divideDot[0].split("");
        let numKhr = "";
        let nl4 = "";
        let nl7 = "";
        let nl10 = "";

        let l4 = 0;
        let l7 = 0;
        let l10 = 0;
        let lenNewVal = newValArr.length;
        newValArr.forEach((obj) => {
            if (obj && lenNewVal > 0) {
                if (lenNewVal > 9) {

                    if (lenNewVal % 3 === 0) {
                        numKhr += getNumKH1digit(obj);
                        numKhr += getNumKHdigit(3);
                    } else if (lenNewVal % 3 === 1) {
                        numKhr += getNumKH1digit(obj, true);
                        numKhr += getNumKHdigit(lenNewVal);
                    } else if (lenNewVal % 3 === 2) {
                        numKhr += getNumKH2digit(obj);
                    } else {
                        numKhr += getNumKH2digit(obj);
                    }

                } else if (lenNewVal > 6) {

                    if (lenNewVal % 3 === 0) {
                        nl10 += getNumKH1digit(obj);
                        nl10 += getNumKHdigit(3);
                    } else if (lenNewVal % 3 === 1) {
                        nl10 += getNumKH1digit(obj, true);
                        nl10 += getNumKHdigit(lenNewVal);
                    } else if (lenNewVal % 3 === 2) {
                        nl10 += getNumKH2digit(obj);
                    } else {
                        nl10 += getNumKH2digit(obj);
                    }
                    l10 += obj;

                } else if (lenNewVal > 3) {

                    if (lenNewVal % 3 === 0) {
                        nl7 += getNumKH1digit(obj);
                        nl7 += getNumKHdigit(3);
                    } else if (lenNewVal % 3 === 1) {
                        nl7 += getNumKH1digit(obj, true);
                        nl7 += getNumKHdigit(lenNewVal);
                    } else if (lenNewVal % 3 === 2) {
                        nl7 += getNumKH2digit(obj);
                    } else {
                        nl7 += getNumKH2digit(obj);
                    }

                    l7 += obj;

                } else if (lenNewVal === 3) {
                    nl4 += getNumKH1digit(obj);
                    nl4 += getNumKHdigit(3);
                    l4 += obj;
                } else if (lenNewVal === 2) {
                    nl4 += getNumKH2digit(obj);
                    l4 += obj;

                } else {
                    nl4 += getNumKH1digit(obj, true);
                    l4 += obj;
                }
            }
            lenNewVal--;
        })

        if (l10 > 0 || l7 > 0 || l4 > 0) {
            numKhr += nl10;
        }
        if (l7 > 0 || l4 > 0) {
            numKhr += nl7;
        }

        if (l4 > 0) {
            numKhr += nl4;
        }

        if (divideDot[1] && divideDot[1] !== "" && divideDot[1] !== null && divideDot[1] !== undefined) {
            numKhr += "ចុច" + this.numberInKhmer(divideDot[1]);
        }
        return numKhr;
    }

    static generateApiKey(username, secret) {
        let hash = crypto.createHmac("sha1", secret);
        hash.update(username);
        let hashed_data = hash.digest();
        return hashed_data.toString('hex');
    }

    static generateToken(loanAcc, amount, currencyId, repaymentDate, time, transactionId, api_key, merchant_id) {
        let hash = crypto.createHmac("sha512", merchant_id + api_key);
        hash.update(merchant_id + api_key + amount + currencyId + repaymentDate + time + transactionId);
        let hashed_data = hash.digest();
        return hashed_data.toString('base64');
    }


}


function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function getMonth(val) {
    let month = "";
    switch (val) {
        case "01":
            month = 'មករា';
            break;
        case "02":
            month = 'កុម្ភៈ';
            break;
        case "03":
            month = 'មីនា';
            break;
        case "04":
            month = 'មេសា';
            break;
        case "05":
            month = 'ឧសភា';
            break;
        case "06":
            month = 'មិថុនា';
            break;
        case "07":
            month = 'កក្កដា';
            break;
        case "08":
            month = 'សីហា';
            break;
        case "09":
            month = 'កញ្ញា';
            break;
        case "10":
            month = 'តុលា';
            break;
        case "11":
            month = 'វិច្ឆិកា';
            break;
        case "12":
            month = 'ធ្នូ';
            break;
        default:
            month = "";
            break;
    }
    return month;
}

function getMonthEn(val) {
    let month = "";
    switch (val) {
        case "01":
            month = 'Jan';
            break;
        case "02":
            month = 'Feb';
            break;
        case "03":
            month = 'Mar';
            break;
        case "04":
            month = 'Apr';
            break;
        case "05":
            month = 'May';
            break;
        case "06":
            month = 'Jun';
            break;
        case "07":
            month = 'Jul';
            break;
        case "08":
            month = 'Aug';
            break;
        case "09":
            month = 'Sep';
            break;
        case "10":
            month = 'Oct';
            break;
        case "11":
            month = 'Nov';
            break;
        case "12":
            month = 'Dec';
            break;
        default:
            month = "";
            break;
    }
    return month;
}

function getNumKH1digit(val, state) {
    let num = "";
    switch (val) {
        case "1":
            num = 'មួយ';
            break;
        case "2":
            num = 'ពីរ';
            break;
        case "3":
            num = 'បី';
            break;
        case "4":
            num = 'បួន';
            break;
        case "5":
            num = 'ប្រាំ';
            break;
        case "6":
            num = 'ប្រាំមួយ';
            break;
        case "7":
            num = 'ប្រាំពីរ';
            break;
        case "8":
            num = 'ប្រាំបី';
            break;
        case "9":
            num = 'ប្រាំបួន';
            break;
        case "0":
            num = state === true ? '' : "សូន្យ";
            break;
        default:
            num = "";
            break;
    }
    return num;
}

function getNumKH2digit(val) {
    let num = "";
    switch (val) {
        case "1":
            num = 'ដប់';
            break;
        case "2":
            num = 'ម្ភៃ';
            break;
        case "3":
            num = 'សាមសិប';
            break;
        case "4":
            num = 'សែសិប';
            break;
        case "5":
            num = 'ហាសិប';
            break;
        case "6":
            num = 'ហុកសិប';
            break;
        case "7":
            num = 'ចិតសិប';
            break;
        case "8":
            num = 'ប៉ែតសិប';
            break;
        case "9":
            num = 'កៅសិប';
            break;
        default:
            num = "";
            break;
    }
    return num;
}

function getNumKHdigit(val) {
    let num = "";
    switch (val) {
        case 3:
            num = 'រយ';
            break;
        case 4:
            num = 'ពាន់';
            break;
        case 7:
            num = 'លាន';
            break;
        case 10:
            num = 'កោត';
            break;
        default:
            num = "រយ";
            break;
    }
    return num;
}


let roundKhr = (amount, digit) => {
    if (digit <= 0) {
        return math.round(amount / digitToInt(digit), 0) * digitToInt(digit);
    } else {
        return math.round(amount, math.abs(digit));
    }
};
let roundKhrUp = (amount, digit) => {
    if (digit <= 0) {
        return Math.ceil(amount / digitToInt(digit), 0) * digitToInt(digit);
    } else {
        return Math.ceil(amount * digitToInt(digit)) / digitToInt(digit);
    }
};

let roundKhrDown = (amount, digit) => {
    if (digit <= 0) {
        return Math.floor(amount / digitToInt(digit), 0) * digitToInt(digit);
    } else {
        return Math.floor(amount * digitToInt(digit)) / digitToInt(digit);
    }
};

let digitToInt = (digit) => {
    let val = 1;
    for (let i = 1; i <= math.abs(digit); i++) {
        val *= 10;
    }
    return val;
};

let newFormFormat = (digit) => {
    let form = "(0,00";
    let k = 0;
    for (let i = 1; i <= digit; i++) {
        if (k === 0) {
            form += ".0";
        } else {
            form += "0";
        }
        k++;
    }
    form += ")";
    return form;
};


