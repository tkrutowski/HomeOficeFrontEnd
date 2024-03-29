import Vue from "vue";
import Vuex from "vuex";

import authorizations from './authorizations'
import library from './library'
import finance from "@/store/finance";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
    // state: {
    //     token: "",
    //     userState: {
    //         isAuthenticated: true,
    //         username: "focik",
    //         userFirstName: "Tomek"
    //     }
    // },
    // mutations: {
    //     updateToken(currentState, newToken){
    //         currentState.token = newToken;
    //     },
    //     updateAuthenticateState(currentState, userState){
    //         currentState.userState = userState;
    //     }
    // },
    modules:{
        authorizations, library, finance
    },
    plugins: [createPersistedState()],
    strict: process.env.NODE_ENV !=='production'
});