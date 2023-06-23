<!--suppress ALL -->
<template>
  <div class="coTargetPlan-report">
    <a4>
      <div slot="header" class="no-print">
        <v-form
            :model="valid" ref="formReport"
            lazy-validation
        >
          <v-row type="flex" class="row-bg" justify="center">
            <v-col cols="12">
              <v-card
                  class="mx-auto"
                  max-width="100%"
              >
                <v-card-title>{{ $t('coTargetPlanTitle') }}
                  <v-spacer></v-spacer>
                  <print-button @run="printReport" v-shortkey="['ctrl','p']"
                                @shortkey.native="printReport"
                  ></print-button>
                  <run-button @run="handleRun" v-shortkey="['enter']"
                              v-show="!$vuetify.breakpoint.mobile"
                              @shortkey.native="handleRun" :loading="loading"></run-button>
                  <v-btn @click="exportToExcel()" color="warning" dark>Export
                    <v-icon dark>mdi-file-excel</v-icon>
                  </v-btn>

                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="4" sm="4" xs="4">
                      <v-autocomplete v-model="params.branch"
                                      :items="branchOptionList"
                                      outlined
                                      :dense="dense"
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('branch')"
                                      search-input
                                      chips
                                      small-chips
                                      clearable
                                      multiple
                                      :search-input.sync="searchBranch"
                      >
                      </v-autocomplete>

                    </v-col>
                    <v-col cols="12" md="4" sm="4" xs="4">
                      <v-autocomplete v-model="params.exchangeId"
                                      :items="exchangeOptionList"
                                      outlined
                                      dense
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('exchange')"
                                      search-input
                                      chips
                                      :search-input.sync="searchExchange"
                                      cache-items
                      >
                      </v-autocomplete>

                    </v-col>
                    <v-col cols="12" md="4" sm="4" xs="4">
                      <v-menu
                          v-model="menuDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                              v-model="params.year"
                              hint="YYYY/MM"
                              :label="$t('date')"

                              prepend-icon="event"
                              readonly
                              :dense="dense"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="params.year" type="month" @input="menuDate = false"></v-date-picker>
                      </v-menu>


                    </v-col>
                    <v-col cols="12" sm="4" md="4" class="d-flex">
                      <v-autocomplete v-model="params.staffId"
                                      :items="staffOption"
                                      outlined
                                      :dense="dense"
                                      clearable
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('creditOfficer')"
                                      search-input
                                      placeholder="All"
                                      required
                                      :search-input.sync="searchStaff"
                      >
                        <template v-slot:selection="{ item }">
                          {{ item.label.split(":")[0] }}
                        </template>
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" md="4" sm="4" xs="4">
                      <run-button @run="handleRun" v-shortkey="['enter']"
                                  v-show="!!$vuetify.breakpoint.mobile"
                                  @shortkey.native="handleRun" :loading="loading"></run-button>
                    </v-col>

                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <span slot="content" style="margin: 0px !important;" id="section-to-print">
            <v-row type="flex" class="row-bg" justify="center" id="mytableReport">


<div class="row" v-if="companyDoc.isHasBanner!==true"
     :style="companyDoc.isLongLogo ? 'text-align: center !important;display: flex !important;align-items: center !important;justify-content: center !important;margin-left: -250px !important;' : 'text-align: center !important;display: flex !important;align-items: center !important;justify-content: center !important;margin-left: -100px !important;'">

  <img
      :style="companyDoc.isLongLogo ? 'width: 250px;height: 100px;vertical-align: baseline !important;' :  'width: 100px;height: 100px;vertical-align: baseline !important;'"
      src="/images/logo.png"
      :onLoad="onLoadHandler()"
      alt="">
                                        <span
                                            style="font-family: 'Khmer OS Muol light','Khmer OS Muol';font-size: 15px;vertical-align: middle !important;"><br>
                                              <p style="font-size: 18px;">{{
                                                  companyDoc.name
                                                }}</p><p>{{ companyDoc.latinName }}</p>
      <hr
          style="align-items: center; margin-top: 0px !important;margin-bottom: 5px !important;border-top:1px solid black !important;margin-left: 25% !important;margin-right: 25% !important;">


                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">សាខា៖ {{
                            branchDoc.name
                          }}</span><br>
                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">អាស័យដ្ឋាន៖ {{
                            branchDoc.address
                          }}</span><br>
                                            <span
                                                style="font-family: 'Khmer OS Muol'; font-size: 15px;">លេខទូរស័ព្ទ៖ {{
                                                branchDoc.phoneNumber
                                              }}</span><br></span>
                          </div>
              <center v-if="companyDoc.isHasBanner">
                                   <img
                                       style="width: auto;height: 100px;"
                                       src="/images/banner.png"
                                       :onLoad="onLoadHandler()"
                                       alt=""
                                   >
                                  </center>
                          <br>
                <v-col cols="12" md="12" sm="12" style="text-align: center !important;padding: 0px !important;">
                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">{{
                            $t('coTargetPlanTitle')
                          }}</span><br>
                </v-col>
                <v-col cols="12" md="12" sm="12"
                       style="text-align: left !important;padding-top: 0px !important;padding-bottom: 0px !important;">
                        <span style="text-align: left;font-size: 15px; border: 0px !important;"
                        >
                                  <p style="font-family: 'Khmer OS Muol' !important;" class="blueOnPrint">លេខ :</p>
                                  <p style="font-family: 'Khmer OS Muol' !important;" class="blueOnPrint">ថ្ងៃ-ខែ-ឆ្នាំ : {{
                                      dayMonthYear
                                    }}</p>

                              </span>
                </v-col>

                <v-col cols="12" style="overflow-x: auto;display: block;white-space: nowrap;">

                    <table class="tablePadding table-bordered printFontSize">

                <thead style="margin-top: 5px">
                    <tr>
                       <th rowspan="3">{{ $t('no') }}</th>
                       <th rowspan="3">{{ $t('creditOfficerName') }}</th>
                       <th :colspan="lastMonth*2+1">{{ $t('monthly') }}</th>
                       <th :colspan="9">{{ $t('quarter') }}</th>
                       <th :colspan="5">{{ $t('semester') }}</th>
                       <th :rowspan="3">{{ $t('yearlyPlan') }}</th>
                       <th :rowspan="2"  colspan="2">{{ $t('yearly') }}</th>
                    </tr>
                    <tr>

                       <th rowspan="2">{{ $t('monthlyPlan') }}</th>
                       <th colspan="2" v-if="lastMonth>=1">{{ $t('january') }}</th>
                       <th colspan="2" v-if="lastMonth>=2">{{ $t('february') }}</th>
                       <th colspan="2" v-if="lastMonth>=3">{{ $t('march') }}</th>
                       <th colspan="2" v-if="lastMonth>=4">{{ $t('april') }}</th>

                       <th colspan="2" v-if="lastMonth>=5">{{ $t('may') }}</th>
                       <th colspan="2" v-if="lastMonth>=6">{{ $t('june') }}</th>
                       <th colspan="2" v-if="lastMonth>=7">{{ $t('july') }}</th>
                       <th colspan="2" v-if="lastMonth>=8">{{ $t('august') }}</th>
                       <th colspan="2" v-if="lastMonth>=9">{{ $t('september') }}</th>
                       <th colspan="2" v-if="lastMonth>=10">{{ $t('october') }}</th>
                       <th colspan="2" v-if="lastMonth>=11">{{ $t('november') }}</th>
                       <th colspan="2" v-if="lastMonth>=12">{{ $t('december') }}</th>

                       <th rowspan="2">{{ $t('quarterPlan') }}</th>
                       <th  colspan="2">{{ $t('quarter1') }}</th>
                       <th colspan="2">{{ $t('quarter2') }}</th>
                       <th colspan="2">{{ $t('quarter3') }}</th>
                       <th colspan="2">{{ $t('quarter4') }}</th>
                       <th rowspan="2">{{ $t('semesterPlan') }}</th>
                       <th colspan="2">{{ $t('semester1') }}</th>
                       <th colspan="2">{{ $t('semester2') }}</th>

                    </tr>
                    <tr>
                      <th  v-if="lastMonth>=1">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=1">{{"%"}}</th>

                      <th  v-if="lastMonth>=2">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=2">{{"%"}}</th>

                      <th  v-if="lastMonth>=3">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=3">{{"%"}}</th>

                      <th  v-if="lastMonth>=4">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=4">{{"%"}}</th>

                      <th  v-if="lastMonth>=5">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=5">{{"%"}}</th>

                      <th  v-if="lastMonth>=6">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=6">{{"%"}}</th>

                      <th  v-if="lastMonth>=7">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=7">{{"%"}}</th>

                      <th  v-if="lastMonth>=8">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=8">{{"%"}}</th>

                      <th  v-if="lastMonth>=9">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=9">{{"%"}}</th>

                      <th  v-if="lastMonth>=10">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=10">{{"%"}}</th>

                      <th  v-if="lastMonth>=11">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=11">{{"%"}}</th>

                      <th  v-if="lastMonth>=12">{{$t('reach')}}</th>
                      <th  v-if="lastMonth>=12">{{"%"}}</th>

                      <th>{{$t('reach')}}</th>
                      <th>{{"%"}}</th>
                      <th>{{$t('reach')}}</th>
                      <th>{{"%"}}</th>
                      <th>{{$t('reach')}}</th>
                      <th>{{"%"}}</th>
                      <th>{{$t('reach')}}</th>
                      <th>{{"%"}}</th>
                      <th>{{$t('reach')}}</th>
                      <th>{{"%"}}</th>
                      <th>{{$t('reach')}}</th>
                      <th>{{"%"}}</th>
                      <th>{{$t('reach')}}</th>
                      <th>{{"%"}}</th>
                    </tr>

                </thead>

                <tbody class="tableCollapse" style="margin-bottom: 5px;" v-html="dataHtml">
                </tbody>


            </table>

                    <div class="row" style="width: 100% !important;font-size: 11px !important;">
                       <div style="width: 50%;float: left !important;text-align: center !important;">
                        បានឃើញ និង ពិនិត្យត្រឹមត្រូវ<br><br>
                        ............... ថ្ងៃ ..........ខែ  .............ឆ្នាំ ...............<br><br>

                        <span
                            style="font-family: 'Khmer OS Muol'">ប្រធាន</span>
                    </div>



                    <div style="width: 50%;float: right !important;text-align: center !important;">
                          ............... ថ្ងៃ ..........ខែ  .............ឆ្នាំ ...............<br><br>
                        <b>រៀបចំដោយ</b>
                    </div>

                </div>
                    </v-col>
            </v-row>

           </span>
    </a4>
  </div>
</template>

<script>
import PageA4Lanscape from '/imports/vue/ui/report/page/PageA4Lanscape';
import RunButton from "../../components/runButton";
import {Exchange} from "../../../collections/exchange";
import {Constants} from "../../../libs/constant"
import GlobalFn from "../../../libs/globalFn"
import PrintButton from "../../components/printButton";
import {Sb_LoanConfig} from "../../../collections/sb_loanConfig";
import XLSX from "xlsx";
import {Meteor} from "meteor/meteor";

export default {
  name: "CoTargetPlanReport",
  meteor: {},
  mounted() {
    this.$jQuery('body').off();
  },
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,
      params: {
        branch: [this.$store.state.branchId],
        year: moment().format("YYYY-MM"),
        exchangeId: Exchange.findOne({status: true}) && Exchange.findOne({status: true})._id || "",
        staffId: "",

      },
      loading: false,
      branchOptionList: [],
      branchDoc: this.$store.state.branchDoc,
      companyDoc: this.$store.state.companyDoc,
      dataHtml: "",
      searchBranch: "",
      searchProduct: "",
      productOption: [],
      userDoc: Meteor.user(),
      menuDate: false,
      menuTimeStart: false,
      menuTimeEnd: false,
      selectRules: [
        v => !!v || 'Please Choose one',
      ],
      staffOption: [],
      searchStaff: "",
      pickDateListRange: Constants.pickDateListRange,
      exchangeOptionList: [],
      isOperationFee: false,
      lastMonth: 1

    };
  },
  watch: {
    searchBranch(val) {
      val && val !== this.params.branch && this.fetchBranchOptionList(val)
    },
    searchStaff(val) {
      if (val !== null) {
        this.queryStaffOption(val);
      }
    },
    searchProduct(val) {
      if (val !== null) {
        this.queryProductOption(val);
      }
    },
  },
  created() {
    let vm = this;

    this.branchDoc = this.$store.state.branchDoc;
    this.fetchExchangeOptionList();
    this.queryStaffOption();
    vm.queryProductOption();

    this.fetchBranchOptionList();
    let loanConfig = Sb_LoanConfig.findOne({branchId: this.branchDoc._id});
    this.isOperationFee = loanConfig && loanConfig.isOperationFee;

  },
  methods: {
    printReport() {
      window.print();
    },

    exportToExcel() {
      let workbook = XLSX.utils.book_new();

      //var worksheet_data  =  [['hello','world']];
      //var worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);
      $("td").each(function (index) {
        if ($(this).css('display') == 'none') {
          $(this).remove();
        }
      });
      $("th").each(function (index) {
        if ($(this).css('display') == 'none') {
          $(this).remove();
        }
      });

      let worksheet_data = document.getElementById("mytableReport");
      //worksheet_data.prepend(<tr><th colspan='3'>របាយការណ៍</th></tr>);
      let worksheet = XLSX.utils.table_to_sheet(worksheet_data);

      workbook.SheetNames.push("CoTargetPlan");
      workbook.Sheets["CoTargetPlan"] = worksheet;

      GlobalFn.exportExcelFile(workbook, "CoTargetPlan " + moment().format("YYYYMMDD") + ".xlsx");
    },
    FormatNumber(val) {
      return GlobalFn.formatNumber(val);
    },
    FormatDate(val) {
      return GlobalFn.formatDate(val);
    },
    queryProductOption(q) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("sb_fetchLoanProductOption", q, Constants.secret, vm.$store.state.branchId, (err, result) => {
          if (result) {
            vm.productOption = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })

    },
    queryStaffOption(q) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("sb_fetchStaffOption", q, Constants.secret, vm.$store.state.branchId, (err, result) => {
          if (result) {
            vm.staffOption = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })

    },
    fetchBranchOptionList(q) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("base_fetchBranchOptionList", q, Constants.secret, (err, result) => {
          if (!err) {
            vm.branchOptionList = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })
    },
    fetchExchangeOptionList(q) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("base_fetchExchangeOptionList", q, Constants.secret, (err, result) => {
          if (!err) {
            vm.exchangeOptionList = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })
    },
    handleRun() {
      let vm = this;
      this.loading = true;
      if (this.$refs.formReport.validate()) {
        this.dataHtml = "";
        Meteor.call('sb_fetchCoTargetPlanReport', this.params, Constants.secret, vm.$i18n.locale, (err, result) => {
          if (result) {
            this.dataHtml = result.dataHtml;
            this.lastMonth = result.lastMonth;
          }
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    },
    onLoadHandler: function () {
      this.onLoad = true;
    }
  },
  computed: {
    dateRangeText() {
      return this.params.dateRange.join(' ~ ');
    },
  },
  components: {
    a4: PageA4Lanscape,
    RunButton,
    PrintButton,
  },
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}
</style>