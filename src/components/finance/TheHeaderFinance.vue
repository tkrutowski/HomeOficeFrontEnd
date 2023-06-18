<template>
  <div>
    <div id="logo-back" class="color-orange d-none d-md-flex">
      <img id="logo" alt="HomeOffice logo" src="../../assets/HomeOffice.png" />
      <h1 id="name">HomeOffice</h1>
    </div>
    <div id="logo-back-mobile" class="color-orange d-md-none">
      <img id="logo-mobile" alt="HomeOffice logo" src="../../assets/HomeOffice.png" />
      <h1 id="name-mobile">HomeOffice</h1>
    </div>
    <b-navbar toggleable="lg" type="dark" variant="dark" >
      <b-navbar-brand href="/">Home</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav id="test">

          <!--          LOANS-->
          <b-nav-item-dropdown text="Kredyty" right v-if="hasAccessReadLoans">
            <b-dropdown-item @click="newLoan" >Nowy kredyt</b-dropdown-item>
            <b-dropdown-item href="/finance/loan/all" >Spis kredytów</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- FEE -->
          <b-nav-item-dropdown text="Opłaty" right v-if="hasAccessReadFees">
            <b-dropdown-item @click="newFee" >Nowa opłata</b-dropdown-item>
            <b-dropdown-item href="/finance/fee/all" >Spis opłat</b-dropdown-item>
          </b-nav-item-dropdown>


          <!-- ADMINISTRACJA -->
          <b-nav-item-dropdown text="Administracja" v-if="isAdmin">
            <b-dropdown-item href="/user/all">Użytkownicy</b-dropdown-item>
            <b-dropdown-item href="/user/roles">Uprawnienia</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="d-none d-md-flex">
            <b-form-input size="sm" class="mr-sm-2" placeholder="wpisz tutaj..." ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" variant="office" type="submit">Wyszukaj</b-button>
          </b-nav-form>

          <div v-if="!getAuthenticationState">
            <router-link :to="{ name: 'Login' }">
              <b-button size="sm" class="my-2 ml-2 my-sm-0 " variant="office"> Zaloguj się </b-button>
            </router-link>
          </div>

          <b-nav-item-dropdown right v-else>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ getUserFirstName }}</em>
            </template>
            <b-dropdown-item href="/user/profile">Profil użytkownika</b-dropdown-item>
            <b-dropdown-item @click="logout" href="/">Wyloguj</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import jwt_decode from "jwt-decode";
import router from "@/router";
import {seriesMixin} from "@/mixins/series";
export default {
  name: "TheHeaderFinance",
  mixins:[seriesMixin],
  data() {
    return {
      isAuthenticated: null,
      userName: "",
      userFirstName: "",
    };
  },

  computed: {
    ...mapGetters(["getAuthenticationState", "getUserFirstName", "getToken"]),
    isAdmin() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_ADMIN: " + token2.authorities.includes('ROLE_ADMIN'))
        return token2.authorities.includes("ROLE_ADMIN");
      } catch (error) {
        return false;
      }
    },
    hasAccessReadLoans() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_HR_EMPLOYEE: " + token2.authorities.includes('ROLE_HR_EMPLOYEE'))
        return (
          token2.authorities.includes("HR_LOAN_READ_ALL") ||
          token2.authorities.includes("HR_LOAN_READ") ||
          token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
    hasAccessReadFees() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_HR_EMPLOYEE: " + token2.authorities.includes('ROLE_HR_EMPLOYEE'))
        return (
            token2.authorities.includes("HR_FEE_READ_ALL") ||
            token2.authorities.includes("HR_FEE_READ") ||
            token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
  },
  created() {
    console.log("created");
  },
  methods: {

    newLoan() {
      console.log("newLoan()");
      router.push({
        name: "TheLoan",
        params: {idLoan: 0, isEdit: false},
      });
    },

    newFee() {
      console.log("newFee()");
      router.push({
        name: "TheFee",
        params: {idFee: 0, isEdit: false},
      });
    },

    logout() {
      this.$store.commit("updateToken", "");
      this.$store.commit("updateAuthenticateState", false);
      this.$store.commit("updateUser", {});
      this.userFirstName = "";
      this.isAuthenticated = false;
      console.log("Po wylogowaniu store: " + this.$store.getters.getAuthenticationState);
      // this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#logo {
  width: 150px;
  height: 150px;
  margin-left: 50px;
  margin-top: 50px;
}

#logo-mobile {
  width: 75px;
  height: 75px;
  margin-left: 5px;
  margin-top: 5px;
}

#logo-back {
  display: flex;
  justify-content: space-between;
  height: 250px;
  width: auto;
  background-color: #515455 !important;
}

#logo-back-mobile {
  display: flex;
  justify-content: space-between;
  height: 100px;
  width: auto;
  background-color: #515455 !important;
}

#name {
  padding-top: 100px;
  padding-right: 50px;
}

#name-mobile {
  padding-top: 20px;
  padding-right: 50px;
}
</style>
