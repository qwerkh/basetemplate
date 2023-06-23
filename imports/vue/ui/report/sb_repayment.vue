<!--suppress ALL -->
<template>
  <div class="repayment-report">
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
                <v-card-title>{{ $t('repaymentTitle') }}
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
                              v-model="dateRangeText"
                              hint="YYYY/MM/DD-YYYY/MM/DD"
                              :label="$t('dateRange')"

                              prepend-icon="event"
                              readonly
                              :dense="dense"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-card v-show="!$vuetify.breakpoint.mobile"
                                style="float: left;border-radius: 0px !important;padding-bottom: 17px !important;">
                          <v-list style="padding: 0px !important;">
                            <v-list-item-group color="primary">
                              <v-list-item style="min-height: 40px; !important;"
                                           v-for="(d, i) in pickDateListRange"
                                           :key="i"
                              >
                                <v-list-item-content @click="pickDateRange(d)"
                                                     style="padding:5px !important;">
                                  <v-list-item-title
                                      v-text="$t(d)"></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                        </v-card>
                        <v-date-picker v-model="params.dateRange" range
                                       @input="menuDate = !(params.dateRange.length===2)"></v-date-picker>
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
                      <v-autocomplete v-model="params.paymentType"
                                      :items="paymentTypeOptions"
                                      outlined
                                      dense
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('paymentType')"
                                      search-input
                                      chips
                                      clearable
                                      placeholder="All"
                                      cache-items
                      >
                      </v-autocomplete>

                    </v-col>
                    <v-col cols="12" sm="4" md="4" class="d-flex" v-if="companyDoc.isSpecialLoan">
                      <v-autocomplete v-model="params.bpId"
                                      :items="bpOptions"
                                      outlined
                                      :dense="dense"
                                      clearable
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('businessPartner')"
                                      search-input
                                      placeholder="All"
                                      required
                                      :search-input.sync="searchBP"
                      >
                        <template v-slot:selection="{ item }">
                          {{ item.label }}
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" class="d-flex" v-if="companyDoc.isPaymentType">
                      <v-select
                          v-model="params.cashType"
                          :items="cashTypeOption"
                          :dense="dense"
                          clearable
                          outlined
                          item-text="label"
                          item-value="value"
                          :label="$t('cashType')"
                          placeholder="All"
                          dense
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4" class="d-flex"  v-if="companyDoc.isProductType===true">
                      <v-autocomplete v-model="params.productTypeId"
                                      :items="productTypeOption"
                                      outlined
                                      :dense="dense"
                                      clearable
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('productType')"
                                      placeholder="All"
                                      search-input
                                      required
                      >
                        <template v-slot:selection="{ item }">
                          {{ item.label }}
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
                                            style="font-family: 'Khmer OS Muol light','Khmer OS Muol';font-size: 15px;vertical-align: middle !important;text-align: center"><br>
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
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">{{ $t('repaymentTitle') }}</span><br>
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
                       <th>{{ $t('no') }}</th>
                       <th>{{ $t('voucher') }}</th>
                       <th>{{ $t('loanAcc') }}</th>
                       <th>{{ $t('clientName') }}</th>

                       <th>{{ $t('collectDate') }}</th>
                                             <th>{{ $t('type') }}</th>

                       <th>{{ $t('collectPrinciple') }}</th>
                       <th>{{ $t('collectInterest') }}</th>
                       <th v-show="isOperationFee">{{ $t('collectOperationFee') }}</th>
                       <th>{{ $t('collectAdminFee') }}</th>
                       <th v-if="companyDoc.isInsuranceFee">{{ $t('insuranceFee') }}</th>
                       <th>{{ $t('collectPenalty') }}</th>
                      <th>{{ $t('totalCollect') }}</th>
                      <th v-if="companyDoc.isFeeLaw">{{ $t('lawFee') }}</th>
                      <th v-if="companyDoc.isSpecialLoan">{{ $t('roFee') }}</th>
                      <th v-if="companyDoc.isSpecialLoan">{{ $t('bpFee') }}</th>

                       <th>{{ $t('paymentType') }}</th>
                       <th>{{ $t('currency') }}</th>
                       <th>{{ $t('accType') }}</th>

                        <th>{{ $t('loanAmount') }}</th>
                       <th>{{ $t('projectInterest') }}</th>
                       <th>{{ $t('address') }}</th>

                       <th>{{ $t('receiver') }}</th>

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
  name: "RepaymentReport",
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
        dateRange: [moment().startOf("months").format("YYYY-MM-DD"), moment().endOf("months").format("YYYY-MM-DD")],
        exchangeId: Exchange.findOne({status: true}) && Exchange.findOne({status: true})._id || "",
        staffId: "",
        paymentType: "",
        bpId: "",
        productTypeId: "",
        cashType: ""
      },
      loading: false,
      bpOptions: [],
      productTypeOption: [],
      branchOptionList: [],
      branchDoc: this.$store.state.branchDoc,
      companyDoc: this.$store.state.companyDoc,
      dataHtml: "",
      searchBranch: "",
      userDoc: Meteor.user(),
      menuDate: false,
      menuTimeStart: false,
      menuTimeEnd: false,
      selectRules: [
        v => !!v || 'Please Choose one',
      ],
      staffOption: [],
      searchStaff: "",
      searchBP: "",
      pickDateListRange: Constants.pickDateListRange,
      exchangeOptionList: [],
      isOperationFee: false,
      paymentTypeOptions: [
        {label: "Fee", value: "Fee"},
        {label: "Repayment", value: "Repayment"},
        {label: "Prepay", value: "Prepay"},
        {label: "Pay Off", value: "Pay Off"},
        {label: "Write Off", value: "Write Off"},
      ],
      cashTypeOption: []

    };
  },
  watch: {
    searchBranch(val) {
      val && val !== this.params.branch && this.fetchBranchOptionList(val)
    },
    searchStaff(val) {
      if (val !== null) {
        val && this.queryStaffOption(val);
      }
    },
    searchBP(val) {
      if (val !== null) {
        val && this.queryBPOption(val);
      }
    },
  },
  created() {
    let vm = this;

    this.branchDoc = this.$store.state.branchDoc;
    this.fetchExchangeOptionList();
    this.queryStaffOption();
    this.queryBPOption();
    this.fetchCashTypeOption();

    vm.queryProductTypeOption();
    this.fetchBranchOptionList();
    let loanConfig = Sb_LoanConfig.findOne({branchId: this.branchDoc._id});
    this.isOperationFee = loanConfig && loanConfig.isOperationFee;

  },
  methods: {
    printReport() {
      window.print();
    },
    queryProductTypeOption() {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("sb_fetchProductTypeOption",Constants.secret, vm.$store.state.branchId, (err, result) => {
          if (result) {
            vm.productTypeOption = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })

    },
    queryBPOption(q) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("sb_fetchBusinessPartnerOption", q, Constants.secret, vm.$store.state.branchId, (err, result) => {
          if (result) {
            vm.bpOptions = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })

    },
    fetchCashTypeOption() {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call('sb_fetchPaymentTypeOption', Constants.secret, vm.$store.state.branchId, (err, result) => {
          vm.cashTypeOption = result;
        })
      });
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

      workbook.SheetNames.push("Repayment");
      workbook.Sheets["Repayment"] = worksheet;

      GlobalFn.exportExcelFile(workbook, "Repayment " + moment().format("YYYYMMDD") + ".xlsx");
    },
    FormatNumber(val) {
      return GlobalFn.formatNumber(val);
    },
    FormatDate(val) {
      return GlobalFn.formatDate(val);
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
    pickDateRange(d) {
      let vm = this;
      switch (d) {
        case "today":
          vm.params.dateRange = [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")];
          break;
        case "thisMonth":
          vm.params.dateRange = [moment().startOf("months").format("YYYY-MM-DD"), moment().endOf("months").format("YYYY-MM-DD")];
          break;
        case "lastMonth":
          vm.params.dateRange = [moment().add(-1, "months").startOf("months").format("YYYY-MM-DD"), moment().add(-1, "months").endOf("months").format("YYYY-MM-DD")];
          break;
        case "quarter1":
          vm.params.dateRange = [moment().startOf("years").format("YYYY-MM-DD"), moment().startOf("years").add(2, "months").endOf("months").format("YYYY-MM-DD")];
          break;
        case "quarter2":
          vm.params.dateRange = [moment().startOf("year").add(3, "months").startOf("months").format("YYYY-MM-DD"), moment().startOf("year").add(5, "months").endOf("months").format("YYYY-MM-DD")];
          break;
        case "quarter3":
          vm.params.dateRange = [moment().startOf("year").add(6, "months").startOf("months").format("YYYY-MM-DD"), moment().startOf("year").add(8, "months").endOf("months").format("YYYY-MM-DD")];
          break;
        case "quarter4":
          vm.params.dateRange = [moment().startOf("year").add(9, "months").startOf("months").format("YYYY-MM-DD"), moment().endOf("year").endOf("months").format("YYYY-MM-DD")];
          break;
        case "semester1":
          vm.params.dateRange = [moment().startOf("year").startOf("months").format("YYYY-MM-DD"), moment().startOf("year").add(5, "months").endOf("months").format("YYYY-MM-DD")];
          break;
        case "semester2":
          vm.params.dateRange = [moment().startOf("year").add(6, "months").startOf("months").format("YYYY-MM-DD"), moment().endOf("year").endOf("months").format("YYYY-MM-DD")];
          break;
        default:
          vm.params.dateRange = [moment().startOf("months").format("YYYY-MM-DD"), moment().endOf("months").format("YYYY-MM-DD")];
          break;

      }
      this.menuDate = false;
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
        this.dayMonthYear = this.FormatDate(this.params.dateRange[0]) + " - " + this.FormatDate(this.params.dateRange[1]);

        Meteor.call('sb_fetchRepaymentReport', this.params, Constants.secret, vm.$i18n.locale, (err, result) => {
          if (result) {
            this.dataHtml = result.dataHtml;
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