<template>
  <div>

    <v-row>
      <v-col cols="12" md="12" sm="12" class="d-flex flex-row justify-end">
        <span style="color: white">Welcome For Use</span>
      </v-col>
      <v-col cols="12" md="12" sm="12" class="d-flex flex-row justify-center">
        <ul class="custom-module" v-if="moduleList && (moduleList.indexOf('Loan')>-1) || false"
            @click="changeModule('Loan')"
        >

          <li>
            <v-icon style="color: white;font-size: 30px !important;">pan_tool</v-icon>
            <br>
            Loan
          </li>
        </ul>
        <ul class="custom-module" v-if="moduleList && (moduleList.indexOf('Loan')>-1) || false"
            @click="changeModule('CCL')"
        >
          <li>
            <v-icon style="color: white;font-size: 30px !important;">attach_money</v-icon>
            <br>
            CALC
          </li>
        </ul>

      </v-col>
      <v-col cols="12" md="12" sm="12" class="d-flex flex-row justify-center">
        <ul class="custom-module" v-if="moduleList && (moduleList.indexOf('Account')>-1) || false"
            @click="changeModule('Account')"
        >

          <li>
            <v-icon style="color: white;font-size: 30px !important;">book</v-icon>
            <br>
            Acco
          </li>
        </ul>
        <ul class="custom-module" v-if="moduleList && (moduleList.indexOf('Saving')>-1) || false"
            @click="changeModule('Saving')"
        >
          <li>
            <v-icon style="color: white;font-size: 30px !important;">schedule</v-icon>
            <br>
            INVE
          </li>
        </ul>
      </v-col>

    </v-row>
    <v-row v-if="currentModule==='Loan'">

      <v-col cols="12" md="6" sm="6" lg="3" class="mgTop" v-if="checkRole('Admin')">
        <v-card style="padding: 12px !important;" elevation="9"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card style="top:-30px !important;max-height: 90px;background-color: #ff9800;padding: 28px !important;"
                    dark raised>
              <v-icon style="font-size: 32px !important;">mdi-file-cloud
              </v-icon>
            </v-card>
            <div>
              {{ $t('loanOutstanding') }}
              <h2>{{ displayBox.loanOutstanding |seperateNumber }}</h2>

            </div>
          </div>
          <hr class="v-divider theme--light">

          <span class="caption blue--text font-weight-light"><v-icon
              style="font-size: 16px;">mdi-clock</v-icon> {{ $t('qty') }}</span>
          <span style="float: right">
                            {{ displayBox.numberOfLoanOutstanding | seperateNumber }}   </span>

        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="6" lg="3" class="mgTop" v-if="checkRole('Admin')">
        <v-card style="padding: 12px !important;" elevation="9"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card style="top:-30px !important;max-height: 90px;background-color: teal;padding: 28px !important;"
                    dark raised>
              <v-icon style="font-size: 32px !important;">mdi-cash-multiple
              </v-icon>
            </v-card>
            <div>
              {{ $t('totalDisbursement') }}
              <h2>{{ displayBox.totalDisbursement |seperateNumber }}</h2>

            </div>
          </div>
          <hr class="v-divider theme--light">

          <span class="caption blue--text font-weight-light"><v-icon
              style="font-size: 16px;">mdi-clock</v-icon> {{ $t('qty') }}</span>
          <span style="float: right">
                            {{ displayBox.numberOfTotalDisbursement | seperateNumber }}   </span>

        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="6" lg="3" class="mgTop" v-if="checkRole('Admin')">
        <v-card style="padding: 12px !important;" elevation="9"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card style="top:-30px !important;max-height: 90px;background-color:#00cae3;padding: 28px !important;"
                    dark raised>
              <v-icon style="font-size: 32px !important;">mdi-beaker
              </v-icon>
            </v-card>
            <div>
              {{ $t('payOffToday') }}
              <h2>{{ displayBox.numPayOffToday | seperateNumber }}</h2>

            </div>
          </div>
          <hr class="v-divider theme--light">

          <span class="caption blue--text font-weight-light"><v-icon
              style="font-size: 16px;">mdi-clock</v-icon>  {{ $t('payOffThisMonth') }}</span>
          <span style="float: right">
                            {{ displayBox.numPayOffThisMonth | seperateNumber }} </span>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="6" lg="3" class="mgTop" v-if="checkRole('Admin')">
        <v-card style="padding: 12px !important;" elevation="9"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card style="top:-30px !important;max-height: 90px;background-color: #4caf50;padding: 28px !important;"
                    dark raised>
              <v-icon style="font-size: 32px !important;">mdi-cash
              </v-icon>
            </v-card>
            <div>
              {{ $t('receiveToday') }}
              <h2>{{ displayBox.receiveToday | seperateNumber }} <span style="color: blue">( {{
                  displayBox.numReceiveToday | seperateNumber
                }})</span></h2>
            </div>
          </div>
          <hr class="v-divider theme--light">

          <span class="caption blue--text font-weight-light"><v-icon
              style="font-size: 16px;">mdi-clock</v-icon>  {{ $t('receiveThisMonth') }}</span>
          <span style="float: right">
                            {{ displayBox.receiveThisMonth | seperateNumber }} <span style="color: blue">( {{
              displayBox.numReceiveThisMonth | seperateNumber
            }})</span>  </span>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="6" lg="3" class="mgTop" v-if="checkRole('Admin')">
        <v-card style="padding: 12px !important;" elevation="9"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card style="top:-30px !important;max-height: 90px;background-color: #2196f3;padding: 28px !important;"
                    dark raised>
              <v-icon style="font-size: 32px !important;">mdi-account-multiple-plus
              </v-icon>
            </v-card>
            <div>
              {{ $t('disbursementToday') }}
              <h2>{{ displayBox.disbursementToday | seperateNumber }} <span style="color: blue">( {{
                  displayBox.numDisbursementToday | seperateNumber
                }})</span></h2>

            </div>
          </div>
          <hr class="v-divider theme--light">

          <span class="caption blue--text font-weight-light"><v-icon
              style="font-size: 16px;">mdi-clock</v-icon> {{ $t('disbursementThisMonth') }}</span>
          <span style="float: right">
                            {{ displayBox.disbursementThisMonth | seperateNumber }} <span style="color: blue">( {{
              displayBox.numDisbursementThisMonth | seperateNumber
            }})</span>  </span>
        </v-card>
      </v-col>

      <v-col
          cols="12"
          sm="12"
          v-if="isTargetPlan || false"
          md="12"
      >
        <v-sheet
            elevation="10"
            class="py-4 px-1"

        >
          <v-chip-group
              mandatory
              active-class="success--text"
              v-model="params.year"
          >
            <v-chip
                v-for="y in yearList"
                :key="y"
                :value="y"
                style="font-weight: bold;font-size: 20px"
            >
              {{ y }}
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-col cols="12" sm="8" md="8" v-if="checkRole('Admin') && isTargetPlan || false">
        <v-card
            color="white"
            dark
            style="border-color: white;padding-left: 20px;padding-right: 20px"
        >
          <v-card-title style="display: inherit !important;text-align: center !important;color: blue">
            គោលដៅប្រចាំខែ
          </v-card-title>
          <ve-histogram :data="chartDataMonthly" :settings="chartSettings"></ve-histogram>
          <hr class="v-divider theme--light">
          <span class="caption grey--text font-weight-light"><v-icon
              style="font-size: 16px;color: green">mdi-target</v-icon> MONTHLY TARGET</span>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" md="4" v-if="checkRole('Admin') && isTargetPlan || false">
        <v-card
            color="white"
            dark
            elevation="9"
            style="border-color: white;padding-left: 20px;padding-right: 20px"
        >
          <v-card-title style="display: inherit !important;text-align: center !important;color: blue">
            គោលដៅប្រចាំឆ្នាំ
          </v-card-title>
          <ve-pie :data="chartPieDisbursement" :settings="chartSettings"></ve-pie>
          <hr class="v-divider theme--light">

          <span class="caption grey--text font-weight-light"><v-icon
              style="font-size: 16px;color: green">mdi-target</v-icon> YEARLY TARGET</span>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="8" v-if="checkRole('Admin') && isTargetPlan || false">
        <v-card
            color="white"
            dark
            style="border-color: white;padding-left: 20px;padding-right: 20px"
        >
          <v-card-title style="display: inherit !important;text-align: center !important;color: blue">
            គោលដៅប្រចាំត្រីមាស
          </v-card-title>
          <ve-histogram :data="chartDataQuarter" :settings="chartSettings"></ve-histogram>
          <hr class="v-divider theme--light">
          <span class="caption grey--text font-weight-light"><v-icon
              style="font-size: 16px;color: green">mdi-target</v-icon> QUARTER TARGET</span>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" md="4" v-if="checkRole('Admin') && isTargetPlan || false">
        <v-card
            color="white"
            dark
            style="border-color: white;padding-left: 20px;padding-right: 20px"
        >
          <v-card-title style="display: inherit !important;text-align: center !important;color: blue">
            គោលដៅប្រចាំឆមាស
          </v-card-title>
          <ve-histogram :data="chartDataSemester" :settings="chartSettings"></ve-histogram>
          <hr class="v-divider theme--light">
          <span class="caption grey--text font-weight-light"><v-icon
              style="font-size: 16px;color: green">mdi-target</v-icon> SEMESTER TARGET</span>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card
            color="#385F73"
            dark
            style="border-color: white;padding-left: 20px;padding-right: 20px"
        >
          <v-card-title class="headline">
            <v-icon style="color: red">open_with</v-icon>
            &nbsp; ទស្សនៈវិស័យ
          </v-card-title>

          <!--<v-card-subtitle><br>
              {{companyDoc && companyDoc.vision || ""}}

          </v-card-subtitle>-->
          <v-card-actions style="text-align: justify">
            &nbsp;&nbsp;&nbsp; {{ companyDoc && companyDoc.vision || "" }}
          </v-card-actions>

          <v-card-title class="headline">
            <v-icon style="color: red">open_with</v-icon>
            &nbsp; បេសកកម្ម
          </v-card-title>

          <v-card-actions style="text-align: justify">
            &nbsp;&nbsp;&nbsp; {{ companyDoc && companyDoc.mission || "" }}
          </v-card-actions>
          <v-card-title class="headline">
            <v-icon style="color: red">open_with</v-icon>
            &nbsp; គុណតម្លៃ
          </v-card-title>

          <v-card-actions style="text-align: justify" v-for="d in companyDoc && companyDoc.values || []">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<v-icon>minimize</v-icon>
            &nbsp;{{ d || "" }}
          </v-card-actions>
          <v-card-title class="headline">
            <v-icon style="color: red">open_with</v-icon>
            &nbsp; Telegram Bot Link
          </v-card-title>

          <v-card-actions style="text-align: justify" v-if="companyDoc && companyDoc.telegramBotLink || ''">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;
            <b style="color: blue; cursor: pointer"
               @click="openLink(companyDoc.telegramBotLink)">{{ companyDoc.telegramBotLink || "" }}</b>
          </v-card-actions>

          <!--<v-card-subtitle><br>
              {{companyDoc && companyDoc.mission || ""}}}
          </v-card-subtitle>-->

          <!-- <v-card-actions>
               <v-btn text>Listen Now</v-btn>
           </v-card-actions>-->
        </v-card>
      </v-col>

      <v-col cols="12" md="12" sm="12" class="d-flex flex-row justify-center">
        <h1 style="color:white">Thank You!</h1>
      </v-col>
    </v-row>
    <!-- <ul class="custom-module">
         {{#each moduleOptions}}
         <li class="select-module {{#if currentModule}}active-module{{/if}}">{{{label}}}</li>
         {{/each}}
     </ul>-->
  </div>
</template>

<script>
import {mapActions} from "vuex"
import {Company} from "../../collections/company";
import GlobalFn from "../../libs/globalFn";
import {Meteor} from "meteor/meteor";
import {Constants} from "../../libs/constant";

export default {
  name: "Home",
  mounted() {
    this.$jQuery('body').off();
  },
  data() {
    this.chartSettings = {
      label: {
        normal: {show: false, position: "top"},
      }
    }
    return {
      currentModule: "",
      params: {
        year: moment().format("YYYY"),
        branchId: this.$store.state.branchId
      },
      dense: this.$store.state.isDense,
      test: "Hi",
      companyDoc: {},
      loading: false,
      moduleList: Meteor.user() && Meteor.user().module,
      yearList: [],
      chartDataMonthly: {
        columns: ['date', 'reach', 'plan'],
        rows: []
      },
      chartDataQuarter: {
        columns: ['date', 'reach', 'plan'],
        rows: []
      },
      chartDataSemester: {
        columns: ['date', 'reach', 'plan'],
        rows: []
      },
      chartPieDisbursement: {
        columns: ['plan', 'amount'],
        rows: []
      },
      isTargetPlan: false,
      displayBox: {
        loanOutstanding: 0,
        numberOfLoanOutstanding: 0,
        totalDisbursement: 0,
        numberOfTotalDisbursement: 0,
        numPayOffToday: 0,
        numPayOffThisMonth: 0,
        receiveToday: 0,
        receiveThisMonth: 0,
        numReceiveToday: 0,
        numReceiveThisMonth: 0,
        disbursementToday: 0,
        disbursementThisMonth: 0,
        numDisbursementToday: 0,
        numDisbursementThisMonth: 0,
      }

    }
  },
  watch: {
    "params.year"(val) {
      this.getDisbursementGraph();
    }
  },
  methods: {
    ...mapActions(["updateModule"]),
    changeModule(val) {
      let vm = this;
      vm.updateModule(val);
      if (val !== "CCL") {
        vm.$router.push("welcome");

      } else {
        vm.$router.push("repaymentScheduleCCLReport");

      }
    },
    checkRole(roles) {
      return GlobalFn.CheckRoles({roles});
    },
    openLink(url) {
      window.open(
          "https://" + url, "_blank")

    },
    getDisbursementGraph() {
      let vm = this;
      vm.loading = true;
      Meteor.setTimeout(function () {
        if (vm.params.branchId && vm.params.year) {
          Meteor.call('sb_fetchDisbursementGraphReport', vm.params, Constants.secret, vm.$i18n.locale, (err, result) => {
            if (result) {
              vm.chartDataMonthly.rows = result.monthly;
              vm.chartDataQuarter.rows = result.quarter;
              vm.chartDataSemester.rows = result.semester;
              vm.chartPieDisbursement.rows = result.year;
            }
            vm.loading = false;
          });
        }
        vm.loading = false;
      }, 500)
    },
    getDisplayBox() {
      let vm = this;
      Meteor.setTimeout(function () {
        if (vm.params.branchId && vm.params.year) {
          Meteor.call('sb_fetchDisbursementDisplayBoxReport', vm.params, Constants.secret, vm.$i18n.locale, (err, result) => {
            if (result) {
              vm.displayBox.loanOutstanding = result.loanOutstanding;
              vm.displayBox.numberOfLoanOutstanding = result.numberOfLoanOutstanding;
              vm.displayBox.totalDisbursement = result.totalDisbursement;
              vm.displayBox.numberOfTotalDisbursement = result.numberOfTotalDisbursement;

              vm.displayBox.numPayOffToday = result.numPayOffToday;
              vm.displayBox.numPayOffThisMonth = result.numPayOffThisMonth;
              vm.displayBox.receiveToday = result.receiveToday;
              vm.displayBox.receiveThisMonth = result.receiveThisMonth;
              vm.displayBox.numReceiveToday = result.numReceiveToday;
              vm.displayBox.numReceiveThisMonth = result.numReceiveThisMonth;
              vm.displayBox.disbursementToday = result.disbursementToday;
              vm.displayBox.disbursementThisMonth = result.disbursementThisMonth;
              vm.displayBox.numDisbursementToday = result.numDisbursementToday;
              vm.displayBox.numDisbursementThisMonth = result.numDisbursementThisMonth;
            }
            vm.loading = false;
          });
        }
        vm.loading = false;
      }, 500)
    }
  },
  created() {
    let vm = this;
    vm.currentModule = vm.$store.state.currentModule;
    this.companyDoc = Company.findOne({});
    vm.getDisplayBox();
    this.yearList = [];
    let i = 15;
    while (i >= 0) {
      this.yearList.push(moment().add(-i, "year").format("YYYY"));
      i--;
    }
    let userDoc = Meteor.user();
    vm.params.branchId = vm.$store.state.branchId || (userDoc && userDoc.defaultBranch || "");
    this.getDisbursementGraph();
    Meteor.setTimeout(function () {
      vm.isTargetPlan = vm.companyDoc && vm.companyDoc.isTargetPlan || false;
    }, 400)
  }
}
</script>


<style scoped>

</style>