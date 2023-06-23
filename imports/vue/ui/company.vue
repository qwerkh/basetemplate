<template>
  <v-row justify="center">
    <v-flex
        md11
        sm11
        xs11
    >
      <v-form
          :model="valid" ref="formData"
          lazy-validation
      >
        <v-card-title>
          <v-layout column align-center justify-center class="mb-2">
            <img src="/images/company.png" style="height: 130px; width: auto;" class="mb-4 mt-2"
                 alt="logo"/>
            <div class="headline font-weight-bold center primary--text"
                 style="line-height: 46px!important;">
              {{ $t('setupCompany') }}
            </div>
          </v-layout>
        </v-card-title>
        <v-row>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.name"
                :rules="nameRules"
                :label="$t('companyName')"
                persistent-hint
                required
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.latinName"
                :rules="nameRules"
                :label="$t('latinName')"
                persistent-hint
                required
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="2" md="2" xs="2">
            <v-text-field
                v-model="dataObj.shortName"
                :rules="nameRules"
                :label="$t('shortName')"
                persistent-hint
                required
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="2" md="2">

            <v-autocomplete v-model="dataObj.baseCurrency"
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

          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.parentName"
                :label="$t('parentName')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.latinParentName"
                :label="$t('latinParentName')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.directorName"
                :label="$t('directorName')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="4" md="4">

            <v-autocomplete v-model="dataObj.depreciationType"
                            :items="depreciationTypeOption"
                            :dense="dense"
                            item-text="label"
                            item-value="value"
                            :label="$t('depreciationType')"
                            :rules="selectRules"
                            search-input
                            required
            >

            </v-autocomplete>
          </v-col>
          <v-col cols="6" sm="4" md="4">

            <v-autocomplete v-model="dataObj.depreciationPerTime"
                            :items="depreciationPerTimeOption"
                            :dense="dense"
                            item-text="label"
                            item-value="value"
                            :label="$t('depreciationPerTime')"
                            :rules="selectRules"
                            search-input
                            required
            >

            </v-autocomplete>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isIntegrateLoanAndAccount" class="mx-2"
                      :label="$t('isIntegrateLoanAndAccount')"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isIntegrateSavingAndAccount" class="mx-2"
                      :label="$t('isIntegrateSavingAndAccount')"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.vision"
                :label="$t('vision')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.telegramToken"
                :label="$t('telegramToken')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.mission"
                :label="$t('mission')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.slogan"
                :label="$t('slogan')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.url"
                label="URL"
                persistent-hint
                placeholder="'http://192.168.1.10:3000'"
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-text-field
                v-model="dataObj.telegramBotLink"
                :label="$t('telegramBotLink')"
                persistent-hint
                :dense="dense"

            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="4">
            <v-combobox
                v-model="dataObj.values"
                :label="$t('values')"
                multiple
                chips
                :dense="dense"
                persistent-hint
                :rules="requireInput"
                placeholder="Input Data"

            ></v-combobox>
          </v-col>

          <v-col cols="12" sm="4" md="4">
            <v-switch v-model="dataObj.sendMessage" class="mx-2"
                      :label="$t('sendMessage') + ' ផ្ញើរសារទៅកាន់ Telegram'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isAutoRunCollect" class="mx-2"
                      :label="$t('isAutoRunCollect') + ' ដំណើរការរបាយការណ៍ប្រមូលប្រាក់ដោយស្វ័យប្រវត្ត'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isBatchPayment" class="mx-2"
                      label="Batch Payment (បង់ប្រាក់បានច្រើនអតិថិជនដោយគ្រាន់តែជ្រើសរើស)"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isProtectLoan" class="mx-2"
                      :label="$t('isProtectLoan')+ ' បង្ហាញ Field បញ្ញើគាំគារកម្ចីក្នុងតារាងបង់ប្រាក់'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isSavingInLoan" class="mx-2"
                      :label="$t('isSavingInLoan')+' បង់លើសបង្គរជាសន្សំនៅក្នុងLoan ,យកមកគិតគូរពេលបង់ផ្តាច់'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isOtherInCollect" class="mx-2"
                      :label="$t('isOtherInCollect') + 'បង្ហញ Field ផ្សេងៗក្នុងតារាងបង់ប្រាក់'"
                      :dense="dense"></v-switch>
          </v-col>

          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isInsurance" class="mx-2"
                      :label="$t('isInsurance') + ' សេវាមោឃះភាព ក្នុងតារាងបង់ប្រាក់'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isInsuranceFee" class="mx-2"
                      :label="$t('isInsuranceFee') + ' សេវាធានារ៉ាប់រង'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isHideTitle" class="mx-2"
                      :label="$t('isHideTitle')+' លាក់ក្បាលលើរបាយការណ៍'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isOtherCommission" class="mx-2"
                      :label="$t('isOtherCommission')+' កម្រៃជើងសារនៅពេលលក់បាន'"
                      :dense="dense"></v-switch>
          </v-col>

          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isHasQrcode" class="mx-2"
                      :label="$t('isHasQrcode')+' បង្ហាញ QR Code ក្នុងតារាងបង់ប្រាក់'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isPaymentType" class="mx-2"
                      :label="$t('isPaymentType')+' ប្រភេទបង់ប្រាក់របស់អតិថិជន(សាច់ប្រាក់ក្នុងដៃ,សាច់ប្រាក់ក្នុងធនាគារ)'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isTotalBalanceInSchedule" class="mx-2"
                      :label="$t('isTotalBalanceInSchedule')+' បង្ហាញទឹកប្រាក់សរុបក្នុងតារាងបង់ប្រាក់'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isGroupLoan" class="mx-2"
                      label="Group Loan កម្ចីជាក្រុម"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isGuarantorInSchedule" class="mx-2"
                      :label="$t('isGuarantorInSchedule')+'បង្ហាញអ្នកធានាក្នុងតារាងបង់ប្រាក់'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isNotCalculateByDay" class="mx-2"
                      label="គិតការប្រាក់តាមខែ"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isChangeColorSchedule" class="mx-2"
                      label="ប្តរព៌ណតារាងបង់ប្រាក់"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isTargetPlan" class="mx-2"
                      :label="$t('isTargetPlan')+'ផែនការគោលដៅសម្រាប់ CO និងក្រុមហ៊ុន'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isCostOfFund" class="mx-2"
                      :label="$t('isCostOfFund')+'កម្រៃនៃលុយដែលយកមកអោយគេខ្ចី'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isSpecialLoan" class="mx-2"
                      :label="$t('specialLoan')+' ការប្រាក់ជាទឹកលុយ និងមាន RO Fee ,BP Fee'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isCustomPrinciple" class="mx-2"
                      :label="$t('customPrinciple')+' អាចកែប្រាក់ដើមប្រចាំដំណាក់កាល ហើយបង់ប្រាក់ដើមសរុបចុងគ្រា'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isCustomInterestRate" class="mx-2"
                      :label="$t('customInterestRate')+' កំណត់ការប្រាក់ជា% លើសពី2 ប្រភេទ'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isProductType" class="mx-2"
                      :label="$t('productType')"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isAuthorizePayment" class="mx-2"
                      :label="$t('isAuthorizePayment')+' បញ្ចាក់បង់ប្រាក់'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isFeeLaw" class="mx-2"
                      :label="$t('isFeeLaw')+' សេវាមេធាវី'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isHasBanner" class="mx-2"
                      label="របាយការណ៍មាន Banner"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isPayCode" class="mx-2"
                      label="មាន QrCode Payment"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.notRoundAmountPay" class="mx-2"
                      label="Not Round Amount Pay"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isLotType" class="mx-2"
                      label="ប្រភេទដីឡូ"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isLoginBanner" class="mx-2"
                      label="Login មាន Banner"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isLongLogo" class="mx-2"
                      :label="$t('isLongLogo')+' Logo មានលក្ខណះវែង'"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isHideBranchInReport" class="mx-2"
                      :label="$t('លាក់សាខាក្នុងរបាយការណ៍')"
                      :dense="dense"></v-switch>
          </v-col>
          <v-col cols="6" sm="4" md="4">
            <v-switch v-model="dataObj.isLongLogoSchedule" class="mx-2"
                      :label="$t('Logo វែងនៅខាងឆ្វេងក្នុងតារាងបង់ប្រាក់')"
                      :dense="dense"></v-switch>
          </v-col>


        </v-row>

        <v-card-actions>

          <v-spacer></v-spacer>
          <reset-button @resetForm="resetForm" valid="false"></reset-button>
          <save-button @saveForm="handleSubmit"
                       :valid="valid"></save-button>

        </v-card-actions>
      </v-form>
    </v-flex>
  </v-row>
</template>

<script>
import AddButton from "../components/addButton"
import RaiseButton from "../components/raiseAddButton"
import SaveButton from "../components/saveButton"
import CloseButton from "../components/closeButton"
import ResetButton from "../components/resetButton"
import {Constants} from "../../libs/constant"
import GlobalFn from "../../libs/globalFn"
import {Company} from "../../collections/company"
import _ from 'lodash'
import {CompanyReact} from "../../../imports/collections/company"
import numeral from "numeral";

export default {
  name: "Company",
  mounted() {
    this.$jQuery('body').off();
  },
  components: {AddButton, RaiseButton, SaveButton, ResetButton, CloseButton},
  data() {
    return {
      valid: true,
      dense: this.$store.state.isDense,

      dataObj: {
        _id: "",
        name: "",
        latinName: "",
        url: "",
        shortName: "",
        parentName: "",
        latinParentName: "",
        directorName: "",
        depreciationPerTime: 1,
        baseCurrency: "USD",
        isIntegrateLoanAndAccount: false,
        isIntegrateSavingAndAccount: false,
        vision: "",
        mission: "",
        telegramToken: "",
        slogan: "",
        isAutoRunCollect: true,
        telegramBotLink: "",
        isPayCode: false,
        isCustomPrinciple: false,
        isCustomInterestRate: false,
        sendMessage: false,
        isGroupLoan: false,
        isSpecialLoan: false,
        isFeeLaw: false,
        isProductType: false,
        isHasQrcode: false,
        isBatchPayment: false,
        isAuthorizePayment: false,
        isLongLogo: false,
        isOtherCommission: false,
        isHasBanner: false,
        isTotalBalanceInSchedule: false,
        isHideBranchInReport: false,
        isSavingInLoan: false,
        isLotType: false,
        isTargetPlan: false,
        isHideTitle: false,
        isInsurance: false,
        isInsuranceFee: false,
        isProtectLoan: false,
        isOtherInCollect: false,
        isPaymentType: false,
        isCostOfFund: false,
        isGuarantorInSchedule: false,
        isLoginBanner: false,
        isNotCalculateByDay: false,
        notRoundAmountPay: false,
        isChangeColorSchedule: false,
        isLongLogoSchedule: false,
        values: []
      },

      nameRules: [
        v => !!v || 'Company Name is required',
      ],

      selectRules: [
        v => !!v || 'Please Choose one',
      ],
      currencyOption: Constants.currency,
      depreciationTypeOption: [
        {label: "001 : Straight-Line Depreciation Method", value: "001"},
        {label: "002 : Double Declining Balance Depreciation Method", value: "002"},
        {label: "003 : Sum-of-the-Years-Digits Depreciation Method", value: "003"},
      ],
      depreciationPerTimeOption: [
        {label: "1 Month", value: 1},
        {label: "2 Month", value: 2},
        {label: "3 Month", value: 3},
        {label: "4 Month", value: 4},
        {label: "6 Month", value: 6},
        {label: "12 Month", value: 12}
      ],

    }
  },
  methods: {
    resetForm() {
      this.$refs.formData.reset();
    },
    checkRole(roles) {
      switch (roles) {
        case 'Create':
          return GlobalFn.CheckRoles({roles: Constants.create});
          break;
        case 'Update':
          return GlobalFn.CheckRoles({roles: Constants.update});
          break;
        case 'Delete':
          return GlobalFn.CheckRoles({roles: Constants.delete});
          break;
        default:
          return GlobalFn.CheckRoles({roles});
          break;
      }

    },
    handleSubmit() {
      let vm = this;
      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        if (vm.dataObj._id === "") {
          return new Promise((resolve, reject) => {
            Meteor.call("base_insertCompany", vm.dataObj, Constants.secret, (err, result) => {
              if (!err) {
                this.$message({
                  message: this.$t('successNotification'),
                  showClose: true,
                  type: 'success'
                });

                resolve(result);
              } else {
                console.log(err.message);
                this.$message({
                  message: err.message,
                  showClose: true,
                  type: 'error'
                });
                reject(err.message);
              }
              vm.loading = false;
            })
            vm.dialog = false;
          });
        } else {
          return new Promise((resolve, reject) => {
            Meteor.call("base_updateCompany", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
              if (!err) {
                this.$message({
                  message: this.$t('successNotification'),
                  showClose: true,
                  type: 'success'
                });
                vm.loading = false;
                vm.$store.state.companyDoc = vm.dataObj;
                resolve(result);
              } else {
                console.log(err.message);
                this.$message({
                  message: err.message,
                  showClose: true,
                  type: 'error'
                });
                reject(err.message);
              }
            })
            vm.dialog = false;
          });
        }
      }
    }
  },
  watch: {},
  computed: {},
  created() {
    let vm = this;
    vm.dataObj = Company.findOne({}) || {};
  }
}
</script>
