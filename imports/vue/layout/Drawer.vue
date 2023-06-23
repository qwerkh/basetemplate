<template>
  <v-navigation-drawer
      v-model="drawer"
      app
      :id="idNavigatorDrawer"
      dark
      persistent
      mobile-breakpoint="991"
      :mini-variant="miniVariant"
      :expand-on-hover="expandOnHover"
      width="299"


  >
    <v-navigation-drawer
        v-model="left"
        absolute
        temporary
        dark
        persistent
        :id="idNavigatorDrawer"
        fixed
        width="299"
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
        >
          <v-list-item v-for="(item, index) in branchList"
                       :key="item.value"
                       @click="changeBranch(item.value)" tag="a" :class="sideBarMode"
                       style="text-align: center !important;">
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
        v-model="leftModule"
        absolute
        temporary
        dark
        persistent
        :id="idNavigatorDrawer"
        fixed
        width="299"
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
        >
          <v-list-item v-for="(item, index) in moduleList"
                       :key="item.value"
                       @click="changeModule(item)" tag="a" :class="sideBarMode"
                       style="text-align: center !important;">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
        v-model="leftReference"
        absolute
        temporary
        dark
        persistent
        :id="idNavigatorDrawer"
        fixed
        width="299"
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
        >
          <v-list-item v-for="(ref, index) in reference"
                       :key="ref.title"
                       :to="ref.to"
                       @click="" tag="a"
                       :class="sideBarMode"
                       style="text-align: center !important;">
            <v-list-item-title>{{ $t(ref.title) }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-list dense>
      <v-list-item>
        <!--<v-list-item-icon v-text="companyDoc.shortName">
        </v-list-item-icon>-->
        <v-list-item-content>
          <v-list-item-title
              style="font-size: 18px !important;line-height: 1.7rem !important;text-align: center">
            {{ companyDoc.name }}
          </v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>
    <v-divider class="ma-1"></v-divider>
    <v-list dense nav shaped>
      <v-list-group
          v-for="base in bases"
          :key="base.title"
          v-model="base.active"
          no-action
          class="navigateDrawer"
      >
        <template slot="activator">

          <v-list-item-avatar>
            <v-img :src="currentUserFormMeteor && currentUserFormMeteor.url || avatarUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ currentUser && currentUser.profile.fullName || "" }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
            v-for="subBase in base.bases"
            :key="subBase.title"
            @click=""
            :to="subBase.to"
            :class="sideBarMode"
            v-if="subBase.hasRole()"
        >
          <v-list-item-icon v-text="subBase.action">
          </v-list-item-icon>
          <v-list-item-content link>
            <v-list-item-title v-text="$t(subBase.title)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-show="!!$vuetify.breakpoint.xsOnly"
                     key="logout"
                     @click="logout"
        >
          <v-list-item-icon>LO
          </v-list-item-icon>
          <v-list-item-content link>
            <v-list-item-title v-text="$t('logout')"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item @click.stop="leftModule = !leftModule">
        <v-list-item-action>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ currentModule }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click.stop="left = !left">
        <v-list-item-action>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ branchName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="ma-1"></v-divider>


    <v-list dense nav shaped>

      <!--<v-list-item v-if="settingRole()" to="dashBoard">
          <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
              <v-list-item-title>{{$t('dashBoard')}}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>-->

      <!--<v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          class="navigateDrawer"
          v-if="item.hasRole()"
      >
        <template slot="activator">
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
          </v-list-item-content>
        </template>-->
      <v-list-item
          v-for="subItem in items"
          :key="subItem.title"
          @click=""
          tag="a"
          :to="subItem.to"
          :class="sideBarMode"
          v-show="subItem.module && subItem.module.indexOf(currentModule)>-1"
          v-if="subItem.hasRole()"
      >
        <v-list-item-icon v-text="subItem.action"></v-list-item-icon>

        <v-list-item-content link>
          <v-list-item-title v-text="$t(subItem.title)"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!--      </v-list-group>-->
    </v-list>

    <v-list dense nav shaped>

      <v-list-group
          v-for="item in report"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          class="navigateDrawer"
          v-if="item.hasRole()"
      >
        <template slot="activator">
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            @click=""
            tag="a"
            :to="subItem.to"
            :class="sideBarMode"
            v-show="subItem.module && subItem.module.indexOf(currentModule)>-1"
            v-if="subItem.hasRole()"
        >
          <v-list-item-icon v-text="subItem.action"></v-list-item-icon>

          <v-list-item-content link>
            <v-list-item-title v-text="$t(subItem.title)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-list dense nav shaped>
      <v-list-group
          v-for="item in setting"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          class="navigateDrawer"
          v-if="item.hasRole()"
      >
        <template slot="activator">
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            @click=""
            tag="a"
            :to="subItem.to"
            :class="sideBarMode"
            v-show="subItem.module && subItem.module.indexOf(currentModule)>-1"
            v-if="subItem.hasRole()"
        >
          <v-list-item-icon v-text="subItem.action"></v-list-item-icon>

          <v-list-item-content link>
            <v-list-item-title v-text="$t(subItem.title)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <!-- <v-list-item @click.stop="leftReference = !leftReference" v-if="settingRole()">
           <v-list-item-action>
               <v-icon>double_arrow</v-icon>
           </v-list-item-action>
           <v-list-item-content>
               <v-list-item-title>{{$t('referenceData')}}</v-list-item-title>
           </v-list-item-content>
       </v-list-item>-->
    </v-list>
    <template slot="append">
      <div class="pa-2">
        <v-btn block @click="logout" rounded
               :elevation="hover ? 16 :0">
          <i class="material-icons">
            power_settings_new
          </i>
        </v-btn>
      </div>
    </template>


  </v-navigation-drawer>

</template>

<script>
import GlobalFn from "../../libs/globalFn";
import {Constants} from "../../libs/constant"
import {Company} from "../../collections/company"
import {mapActions} from "vuex"

export default {
  name: "Drawer",
  props: ["drawerProp", "miniVariantProp"],
  data() {
    return {
      right: false,
      left: false,
      isBatchPayment: false,
      isAuthorizePayment: false,
      leftModule: false,
      leftReference: false,
      drawer: true,
      avatarUrl: "/images/avatar.png",
      branchList: [],
      moduleList: Meteor.user() && Meteor.user().module,
      branchId: "",
      branchName: "",
      offset: false,
      miniVariant: false,
      expandOnHover: false,
      items: [

      ],
      report: [
        {
          action: 'file_copy',
          title: 'report',
          hasRole: () => true,
          items: [

          ],
        },

      ],
      setting: [
        {
          action: 'perm_data_setting',
          title: 'setting',
          hasRole: () => this.checkRole(Constants.setting),
          items: [

            {
              title: 'exchange',
              action: "EX",
              to: "/exchange",
              hasRole: () => this.checkRole(Constants.setting),
              module: ["Loan", "Saving", "Account"]
            },
           {
              title: 'branch',
              action: "BR",
              to: "/branch",
              hasRole: () => this.checkRole(Constants.controlUser),
              module: ["Loan", "Saving"]
            },
            {
              title: 'company',
              action: "CO",
              to: "/company",
              hasRole: () => this.checkRole(Constants.super),
              module: ["Loan", "Saving"]
            },
          ],
        },
      ],
      reference: [
        /*{
            title: 'activity',
            action: "AC",
            to: "/bl_activity",
            hasRole: () => this.checkRole(Constants.setting)
        },*/

      ],
      bases: [

        {
          title: "",
          bases: [
            {title: 'changePassword', action: "CP", to: "/changePassword", hasRole: () => true},
            {title: 'editProfile', action: "EP", to: "/editProfile", hasRole: () => true},
            {
              title: 'user',
              action: "US",
              to: "/user",
              hasRole: () => this.checkRole(Constants.controlUser)
            },
          ],
        },

      ],
      settingRole: () => this.checkRole(Constants.setting)
    }
  },
  methods: {
    ...mapActions(["updateModule"]),
    logout() {
      this.$store.dispatch("logoutUser");
    },
    checkRole(roles) {
      return GlobalFn.CheckRoles({roles});
    },
    changeBranch(val) {
      let vm = this;
      vm.branchId = val;
      vm.branchName = vm.branchList.find(o => o.value === val).label || "";
      vm.left = false;

      vm.$router.push("welcome");

    },
    changeModule(val) {
      let vm = this;
      vm.updateModule(val);
      vm.leftModule = false;
      if (val !== "CCL") {
        vm.$router.push("welcome");

      } else {
        vm.$router.push("repaymentScheduleCCLReport");

      }
    }
  },
  watch: {
    drawerProp(val) {
      this.drawer = val;
    },
    drawer(val) {
      this.$emit('getDrawerState', val);
    },
    branchId(val) {
      let vm = this;
      vm.$store.state.branchId = val;
      Meteor.call("base_fetchBranchById", val, Constants.secret, (err, result) => {
        if (result) {
          vm.$store.state.branchDoc = result;

        }
      })

      if (vm.$router.history.current.path !== '/') {
        vm.$router.replace('/');
      }
    },
    miniVariantProp(val) {
      this.miniVariant = val;
      this.expandOnHover = val;
    },

  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    currentUserFormMeteor() {
      return Meteor.user();
    },
    currentModule() {
      return this.$store.state.currentModule;
    },
    companyDoc() {
      return this.$store.state.companyDoc;
    },
    sideBarMode() {
      return this.$store.state.mode && this.$store.state.mode.replace("#", "C") || "C28a745";
    },

    idNavigatorDrawer() {
      if (this.$store.state.isSideBarImage === false) {
        return "base-navigation-drawerNo" + (this.$store.state.drawerBackground || 1);
      }
      return "base-navigation-drawer" + (this.$store.state.drawerBackground || 0);
    }
  },
  created() {
    let vm = this;
    vm.$store.state.companyDoc = Company.findOne({}) || {};
    vm.isBatchPayment = vm.$store.state.companyDoc.isBatchPayment || false;
    vm.isAuthorizePayment = vm.$store.state.companyDoc.isAuthorizePayment || false;
    let userDoc = Meteor.user();
    if (userDoc) {
      vm.branchId = userDoc.defaultBranch || "";
      let branchListForUser = userDoc && userDoc.branch || [];
      Meteor.call("base_fetchBranchOptionListByListId", branchListForUser, Constants.secret, (err, result) => {
        if (!err) {
          vm.branchList = result || [];
          vm.branchName = result.length > 0 && result.find(o => o.value === vm.branchId).label || "";
        }
      })

    }

  }

}
</script>

<style scoped>
.drawer.v-navigation-drawer .v-list {
  background: transparent;
}

.v-navigation-drawer .v-divider {
  background-color: hsla(0, 0%, 71%, .2);
  border-color: hsla(0, 0%, 71%, .1);
  width: calc(100% - 30px);
  margin-left: 15px !important;
}

.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > div > .v-list-item {
  padding-left: 34px;
  /*padding-left: 64px;*/
}

.v-application--is-ltr #base-navigation-drawer div.v-list-item__icon--text, .v-application--is-ltr #base-navigation-drawer div.v-list-item__icon:first-child {
  margin-left: -9px !important;
  margin-right: 14px !important;
  opacity: .8 !important;
  font-size: .8125rem !important;
  font-weight: 500 !important;
  line-height: 1.5rem !important;
}

#base-navigation-drawer0 {
  /*background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/sidebar-1.jpg") !important;*/
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/sidebar-1.jpg") !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawer1 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/sidebar-2.jpg") !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawer2 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/sidebar-3.jpg") !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawer3 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("/images/sidebar-4.jpg") !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo4 {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo5 {
  background-image: linear-gradient(rgba(51, 153, 51, 0.2), rgba(51, 153, 51, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo6 {
  background-image: linear-gradient(rgba(51, 153, 51, 0.2), rgba(0, 0, 0, 0.8)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo7 {
  background-image: linear-gradient(rgba(0, 51, 255, 0.2), rgba(51, 153, 51, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo8 {
  background-image: linear-gradient(rgba(51, 153, 51, 0.2), rgba(0, 51, 255, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo9 {
  background-image: linear-gradient(rgba(255, 51, 102, 0.2), rgba(0, 51, 255, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo10 {
  background-image: linear-gradient(rgba(153, 255, 51, 0.2), rgba(0, 51, 255, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo11 {
  background-image: linear-gradient(rgba(153, 255, 51, 0.2), rgba(153, 255, 51, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo12 {
  background-image: linear-gradient(rgba(153, 0, 153, 0.2), rgba(153, 0, 153, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo13 {
  background-image: linear-gradient(rgba(153, 0, 153, 0.2), rgba(0, 51, 255, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo14 {
  background-image: linear-gradient(rgba(255, 51, 102, 0.2), rgba(153, 0, 153, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo15 {
  background-image: linear-gradient(rgba(255, 51, 102, 0.2), rgba(255, 51, 102, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo16 {
  background-image: linear-gradient(rgba(0, 51, 255, 0.2), rgba(0, 51, 255, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo17 {
  background-image: linear-gradient(rgba(0, 153, 51, 0.2), rgba(0, 153, 51, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo18 {
  background-image: linear-gradient(rgba(51, 51, 102, 0.2), rgba(51, 51, 102, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo19 {
  background-image: linear-gradient(rgba(153, 255, 153, 0.2), rgba(153, 255, 153, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo20 {
  background-image: linear-gradient(rgba(204, 255, 204, 0.2), rgba(204, 255, 204, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

#base-navigation-drawerNo21 {
  background-image: linear-gradient(rgba(204, 153, 255, 0.2), rgba(204, 153, 255, 0.2)) !important;
  background-position: center center !important;
  background-size: cover !important;

}

.v-application .primary--text {
  color: white !important;
}

a.v-list-item--active.C28a745 {
  color: #28a745 !important;
}

a.v-list-item--active.C9c27b0 {
  color: #9c27b0 !important;
}

a.v-list-item--active.C00cae3 {
  color: #00cae3 !important;
}

a.v-list-item--active.Cff5252 {
  color: #ff5252 !important;
}

a.v-list-item--active.Cff9800 {
  color: #ff9800 !important;
}

a.v-list-item--active.Ce91e63 {
  color: #e91e63 !important;
}


</style>
