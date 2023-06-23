import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import User from "../../imports/vue/ui/user/user";
import Branch from "../../imports/vue/ui/branch";
import Company from "../../imports/vue/ui/company";
import Exchange from "../../imports/vue/ui/exchange";


export const setting = [
  {
        path: "/exchange",
        name: "exchange",
        component: Exchange,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Setting",
        }
    }, {
        path: "/user",
        name: "user",
        component: User,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Control User",
        }
    }, {
        path: "/branch",
        name: "branch",
        component: Branch,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Control User",
        }
    }, {
        path: "/company",
        name: "company",
        component: Company,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Super",
        }
    },

];