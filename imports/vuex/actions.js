import {Meteor} from "meteor/meteor";
import {router} from "../../client/routes/index";

export default {
    updateUser({commit, state}, val) {
        commit("setUser", val);
        commit("setModule", val && val.defaultModule || "");
    },
    logoutUser({commit, state}, payload) {
        Meteor.logout(() => {
            commit("setUser", null);
            if (router.history.current.path !== '/login') {
                router.replace('/login');
            }

        });

    },
    updateModule({commit, state}, payload) {
        commit("setModule", payload);
    }
}
