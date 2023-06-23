<template>
  <v-app id="inspire" :dark="isDark" :id="homeBackground">
    <div v-if="currentUser && currentUser.profile">
      <div v-if="currentUser.profile.approved">
        <drawer :drawer-prop="drawer" :mini-variant-prop="miniVariant"
                @getDrawerState="getDrawerState" class="noPrint"></drawer>
        <toolbar class="noPrint" @toggleDrawer="toggleDrawer"></toolbar>
        <page-view></page-view>
        <v-footer
            app
            id="base-homeFooter"
            class="white--text noPrint"
        >
          <!--:color="footerColor"-->
                    <span>&nbsp; Zib Solution</span>
<!--          <span>&nbsp; Master IT</span>-->
<!--          <span>&nbsp; Ninja Fiance Leasing</span>-->
          <v-spacer/>
          <span>&copy; 2019</span>
        </v-footer>
      </div>
      <div v-else>
        <v-fade-transition mode="out-in">
          <router-view/>
        </v-fade-transition>
      </div>

    </div>
    <div v-else>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </div>
  </v-app>
</template>

<script>
import Drawer from "./layout/Drawer"
import Toolbar from "./layout/Toolbar"
import PageView from "./layout/PageView"
import Login from "./ui/user/login"
import UnApproved from "./ui/user/unApproved"
import {mapActions} from "vuex"

export default {
  meteor: {
    reactData() {
      let vm = this;
      if (!Meteor.userId()) {
        vm.updateUser(Meteor.user());
      }

    }
  },
  components: {
    Drawer,
    Toolbar,
    PageView,
    Login,
    UnApproved
  },
  data: () => ({
    drawer: true,
    miniVariant: false,
    footerColor: "blue-grey",
    loading: false
  }),
  methods: {
    toggleDrawer() {
      //this.drawer = !this.drawer;
      this.drawer = true;
      if (this.$vuetify.breakpoint.xsOnly) {
        this.miniVariant = false;
      } else {
        this.miniVariant = !this.miniVariant;
      }
    },
    getDrawerState(val) {
      this.drawer = val;
    },
    ...mapActions(["updateUser"]),

  },
  watch: {
    isDark(val) {
      this.footerColor = val === true ? "black" : "blue-grey";
    },

  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    isDark() {
      /*if (!!this.currentUser) {
          return this.$vuetify.theme.dark = !!this.currentUser.profile.isDark || false;
      }*/
      return this.$vuetify.theme.dark = this.$store.state.isDark;
    },
    homeBackground() {
      return this.$route.name === "home" ? "base-homeToolbar" : "";
    }


  },
  created() {
    let vm = this;
    Meteor.call("base_finUserById", (err, result) => {
      if (result) {
        vm.updateUser(result);
        if (result && result.profile) {
          vm.$i18n.locale = result.profile.language || "en";
        }
      }
    })
  }
}
</script>

<style scoped>
.meteor-status {
  width: 100%;
  position: fixed;
  z-index: 205;
  /*bottom: 0;*/
}

#base-homeToolbar {
  background-size: cover;
  background-image: linear-gradient(to top, rgba(37, 91, 121, 1), rgba(37, 91, 121, 1));
  background-size: cover;
}


/*Ninja*/
/*#base-homeFooter {
  background-size: cover;
  background-image: linear-gradient(to top, rgba(255, 0, 0, 1), rgba(255, 0, 0, 1));
  !*border-top: 1px solid blue;*!
  background-size: cover;
}*/

/*MasterIT*/
/*#base-homeFooter {
  background-size: cover;
  background-image: linear-gradient(to top, rgba(0, 0, 139, 1), rgba(0, 0, 139, 1));
  border-top: 1px solid red;
  background-size: cover;
}*/


/*ZIB*/

#base-homeFooter {
  background-size: cover;
  background-image: linear-gradient(to top, rgba(37, 91, 121, 1), rgba(37, 91, 121, 1));
  border-top: 1px solid red;
  background-size: cover;
}
</style>