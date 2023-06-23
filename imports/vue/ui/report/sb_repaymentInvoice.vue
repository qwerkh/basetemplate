<!--suppress ALL -->
<template>
  <div class="repaymentInvoice-report">
    <a4>
      <span slot="content" style="margin: 0px !important;font-family: 'Khmer OS Battambang'" id="section-to-print">
            <v-row type="flex" class="row-bg" justify="center" id="mytableReport">
               <div class="row"
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
                                                }}</p>
                                            <hr
                                                style="align-items: center; margin-top: 0px !important;margin-bottom: 5px !important;border-top:4px solid gold !important;margin-left: 25% !important;margin-right: 25% !important;">
                                          <p>{{ companyDoc.latinName }}</p>


<!--                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">សាខា៖ {{
                            branchDoc.name
                          }}</span><br>-->
                        <span
                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">អាស័យដ្ឋាន៖ {{
                            branchDoc.address
                          }}</span><br>
<!--                                            <span
                                                style="font-family: 'Khmer OS Muol'; font-size: 15px;">លេខទូរស័ព្ទ៖ {{
                                                branchDoc.phoneNumber
                                              }}</span><br>--><br>
                                        <span
                                            style="font-family: 'Khmer OS Muol'; font-size: 15px;">បង្កាន់ដៃបង់ប្រាក់</span><br><br>
                                        </span>

</div>



                <v-col cols="12" md="12" sm="12">
                       <!-- <span style="text-align: left;font-size: 15px; border: 0px !important;"
                        >
                                  <p style="font-family: 'Khmer OS Muol' !important;" class="blueOnPrint">លេខ :</p>
                                  <p style="font-family: 'Khmer OS Muol' !important;" class="blueOnPrint">ថ្ងៃ-ខែ-ឆ្នាំ : {{dayMonthYear}}</p>

                              </span>-->

                          <div class="row">
                              <div style="width: 50% !important;float:right">
                                  ថ្ងៃបង់ : {{ (repaymentDoc && repaymentDoc.repaymentDate || "") | momentFormat }}

                              </div>

                                                            <div style="width: 50% !important;">
                                  លេខ: {{ repaymentDoc && repaymentDoc.voucher || "" }}
                              </div>


                          </div>
                          <div class="row">
                                                            <div style="width: 50% !important;">
                                  លេខគណនីឥណទាន: {{ disbursementDoc && disbursementDoc.loanAcc || "" }}
                              </div>
                              <div style="width: 50% !important;float:right">
                                  ឈ្មោះអតិថិជន : {{  clientDoc && clientDoc.name || "" }}

                              </div>


                          </div>
                          <div class="row">
                                                            <div style="width: 100% !important;">
                                  បង់ដំណាក់កាលទី: {{ repaymentDoc && repaymentDoc.payOnInstallment || "" }}
                              </div>
                          </div>

                          <div class="row">
                                                            <div style="width: 100% !important;font-weight: bold">
                                  ចំនួនទឹកប្រាក់: {{ (repaymentDoc && repaymentDoc.totalPaid || "") | seperateNumber }}{{ repaymentDoc && repaymentDoc.currencyId | getCurrencySymbol }}
                              </div>
                          </div>
                          <div class="row">
                                                            <div style="width: 100% !important;">
                                  បរិយាយ: {{ repaymentDoc && repaymentDoc.note || "" }}
                              </div>
                          </div>
                          <div class="row">
                                                            <div style="width: 100% !important;">
                                  ប្រភេទ: {{ repaymentDoc && repaymentDoc.type || "" }}
                              </div>
                          </div>

                  <center style="margin-top: 40px">

                        <b>អ្នកទទួល</b>
                    </center>


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
import QRCode from 'qrcode'

require('@thyrith/momentkh')(moment);
export default {
  name: "RepaymentScheduleReport",
  meteor: {},
  mounted() {
    this.$jQuery('body').off();
  },
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,
      params: {
        repaymentId: "",
      },
      loading: false,
      branchDoc: this.$store.state.branchDoc,
      companyDoc: this.$store.state.companyDoc,

      dataHtml: "",
      isHideTitle: false,
      userDoc: Meteor.user(),

      purposeDoc: {},
      repaymentDoc: {},
      disbursementDoc: {},
      clientDoc: {},
      productDoc: {},
      creditOfficerDoc: {},
      guarantorDoc: {},

    };
  },
  created() {
    let vm = this;

    this.branchDoc = this.$store.state.branchDoc;
    let repaymentId = vm.$route.params.repaymentId;
    if (repaymentId) {
      this.params.repaymentId = repaymentId;
      Meteor.setTimeout(function () {
        vm.handleRun();
      }, 300)
    }
  },
  methods: {
    printReport() {
      window.print();
    },

    FormatNumber(val) {
      return GlobalFn.formatNumber(val);
    },
    FormatDate(val) {
      return GlobalFn.formatDate(val);
    },
    FormatDateLunar(val) {
      return moment(val).toLunarDate();
    },
    FormatDateKh(val) {
      return "ថ្ងៃទី " + GlobalFn.convertNumtoKhmerNum(moment(val).format("DD").toString()) + " " + moment(val).toLunarDate('ខែ M ឆ្នាំ c');
    },

    handleRun() {
      let vm = this;
      this.loading = true;
      this.dataHtml = "";
      Meteor.call('sb_fetchRepaymentInvoiceReport', this.params, Constants.secret, (err, result) => {
        if (result) {
          this.disbursementDoc = result.disbursementDoc;
          this.clientDoc = result.clientDoc;
          this.repaymentDoc = result.repaymentDoc;
        }
        this.loading = false;
      });
    },
    onLoadHandler: function () {
      this.onLoad = true;
    }
  },
  updated: function () {
    let vm = this;
    vm.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      if (vm.repaymentDoc._id != "" && vm.onLoad === true) {
        setTimeout(function () {
          window.print();
          vm.$router.push("repaymentForm");
        }, 400);
      }
    })
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