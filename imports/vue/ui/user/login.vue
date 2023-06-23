<template>
  <div v-if="$vuetify.breakpoint.mobile" oncontextmenu="return false">
    <!--<v-dialog
            v-model="dialog"
            persistent
            :fullscreen="$vuetify.breakpoint.xsOnly"
            max-width="600px"
    >-->
    <v-parallax
        dark
        id="base-loginMobile"
        style="width: 100%;height:100%;"
    >
      <!--          ZIB-->
                  <v-card
                          :loading="loading"
                          class="mx-auto my-12"
                          max-width="374"
                          elevation="9"
                          style="background-color: rgba(251,251,255,0.5);box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .14);border-radius: 3px;color:white"
                  >
                      <v-card-title>
                          <v-layout column align-center justify-center class="mb-2" v-if="!companyDoc.isLoginBanner">
                              <img src="/images/logo.png" style="height: 130px; width: auto;" class="mb-4 mt-2"
                                   alt="logo"/>
                              <div class="headline font-weight-bold center primary--text"
                                   style="line-height: 46px!important;">
                                  {{companyDoc.name}}
                              </div>
                              <v-chip class="title font-weight-bold mt-3" style="font-size: 14px !important;"
                                      text-color="primary">
                                  {{companyDoc.latinName}}
                              </v-chip>
                          </v-layout>
                          <v-layout column align-center justify-center class="mb-2" v-if="companyDoc.isLoginBanner">
                              <img src="/images/banner.png" style="height: 100px; width: auto;" class="mt-2"
                                   alt="logo"/>

                          </v-layout>
                      </v-card-title>
                      <v-card-text>
                          <v-form :model="valid" ref="formData"
                                  lazy-validation>
                              <v-col cols="12">
                                  <v-text-field :label="$t('userEmail')" required
                                                prepend-icon="mdi-face"
                                                v-model="user.email"
                                                :rules="emailRules"
                                  >
                                  </v-text-field>
                              </v-col>
                              <v-col cols="12">
                                  <v-text-field :label="$t('password')" type="password" required
                                                autocomplete
                                                prepend-icon="mdi-lock-outline"
                                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                                v-model="user.password"
                                                :rules="passwordRules"
                                                :type="show ? 'text' : 'password'"
                                                @click:append="show = !show"
                                  >
                                  </v-text-field>
                              </v-col>
                          </v-form>
                      </v-card-text>

                      <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                                  color="deep-purple accent-4"
                                  text
                                  x-large
                                  v-shortkey="['enter']"
                                  @shortkey="submitForm"
                                  @click="submitForm"
                          >
                              {{$t("letGo")}}
                          </v-btn>
                          <v-spacer></v-spacer>


                      </v-card-actions>
                      <v-card-actions>
                          <v-spacer></v-spacer>

                          {{$t("lookingTo")}}
                          <v-btn
                                  color="deep-purple accent-4"
                                  text
                                  @click=""
                                  to="/register"
                                  x-small
                          >
                              {{$t("createAnAccount")}}
                          </v-btn>
                          <v-spacer></v-spacer>


                      </v-card-actions>
                  </v-card>


      <!--          Ninja-->
<!--      <img src="/images/banner.png" style="left: 0;padding-top: 10px;height: 70px;width: auto;object-fit: contain;align-self: self-start"/>
      <v-row>
          <v-col cols="12" sm="12" md="6" style="padding-bottom: 0px !important;">
            <v-card-title>

              <v-layout column class="mb-2">
                <h1 style="color: white">WELCOME!</h1>
                <div class="headline font-weight-bold center primary&#45;&#45;text"
                     style="line-height: 46px!important;padding-top: 10px;word-break: break-word;">
                  <h3 style="color: white;">{{ companyDoc.latinName }}</h3>
                </div>
              </v-layout>
            </v-card-title>
          </v-col>
          <v-col cols="12" sm="12" md="6" style="padding-top: 0px !important;">
            <v-card-text style="padding: 0px !important;">
              <v-form :model="valid" ref="formData"
                      lazy-validation>
                <v-col cols="12" style="padding: 0px !important;">
                  <h3 style="color: white;padding-bottom: 5px">{{ $t('userEmail') }}</h3>
                  <v-text-field
                      :placeholder="$t('userEmail')"
                      solo
                      v-model="user.email"
                      :rules="emailRules"
                      append-outer-icon="mdi-face"
                      required
                      rounded
                  ></v-text-field>
                </v-col>
                <v-col cols="12" style="padding: 0px !important;">
                  <h3 style="color: white;padding-bottom: 5px">{{ $t('password') }}</h3>
                  <v-text-field :label="$t('password')" type="password" required
                                autocomplete
                                append-outer-icon="mdi-lock-outline"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                v-model="user.password"
                                :rules="passwordRules"
                                :type="show ? 'text' : 'password'"
                                solo
                                rounded
                                @click:append="show = !show"
                  >
                  </v-text-field>
                </v-col>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn
                  color="#941f1e accent-4"
                  rounded
                  x-large
                  v-shortkey="['enter']"
                  @shortkey="submitForm"
                  style="padding: 0 30px !important;background-color: #941f1e !important;color: white"
                  @click="submitForm"
              >
                {{ $t("letGo") }}
              </v-btn>
              <v-spacer></v-spacer>


            </v-card-actions>
            <v-card-actions style="color: white">
              <v-spacer></v-spacer>

              {{ $t("lookingTo") }}
              <v-btn
                  color="white accent-4"
                  text
                  @click=""
                  to="/register"
                  x-small
              >
                {{ $t("createAnAccount") }}
              </v-btn>
              <v-spacer></v-spacer>


            </v-card-actions>
          </v-col>
        </v-row>-->



      <v-snackbar
          v-model="isCorrect"
          :timeout="timeout"
          top
          color="orange"
      >
        {{ $t(messageError) }}
        <v-btn
            color="white"
            text
            @click="isCorrect = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-parallax>
    <!--</v-dialog>-->
  </div>
  <div v-else oncontextmenu="return false">
    <div id="base-login">
      <v-layout class="auth-background" align-center justify-center row fill-height>
        <!--<loading :active.sync="isLoading"
                 :can-cancel="true"
                 :is-full-page="fullPage"></loading>-->
        <v-overlay :value="loading">
          <v-progress-circular indeterminate size="64" color="white"></v-progress-circular>
        </v-overlay>

        <v-container fluid
                     grid-list-xl>
<!--          ZIB-->
          <v-card
              :loading="loading"
              class="mx-auto my-12"
              max-width="374"
              shaped
              :ma-0="$vuetify.breakpoint.xsOnly"
              elevation="9"
              style="background-color: rgba(251,251,255,0.5);box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .14);border-radius: 3px"

          >
            <v-card-title>
              <v-layout column align-center justify-center class="mb-2" v-if="!companyDoc.isLoginBanner">
                <img src="/images/logo.png" style="height: 130px; width: auto;" class="mb-4 mt-2"
                     alt="logo"/>
                <div class="headline font-weight-bold center primary--text"
                     style="line-height: 46px!important;">
                  {{companyDoc.name}}
                </div>
                <v-chip class="title font-weight-bold mt-3" style="font-size: 17px;"
                        text-color="primary">
                  {{companyDoc.latinName}}
                </v-chip>
              </v-layout>
              <v-layout column align-center justify-center class="mb-2" v-if="companyDoc.isLoginBanner">
                <img src="/images/banner.png" style="height: 100px; width: auto;" class="mt-2"
                     alt="logo"/>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-form :model="valid" ref="formData"
                      lazy-validation>
                <v-col cols="12">
                  <v-text-field :label="$t('userEmail')" required
                                prepend-icon="mdi-face"
                                v-model="user.email"
                                :rules="emailRules"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field :label="$t('password')" type="password" required
                                autocomplete
                                prepend-icon="mdi-lock-outline"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                v-model="user.password"
                                :rules="passwordRules"
                                :type="show ? 'text' : 'password'"
                                @click:append="show = !show"
                  >
                  </v-text-field>
                </v-col>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                  color="deep-purple accent-4"
                  text
                  x-large
                  v-shortkey="['enter']"
                  @shortkey="submitForm"
                  @click="submitForm"
              >
                {{$t("letGo")}}
              </v-btn>
              <v-spacer></v-spacer>


            </v-card-actions>
            <v-card-actions>
              <v-spacer></v-spacer>

              {{$t("lookingTo")}}
              <v-btn
                  color="deep-purple accent-4"
                  text
                  @click=""
                  to="/register"
                  x-small
              >
                {{$t("createAnAccount")}}
              </v-btn>
              <v-spacer></v-spacer>


            </v-card-actions>
          </v-card>

<!--   Ninja       -->
<!--          <v-card
              :loading="loading"
              class="mx-auto my-12"
              max-width="374"
              shaped
              :ma-0="$vuetify.breakpoint.xsOnly"
              style="background-color: rgba(251,251,255,0);box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .14);border-radius: 3px;float: right;
    margin-right: 134px !important"

          >
            <v-card-title>
              <v-layout column class="mb-2">
                <h1 style="color: white">WELCOME!</h1>
                <div class="headline font-weight-bold center primary&#45;&#45;text"
                     style="line-height: 46px!important;padding-top: 10px;word-break: break-word;">
                  <h3 style="color: white;">{{ companyDoc.latinName }}</h3>
                </div>
              </v-layout>
            </v-card-title>
            <v-card-text style="padding: 0px !important;">
              <v-form :model="valid" ref="formData"
                      lazy-validation>
                <v-col cols="12" style="padding: 0px !important;">
                  <h3 style="color: white;padding-bottom: 5px">{{ $t('userEmail') }}</h3>
                  <v-text-field
                      :placeholder="$t('userEmail')"
                      solo
                      v-model="user.email"
                      :rules="emailRules"
                      append-outer-icon="mdi-face"
                      required
                      rounded
                  ></v-text-field>
                </v-col>
                <v-col cols="12" style="padding: 0px !important;">
                  <h3 style="color: white;padding-bottom: 5px">{{ $t('password') }}</h3>
                  <v-text-field :label="$t('password')" type="password" required
                                autocomplete
                                append-outer-icon="mdi-lock-outline"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                v-model="user.password"
                                :rules="passwordRules"
                                :type="show ? 'text' : 'password'"
                                solo
                                rounded
                                @click:append="show = !show"
                  >
                  </v-text-field>
                </v-col>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn
                  color="green accent-4"
                  rounded
                  x-large
                  v-shortkey="['enter']"
                  @shortkey="submitForm"
                  style="padding: 0 30px !important;background-color: #941f1e !important;color: white"
                  @click="submitForm"
              >
                {{ $t("letGo") }}
              </v-btn>
              <v-spacer></v-spacer>


            </v-card-actions>
            <v-card-actions style="color: white">
              <v-spacer></v-spacer>

              {{ $t("lookingTo") }}
              <v-btn
                  color="white accent-4"
                  text
                  @click=""
                  to="/register"
                  x-small
              >
                {{ $t("createAnAccount") }}
              </v-btn>
              <v-spacer></v-spacer>


            </v-card-actions>
          </v-card>-->

          <v-snackbar
              v-model="isCorrect"
              :timeout="timeout"
              top
              color="orange"
          >
            {{ $t(messageError) }}
            <v-btn
                color="white"
                text
                @click="isCorrect = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </v-container>


      </v-layout>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import {Company} from "../../../collections/company"
import {Meteor} from 'meteor/meteor';

export default {
  mounted() {
    this.$jQuery('body').off();
  },
  name: "Login",
  components: {
    Loading
  },
  data() {
    return {
      dense: this.$store.state.isDense,

      loading: false,
      valid: null,
      show: false,
      isCorrect: false,
      timeout: 2000,
      fullPage: true,
      user: {
        email: "",
        password: ""
      },
      emailRules: [
        v => !!v || '',
      ],
      passwordRules: [
        v => !!v || '',
      ],
      dialog: true,
      companyDoc: {},
      messageError: ""
    }
  },

  methods: {
    ...mapActions(["updateUser"]),
    submitForm() {
      let vm = this;
      if (vm.$refs.formData.validate()) {
        vm.loading = true;
        Meteor.loginWithPassword(this.user.email || "", this.user.password, error => {
          if (error) {
            if (error.error === "maxUserLogin" || error.error === "userOutOfRole") {
              vm.messageError = error.error;
            } else {
              vm.messageError = "incorrect";
            }
            vm.isCorrect = true;
          } else {
            vm.loginUserWithCurrentProfile();
          }
          vm.loading = false;
        })
      }
    },
    loginUserWithCurrentProfile() {
      let vm = this;
      let userDoc = Meteor.user();
      vm.updateUser(userDoc);
      if (userDoc && userDoc.profile) {
        vm.$i18n.locale = userDoc.profile.language || "en";
      }

      vm.loading = false;
      if (userDoc && userDoc.profile.approved === false) {
        vm.$router.replace('/unApproved');
      } else if (vm.$router.history.current.path !== '/') {
        vm.$router.replace('/');
      }
    }
  },
  created() {
    let vm = this;
    Meteor.call("base_findCompany", (err, result) => {
      if (!err) {
        vm.companyDoc = result;
        vm.$store.state.companyDoc = result;
      }
    })
    vm.$store.dispatch("logoutUser");
  }
}

document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    return false;
  }
}
</script>
<style scoped>
#base-login {
  /*background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('/images/bannerpc.png');*/
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/login-1.png');
  /*background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/login.jpg');*/
  background-position: top left;
  background-size: cover;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  /*z-index: 1;*/
  /*width: 0;*/
  /*height: 0;*/
}

#base-loginMobile {
  /*background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('/images/bannertablet.jpg');*/
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/login-1.png');
  /*background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/login.jpg');*/
  background-position: top left;
  background-size: cover;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  /*z-index: 1;*/
  /*width: 0;*/
  /*height: 0;*/
}

</style>

