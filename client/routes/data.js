import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import Sb_Purpose from "../../imports/vue/ui/sb_purpose";


export const data = [
    {
        path: "/purpose",
        name: "purpose",
        component: Sb_Purpose,
        meta: {
            permissions: [

                {
                    access: true,
                }
            ],
            roles: "Data",
        }
    },

];