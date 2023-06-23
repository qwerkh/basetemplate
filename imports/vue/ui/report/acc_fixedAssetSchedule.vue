<!--suppress ALL -->
<template>
  <div class="fixedAssetSchedule-report">
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
                <v-card-title>{{ $t('fixedAssetScheduleTitle') }}
                  <v-spacer></v-spacer>
                  <print-button @run="printReport" v-shortkey="['ctrl','p']"
                                @shortkey.native="printReport"
                  ></print-button>
                  <v-btn @click="exportToExcel()" color="warning" dark>Export
                    <v-icon dark>mdi-file-excel</v-icon>
                  </v-btn>

                </v-card-title>
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
                                              <p style="font-size: 18px;">{{ companyDoc.name }}</p><p>{{ companyDoc.latinName }}</p>
      <hr
          style="align-items: center; margin-top: 0px !important;margin-bottom: 5px !important;border-top:1px solid black !important;margin-left: 25% !important;margin-right: 25% !important;">


                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">សាខា៖ {{
                            branchDoc.name
                          }}</span><br>
                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">អាស័យដ្ឋាន៖ {{ branchDoc.address }}</span><br>
                                            <span
                                                style="font-family: 'Khmer OS Muol'; font-size: 15px;">លេខទូរស័ព្ទ៖ {{ branchDoc.phoneNumber }}</span><br></span>
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
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">{{ $t('fixedAssetScheduleTitle') }}</span><br>
                </v-col>
            <v-col cols="12" md="12" sm="12">
                <v-row>
                    <v-col cols="6" md="6" sm="6">{{ $t('currency') }}: {{ fixedAssetDoc.currencyId }}</v-col>
                    <v-col cols="6" md="6" sm="6"> {{ $t('code') }}: {{ fixedAssetDoc.code }}</v-col>
                    <v-col cols="6" md="6" sm="6"> {{ $t('buyDate') }}: {{ fixedAssetDoc.buyDate }}</v-col>
                    <v-col cols="6" md="6" sm="6">{{ $t('description') }}: {{ fixedAssetDoc.description }}</v-col>
                </v-row>
            </v-col>
                <v-col cols="12" style="overflow-x: auto;display: block;white-space: nowrap;">

                    <table class="tablePadding table-bordered printFontSize">

                <thead style="margin-top: 5px">
                    <tr>
                       <th>{{ $t('year') }}</th>
                       <th>{{ $t('perMonth') }}</th>
                       <th>{{ $t('perYear') }}</th>
                       <th>{{ $t('cumDepre') }}</th>
                       <th>{{ $t('bvEndYear') }}</th>
                       <th>{{ $t('maxMonth') }}</th>
                       <th>{{ $t('expenseMonth') }}</th>
                    </tr>

                </thead>

                <tbody style="margin-bottom: 5px;" v-html="dataHtml">
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
import XLSX from "xlsx";

export default {
  name: "FixedAssetScheduleReport",
  meteor: {},
  mounted() {
    this.$jQuery('body').off();
  },
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,
      params: {
        fixedAssetId: ""

      },
      fixedAssetDoc: {},
      loading: false,
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
      pickDateListRange: Constants.pickDateListRange,
      exchangeOptionList: [],
      currencyOption: Constants.currencyReport,


    };
  },
  watch: {
    searchBranch(val) {
      val && val !== this.params.branch && this.fetchBranchOptionList(val)
    },
  },
  created() {
    let vm = this;

    this.branchDoc = this.$store.state.branchDoc;
    this.fetchExchangeOptionList();
    this.fetchBranchOptionList();

    let fixedAssetId = vm.$route.params.fixedAssetId;
    if (fixedAssetId) {
      this.params.fixedAssetId = fixedAssetId;
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

      workbook.SheetNames.push("FixedAssetSchedule");
      workbook.Sheets["FixedAssetSchedule"] = worksheet;

      GlobalFn.exportExcelFile(workbook, "FixedAssetSchedule " + moment().format("YYYYMMDD") + ".xlsx");
    },
    FormatNumber(val) {
      return GlobalFn.formatNumber(val);
    },
    FormatDate(val) {
      return GlobalFn.formatDate(val);
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

        Meteor.call('acc_fetchFixedAssetScheduleReport', this.params, Constants.secret, vm.$i18n.locale, (err, result) => {
          if (result) {
            this.dataHtml = result.dataHtml;
            this.fixedAssetDoc = result.fixedAssetDoc;
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