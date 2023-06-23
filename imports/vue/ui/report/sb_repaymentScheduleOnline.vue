<!--suppress ALL -->
<template>
  <div class="repaymentSchedule-report">
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
                <v-card-title>{{ $t('repaymentScheduleTitle') }}
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
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <span slot="content" style="margin: 0px !important;font-family: 'Khmer OS Battambang'" id="section-to-print">
            <v-row type="flex" class="row-bg" justify="center" id="mytableReport">



              <!--                ======================Type 1-->
                <div v-if="repaymentScheduleType=='type1'" class="row">
                                <div class="col-md-2"
                                     style="text-align: left !important;width: 20% !important; justify-content: center !important;float: left !important;">

                                        <span v-if="!isHideTitle"
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
                                    <span
                                        style="font-family: 'Khmer OS Muol'; font-size: 15px;">តារាងកាលវិភាគសងប្រាក់</span><br>
                                  <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">Schedule Payment</span>
                              </div>
                              <div class="col-md-2" style="width: 20% !important;float: left !important;">&nbsp;</div>
                          </div>


                <v-col v-if="repaymentScheduleType=='type1'" cols="12" md="12" sm="12">
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
                              <div style="width: 30% !important;float: right"
                                   v-show="companyDoc.isTotalBalanceInSchedule">
                                                                    ទឹកប្រាក់សរុប: {{
                                  (disbursementDoc.loanAmount || 0) + (disbursementDoc.projectInterest || 0)
                                      | numFormat
                                }} {{ currencySymbol }}
                              </div>
                              <div style="width: 30% !important;float: right"
                                   v-show="hideRate && !companyDoc.isTotalBalanceInSchedule">
                                &nbsp;
                              </div>




                          </div>
                          <div class="row">

                              <div style="width: 50% !important;" v-if="companyDoc.isTotalBalanceInSchedule">
                                បុគ្គលិក : {{ creditOfficerDoc.name || "" }}
                              </div>
                              <div style="width: 50% !important;" v-if="!companyDoc.isTotalBalanceInSchedule">
                                មន្រ្តីឥណទាន : {{ creditOfficerDoc.name || "" }}
                              </div>
                              <div style="width: 50% !important;float: right">
                                                                      រូបិយប័ណ្ណ : {{ currencyHeader || "" }}

                              </div>


                          </div>


                          <div class="row">
                                 <div style="width: 50% !important;" v-if="companyDoc.isTotalBalanceInSchedule">
                                  ទូរស័ព្ទបុគ្គលិក : {{ creditOfficerDoc.phoneNumber || "" }}
                              </div>
                                 <div style="width: 50% !important;" v-if="!companyDoc.isTotalBalanceInSchedule">
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

                <v-col v-if="repaymentScheduleType=='type1'" cols="12"
                       style="overflow-x: auto;display: block;white-space: nowrap;">

                    <table class="tablePadding table-bordered printFontSize">

                <thead style="margin-top: 5px">
                    <tr>
                       <th>{{ $t('no') }}</th>
                       <th style="text-align: center !important;">ថ្ងៃត្រូវបង់</th>
                       <th v-if="!companyDoc.isInsurance">ចំនួនថ្ងៃ</th>
                       <th style="text-align: center !important;">ប្រាក់ដើម</th>
                       <th style="text-align: center !important;" v-if="params.isShowInterest">ការប្រាក់</th>
                       <th style="text-align: center !important;"
                           v-show="isOperationFee && !companyDoc.isInsurance && params.isShowInterest">សេវាប្រតិបត្តការ</th>
                       <th style="text-align: center !important;"
                           v-show="isOperationFee && companyDoc.isInsurance && params.isShowInterest">សេវាមោឃភាព</th>
                       <th style="text-align: center !important;" v-if="!companyDoc.isInsurance">សរុបត្រូវបង់</th>
                       <th style="text-align: center !important;"
                           v-if="disbursementDoc.term>0 && !companyDoc.isTotalBalanceInSchedule">សមតុល្យប្រាក់ដើម</th>
                       <th style="text-align: center !important;"
                           v-if="disbursementDoc.term>0 && companyDoc.isTotalBalanceInSchedule">សមតុល្យសរុប</th>
                      <th style="text-align: center !important;" v-if="companyDoc.isInsurance">សរុបត្រូវបង់</th>

                       <th style="text-align: center !important;"
                           v-if="companyDoc.isProtectLoan">បញ្ញើគាំពារកម្ចី</th>
                       <th style="text-align: center !important;"
                           v-if="companyDoc.isOtherInCollect">ផ្សេងៗ</th>
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
                 <div class="row" style="width: 100% !important;"
                      v-if="!companyDoc.isTotalBalanceInSchedule && companyDoc.isGuarantorInSchedule">
                    <div
                        :style="(guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 40%;float: left !important;text-align: center !important;' : 'width: 50%;float: left !important;text-align: center !important;'">
                        <span
                            style="font-family: 'Khmer OS Battambang'">ហត្ថលេខា និង ឈ្មោះអ្នកផ្តល់ប្រាក់កម្ចី</span><br><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'"><u>{{ creditOfficerDoc.name || "" }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>

                   <div style="width: 25%;float: left !important;text-align: center !important;"
                        v-if="guarantorDoc.name && companyDoc.isGuarantorInSchedule">
                        <span
                            style="font-family: 'Khmer OS Battambang'">ហត្ថលេខា និង ឈ្មោះអ្នកធានា</span><br><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'"><u>{{ guarantorDoc.name || "" }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>

                    <div
                        :style="(guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 35%;float: right !important;text-align: center !important;' : 'width: 50%;float: right !important;text-align: center !important;'">
                         <span style="font-family: 'Khmer OS Battambang'">ស្មាមមេដៃអ្នកខ្ចី</span><br><br><br><br><br>
                          <span style="font-family: 'Khmer OS Muol'">ឈ្មោះ ៖ </span><span
                        style="font-family: 'Khmer OS Battambang'"><u>{{ clientDoc.name }}</u></span><br>
                         ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}
                    </div>

                </div>
                 <div style="width: 100% !important;"
                      v-if="!companyDoc.isTotalBalanceInSchedule && !companyDoc.isGuarantorInSchedule">
                    <div
                        :style="(guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 40%;float: left !important;text-align: center !important;' : 'width: 50%;float: left !important;text-align: center !important;'">
                        <span style="font-family: 'Khmer OS Muol'">ហត្ថលេខា និង ឈ្មោះអ្នកផ្តល់ប្រាក់កម្ចី</span><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'"><u>{{ creditOfficerDoc.name || "" }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>

                   <div style="width: 25%;float: left !important;text-align: center !important;"
                        v-if="guarantorDoc.name && companyDoc.isGuarantorInSchedule">
                        <span style="font-family: 'Khmer OS Muol'">ហត្ថលេខា និង ឈ្មោះអ្នកធានា</span><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'"><u>{{ guarantorDoc.name || "" }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>

                    <div
                        :style="(guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 35%;float: right !important;text-align: center !important;' : 'width: 50%;float: right !important;text-align: center !important;'">
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
                     <div
                         style="width: 80%;float: right !important;text-align: left !important;white-space: normal !important;">
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


              <!--                ======================Type 2-->
                <div class="row" v-if="repaymentScheduleType=='type2'">
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

                                   <span
                                       style="font-family: 'Khmer OS Muol'; font-size: 15px;">តារាងកាលវិភាគសងប្រាក់</span><br>
                                  <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">Schedule Payment</span>
                              </div>
                              <div class="col-md-2" style="width: 20% !important;float: left !important;">&nbsp;</div>
                          </div>


                <v-col v-if="repaymentScheduleType=='type2'" cols="12" md="12" sm="12">
                  <div class="row">
                    <div style="width: 70% !important;">

                       <div class="row">

                              <div style="width: 70% !important;" v-if="companyDoc.isTotalBalanceInSchedule">
                                បុគ្គលិក : {{ creditOfficerDoc.name || "" }}
                              </div>
                              <div style="width: 70% !important;" v-if="!companyDoc.isTotalBalanceInSchedule">
                                មន្រ្តីឥណទាន : {{ creditOfficerDoc.name || "" }}
                              </div>
                              <div style="width: 30% !important;float: right">
                                                                      រូបិយប័ណ្ណ : {{ currencyHeader || "" }}

                              </div>
                          </div>
                          <div class="row">
                                 <div style="width: 70% !important;" v-if="companyDoc.isTotalBalanceInSchedule">
                                  ទូរស័ព្ទបុគ្គលិក : {{ creditOfficerDoc.phoneNumber || "" }}
                              </div>
                                 <div style="width: 70% !important;" v-if="!companyDoc.isTotalBalanceInSchedule">
                                  ទូរស័ព្ទមន្ត្រីឥណទាន : {{ creditOfficerDoc.phoneNumber || "" }}
                              </div>
                              <div style="width: 30% !important;float: right">
                                  វគ្គទី : {{ clientDoc.loanCycle || "" }}
                              </div>

                          </div>


                        <div class="row">
                                                            <div style="width: 70% !important;">
                                  លេខគណនីឥណទាន: {{ disbursementDoc.loanAcc }}{{ clientDoc.loanCycle || "" }}
                              </div>
                              <div style="width: 30% !important;float:right">
                                  លេខអតិថិជន : {{ clientDoc && clientDoc.order || "" }}

                              </div>

                          </div>
                          <div class="row">

                              <div style="width: 70% !important;">
                                  ឈ្មោះអ្នកខ្ចី : {{ clientDoc.name }}
                              </div>

                              <div style="width: 30% !important;float:right">
                                                                    ថ្ងៃខ្ចី : {{
                                  FormatDate(disbursementDoc.disbursementDate)
                                }}

                              </div>
                          </div>
                          <div class="row">

                              <div style="width: 70% !important;">
                                  ឈ្មោះអ្នករួមខ្ចី : {{ clientDoc.joinAccountName || "" }}
                              </div>

                              <div style="width: 30% !important;float:right">
                                                                    វត្ថុដាក់បញ្ចាំ : {{
                                  clientDoc.mortgageType || "គ្មាន"
                                }}

                              </div>
                          </div>
                          <div class="row">
                                <div style="width: 70% !important;">
                                  ចំនួនទឹកប្រាក់ : {{ disbursementDoc.loanAmount | numFormat }} {{ currencySymbol }}
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

                               <div style="width: 70% !important;">
                                  គោលបំណងខ្ចី : {{ purposeDoc && purposeDoc.name || "" }}

                              </div>
                                <div style="width: 30% !important;float: right">
                                                                     ចំនួនដងត្រូវសង: {{
                                    disbursementDoc.term / disbursementDoc.repaidFrequency || 1
                                  }}

                              </div>

                          </div>


                       <div class="row">
                             <div style="width: 70% !important;" v-show="NotHideRate">
                                                                    អត្រាការប្រាក់: {{
                                 (productDoc.rate || 0) * (disbursementDoc.repaidFrequency || 0)
                               }}%
                              </div>
                              <div style="width: 30% !important;float: right"
                                   v-show="companyDoc.isTotalBalanceInSchedule">
                                                                    ទឹកប្រាក់សរុប: {{
                                  (disbursementDoc.loanAmount || 0) + (disbursementDoc.projectInterest || 0)
                                      | numFormat
                                }} {{ currencySymbol }}
                              </div>

                          </div>

                    </div>
                    <div style="width: 30% !important;font-family: 'Khmer OS Battambang';text-align: center">
                          ឯកភាពបង់ប្រាក់តាមកាលវិភាគសងប្រាក់នេះ<br>
                          ស្នាមមេដៃស្តាំ<br>
                     ថ្ងៃទី:........./........./..........<br>
                      <div class="row" style="display: flex;justify-content: center">
                          <div
                              style="width: 80px;height: 100px; border: 1px solid;padding: 10px;margin-top: 10px"></div>
                          <div style="width: 80px;height: 100px; border: 1px solid;padding: 10px;margin-top:10px"></div>
                      </div>

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

                <v-col v-if="repaymentScheduleType=='type2'" cols="12"
                       style="overflow-x: auto;display: block;white-space: nowrap;">

                    <table class="tablePadding table-bordered printFontSize">

                <thead style="margin-top: 5px">
                    <tr>
                       <th>{{ $t('no') }}</th>
                       <th style="text-align: center !important;">ថ្ងៃត្រូវបង់</th>
                       <th v-if="!companyDoc.isInsurance">ចំនួនថ្ងៃ</th>
                       <th style="text-align: center !important;">ប្រាក់ដើម</th>
                       <th style="text-align: center !important;" v-if="params.isShowInterest">ការប្រាក់</th>
                       <th style="text-align: center !important;"
                           v-show="isOperationFee && !companyDoc.isInsurance && params.isShowInterest">សេវាប្រតិបត្តការ</th>
                       <th style="text-align: center !important;"
                           v-show="isOperationFee && companyDoc.isInsurance && params.isShowInterest">សេវាមោឃភាព</th>
                       <th style="text-align: center !important;" v-if="!companyDoc.isInsurance">សរុបត្រូវបង់</th>
                       <th style="text-align: center !important;"
                           v-if="disbursementDoc.term>0 && !companyDoc.isTotalBalanceInSchedule">សមតុល្យប្រាក់ដើម</th>
                       <th style="text-align: center !important;"
                           v-if="disbursementDoc.term>0 && companyDoc.isTotalBalanceInSchedule">សមតុល្យសរុប</th>
                      <th style="text-align: center !important;" v-if="companyDoc.isInsurance">សរុបត្រូវបង់</th>

                       <th style="text-align: center !important;"
                           v-if="companyDoc.isProtectLoan">បញ្ញើគាំពារកម្ចី</th>
                       <th style="text-align: center !important;"
                           v-if="companyDoc.isOtherInCollect">ផ្សេងៗ</th>
                    </tr>
                </thead>

                <tbody style="margin-bottom: 5px;" v-html="dataHtml">
                </tbody>


            </table>


                <div class="row" style="width: 100% !important;font-size: 12px !important;" v-show="isFooter"
                >
                    <div style="width: 15%;float: left !important;text-align: right !important;">
                         <span><b><u>កំណត់សំគាល់ </u> ៖</b> &nbsp;</span>
                    </div>
                     <div style="width: 85%;float: right !important;text-align: left !important;" v-html="note">
                    </div>
                </div>
                <div class="row"
                     style="width: 100% !important;text-align: center !important;font-size: 12px !important;"
                     v-show="isFooter && workTime!==''"
                >
                    <span><b><u>ម៉ោងធ្វើការ ៖ </u></b></span>{{ workTime || "" }}
                </div>
                                        <br>

                 <div class="row" style="width: 100% !important;">
<div
    style="width: 30%;float: right !important;text-align: center !important;"></div>

                    <div
                        style="width: 70%;float: right !important;text-align: center !important;">
                      {{ FormatDateLunar(disbursementDoc.disbursementDate) }}<br>
                      {{ branchDoc && branchDoc.name || "" }} , {{ FormatDateKh(disbursementDoc.disbursementDate) }}<br>

                      <span style="font-family: 'Khmer OS Muol'">ហត្ថលេខា</span><br><br><br><br><br>
                          <span
                              style="font-family: 'Khmer OS Muol'"><u>{{ creditOfficerDoc.name }}</u></span><br>
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

require('@thyrith/momentkh')(moment);
export default {
  name: "RepaymentScheduleReportOnline",
  meteor: {},
  mounted() {
    this.$jQuery('body').off();
  },
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,
      params: {
        disbursementId: "",
        isTotalInterest: false,
        isShowInterest: true

      },
      loading: false,
      branchOptionList: [],
      branchDoc: {},
      companyDoc: {},
      repaymentScheduleType: "type1",
      isHideTitle: false,
      dataHtml: "",
      searchBranch: "",
      userDoc: Meteor.user(),
      selectRules: [
        v => !!v || 'Please Choose one',
      ],
      disbursementOption: [],
      searchDisbursement: "",
      purposeDoc: {},
      disbursementDoc: {},
      clientDoc: {},
      productDoc: {},
      creditOfficerDoc: {},
      guarantorDoc: {},
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
    };
  },
  watch: {},
  created() {
    let vm = this;
    let disbursementId = vm.$route.params.disbursementId;
    console.log(disbursementId);
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

      //var worksheet_data  =  [['hello','world']];
      //var worksheet = XLSX.utils.aoa_to_sheet(worksheet_data);

      let worksheet_data = document.getElementById("mytableReport");
      //worksheet_data.prepend(<tr><th colspan='3'>របាយការណ៍</th></tr>);
      let worksheet = XLSX.utils.table_to_sheet(worksheet_data);

      workbook.SheetNames.push("RepaymentSchedule");
      workbook.Sheets["RepaymentSchedule"] = worksheet;

      GlobalFn.exportExcelFile(workbook, "RepaymentSchedule " + moment().format("YYYYMMDD") + ".xlsx");
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
      if (this.$refs.formReport.validate()) {
        this.dataHtml = "";
        console.log(this.params);
        Meteor.call('sb_fetchRepaymentScheduleReportOnline', this.params, Constants.secret, (err, result) => {
          if (result) {
            this.dataHtml = result.dataHtml;
            this.creditOfficerDoc = result.creditOfficerDoc;
            this.dateHeader = result.dateHeader;
            this.currencyHeader = result.currencyHeader;
            this.currencySymbol = result.currencySymbol;

            this.disbursementDoc = result.disbursementDoc;
            this.purposeDoc = result.purposeDoc;
            this.clientDoc = result.clientDoc;
            this.guarantorDoc = result.guarantorDoc;
            this.productDoc = result.productDoc;
            this.companyDoc = result.companyDoc;
            this.branchDoc = result.branchDoc;
            if (result.loanConfigDoc) {
              vm.bankAccount = result.loanConfigDoc.bankAccount || "";
              vm.isOperationFee = result.loanConfigDoc.isOperationFee;
              vm.repaymentScheduleType = result.loanConfigDoc && result.loanConfigDoc.repaymentScheduleType || "type1";
              vm.isNoteUp = result.loanConfigDoc.isNoteUp || false;
              vm.isNoteDown = !(result.loanConfigDoc.isNoteUp || false);

              vm.NotHideRate = !(result.loanConfigDoc.isHideRate || false);
              vm.hideRate = (result.loanConfigDoc.isHideRate || false);
              vm.isFooter = result.loanConfigDoc.note ? true : false;
              vm.note = result.loanConfigDoc.note || "";
              vm.workTime = result.loanConfigDoc.workTime || "";
              vm.isHasBankAccount = result.loanConfigDoc.bankAccount && result.loanConfigDoc.bankAccount != "" ? true : false;
            }
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