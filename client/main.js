import {Meteor} from 'meteor/meteor';
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';// here!
import {vuetify} from '/client/plugins/vuetify' // path to vuetify export
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import {router} from "./routes/index";
import i18n from "./i18n/index"
import {store} from "../imports/vuex/index"
import GlobalFn from "../imports/libs/globalFn"
import "./plugins/vueShortKey";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./subscriptions/subscription"
import "./stylesheet/main.css";
import XLSX from 'xlsx';
import VCharts from 'v-charts'
import numeral from "numeral"
import {Company} from "../imports/collections/company"
import math from "mathjs"

Vue.use(VCharts)

Vue.prototype.$jQuery = $;
Vue.prototype.$_numeral = numeral;
Vue.use(ElementUI);

Vue.use(VueMeteorTracker);
Vue.use(XLSX);

Vue.filter('numFormat', (val) => {
    if (val === "") {
        return 0;
    }
    return GlobalFn.seperateNumber(numeral(val).format('0,0.00'));
});

Vue.filter('numFormatBaseCurrency', (val, currencyId) => {
    if (val === "") {
        return 0;
    }
    if (currencyId === undefined) {
        let settingDoc = Company.findOne();
        currencyId = settingDoc.baseCurrency;
    }
    if (currencyId === "KHR") {
        return numeral(val).format('0,0');
    } else if (currencyId === "USD") {
        return numeral(val).format('0,0.00');
    } else if (currencyId === "THB") {
        return numeral(val).format('0,0');
    }

});


Vue.filter('momentFormat', (val) => {
    if (val) {
        return moment(val).format('DD/MM/YYYY');
    }
    return "";
});
Vue.filter('getCurrencySymbol', (val) => {
    if (val === "KHR") {
        return "៛";
    } else if (val === "USD") {
        return "$";
    } else if (val === "THB") {
        return "B"
    }
    return "";
});
Vue.filter('seperateNumber', (val) => {
    if (val !== "" && val !== undefined && val !== 0 && val !== '0' && val !== null) {
        val = math.round(numeral(val).value(), 2);
        val = numeral(val).value() + "";
        let newVal = val.split(".");
        return newVal[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (!!newVal[1] ? "." + newVal[1] : "");
    }
    return "";
});
Vue.filter('momentFormatTimestamp', (val) => {
    if (val) {
        return moment(new Date(val * 1000)).format('YYYY-MMM-DD HH:mm:ss');
    }
    return "";
});

import App from '../imports/vue/App.vue';
//import Global from "echarts/src/model/Global";

Meteor.startup(() => {
    new Vue({
        vuetify,
        router,
        i18n,
        store,
        ...App,

    }).$mount('#app');
});