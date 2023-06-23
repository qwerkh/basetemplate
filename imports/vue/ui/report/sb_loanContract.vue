<!--suppress ALL -->
<template>
  <div class="loanContract-report">

    <div class="no-print">
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
              <v-card
                  class="mx-auto"
                  max-width="100%"
              >
                <v-card-title>{{ $t('loanContractTitle') }}
                  <v-spacer></v-spacer>
                  <print-button @run="printReport" v-shortkey="['ctrl','p']"
                                @shortkey.native="printReport"
                  ></print-button>
                </v-card-title>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </div>

    <!--<v-text-field
            v-model="val"
            :rules="requireInput"
            :label="$t('amount')"
            persistent-hint
            required
            :dense="dense"
            type="number"
    ></v-text-field>
    {{newVal}}-->
    <span style="margin: 0px !important;">
      <v-container class="myContract">
                <div v-if="!companyDoc.isOtherCommission"
                     style="width: 21cm;padding-left:40px ;padding-right: 40px;font-family: 'Khmer OS Battambang'"
                     id="section-to-print-contract">
                    <div v-html="dataHtml"
                         style="page-break-inside: auto;font-family: 'Khmer OS Battambang' !important"></div>
                </div>
                <div v-if="companyDoc.isOtherCommission" style="width: 21cm;"
                     id="section-to-print-contract">
                    <div v-html="dataHtml"
                         style="page-break-inside: auto;font-family: 'Khmer OS Battambang'  !important"></div>
                  <v-row>
                        <v-col style="text-align: center"
                               :class="disbursementDoc && disbursementDoc.guarantorDoc ? 'col-4' : 'col-6'">អ្នកទិញ<br><br><br><br> {{
                            disbursementDoc && disbursementDoc.clientDoc && disbursementDoc.clientDoc.name || ''
                          }}</v-col>
                        <v-col style="text-align: center" v-if="disbursementDoc && disbursementDoc.guarantorDoc"
                               class="col-4">អ្នកធានា<br><br><br><br> {{
                            disbursementDoc && disbursementDoc.guarantorDoc && disbursementDoc.guarantorDoc.name || ''
                          }}</v-col>
                        <v-col style="text-align: center"
                               :class="disbursementDoc && disbursementDoc.guarantorDoc ? 'col-4' : 'col-6'">អ្នកលក់<br>
                          <img src="/images/ld.png" height="100" width="150"/></v-col>
                  </v-row>
                </div>

    </v-container>

    </span>
  </div>
</template>

<script>
import PageA4Lanscape from '/imports/vue/ui/report/page/PageA4Lanscape';
import RunButton from "../../components/runButton";
import {Exchange} from "../../../collections/exchange";
import {Constants} from "../../../libs/constant"
import GlobalFn from "../../../libs/globalFn"
import PrintButton from "../../components/printButton";

export default {
  name: "JournalReport",
  meteor: {},
  mounted() {
    this.$jQuery('body').off();
  },
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,
      noCompleteData: false,
      loading: false,
      companyDoc: this.$store.state.companyDoc,
      userDoc: Meteor.user(),
      disbursementDoc: {},
      clientDoc: {},
      val: "",
      newVal: "",
      dataHtml: ""
    };
  },
  watch: {
    val(v) {
      this.newVal = this.numberInKhmer(v);
    }
  },
  created() {
    let vm = this;
    this.branchDoc = this.$store.state.branchDoc;
    vm.disbursementDoc = vm.$route.params.disbursementDoc;
    vm.handleRun(vm.disbursementDoc);
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
    getGender(val) {
      return val === "1" ? "ប្រុស" : val === "2" ? "ស្រី" : ".............";
    },

    getCurrency(val) {
      return val === "USD" ? "$" : val === "KHR" ? "រៀល" : val === "THB" ? "បាត" : "";
    },
    getCurrencyKH(val, amount) {
      let isKot = Number.isInteger(amount) ? "គត់" : "";
      return (val === "USD" ? "ដុល្លា" : val === "KHR" ? "រៀល" : val === "THB" ? "បាត" : "") + isKot;
    },
    numberInKhmer(val) {
      return GlobalFn.numberInKhmer(val);
    },
    getTermType(val) {
      return val === "Monthly" ? "ខែ" : val === "Weekly" ? "សប្តាហ៍" : val === "Yearly" ? "ឆ្នាំ" : "";
    },

    handleRun(doc) {
      let vm = this;
      this.loading = true;
      this.dataHtml = "";
      vm.disbursementDoc = doc;
      Meteor.call('sb_loanContractReport', doc, Constants.secret, vm.$i18n.locale, vm.$store.state.branchId, (err, result) => {
        if (result) {
          vm.dataHtml = result.dataHtml;
        }
        this.loading = false;
      });

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

.myContract * {
  font-family: "Khmer OS Battambang" !important;
}

</style>