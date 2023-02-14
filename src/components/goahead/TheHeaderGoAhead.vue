<template>
  <div>

    <div class="top-logo text-ahead-light mb-3">

      <h1 class="text-left pl-3">GO AHEAD</h1>
      <h6 class="text-left pl-3">usługi językowe</h6>
      <h5 class="text-left pl-3">Agnieszka Krutowska</h5 >
      <br>
<!--      <h4 class="bg-ahead-green mt-5 font-weight-bold info-reading-status  text-ahead-light" >test</h4>-->
<!--      <br>-->

    </div>
    <b-navbar toggleable="lg" class="bg-ahead-green">
      <b-navbar-brand href="/">Home</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav id="test">
          <b-nav-item-dropdown text="Finanse" right>
            <b-dropdown-item href="/goahead/invoice/all" >Lista faktur</b-dropdown-item>
            <b-dropdown-item href="/goahead/invoice" >Nowa faktura</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Klienci" right>
            <b-dropdown-item href="/goahead/customer/all" >Lista klientów</b-dropdown-item>
            <b-dropdown-item href="/goahead/customer" >Nowy klient</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- ADMINISTRACJA -->
          <b-nav-item-dropdown text="Administracja" v-if="isAdmin">
            <b-dropdown-item href="/user/all">Użytkownicy</b-dropdown-item>
            <b-dropdown-item href="/user/roles">Uprawnienia</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
<!--        <b-navbar-nav class="ml-auto">-->
<!--          <b-nav-form>-->
<!--            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
<!--            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
<!--          </b-nav-form>-->

<!--          <div v-if="!getAuthenticationState">-->
<!--            <router-link :to="{ name: 'Login' }">-->
<!--              <b-button size="sm" class="my-2 ml-2 my-sm-0 btn-login"> Zaloguj się </b-button>-->
<!--            </router-link>-->
<!--          </div>-->

<!--          <b-nav-item-dropdown right v-else>-->
<!--            &lt;!&ndash; Using 'button-content' slot &ndash;&gt;-->
<!--            <template #button-content>-->
<!--              <em>{{ getUserFirstName }}</em>-->
<!--            </template>-->
<!--            <b-dropdown-item href="/user/profile">Profil użytkownika</b-dropdown-item>-->
<!--            <b-dropdown-item @click="logout" href="/">Wyloguj</b-dropdown-item>-->
<!--          </b-nav-item-dropdown>-->
<!--        </b-navbar-nav>-->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import jwt_decode from "jwt-decode";
export default {
  name: "TheHeader",
  data() {
    return {
      isHrActive: false,
      isCustomerActive: false,
      isFinanceActive: false,
      isTaskActive: false,
      isVehiclesActive: false,
      isSettingActive: false,

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
    hasAccessTaskCalendar() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_TASK_CALEDAR: " + token2.authorities.includes('ROLE_TASK_CALENDAR'))
        return (
          token2.authorities.includes("ROLE_TASK_CALENDAR") ||
          token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
    hasAccessReadEmployees() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_HR_EMPLOYEE: " + token2.authorities.includes('ROLE_HR_EMPLOYEE'))
        return (
          token2.authorities.includes("HR_EMPLOYEE_READ_ALL") ||
          token2.authorities.includes("ROLE_ADMIN")
        );
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
    hasAccessAddWorktime() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_HR_WORKTIME: " + token2.authorities.includes('ROLE_HR_WORKTIME'))
        return (
          token2.authorities.includes("ROLE_HR_WORKTIME") ||
          token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
    hasAccessCalculateSalary() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_HR_SALARIES: " + token2.authorities.includes('ROLE_HR_SALARIES'))
        return (
          token2.authorities.includes("ROLE_HR_SALARIES") ||
          token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
    hasAccessHrAddition() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_HR_ADDITION: " + token2.authorities.includes('ROLE_HR_ADDITION'))
        return (
          token2.authorities.includes("ROLE_HR_ADDITION") ||
          token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
       hasAccessHrAdvance() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_HR_ADVANCE: " + token2.authorities.includes('ROLE_HR_ADVANCE'))
        return (
          token2.authorities.includes("ROLE_HR_ADVANCE") ||
          token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
  },
  created() {
    //  this.isAuthenticated = this.$store.getters.getAuthenticationState;
  },
  methods: {
    changeHrActive() {
      this.isHrActive = true;
      this.isCustomerActive = false;
      this.isFinanceActive = false;
      this.isTaskActive = false;
      this.isVehiclesActive = false;
      this.isSettingActive = false;
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

.top-logo {
  height: 170px;
  /*text-align: center;*/
  padding-top: 18px;
  margin-top: 60px;
  background-color: #2da687;
  color: #e4e1d8;
}

#logo {
  /*display: block;*/
  width: 150px;
  margin-left: 50px;
  /*float: left;*/
}

#logo-back {
  display: flex;
  justify-content: space-between;
  /*float: left;*/
  height: 150px;
  width: auto;
  background-color: rgb(97, 93, 92);
}

#name {
  color: rgba(255, 245, 0, 0.8);
  padding-top: 50px;
  padding-right: 50px;
}

.btn-login {
  background-color: rgba(255, 245, 0, 0.8);
  color: #252525;
}
</style>
