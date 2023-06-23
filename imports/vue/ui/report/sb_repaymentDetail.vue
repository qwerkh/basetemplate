<template>
  <div class="repaymentDetail-report">
    <a4>
      <div slot="header" class="no-print" v-show="!isChild">
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
                <v-card-title>{{ $t('repaymentDetailTitle') }}
                  <v-spacer></v-spacer>
                  <print-button @run="printReport" v-shortkey="['ctrl','p']"
                                @shortkey.native="printReport"
                  ></print-button>
                  <v-btn @click="exportToExcel()" color="primary" dark>Export
                    <v-icon dark>mdi-file-excel</v-icon>
                  </v-btn>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <span slot="content" style="margin: 0px !important;font-family: 'Khmer OS Battambang'" id="section-to-print">
            <v-row type="flex" class="row-bg" justify="center">

                <div class="row" v-if="!isChild">
                                <div class="col-md-2"
                                     style="text-align: left !important;width: 20% !important; justify-content: center !important;float: left !important;">

                                        <span
                                            style="font-family:Khmer os muol; font-size: 15px  !important;padding-top: 15px !important;">
 <img style="width: auto;height: 100px; padding-top: 20px !important;padding-left: 12px !important;"
      src="/images/logo.png"
      :onLoad="onLoadHandler()"
      alt=""
 >

                                            </span>
                              </div>
                              <div class="col-md-8"
                                   style="text-align: center !important;width: 60% !important;">
                                   <span style="text-align: center;font-size: 15px; border: 0px !important;"
                                   >
                                  <span
                                      style="font-family: 'Khmer OS Muol light','Khmer OS Muol';font-size: 15px;vertical-align: middle !important;"><br>
                                    <p style="font-size: 18px;">{{ companyDoc.name }}</p>
                                    <p>{{ companyDoc.latinName }}</p>
                                    <p>Tel: {{ branchDoc.phoneNumber }}</p>

                                    <!--<hr width="225px"
                                        style="margin-top: 0px !important;margin-bottom: 5px !important;border-top:1px solid black !important;align-items: center">-->
                                        </span>


                              </span>
                                    <hr
                                        style="align-items: center; margin-top: 0px !important;margin-bottom: 5px !important;border-top:1px solid black !important;margin-left: 25% !important;margin-right: 25% !important;">


                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">សាខា៖ {{
                            branchDoc.name
                          }}</span><br>

                                   <span
                                       style="font-family: 'Khmer OS Muol'; font-size: 15px;">លម្អិតបង់ប្រាក់</span><br>
                                  <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">Detail Payment</span>
                              </div>
                              <div class="col-md-2" style="width: 20% !important;float: left !important;">&nbsp;</div>
                          </div>
                <v-col cols="12" style="overflow-x: auto;display: block;white-space: nowrap;">

                    <table class="tablePadding table-bordered printFontSize" id="mytableReport">

                <thead style="margin-top: 5px">
                    <tr><th style="color: blue" :colspan="!isNotPenalty ? 11 : 10">ព័តមានកាត់កងលើតារាងបង់ប្រាក់</th></tr>
                    <tr>
                       <th>{{ $t('no') }}</th>
                       <th style="text-align: center !important;">ថ្ងៃត្រូវបង់</th>
                       <th style="text-align: center !important;">ថ្ងៃបានបង់</th>
                       <th>ចំនួនថ្ងៃ</th>
                      <th style="text-align: center !important;">សមតុល្យប្រាក់ដើម</th>

                       <th style="text-align: center !important;">ប្រាក់ដើម</th>
                       <th style="text-align: center !important;">ការប្រាក់</th>
                       <th style="text-align: center !important;" v-if="!isNotPenalty">ពិន័យ</th>
                      <th style="text-align: center !important;">សរុបបានបង់</th>

                       <th style="text-align: center !important;">បានបង់រួច</th>
                       <th style="text-align: center !important;">អ្នកទទួល</th>
                    </tr>
                </thead>

                <tbody style="margin-bottom: 5px;" v-html="dataHtml">
                </tbody>


            </table>
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
import XLSX from "xlsx";
export default {
  name: "RepaymentDetailReport",
  meteor: {},
  props: {
    disbursementId: String
  },
  mounted() {
    this.$jQuery('body').off();
  },
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,
      params: {
        branch: [this.$store.state.branchId],
        disbursementId: this.disbursementId || ""
      },
      loading: false,
      branchOptionList: [],
      branchDoc: this.$store.state.branchDoc,
      companyDoc: this.$store.state.companyDoc,
      dataHtml: "",
      searchBranch: "",
      userDoc: Meteor.user(),
      selectRules: [
        v => !!v || 'Please Choose one',
      ],
      disbursementOption: [],
      searchDisbursement: "",
      disbursementDoc: {},
      clientDoc: {},
      houseDoc: {},
      blockDoc: {},
      productDoc: {},
      creditOfficerDoc: {},
      bankAccount: "",
      isOperationFee: false,
      isHasBankAccount: false,
      isNoteUp: false,
      isNoteDown: true,
      NotHideRate: true,
      hideRate: false,
      isNotPenalty: false,
      currencySymbol: "",
      isFooter: false,
      note: "",
      workTime: "",
    };
  },
  watch: {
    searchBranch(val) {
      val && val !== this.params.branch && this.fetchBranchOptionList(val)
    },
    searchDisbursement(val) {
      this.queryDisbursementOption(val);
    },
    "params.disbursementId"(val) {
      let vm = this;
      if (val) {
        Meteor.setTimeout(function () {
          vm.handleRun();
        }, 300)
      }
    }
  },
  created() {
    let vm = this;
    this.branchDoc = this.$store.state.branchDoc;
    this.queryDisbursementOption();
    this.fetchBranchOptionList();
    Meteor.call("sb_findLoanConfigByBranchId", vm.$store.state.branchId, Constants.secret, (err, result) => {
      if (result) {
        vm.bankAccount = result.bankAccount || "";
        vm.isOperationFee = result.isOperationFee;
        vm.isNotPenalty = result.isNotPenalty;
        vm.isNoteUp = result.isNoteUp || false;
        this.isNoteDown = !(result.isNoteUp || false);
        vm.NotHideRate = !(result.isHideRate || false);
        vm.hideRate = (result.isHideRate || false);
        vm.isFooter = result.note ? true : false;
        vm.note = result.note || "";
        vm.workTime = result.workTime || "";
        vm.isHasBankAccount = result.bankAccount && result.bankAccount != "" ? true : false;
      }
    })
    let disbursementId = vm.$route.params.disbursementId || this.disbursementId || "";
    if (disbursementId) {
      this.params.disbursementId = disbursementId;
      Meteor.setTimeout(function () {
        vm.handleRun();
      }, 300)
    }
  },
  methods: {
    printReport() {
      window.print();
    },
    exportToExcel() {
      let workbook = XLSX.utils.book_new();
      //var worksheet_data  =  [['hello','world']];
      //var worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);
      let worksheet_data = document.getElementById("mytableReport");
      //worksheet_data.prepend(<tr><th colspan='3'>របាយការណ៍</th></tr>);
      let worksheet = XLSX.utils.table_to_sheet(worksheet_data);
      workbook.SheetNames.push("RepaymetDetail");
      workbook.Sheets["RepaymetDetail"] = worksheet;
      GlobalFn.exportExcelFile(workbook, "RepaymetDetail "+this.clientDoc.name + moment().format("YYYYMMDD") + ".xlsx");
    },
    FormatNumber(val) {
      return GlobalFn.formatNumber(val);
    },
    FormatDate(val) {
      return GlobalFn.formatDate(val);
    },
    queryDisbursementOption(q) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("sb_fetchDisbursementOption", q, Constants.secret, vm.$store.state.branchId, (err, result) => {
          if (result) {
            vm.disbursementOption = result;
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
    handleRun() {
      let vm = this;
      this.loading = true;
      this.dataHtml = "";
      Meteor.call('sb_fetchRepaymentDetailReport', this.params, Constants.secret, vm.$i18n.locale, (err, result) => {
        if (result) {
          this.dataHtml = result.dataHtml;
          this.creditOfficerDoc = result.creditOfficerDoc;
          this.dateHeader = result.dateHeader;
          this.currencyHeader = result.currencyHeader;
          this.currencySymbol = result.currencySymbol;
          this.disbursementDoc = result.disbursementDoc;
          this.clientDoc = result.clientDoc;
          this.productDoc = result.productDoc;
        }
        this.loading = false;
      });
    },
    onLoadHandler: function () {
      this.onLoad = true;
    }
  },
  computed: {},
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
.row {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px !important;
}
</style>