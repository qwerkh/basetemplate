<template>
  <v-row justify="center">
    <v-flex
        md12
    >
      <v-card>

        <v-card-title icon="mdi-index">
          <v-toolbar-title v-show="!$vuetify.breakpoint.mobile">
            <v-icon style="font-size: 70px !important;" large color="green darken-2">store</v-icon>
            {{ $t("branch") }}
          </v-toolbar-title>
          <v-spacer v-show="!$vuetify.breakpoint.mobile"></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="search"
              :label="$t('search')"
              single-line
              hide-details
          ></v-text-field>
          <v-spacer v-show="!$vuetify.breakpoint.mobile"></v-spacer>
          <add-button @add="dialog=true,titleClick='addBranch'" v-if="checkRole('Super')" v-shortkey="['+']"
                      @shortkey.native="dialog=true,titleClick='addBranch'"
                      v-show="!$vuetify.breakpoint.mobile"></add-button>
          <raise-button @add="dialog=true,titleClick='addBranch'" v-if="checkRole('Super')"
                        v-show="$vuetify.breakpoint.mobile"></raise-button>

        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="dataLists"
            :loading="loading"
            loading-text=""
            :search="search"
            hide-default-footer
            class="elevation-1"
            :server-items-length="totalPage"
            :items-per-page="itemsPerPage"
            :page.sync="currentPage"
            :options.sync="options"
            :mobile-breakpoint="0"
        >

          <template v-slot:progress>
            <v-progress-circular indeterminate
                                 color="green"
                                 :value="50"></v-progress-circular>
          </template>

          //Header
          <template v-slot:header.name="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.code="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.enShortName="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.phoneNumber="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.email="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.description="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.homeStreetGroupNo="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.address="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>
          <template v-slot:header.action="{ header }">
            {{ $t(header.text).toUpperCase() }}

          </template>

          //Body


          //Action
          <template v-slot:item.action="{ item }">
            <v-btn color="primary" outlined class="table-action-button mr-2" text icon
                   v-if="checkRole('Update')"
                   @click.native="handleUpdate(item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn color="error" outlined class="table-action-button" text icon v-if="checkRole('Super')"
                   @click.native="handleRemove(item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>

          //No Data
          <template v-slot:no-data>
            {{ $t("noData") }}
          </template>


        </v-data-table>
        <div class="text-center">

          <v-card-actions>
            <v-col v-if="!$vuetify.breakpoint.xsOnly" class="d-flex" cols="12" sm="1">
              {{ $t("total") }} : {{ totalPage }}
            </v-col>
            <v-col class="d-flex" cols="12" sm="1" v-if="!$vuetify.breakpoint.xsOnly">
              <v-select :label="$t('perPage')" v-model="itemsPerPage"
                        :items="pageList"
              ></v-select>
            </v-col>
            <v-pagination v-model="currentPage" :length="pageCount" circle prev-icon="mdi-menu-left"
                          next-icon="mdi-menu-right" :total-visible="7"></v-pagination>
            <v-col class="d-flex" cols="12" sm="1" v-if="!$vuetify.breakpoint.xsOnly">
              <v-text-field v-model="currentPageComputed" :max="pageCount" min=1 type="number"
                            :label="$t('goto')"></v-text-field>
            </v-col>
          </v-card-actions>
        </div>
      </v-card>
    </v-flex>

    <v-dialog v-model="dialog" persistent max-width="1200px" :fullscreen="$vuetify.breakpoint.mobile">
      <v-form
          :model="valid" ref="formData"
          lazy-validation
      >
        <v-card>
          <v-card-title>

            <v-icon v-if="titleClick==='addBranch'" large color="green darken-2"
                    style="font-size: 50px !important;">library_add
            </v-icon>
            <v-icon v-if="titleClick==='updateBranch'" large color="green darken-2"
                    style="font-size: 50px !important;">autorenew
            </v-icon>
            <span class="headline">{{ $t(titleClick) }}</span>
            <v-spacer></v-spacer>
            <close-button @closeForm="dialog=false" valid="false" v-shortkey="['esc']"
                          @shortkey.native="dialog=false"></close-button>

          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.name"
                      :rules="nameRules"
                      :label="$t('branchName')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>


                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.phoneNumber"
                      :label="$t('phoneNumber')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.email"
                      :label="$t('email')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.homeStreetGroupNo"
                      :label="$t('homeStreetGroupNo')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6" class="d-flex">
                  <v-autocomplete v-model="dataObj.provinceId"
                                  :items="provinceOptionList"
                                  outlined
                                  :dense="dense"

                                  item-text="label"
                                  item-value="value"
                                  :label="$t('province')"
                                  search-input
                                  clearable
                                  :rules="selectRules"
                                  required
                  >

                    <template slot="item" slot-scope="{item}">
                      {{ item.value }} | {{ item.label }}

                    </template>

                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="d-flex">
                  <v-autocomplete v-model="dataObj.districtId"
                                  :items="districtOptionList"
                                  outlined
                                  :dense="dense"

                                  item-text="label"
                                  item-value="value"
                                  :label="$t('district')"
                                  search-input
                                  clearable
                                  :rules="selectRules"
                                  required
                  >

                    <template slot="item" slot-scope="{item}">
                      {{ item.value }} | {{ item.label }}

                    </template>

                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="d-flex">
                  <v-autocomplete v-model="dataObj.communeId"
                                  :items="communeOptionList"
                                  outlined
                                  :dense="dense"

                                  item-text="label"
                                  item-value="value"
                                  :label="$t('commune')"
                                  search-input
                                  clearable
                                  :rules="selectRules"
                                  required
                  >

                    <template slot="item" slot-scope="{item}">
                      {{ item.value }} | {{ item.label }}

                    </template>

                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="d-flex">
                  <v-autocomplete v-model="dataObj.villageId"
                                  :items="villageOptionList"
                                  outlined
                                  :dense="dense"

                                  item-text="label"
                                  item-value="value"
                                  :label="$t('village')"
                                  search-input
                                  clearable
                                  :rules="selectRules"
                                  required
                  >

                    <template slot="item" slot-scope="{item}">
                      {{ item.value }} | {{ item.label }}

                    </template>

                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                      v-model="dataObj.address"
                      :label="$t('address')"
                      persistent-hint
                      required
                      readonly
                      :dense="dense"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.enShortName"
                      :label="$t('enShortName')"
                      persistent-hint
                      required
                      :dense="dense"
                      :rules="requireRules"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.code"
                      :rules="requireRules"
                      :label="$t('code')"
                      persistent-hint
                      required
                      placeholder="4 Digit"
                      :dense="dense"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-switch v-model="dataObj.isNotPad" class="mx-2"
                            label="Is Not Pad"
                            :dense="dense"></v-switch>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-switch v-model="dataObj.isCanPayOffWhenHaveOldBalance" class="mx-2"
                            :label="$t('isCanPayOffWhenHaveOldBalance')"
                            :dense="dense"></v-switch>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-switch v-model="dataObj.isCompleteLastInstallment" class="mx-2"
                            :label="$t('isCompleteLastInstallment')"
                            :dense="dense"></v-switch>
                </v-col>
                <v-col cols="12" md="6" sm="6" xs="3">
                  <v-select
                      v-model="dataObj.module"
                      :items="modulesOptionList"
                      :dense="dense"

                      chips
                      :label="$t('modules')"
                      multiple
                      small-chips
                      outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="dataObj.description"
                      :label="$t('description')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="dataObj.analystTelegram"
                      :label="$t('analystTelegram')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="dataObj.cfoTelegram"
                      :label="$t('cfoTelegram')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="dataObj.accountTelegram"
                      :label="$t('accountTelegram')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="dataObj.analystTelegramLoan"
                      :label="$t('analystTelegramLoan')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="dataObj.cfoTelegramLoan"
                      :label="$t('cfoTelegramLoan')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="dataObj.accountTelegramLoan"
                      :label="$t('accountTelegramLoan')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="dataObj.paymentTelegramLoan"
                      :label="$t('paymentTelegramLoan')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                      v-model="dataObj.tokenTelegram"
                      :label="$t('tokenTelegram')"
                      persistent-hint
                      required
                      :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="6" sm="6" md="6">

                  <v-autocomplete v-model="dataObj.escapeType"
                                  :items="escapeTypeOption"
                                  :dense="dense"
                                  item-text="label"
                                  item-value="value"
                                  :label="$t('escapeType')"
                                  :rules="selectRules"
                                  search-input
                                  required
                  >

                  </v-autocomplete>
                </v-col>
                <v-col cols="6" sm="6" md="6">

                  <v-autocomplete v-model="dataObj.roundType"
                                  :items="roundTypeOption"
                                  :dense="dense"
                                  item-text="label"
                                  item-value="value"
                                  :label="$t('roundType')"
                                  :rules="selectRules"
                                  search-input
                                  required
                  >

                  </v-autocomplete>
                </v-col>


                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="dataObj.usdDigit"
                      :label="$t('usdDigit')"
                      persistent-hint
                      required
                      type="number"
                      :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="dataObj.khrDigit"
                      :label="$t('khrDigit')"
                      persistent-hint
                      required
                      type="number"
                      :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                      v-model="dataObj.thbDigit"
                      :label="$t('thbDigit')"
                      persistent-hint
                      required
                      type="number"
                      :dense="dense"

                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12" sm="12" xs="12">
                  {{ $t('escapeDay') }}
                  <v-chip-group
                      v-model="dataObj.escapeDay"
                      multiple
                      active-class="primary--text"
                      :dense="dense"

                  >
                    <v-chip v-for="(day,ind) in daysInWeek" :key="ind">
                      {{ $t(day) }}
                    </v-chip>
                  </v-chip-group>


                </v-col>


                <v-col cols="12" sm="12" md="12">
                  <div v-text="shortCut"></div>
                  <vue-editor
                      v-model="dataObj.contract"
                      style="width: 28cm;"
                  >
                  </vue-editor>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <div>
                    <div v-html="dataObj.contract" style="width: 21cm;border: 1px solid;white-space: nowrap"></div>
                  </div>
                </v-col>


              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>

            <v-spacer></v-spacer>
            <reset-button @resetForm="resetForm" valid="false"></reset-button>
            <save-button @saveForm="handleSubmit" :valid="valid"></save-button>

          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
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
import _ from 'lodash'
import {BranchReact} from "../../../imports/collections/branch"
import numeral from "numeral";
import {VueEditor} from "vue2-editor";

export default {
  meteor: {
    reactData() {
      let vm = this;
      if (Meteor.userId()) {
        BranchReact.find({}).fetch();
        vm.fetchDataTable(vm.search, vm.skip, vm.itemsPerPage + vm.skip);

      }

    }
  },
  mounted() {
    this.$jQuery('body').off();
  },
  name: "Branch",
  components: {AddButton, RaiseButton, SaveButton, ResetButton, CloseButton, VueEditor},
  data() {
    return {
      dense: this.$store.state.isDense,
      isLoading: false,
      fullPage: false,
      dialog: false,
      search: '',
      currentPage: 1,
      pageCount: 0,
      totalPage: 0,
      itemsPerPage: 10,
      sortBy: "",
      sortDesc: "",
      options: {},
      skip: 0,
      limit: 10,
      filter: "",
      loading: true,
      valid: true,
      titleClick: "",
      pageList: [10, 20, 50, 100, 200],
      shortCut: "{{coName}} {{position}} {{clientName}} {{clientPhone}}{{clientAddress}}{{gender}}{{dob}}{{facebook}}{{job}}{{clientAddress}} {{loanAmount}} {{currency}} {{currencyKH}} {{loanAmountChar}} {{branchName}} " +
          " {{cardType}} {{clientIdCard}} {{joinAccountName}}  {{joinIdCardType}} {{joinIdCard}} {{joinAccountPhone}}  {{joinAccountRelationship}}  {{rate}} {{operationFeePercent}}" +
          "{{term}} {{termType}} {{numOfBorrowingDay}} {{startDate}} {{endDate}} {{purposeLoan}} {{clientNameAndJoinAccountName}} {{paid}} {{price}} {{mortgage}} {{model}} {{projectInterest}} {{projectOperation}} {{loanAcc}} {{clientType}}{{desc}}{{guarantor}}{{guarantorGender}}{{guarantorDob}}{{guarantorPhoneNumber}}{{guarantorJob}}{{guarantorAddress}}{{guarantorIdCard}}{{guarantorFacebook}}",
      dataObj: {
        _id: "",
        description: "",
        phoneNumber: "",
        email: "",
        provinceId: "",
        districtId: "",
        communeId: "",
        villageId: "",
        homeStreetGroupNo: "",
        address: "",
        provinceName: "",
        districtName: "",
        communeName: "",
        villageName: "",
        enShortName: "",
        code: "",
        expiredDay: 14,
        analystTelegram: "",
        cfoTelegram: "",
        accountTelegram: "",
        analystTelegramLoan: "",
        cfoTelegramLoan: "",
        accountTelegramLoan: "",
        paymentTelegramLoan: "",
        tokenTelegram: "",
        isNotPad: false,
        isCanPayOffWhenHaveOldBalance: false,
        isCompleteLastInstallment: true,
        roundType: "Normal",
        usdDigit: 2,
        khrDigit: -2,
        thbDigit: 0,
        escapeType: "No Escape",
        escapeDay: [6, 0],
        module: [],
        contract: "",

      },

      nameRules: [
        v => !!v || 'Branch Name is required',
      ],
      requireRules: [
        v => !!v || 'required',
      ],

      selectRules: [
        v => !!v || 'Please Choose one',
      ],
      headers: [
        {
          text: 'branchName',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        {
          text: 'enShortName',
          align: 'left',
          sortable: true,
          value: 'enShortName',
        }, {
          text: 'phoneNumber',
          align: 'left',
          sortable: true,
          value: 'phoneNumber',
        }, {
          text: 'email',
          align: 'left',
          sortable: true,
          value: 'email',
        }, {
          text: 'homeStreetGroupNo',
          align: 'left',
          sortable: true,
          value: 'homeStreetGroupNo',
        },
        {
          text: 'address',
          align: 'left',
          sortable: true,
          value: 'address',
        }, {
          text: 'description',
          align: 'left',
          sortable: true,
          value: 'description',
        },
        {
          text: 'code',
          align: 'left',
          sortable: true,
          value: 'code',
        },


        {text: 'actions', value: 'action', sortable: false, width: "120px"},
      ],
      dataLists: [],
      provinceOptionList: [],
      districtOptionList: [],
      communeOptionList: [],
      villageOptionList: [],

      provinceName: "",
      districtName: "",
      communeName: "",
      villageName: "",

      provinceNameRaw: "",
      districtNameRaw: "",
      communeNameRaw: "",
      villageNameRaw: "",
      city: false,
      roundTypeOption: Constants.roundType,
      escapeTypeOption: Constants.escapeType,
      daysInWeek: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
      modulesOptionList: Constants.modulesOption,

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
    queryProvinceOption() {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("fetchProvinceOption", (err, result) => {
          if (result) {
            vm.provinceOptionList = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })

    },
    queryDistrictOption(provinceId) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("fetchDistrictOption", provinceId, (err, result) => {
          if (result) {
            vm.districtOptionList = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })
    },
    queryCommuneOption(districtId) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("fetchCommuneOption", districtId, (err, result) => {
          if (result) {
            vm.communeOptionList = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })
    },
    queryVillageOption(communeId) {
      let vm = this;
      return new Promise((resolve, reject) => {
        Meteor.call("fetchVillageOption", communeId, (err, result) => {
          if (result) {
            vm.villageOptionList = result;
            resolve(result);
          } else {
            reject(err.message);
          }
        })
      })
    },
    fetchDataTable: _.debounce(function (val, skip, limit) {
      let vm = this;
      vm.loading = true;
      return new Promise((resolve, reject) => {
        Meteor.call("base_fetchBranch", {
          q: val,
          filter: this.filter,
          sort: {sortBy: vm.sortBy || "", sortDesc: vm.sortDesc || ""},
          options: {skip: skip || 0, limit: limit || 10},
          accessToken: Constants.secret
        }, (err, result) => {
          if (result) {
            vm.loading = false;
            vm.dataLists = result.content;
            vm.pageCount = Math.ceil((result.countContent || 1) / vm.itemsPerPage);
            vm.totalPage = result.countContent;
            vm.currentPage = vm.pageCount < vm.currentPage ? vm.pageCount : vm.currentPage;
            resolve(result)
          } else {
            reject(err.message);
          }
        })
      });

    }, 50),
    handleSubmit() {
      let vm = this;

      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        if (vm.dataObj._id === "") {
          return new Promise((resolve, reject) => {
            Meteor.call("base_insertBranch", vm.dataObj, Constants.secret, (err, result) => {
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
            Meteor.call("base_updateBranch", vm.dataObj._id, vm.dataObj, Constants.secret, (err, result) => {
              if (!err) {
                this.$message({
                  message: this.$t('successNotification'),
                  showClose: true,
                  type: 'success'
                });
                vm.loading = false;
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
    },
    handleUpdate(doc) {
      let vm = this;
      vm.dataObj = Object.assign({}, doc);

      vm.dataObj.provinceId = doc.provinceId;
      vm.dataObj.districtId = doc.districtId;
      vm.dataObj.communeId = doc.communeId;
      vm.dataObj.villageId = doc.villageId;

      vm.provinceName = doc.provinceName;
      vm.districtName = doc.districtName + " ";
      vm.communeName = doc.communeName + " ";
      vm.villageName = doc.villageName + " ";

      vm.titleClick = "updateBranch";
      vm.dialog = true;

    },
    handleRemove(row) {
      let vm = this;
      vm.$confirm(this.$t('messageWarning'), this.$t('warning'), {
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        Meteor.call("base_removeBranch", row, Constants.secret, (err, result) => {
          if (!err) {
            vm.$message({
              message: this.$t('removeSuccess'),
              type: 'success'
            });

          } else {
            vm.$message({
              type: 'error',
              message: this.$t('removeFail') + " " + err.message
            });
          }

        })
      }).catch(() => {
        vm.$message({
          type: 'info',
          message: this.$t('removeCancel')
        });
      });
    }
  },
  watch: {
    dialog(val) {
      let vm = this;
      if (val === false) {
        this.$refs.formData.reset();
        vm.dataObj._id = "";
      }
    },
    currentPage(val) {
      this.loading = true;
      this.skip = (val - 1) * this.itemsPerPage > 0 ? (val - 1) * this.itemsPerPage : 0;
      this.fetchDataTable(this.search, this.skip, this.itemsPerPage + this.skip);
    },
    options: {
      handler() {
        this.sortBy = this.options.sortBy[0] || "";
        this.sortDesc = this.options.sortDesc[0] || "";

        this.fetchDataTable(this.search, this.skip, this.itemsPerPage + this.skip);
      },
      deep: true,
    },
    "dataObj.provinceId"(val) {
      if (val) {
        this.queryDistrictOption(val);
        let pro = this.provinceOptionList.find((item) => {
          return item.value === val;
        })
        if (pro) {
          if (pro.value === "12") {
            this.dataObj.provinceName = " រាជធានី " + pro.label;
            this.provinceName = " រាជធានី " + pro.label;
          } else {
            this.dataObj.provinceName = " ខេត្ត " + pro.label;
            this.provinceName = " ខេត្ត " + pro.label;
          }


          this.provinceNameRaw = pro.label;
        }
      } else {
        this.dataObj.districtId = "";
        this.dataObj.communeId = "";
        this.dataObj.villageId = "";

        this.dataObj.provinceName = "";
        this.dataObj.districtName = "";
        this.dataObj.communeName = "";
        this.dataObj.villageName = "";

        this.provinceName = "";
        this.districtName = "";
        this.communeName = "";
        this.villageName = "";

        this.provinceNameRaw = "";
        this.districtNameRaw = "";
        this.communeNameRaw = "";
        this.villageNameRaw = "";
      }
      this.dataObj.address = this.villageName + this.communeName + this.districtName + this.provinceName;
    },
    "dataObj.districtId"(val) {
      if (val) {
        this.queryCommuneOption(val);
        let dis = this.districtOptionList.find((item) => {
          return item.value === val;
        })
        if (dis) {
          this.city = dis.city || false;
          if (dis.label === this.provinceNameRaw || this.city) {
            this.dataObj.districtName = " ក្រុង " + dis.label;
            this.districtName = " ក្រុង " + dis.label;
          } else if (this.provinceNameRaw === "ភ្នំពេញ") {
            this.dataObj.districtName = " ខ័ណ្ឌ " + dis.label;
            this.districtName = " ខ័ណ្ឌ " + dis.label;
          } else {
            this.dataObj.districtName = " ស្រុក " + dis.label;
            this.districtName = " ស្រុក " + dis.label;
          }

          this.districtNameRaw = dis.label;
        }
      } else {
        this.dataObj.communeId = "";
        this.dataObj.villageId = "";

        this.dataObj.districtName = "";
        this.dataObj.communeName = "";
        this.dataObj.villageName = "";

        this.districtName = "";
        this.communeName = "";
        this.villageName = "";
        this.districtNameRaw = "";
        this.communeNameRaw = "";
        this.villageNameRaw = "";
      }
      this.dataObj.address = this.villageName + this.communeName + this.districtName + this.provinceName;
    },
    "dataObj.communeId"(val) {
      if (val) {
        this.queryVillageOption(val);
        let com = this.communeOptionList.find((item) => {
          return item.value === val;
        })
        if (com) {
          if (this.districtNameRaw === this.provinceNameRaw || this.provinceNameRaw === "ភ្នំពេញ" || this.city) {
            this.dataObj.communeName = " សង្កាត់ " + com.label;
            this.communeName = " សង្កាត់ " + com.label;
            this.communeNameRaw = com.label;
          } else {
            this.dataObj.communeName = " ឃុំ " + com.label;
            this.communeName = " ឃុំ " + com.label;
            this.communeNameRaw = com.label;
          }
        }
      } else {
        this.dataObj.villageId = "";

        this.dataObj.communeName = "";
        this.dataObj.villageName = "";

        this.communeName = "";
        this.villageName = "";
        this.communeNameRaw = "";
        this.villageNameRaw = "";
      }
      this.dataObj.address = this.villageName + this.communeName + this.districtName + this.provinceName;
    },
    "dataObj.villageId"(val) {
      if (val) {
        let vil = this.villageOptionList.find((item) => {
          return item.value === val;
        })
        if (vil) {
          this.dataObj.villageName = "ភូមិ " + vil.label;
          this.villageName = "ភូមិ " + vil.label;
          this.villageNameRaw = vil.label;
        }
      } else {
        this.dataObj.villageName = "";
        this.villageName = "";
        this.villageNameRaw = "";

      }
      this.dataObj.address = this.villageName + this.communeName + this.districtName + this.provinceName;


    }
  },
  computed: {
    currentPageComputed: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.currentPage = numeral(value).value()
      }
    }
  },
  created() {
    let vm = this;
    //vm.fetchDataTable();
    vm.queryProvinceOption();
    Meteor.subscribe('branchReact');
  }
}
</script>
