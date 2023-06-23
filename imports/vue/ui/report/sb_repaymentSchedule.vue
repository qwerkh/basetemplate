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
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6" sm="6" xs="6">
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

                    <v-col cols="12" sm="6" md="6" class="d-flex">
                      <v-autocomplete v-model="params.disbursementId"
                                      :items="disbursementOption"
                                      outlined
                                      :dense="dense"
                                      clearable
                                      item-text="label"
                                      item-value="value"
                                      :rules="selectRules"

                                      :label="$t('loanAcc')"
                                      search-input
                                      placeholder="All"
                                      required
                                      :search-input.sync="searchDisbursement"
                      >
                        <template v-slot:selection="{ item }">
                          {{ item.label }}
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="6" sm="2" md="2">
                      <v-switch v-model="params.isTotalInterest" class="mx-2"
                                :label="$t('isTotalInterest')"
                                :dense="dense"></v-switch>
                    </v-col>
                    <v-col cols="6" sm="2" md="2">
                      <v-switch v-model="params.isShowInterest" class="mx-2"
                                :label="$t('isShowInterest')"
                                :dense="dense"></v-switch>
                    </v-col>
                    <v-col cols="6" sm="2" md="2">
                      <v-switch v-model="isHideTitle" class="mx-2"
                                :label="$t('isHideTitle')"
                                :dense="dense"></v-switch>
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
      <span slot="content" style="margin: 0px !important;font-family: 'Khmer OS Battambang'" id="section-to-print">
            <v-row type="flex" class="row-bg" justify="center" id="mytableReport">


                <!--<div class="row"
     style="text-align: center !important;display: flex !important;align-items: center !important;justify-content: center !important;margin-left: -100px !important;">
                                     <img style="width: 100px;height: 100px;vertical-align: baseline !important;"
                                          src="/images/logo.png"
                                          :onLoad="onLoadHandler()"
                                          alt="">
                                        <span style="font-family: 'Khmer OS Muol light','Khmer OS Muol';font-size: 15px;vertical-align: middle !important;"><br>
                                              <p style="font-size: 18px;">{{companyDoc.name}}</p><p>{{companyDoc.latinName}}</p>

                        <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">អាស័យដ្ឋាន៖ {{branchDoc.address}}</span><br>
                                            <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">លេខទូរស័ព្ទ៖ {{branchDoc.phoneNumber}}</span><br></span>
                          </div>
                          <br>
                <v-col cols="12" md="12" sm="12"
                       style="text-align: center !important;padding: 0px !important;align-items: center">
                          <hr width="225px"
                              style="margin-top: 0px !important;margin-bottom: 5px !important;border-top:1px solid black !important;">

                                   <p style="font-family: 'Khmer OS Muol'; font-size: 15px;">តារាងកាលវិភាគសងប្រាក់</p>
                                  <p style="font-family: 'Khmer OS Muol'; font-size: 15px;">Schedule Payment</p>
                                    <div class="col-md-2"
                                         style="width: 20% !important;float: left !important;">&nbsp;</div>
                </v-col>-->

              <!--                ======================Type 1-->
               <div style="position: absolute;right: 10px !important;" v-if="companyDoc.isHasQrcode">
                   <canvas id="canvas"></canvas>
               </div>
                <div v-if="repaymentScheduleType=='type1'" class="row">
                                <div class="col-md-2" v-if="!companyDoc.isLongLogoSchedule"
                                     style="text-align: left !important;width: 20% !important; justify-content: center !important;">

                                        <span v-if="!isHideTitle"
                                              style="font-family:Khmer os muol; font-size: 15px  !important;padding-top: 15px !important;">
 <img style="width: auto;height: 100px; padding-top: 20px !important;padding-left: 12px !important;"
      src="/images/logo.png"
      :onLoad="onLoadHandler()"
      alt=""
 >
                                            <p style="font-family: 'Khmer OS Battambang' !important;font-size: 12px !important;margin-top: 5px !important;">{{
                                                companyDoc.slogan || ""
                                              }} </p>

                                            </span>
                              </div>
                              <div class="col-md-2" v-if="companyDoc.isLongLogoSchedule"
                                     style="text-align: left !important;width: 20% !important; justify-content: center !important;float: left !important;">

                                        <span v-if="!isHideTitle"
                                              style="font-family:Khmer os muol; font-size: 15px  !important;padding-top: 15px !important;">
 <img style="width: auto;height: 100px; padding-top: 20px !important;padding-left: 12px !important;"
      src="/images/logo.png"
      :onLoad="onLoadHandler()"
      alt=""
 >
                                            <p style="font-family: 'Khmer OS Battambang' !important;font-size: 12px !important;margin-top: 5px !important;">លេខទូរស័ព្ទ៖ {{
                                                branchDoc && branchDoc.phoneNumber || ""
                                              }} </p>

                                            </span>
                              </div>
                              <div class="col-md-8"
                                   style="text-align: center !important;width: 60% !important;padding-top: 0px !important;">
                                   <span style="text-align: center;font-size: 15px; border: 0px !important;"
                                   >
                                  <span v-if="!isHideTitle"
                                        style="font-family: 'Khmer OS Muol light','Khmer OS Muol';font-size: 15px;vertical-align: middle !important;"><br>
                                            <p style="font-size: 18px;">{{
                                                companyDoc && companyDoc.name || ""
                                              }}</p><p>{{ companyDoc && companyDoc.latinName || "" }}</p>
                                    <!--<hr width="225px"
                                        style="margin-top: 0px !important;margin-bottom: 5px !important;border-top:1px solid black !important;align-items: center">-->
                                        </span>


                              </span>
                                    <hr v-if="!isHideTitle"
                                        style="align-items: center; margin-top: 0px !important;margin-bottom: 5px !important;border-top:1px solid black !important;margin-left: 25% !important;margin-right: 25% !important;">

                   <span v-if="!isHideTitle && !companyDoc.isHideBranchInReport"
                         style="font-family: 'Khmer OS Muol'; font-size: 15px;">សាខា៖ {{
                       branchDoc && branchDoc.name || ""
                     }}</span>
                                <br>
                        <span v-if="!isHideTitle && companyDoc.isSpecialLoan"
                              style="font-family: 'Khmer OS Muol'; font-size: 15px;">អាស័យដ្ឋាន៖ {{
                            branchDoc.address
                          }}<br></span>
                                  <span v-if="!isHideTitle && !companyDoc.isLongLogoSchedule"
                                        style="font-family: 'Khmer OS Muol'; font-size: 15px;">លេខទូរស័ព្ទ៖ {{
                                      branchDoc && branchDoc.phoneNumber || ""
                                    }}<br></span>
                                <center v-if="isHideTitle && companyDoc.isHasBanner">
                                   <img
                                       style="width: auto;height: 100px;"
                                       v-if="isHideTitle && companyDoc.isHasBanner"
                                       src="/images/banner.png"
                                       :onLoad="onLoadHandler()"
                                       alt=""
                                   >
                                  </center>
                                   <span
                                       style="font-family: 'Khmer OS Muol'; font-size: 15px;">តារាងកាលវិភាគសងប្រាក់</span><br>
                                  <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">Schedule Payment</span>
                              </div>
                              <div class="col-md-2" style="width: 20% !important;float: left !important;">&nbsp;
                               <img
                                   style="width: auto;height: 100px;float: right"
                                   v-if="companyDoc.isPayCode"
                                   src="/images/paycode.png"
                                   :onLoad="onLoadHandler()"
                                   alt=""
                               >
                              </div>
                          </div>


                <v-col v-if="repaymentScheduleType=='type1'" cols="12" md="12" sm="12">
                       <!-- <span style="text-align: left;font-size: 15px; border: 0px !important;"
                        >
                                  <p style="font-family: 'Khmer OS Muol' !important;" class="blueOnPrint">លេខ :</p>
                                  <p style="font-family: 'Khmer OS Muol' !important;" class="blueOnPrint">ថ្ងៃ-ខែ-ឆ្នាំ : {{dayMonthYear}}</p>

                              </span>-->
                          <div v-if="companyDoc.isLotType">



                          </div>
                                <div class="row">

                              <div style="width: 50% !important;">
                                  ឈ្មោះអតិថិជន : {{ clientDoc && clientDoc.name || "" }}
                              </div>

                              <div style="width: 30% !important;float:right">
                                                                    ថ្ងៃខ្ចី : {{
                                  FormatDate(disbursementDoc.disbursementDate)
                                }}

                              </div>
                               <div style="width: 20% !important; float:right">
                                                                     រយៈពេល : {{
                                   disbursementDoc.term || ""
                                 }} {{
                                   productDoc.rateType === "Monthly" ? "ខែ" : productDoc.rateType === "Weekly" ? "សប្តាហ៍" : productDoc.rateType === "Yearly" ? " ឆ្នាំ" : "ថ្ងៃ" || ""
                                 }}

                              </div>

                          </div>
                   <div class="row">
                        <div style="width: 50% !important; float:right">
                                  ចំនួនទឹកប្រាក់ : {{ disbursementDoc.loanAmount | numFormat }} {{ currencySymbol }}
                              </div>
                              <div style="width: 30% !important;float:right">
                                      រូបិយប័ណ្ណ : {{ currencyHeader || "" }}
                              </div>

                              <div style="width: 20% !important;float:right">
                                  លេខផ្ទះ : {{ disbursementDoc.description || "" }}
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
                                  productDoc.isSpecialLoan === true ? disbursementDoc.specialInterest + currencySymbol : ((productDoc.rate || 0) * (disbursementDoc.repaidFrequency || 0)) + "%"
                                }}
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
                          <div v-if="!companyDoc.isLotType">
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
                                  ឈ្មោះអតិថិជន : {{ clientDoc && clientDoc.name || "" }}
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
                                  productDoc.isSpecialLoan === true ? disbursementDoc.specialInterest + currencySymbol : ((productDoc.rate || 0) * (disbursementDoc.repaidFrequency || 0)) + "%"
                                }}
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
                                បុគ្គលិក : {{ creditOfficerDoc && creditOfficerDoc.name || "" }}
                              </div>
                              <div style="width: 50% !important;" v-if="!companyDoc.isTotalBalanceInSchedule">
                                មន្រ្តីឥណទាន : {{ creditOfficerDoc && creditOfficerDoc.name || "" }}
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
                    <tr :style="companyDoc.isChangeColorSchedule===true ? 'background-color:red;color:white' : ''">
                       <th>{{ $t('no') }}</th>
                       <th style="text-align: center !important;">ថ្ងៃត្រូវបង់</th>
                       <th v-if="!companyDoc.isInsurance">ចំនួនថ្ងៃ</th>
                       <th style="text-align: center !important;">ប្រាក់ដើម</th>
                       <th style="text-align: center !important;" v-if="params.isShowInterest">ការប្រាក់</th>
                       <th style="text-align: center !important;"
                           v-show="isOperationFee && !companyDoc.isInsurance && params.isShowInterest">{{
                           operationFeeTitle
                         }}</th>
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
                     <div style="width: 85%;float: right !important;text-align: left !important;" v-html="note || ''">

                    </div>
                </div>
                <div
                    style="width: 100% !important;text-align: center !important;font-size: 12px !important;float: right"
                    v-show="isFooter"
                    v-if="isNoteUp && workTime!==''">
                    <span><b><u>ម៉ោងធ្វើការ ៖ </u></b></span><div v-html="workTime || ''"></div>
                </div>
                  <center>
                <div
                    style="width: 100% !important;text-align: center !important;font-size: 12px !important;float: right"
                    v-show="isFooter"
                    v-if="isNoteUp">
                    <b>សេវាកម្មយើងខ្ញុំ គឺជាសេវាកម្មកម្ចីឯកជន សូមអតិថិជនទាំងអស់មេត្តាជ្រាប</b>
                    <br>
                </div>
                    </center>
                  <div class="row" style="width: 100% !important;" v-if="isAccountantNameInSchedule">
                     <div v-if="isAccountantNameInSchedule"
                          :style="(guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 50%;float: left !important;text-align: center !important;' : 'width: 30%;float: left !important;text-align: center !important;'">
                        <span style="font-family: 'Khmer OS Muol'">ហត្ថលេខាគណនេយ្យករ</span><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'"><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>

                    <div
                        :style="(guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 50%;float: left !important;text-align: center !important;' : 'width: 40%;float: left !important;text-align: center !important;'">
                        <span
                            style="font-family: 'Khmer OS Muol'"> {{
                            isAccountantNameInSchedule ? 'ហត្ថលេខាបុគ្គលិកទទួលបន្ទុក' : 'ហត្ថលេខា និង ឈ្មោះអ្នកផ្តល់ប្រាក់កម្ចី'
                          }}</span><br><br><br><br>

                        <span v-if="!isHideNameInSchedule" style="font-family: 'Khmer OS Muol Light'"><u>{{
                            creditOfficerDoc && creditOfficerDoc.name || ""
                          }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>
                   <div style="width: 50%;float: left !important;text-align: center !important;"
                        v-if="guarantorDoc.name && companyDoc.isGuarantorInSchedule">
                        <span style="font-family: 'Khmer OS Muol'">ហត្ថលេខា និង ឈ្មោះអ្នកធានា</span><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'" v-if="!isHideNameInSchedule"><u>{{
                            guarantorDoc && guarantorDoc.name || ""
                          }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>

                    <div
                        :style="(guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 50%;float: right !important;text-align: center !important;' : 'width: 30%;float: right !important;text-align: center !important;'">
                         <span
                             style="font-family: 'Khmer OS Muol'">ស្មាមមេដៃ{{
                             isAccountantNameInSchedule ? 'កូនបំណុល' : 'អ្នកខ្ចី'
                           }}</span><br><br><br><br>
                          <span v-if="!isHideNameInSchedule"
                                style="font-family: 'Khmer OS Muol'">{{
                              isAccountantNameInSchedule ? '' : 'ឈ្មោះ ៖ '
                            }}</span><span v-if="!isHideNameInSchedule"
                                           style="font-family: 'Khmer OS Battambang'"><u>{{
                        clientDoc && clientDoc.name
                      }}</u></span><br>
                         ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}
                    </div>


                  </div>

                 <div class="row" style="width: 100% !important;"
                      v-if="!companyDoc.isTotalBalanceInSchedule && companyDoc.isGuarantorInSchedule && !isAccountantNameInSchedule">

                    <div
                        :style="(guarantorDoc && guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 35%;float: left !important;text-align: center !important;' : 'width: 50%;float: left !important;text-align: center !important;'">
                        <span
                            style="font-family: 'Khmer OS Battambang'">{{
                            isAccountantNameInSchedule ? 'ហត្ថលេខាបុគ្គលិកទទួលបន្ទុក' : 'ហត្ថលេខា និង ឈ្មោះអ្នកផ្តល់ប្រាក់កម្ចី'
                          }}</span><br><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'" v-if="!isHideNameInSchedule"><u>{{
                            creditOfficerDoc && creditOfficerDoc.name || ""
                          }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>

                   <div style="width: 30%;float: left !important;text-align: center !important;"
                        v-if="guarantorDoc.name && companyDoc.isGuarantorInSchedule">
                        <span
                            style="font-family: 'Khmer OS Battambang'">ហត្ថលេខា និង ឈ្មោះអ្នកធានា</span><br><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'" v-if="!isHideNameInSchedule"><u>{{
                            guarantorDoc && guarantorDoc.name || ""
                          }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>



                    <div
                        :style="(guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 35%;float: right !important;text-align: center !important;' : 'width: 50%;float: right !important;text-align: center !important;'">
                         <span
                             style="font-family: 'Khmer OS Battambang'">ស្មាមមេដៃ{{
                             isAccountantNameInSchedule ? 'កូនបំណុល' : 'អ្នកខ្ចី'
                           }}</span><br><br><br><br><br>
                          <span
                              style="font-family: 'Khmer OS Muol'" v-if="!isHideNameInSchedule">{{
                              isAccountantNameInSchedule ? '' : 'ឈ្មោះ ៖ '
                            }}</span><span
                        style="font-family: 'Khmer OS Battambang'" v-if="!isHideNameInSchedule"><u>{{
                        clientDoc && clientDoc.name || ""
                      }}</u></span><br>
                         ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}
                    </div>

                </div>
                 <div style="width: 100% !important;"
                      v-if="!companyDoc.isTotalBalanceInSchedule && !companyDoc.isGuarantorInSchedule && !isAccountantNameInSchedule">
                    <div
                        :style="(guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 35%;float: left !important;text-align: center !important;' : 'width: 50%;float: left !important;text-align: center !important;'">
                        <span
                            style="font-family: 'Khmer OS Muol'"> {{
                            isAccountantNameInSchedule ? 'ហត្ថលេខាបុគ្គលិកទទួលបន្ទុក' : 'ហត្ថលេខា និង ឈ្មោះអ្នកផ្តល់ប្រាក់កម្ចី'
                          }}</span><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'" v-if="!isHideNameInSchedule"><u>{{
                            creditOfficerDoc && creditOfficerDoc.name || ""
                          }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>
                   <div style="width: 30%;float: left !important;text-align: center !important;"
                        v-if="guarantorDoc.name && companyDoc.isGuarantorInSchedule">
                        <span style="font-family: 'Khmer OS Muol'">ហត្ថលេខា និង ឈ្មោះអ្នកធានា</span><br><br><br><br>

                        <span style="font-family: 'Khmer OS Muol Light'" v-if="!isHideNameInSchedule"><u>{{
                            guarantorDoc && guarantorDoc.name || ""
                          }}</u></span><br>
                        ថ្ងៃទី {{ FormatDate(disbursementDoc.disbursementDate) }}

                    </div>



                    <div
                        :style="(guarantorDoc.name && companyDoc.isGuarantorInSchedule) ? 'width: 35%;float: right !important;text-align: center !important;' : 'width: 50%;float: right !important;text-align: center !important;'">
                         <span
                             style="font-family: 'Khmer OS Muol'">ស្មាមមេដៃ{{
                             isAccountantNameInSchedule ? 'កូនបំណុល' : 'អ្នកខ្ចី'
                           }}</span><br><br><br><br>
                          <span
                              style="font-family: 'Khmer OS Muol'" v-if="!isHideNameInSchedule">{{
                              isAccountantNameInSchedule ? '' : 'ឈ្មោះ ៖ '
                            }}</span><span
                        style="font-family: 'Khmer OS Battambang'"
                        v-if="!isHideNameInSchedule"><u>{{ clientDoc && clientDoc.name }}</u></span><br>
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
                         style="width: 80%;float: right !important;text-align: left !important;white-space: normal !important;"
                         v-html="note || ''">
                    </div>
                </div>
                <div
                    style="width: 100% !important;text-align: center !important;font-size: 11px !important;float: right"
                    v-show="isFooter"
                    v-if="isNoteDown && workTime!==''">
                    <span><b><u>ម៉ោងធ្វើការ ៖ </u></b></span><div v-html="workTime || ''"></div>
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
                                            <p style="font-family: 'Khmer OS Battambang' !important;font-size: 12px !important;margin-top: 5px !important;">{{
                                                companyDoc.slogan || ""
                                              }} </p>

                                            </span>
                              </div>

                              <div class="col-md-8"
                                   style="text-align: center !important;width: 60% !important;">
                                   <span style="text-align: center;font-size: 15px; border: 0px !important;"
                                   >
                                  <span v-if="!isHideTitle"
                                        style="font-family: 'Khmer OS Muol light','Khmer OS Muol';font-size: 15px;vertical-align: middle !important;"><br>
                                            <p style="font-size: 18px;">{{
                                                companyDoc && companyDoc.name || ""
                                              }}</p><p>{{ companyDoc && companyDoc.latinName || "" }}</p>
                                    <!--<hr width="225px"
                                        style="margin-top: 0px !important;margin-bottom: 5px !important;border-top:1px solid black !important;align-items: center">-->
                                        </span>


                              </span>
                                    <hr v-if="!isHideTitle"
                                        style="align-items: center; margin-top: 0px !important;margin-bottom: 5px !important;border-top:1px solid black !important;margin-left: 25% !important;margin-right: 25% !important;">


                        <span v-if="!isHideTitle && !companyDoc.isHideBranchInReport"
                              style="font-family: 'Khmer OS Muol'; font-size: 15px;">សាខា៖ {{
                            branchDoc && branchDoc.name || ""
                          }}</span><br>
                                  <span v-if="!isHideTitle"
                                        style="font-family: 'Khmer OS Muol'; font-size: 15px;">លេខទូរស័ព្ទ៖ {{
                                      branchDoc.phoneNumber
                                    }}<br></span>
 <center v-if="isHideTitle && companyDoc.isHasBanner">
                                   <img
                                       style="width: auto;height: 100px;"
                                       v-if="isHideTitle && companyDoc.isHasBanner"
                                       src="/images/banner.png"
                                       :onLoad="onLoadHandler()"
                                       alt=""
                                   >
                                  </center>
                                   <span
                                       style="font-family: 'Khmer OS Muol'; font-size: 15px;">តារាងកាលវិភាគសងប្រាក់</span><br>
                                  <span style="font-family: 'Khmer OS Muol'; font-size: 15px;">Schedule Payment</span>

                              </div>
                              <div class="col-md-2" style="width: 20% !important;float: left !important;">&nbsp;
                               <img
                                   style="width: auto;height: 100px;float: right"
                                   v-if="companyDoc.isPayCode"
                                   src="/images/paycode.png"
                                   :onLoad="onLoadHandler()"
                                   alt=""
                               >
                              </div>
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
                                  គោលបំណងខ្ចី : {{ purposeDoc.name || "" }}

                              </div>
                                <div style="width: 30% !important;float: right">
                                                                     ចំនួនដងត្រូវសង: {{
                                    disbursementDoc.term / disbursementDoc.repaidFrequency || ""
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
                    <tr :style="companyDoc.isChangeColorSchedule===true ? 'background-color:red;color:white' : ''">
                       <th>{{ $t('no') }}</th>
                       <th style="text-align: center !important;">ថ្ងៃត្រូវបង់</th>
                       <th v-if="!companyDoc.isInsurance">ចំនួនថ្ងៃ</th>
                       <th style="text-align: center !important;">ប្រាក់ដើម</th>
                       <th style="text-align: center !important;" v-if="params.isShowInterest">ការប្រាក់</th>
                       <th style="text-align: center !important;"
                           v-show="isOperationFee && !companyDoc.isInsurance && params.isShowInterest">{{
                           operationFeeTitle
                         }}</th>
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
                    <span><b><u>ម៉ោងធ្វើការ ៖ </u></b></span><div v-html="workTime || ''"></div>
                </div>
                                        <br>

                 <div class="row" style="width: 100% !important;">
<div
    style="width: 30%;float: right !important;text-align: center !important;"></div>

                    <div
                        style="width: 70%;float: right !important;text-align: center !important;">
                      {{ FormatDateLunar(disbursementDoc.disbursementDate) }}<br>
                      {{ branchDoc.name }} , {{ FormatDateKh(disbursementDoc.disbursementDate) }}<br>

                      <span style="font-family: 'Khmer OS Muol'">ហត្ថលេខា</span><br><br><br><br><br>
                          <span
                              style="font-family: 'Khmer OS Muol'"
                              v-if="!isHideNameInSchedule"><u>{{ creditOfficerDoc.name }}</u></span><br>
                    </div>

                </div>
                    </v-col>

            </v-row>

        <!--        <v-footer app inset padless absolute>
                               <hr style="height:15px;border-width:0;color:red;background-color:red;">
                </v-footer>-->
          <v-footer
              v-if="companyDoc.isChangeColorSchedule===true"
              app
              color="red"
          >
        </v-footer>
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
        branch: [this.$store.state.branchId],
        disbursementId: "",
        isTotalInterest: false,
        isShowInterest: true

      },
      loading: false,
      isAccountantNameInSchedule: false,
      branchOptionList: [],
      branchDoc: this.$store.state.branchDoc,
      companyDoc: this.$store.state.companyDoc,
      repaymentScheduleType: "type1",
      isHideTitle: false,
      operationFeeTitle: "",
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
      isHideNameInSchedule: false,
      note: "",
      workTime: "",
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
    }
    ,
  },
  created() {
    let vm = this;

    this.branchDoc = this.$store.state.branchDoc;
    this.isHideTitle = this.companyDoc.isHideTitle;
    this.queryDisbursementOption();
    this.fetchBranchOptionList();
    Meteor.call("sb_findLoanConfigByBranchId", vm.$store.state.branchId, Constants.secret, (err, result) => {
      if (result) {
        vm.bankAccount = result.bankAccount || "";
        vm.isOperationFee = result.isOperationFee;
        vm.isHideNameInSchedule = result.isHideNameInSchedule;
        vm.operationFeeTitle = result.operationFeeTitle || "សេវាប្រតិបត្តការ";
        vm.isAccountantNameInSchedule = result.isAccountantNameInSchedule || false;
        vm.repaymentScheduleType = result.repaymentScheduleType || "type1";
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

    let disbursementId = vm.$route.params.disbursementId;
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
      if (this.$refs.formReport.validate()) {
        this.dataHtml = "";
        Meteor.call('sb_fetchRepaymentScheduleReport', this.params, Constants.secret, vm.$i18n.locale, (err, result) => {
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
          }
          this.loading = false;
        });
        if (vm.companyDoc.isHasQrcode) {
          QRCode.toCanvas(document.getElementById('canvas'), vm.companyDoc.url + "/loanOnline/" + vm.params.disbursementId + "/online", function (error) {
            if (error) console.error(error)
          })
        }
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