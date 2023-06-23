<!--suppress ALL -->
<template>
  <div class="repaymentScheduleCCL-report">
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
                <v-card-title>{{ $t('repaymentScheduleCCLTitle') }}
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
                    <v-col cols="12" sm="6" md="6" class="d-flex">

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
                              v-model="disbursementDateFormatted"
                              hint="DD/MM/YYYY"
                              :label="$t('disbursementDate')"
                              prepend-icon="event"
                              @blur="params.disbursementDate = parseDate(disbursementDateFormatted)"
                              readonly
                              :dense="dense"
                              :rules="dateRule"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="params.disbursementDate"
                                       @input="menuDate = false"></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="d-flex">
                      <v-autocomplete v-model="params.productId"
                                      :items="productOption"
                                      outlined
                                      :dense="dense"
                                      clearable
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('product')"
                                      search-input
                                      required
                                      :search-input.sync="searchProduct"
                                      :rules="selectRules"
                      >
                        <template v-slot:selection="{ item }">
                          {{ item.label.split(":")[0] }}
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="3" md="3" class="d-flex" v-if="!!isOperationFee">
                      <v-select
                          v-model="params.operationFeeType"
                          :items="operationFeeTypeOption"
                          :dense="dense"
                          :label="$t('operationFeeType')"
                          dense
                      ></v-select>
                    </v-col>
                    <v-col cols="8" sm="6" md="6" class="d-flex" v-if="!!isOperationFee">
                      <v-text-field
                          v-model="params.operationFeeValue"
                          :dense="dense"
                          :label="$t('operationFee')"
                          :suffix="operationFeeTypeSuffix"
                          type="number"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="4" sm="3" md="3" class="d-flex" v-if="!!isOperationFee">
                      <v-select
                          v-model="params.operationFeeOf"
                          :items="operationFeeOfOption"
                          :dense="dense"
                          :label="$t('operationFeeOf')"
                          dense
                      ></v-select>
                    </v-col>

                    <v-col cols="8" sm="4" md="4">
                      <v-text-field v-if="!$vuetify.breakpoint.xsOnly"
                                    id="loanAmount"
                                    v-model="params.loanAmount"
                                    :rules="requireInput"
                                    :label="$t('loanAmount')"
                                    persistent-hint
                                    required
                                    @input="params.loanAmount = seperateNumber(params.loanAmount)"
                                    :dense="dense"

                      ></v-text-field>

                      <v-text-field v-if="!!$vuetify.breakpoint.xsOnly"
                                    id="loanAmount"
                                    v-model="params.loanAmount"
                                    :rules="requireInput"
                                    :label="$t('loanAmount')"
                                    persistent-hint
                                    type="number"
                                    required
                                    :dense="dense"

                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" sm="2" md="2">

                      <v-autocomplete v-model="params.currencyId"
                                      :items="currencyOption"
                                      :dense="dense"
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('currency')"
                                      :rules="selectRules"
                                      search-input
                                      required
                      >

                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                          v-model="params.term"
                          :rules="requireInput"
                          :label="$t('term')"
                          persistent-hint
                          :suffix="$t(time)"
                          required
                          type="number"
                          :dense="dense"

                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="3" md="3">

                      <v-autocomplete v-model="params.repaidFrequency"
                                      :items="repaidFrequencyOption"
                                      :dense="dense"
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('repaidFrequency')"
                                      :rules="selectRules"
                                      search-input
                                      required
                      >

                      </v-autocomplete>
                    </v-col>
                    <v-col cols="6" sm="3" md="3">

                      <v-autocomplete v-model="params.repaidPrinciple"
                                      :items="repaidPrincipleOption"
                                      :dense="dense"
                                      item-text="label"
                                      item-value="value"
                                      :label="$t('repaidPrinciple')"
                                      :rules="selectRules"
                                      search-input
                                      required
                      >

                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="3" md="3">
                      <v-text-field
                          v-model="params.numInstallmentPaid"
                          :rules="requireInput"
                          :label="$t('numInstallmentPaid')"
                          persistent-hint
                          required
                          type="number"
                          :dense="dense"

                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3" md="3" v-if="!!isSpecialLoan">
                      <v-text-field
                          v-model="params.startInstallment"
                          :rules="requireInput"
                          :label="$t('startInstallment')"
                          persistent-hint
                          required
                          type="number"
                          :dense="dense"

                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3" md="3" class="d-flex">

                      <v-menu
                          v-model="menuStartPaidDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                              v-model="startPaidDateFormatted"
                              hint="DD/MM/YYYY"
                              :label="$t('startPaidDate')"
                              prepend-icon="event"
                              @blur="params.startPaidDate = parseDate(startPaidDateFormatted)"
                              readonly
                              :dense="dense"
                              :rules="dateRule"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="params.startPaidDate"
                                       @input="menuStartPaidDate = false"></v-date-picker>
                      </v-menu>
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
                <div class="row">
                                <div class="col-md-2"
                                     style="text-align: left !important;width: 20% !important; justify-content: center !important;float: left !important;">

                                        <span
                                            style="font-family:Khmer os muol; font-size: 15px  !important;padding-top: 15px !important;">
 <img style="width: auto;height: 100px; padding-top: 20px !important;padding-left: 12px !important;"
      src="/images/logo.png"
      :onLoad="onLoadHandler()"
      alt=""
 >
                                            <p style="font-family: 'Khmer OS Battambang' !important;font-size: 12px !important;margin-top: 5px !important;">{{
                                                companyDoc.slogan || "ប្រសើរឡើងជាមួយគ្នា"
                                              }} </p>

                                            </span>
                              </div>
                              <div class="col-md-8"
                                   style="text-align: center !important;width: 60% !important;">
                                   <span style="text-align: center;font-size: 15px; border: 0px !important;"
                                   >
                                  <span
                                      style="font-family: 'Khmer OS Muol light','Khmer OS Muol';font-size: 15px;vertical-align: middle !important;"><br>
                                            <p style="font-size: 18px;">{{
                                                companyDoc.name
                                              }}</p><p>{{ companyDoc.latinName }}</p>
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
                                       style="font-family: 'Khmer OS Muol'; font-size: 15px;">តារាងកាលវិភាគសងប្រាក់</span><br>
                                  <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">Schedule Payment</span>
                              </div>
                              <div class="col-md-2" style="width: 20% !important;float: left !important;">&nbsp;</div>
                          </div>


                <v-col cols="12" md="12" sm="12">
                       <!-- <span style="text-align: left;font-size: 15px; border: 0px !important;"
                        >
                                  <p style="font-family: 'Khmer OS Muol' !important;" class="blueOnPrint">លេខ :</p>
                                  <p style="font-family: 'Khmer OS Muol' !important;" class="blueOnPrint">ថ្ងៃ-ខែ-ឆ្នាំ : {{dayMonthYear}}</p>

                              </span>-->

                          <div class="row">
                                                            <div style="width: 50% !important;">
                                  លេខគណនីឥណទាន: {{ disbursementDoc.loanAcc }}{{ clientDoc.loanCycle || "" }}
                              </div>
                              <div style="width: 20% !important;float:right">
                                  លេខអតិថិជន : {{ clientDoc && clientDoc.order || "" }}

                              </div>

                              <div style="width: 30% !important; float:right">
                                  ចំនួនទឹកប្រាក់ : {{ disbursementDoc.loanAmount | numFormat }} {{ currencySymbol }}
                              </div>


                          </div>
                          <div class="row">

                              <div style="width: 50% !important;">
                                  ឈ្មោះអតិថិជន : {{ clientDoc.name }}
                              </div>

                              <div style="width: 20% !important;float:right">
                                                                    ថ្ងៃខ្ចី : {{
                                  FormatDate(disbursementDoc.disbursementDate)
                                }}

                              </div>
                               <div style="width: 30% !important; float:right">
                                                                     រយៈពេល : {{
                                   disbursementDoc.term || ""
                                 }} {{
                                   productDoc.rateType === "Monthly" ? "ខែ" : productDoc.rateType === "Weekly" ? "សប្តាហ៍" : productDoc.rateType === "Yearly" ? " ឆ្នាំ" : "ថ្ងៃ" || ""
                                 }}

                              </div>






                          </div>
                          <div class="row">

                               <div style="width: 50% !important;">
                                   ទូរស័ព្ទអតិថិជន : {{ clientDoc.phoneNumber || "" }}

                              </div>
                                <div style="width: 20% !important;float: right">
                                                                     ចំនួនដងត្រូវសង: {{
                                    disbursementDoc.term / disbursementDoc.repaidFrequency || ""
                                  }}

                              </div>
                              <div style="width: 30% !important;float: right" v-show="NotHideRate">
                                                                    អត្រាការប្រាក់: {{
                                  (productDoc.rate || 0) * (disbursementDoc.repaidFrequency || 0)
                                }}%
                              </div>
                              <div style="width: 30% !important;float: right" v-show="hideRate">
                                &nbsp;
                              </div>




                          </div>
                          <div class="row">

                              <div style="width: 50% !important;">
                                មន្រ្តីឥណទាន : {{ creditOfficerDoc.name || "" }}
                              </div>
                              <div style="width: 50% !important;float: right">
                                                                      រូបិយប័ណ្ណ : {{ currencyHeader || "" }}

                              </div>


                          </div>


                          <div class="row">
                                 <div style="width: 50% !important;">
                                  ទូរស័ព្ទមន្ត្រីឥណទាន : {{ creditOfficerDoc.phoneNumber || "" }}
                              </div>
                              <div style="width: 50% !important;float: right">
                                  វគ្គទី : {{ clientDoc.loanCycle || "" }}

                              </div>

                          </div>
                          <div class="row">
                              <div style="width: 100% !important;">
                                  អាស័យដ្ឋាន : {{ clientDoc.address || "" }}
                              </div>
                          </div>
                          <div class="row" v-show="isHasBankAccount">
                              <div style="width: 100% !important;">
                                  លេខគណនីធនាគារ : {{ bankAccount || "" }}
                              </div>
                          </div>

                </v-col>

                <v-col cols="12" style="overflow-x: auto;display: block;white-space: nowrap;">

                    <table class="tablePadding table-bordered printFontSize">

                <thead style="margin-top: 5px">
                    <tr>
                       <th>{{ $t('no') }}</th>
                       <th>ថ្ងៃត្រូវបង់</th>
                       <th>ចំនួនថ្ងៃ</th>
                       <th>ប្រាក់ដើម</th>
                       <th>ការប្រាក់</th>
                       <th v-show="isOperationFee">សេវាប្រតិបត្តការ</th>
                       <th>សរុបត្រូវបង់</th>
                       <th>សមតុល្យប្រាក់ដើម</th>
                    </tr>
                </thead>

                <tbody style="margin-bottom: 5px;" v-html="dataHtml">
                </tbody>


            </table>


                <div class="row" style="width: 100% !important;font-size: 12px !important;" v-show="isFooter"
                     v-if="isNoteUp">
                    <div style="width: 15%;float: left !important;text-align: right !important;">
                         <span><b><u>កំណត់សំគាល់ </u> ៖</b> &nbsp;</span>
                    </div>
                     <div style="width: 85%;float: right !important;text-align: left !important;">
                         {{ note || "" }}
                    </div>
                </div>
                <div class="row"
                     style="width: 100% !important;text-align: center !important;font-size: 12px !important;"
                     v-show="isFooter"
                     v-if="isNoteUp">
                    <span><b><u>ម៉ោងធ្វើការ ៖ </u></b></span>{{ workTime || "" }}
                </div>
                <div class="row"
                     style="width: 100% !important;text-align: center !important;font-size: 12px !important;"
                     v-show="isFooter"
                     v-if="isNoteUp">
                    <b>សេវាកម្មយើងខ្ញុំ គឺជាសេវាកម្មកម្ចីឯកជន សូមអតិថិជនទាំងអស់មេត្តាជ្រាប</b>
                    <br>
                </div>
                 <div class="row" style="width: 100% !important;">
                    <div style="width: 50%;float: left !important;text-align: center !important;">
                        <span style="font-family: 'Khmer OS Muol'">ហត្ថលេខា និង ឈ្មោះអ្នកផ្តល់ប្រាក់កម្ចី</span><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'"><u>{{ creditOfficerDoc.name || "" }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>

                    <div style="width: 50%;float: right !important;text-align: center !important;">
                         <span style="font-family: 'Khmer OS Muol'">ស្មាមមេដៃអ្នកខ្ចី</span><br><br><br><br>
                          <span style="font-family: 'Khmer OS Muol'">ឈ្មោះ ៖ </span><span
                        style="font-family: 'Khmer OS Battambang'"><u>{{ clientDoc.name }}</u></span><br>
                         ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}
                    </div>

                </div>
                <br>
                <div class="row" style="width: 100% !important;font-size: 12px !important;" v-show="isFooter"
                     v-if="isNoteDown">
                    <div style="width: 15%;float: left !important;text-align: right !important;">
                         <span><b><u>កំណត់សំគាល់ </u> ៖</b>&nbsp;</span>
                    </div>
                     <div style="width: 85%;float: right !important;text-align: left !important;">
                         {{ note || "" }}
                    </div>
                </div>
                <div
                    style="width: 100% !important;text-align: center !important;font-size: 11px !important;float: right"
                    v-show="isFooter"
                    v-if="isNoteDown">
                    <span><b><u>ម៉ោងធ្វើការ ៖ </u></b></span>{{ workTime || "" }}
                </div>
                <div
                    style="width: 100% !important;text-align: center !important;font-size: 12px !important; float: right"
                    v-show="isFooter"
                    v-if="isNoteDown">
                    <b>សេវាកម្មយើងខ្ញុំ គឺជាសេវាកម្មកម្ចីឯកជន សូមអតិថិជនទាំងអស់មេត្តាជ្រាប</b>
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
  name: "RepaymentScheduleCCLReport",
  meteor: {},
  mounted() {
    this.$jQuery('body').off();
    this.$nextTick(() => {
      this.$jQuery('body').on('keydown', "#loanAmount", this.validateNum);
    })
  },
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,
      params: {
        productId: "",
        currencyId: "",
        loanAmount: "",
        disbursementDate: moment().format("YYYY-MM-DD"),
        startPaidDate: moment().format("YYYY-MM-DD"),
        term: 0,
        repaidFrequency: 1,
        repaidPrinciple: 1,
        operationFeeAmount: 0,
        operationFeeType: "Amount",
        operationFeeOf: "Loan Amount",
        operationFeeValue: 0,
        startInstallment: 0,
        numInstallmentPaid: 0,
        branchId: ""

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
      dateRule: [
        v => !!v || 'Please Choose one',
      ],
      disbursementOption: [],
      searchDisbursement: "",
      disbursementDoc: {},
      clientDoc: {},
      productDoc: {},
      creditOfficerDoc: {},
      bankAccount: "",
      isOperationFee: true,
      isOperationFee: false,
      isHasBankAccount: false,
      isNoteUp: false,
      isNoteDown: true,
      NotHideRate: true,
      hideRate: false,
      currencySymbol: "",
      isFooter: false,
      note: "",
      workTime: "",

      operationFeeTypeOption: Constants.feeType,
      operationFeeTypeSuffix: "",
      operationFeeOfOption: Constants.operationFeeOf,
      repaidFrequencyOption: [
        {value: 1, label: 1}
      ],
      repaidPrincipleOption: [
        {value: 1, label: 1}
      ],
      time: "",
      isOperationFee: false,
      isSpecialLoan: false,
      menuDate: false,
      menuStartPaidDate: false,
      currencyOption: Constants.currency,
      productOption: []

    };
  },
  watch: {
    searchBranch(val) {
      val && val !== this.params.branch && this.fetchBranchOptionList(val)
    },
    searchDisbursement(val) {
      if (val !== null) {
        this.queryDisbursementOption(val);
      }
    },
    "params.disbursementDate"(val) {
      this.disbursementDateFormatted = this.formatDate(val);
    },
    "params.startPaidDate"(val) {
      this.startPaidDateFormatted = this.formatDate(val);
    },
    "params.operationFeeType"(val) {
      this.operationFeeTypeSuffix = val === "Percent" ? "% of" : "";
    },
    "params.term"(val) {
      if (val && val > 1) {
        this.repaidFrequencyOption = [];
        for (let i = 1; i <= val / 2; i++) {
          if (val % i === 0) {
            this.repaidFrequencyOption.push({
              label: i, value: i
            })


          }
        }
        if (this.params.repaidFrequency === 1) {
          this.repaidPrincipleOption = [];
          for (let i = 1; i <= val; i++) {
            if (val % i === 0) {
              this.repaidPrincipleOption.push({
                label: i, value: i
              })


            }
          }
        }
      } else {
        this.repaidFrequencyOption = [
          {value: 1, label: 1}
        ];
      }
    },
    "params.repaidFrequency"(val) {
      let vm = this;
      if (val && val > 0) {
        this.repaidPrincipleOption = [];
        for (let i = 1; i <= (vm.params.term / val); i++) {
          if ((vm.params.term / val) % i === 0) {
            this.repaidPrincipleOption.push({
              label: i, value: i
            })
          }
        }
      } else {
        this.repaidPrincipleOption = [
          {value: 1, label: 1}
        ];
      }
    },
    "params.productId"(val) {
      if (val) {
        let values = this.productOption.map(function (o) {
          return o.value;
        })
        let index = values.indexOf(val);
        this.time = this.productOption[index].label.split(":")[1].trim();
      }
    },
    searchProduct(val) {
      this.queryProductOption(val);
    },
  },
  created() {
    let vm = this;
    this.branchDoc = this.$store.state.branchDoc;
    vm.queryProductOption();
    Meteor.call("sb_findLoanConfigByBranchId", vm.$store.state.branchId, Constants.secret, (err, result) => {
      if (result) {
        vm.bankAccount = result.bankAccount || "";
        vm.isOperationFee = result.isOperationFee;
        vm.isNoteUp = result.isNoteUp || false;
        this.isNoteDown = !(result.isNoteUp || false);

        vm.NotHideRate = !(result.isHideRate || false);
        vm.hideRate = (result.isHideRate || false);
        vm.isFooter = result.note ? true : false;
        vm.note = result.note || "";
        vm.workTime = result.workTime || "";
        vm.isHasBankAccount = result.bankAccount && result.bankAccount != "" ? true : false;

        vm.isSpecialLoan = result.isSpecialLoan || false;

      }
    })
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

      workbook.SheetNames.push("RepaymentScheduleCCL");
      workbook.Sheets["RepaymentScheduleCCL"] = worksheet;

      GlobalFn.exportExcelFile(workbook, "RepaymentScheduleCCL " + moment().format("YYYYMMDD") + ".xlsx");
    },
    validateNum(val) {
      let charCode = (val.which) ? val.which : val.keyCode;
      if ($(val.currentTarget).val().indexOf('.') !== -1) {
        if (charCode === 110  || charCode===190) {
          return false;
        }
      }
      return (charCode === 110 || charCode===190 || charCode === 8 || charCode === 46 || (charCode < 106 && charCode > 95) || (charCode < 58 && charCode > 47));

    },
    FormatNumber(val) {
      return GlobalFn.formatNumber(val);
    },
    FormatDate(val) {
      return GlobalFn.formatDate(val);
    },
    seperateNumber(val) {
      return GlobalFn.seperateNumber(val);
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
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
      if (this.$refs.formReport.validate()) {
        this.dataHtml = "";
        vm.params.loanAmount = vm.$_numeral(vm.params.loanAmount).value();
        vm.params.term = vm.$_numeral(vm.params.term).value();
        vm.params.branchId = vm.$store.state.branchId;

        Meteor.call('sb_fetchRepaymentScheduleCCLReport', this.params, Constants.secret, vm.$i18n.locale, (err, result) => {
          if (result) {
            this.dataHtml = result.dataHtml;
            this.dateHeader = result.dateHeader;
            this.currencyHeader = result.currencyHeader;
            this.currencySymbol = result.currencySymbol;

            this.disbursementDoc = result.disbursementDoc;
            this.productDoc = result.productDoc;
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