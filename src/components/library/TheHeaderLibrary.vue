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
          <b-nav-item-dropdown text="Biblioteka" right >
            <b-dropdown-item @click="newBook" >Dodaj książkę</b-dropdown-item>
            <b-dropdown-item href="/library/book/all" >Spis książek</b-dropdown-item>
            <b-dropdown-item href="/library/book/series" >Cykle</b-dropdown-item>
          </b-nav-item-dropdown>


          <b-nav-item-dropdown text="Moja półka" right>
            <!--            <b-dropdown-item v-for="series in seriesTab" v-bind:key="series.id" @click="goToSeries(series)" >{{series.title}}</b-dropdown-item>-->
<!--            <b-dropdown-item href="/library/book/shell" >Aktualnie czytane</b-dropdown-item>-->
            <b-dropdown-item @click="goToUserBook('READ_NOW')" >Aktualnie czytane</b-dropdown-item>
            <b-dropdown-item @click="goToUserBook('NOT_READ')" >W poczekalni</b-dropdown-item>
            <b-dropdown-item @click="goToUserBook('READ')" >Przeczytane</b-dropdown-item>
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
  name: "TheHeader",
  mixins:[seriesMixin],
  data() {
    return {
      seriesTab:[],

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
    // this.getSeriesForHeader();
  },
  methods: {

    getSeriesForHeader(){
      console.log("getSeriesForHeader()");
      this.getSeriesFromDb().then((response) => {
        this.seriesTab = response.data;
        // console.log(JSON.stringify(this.seriesTab));
      });
    },
    newBook() {
      console.log("newBook()");
      router.push({
        name: "TheBook",
        params: {idBook: 0, isEdit: false},
      });
    },

    goToUserBook(readingStatus){
      console.log("goToUserBook()");
      console.log("ReadStatus: "+readingStatus);
      if(readingStatus==="READ_NOW"){
      router.push({
        name: "TheLibraryUserBooksReadNow",
      });
      }
      if(readingStatus==="NOT_READ"){
        router.push({
          name: "LibraryUserBooksToRead",
        });
      }
      if(readingStatus==="READ"){
        router.push({
          name: "LibraryUserBooksRead",
        });
      }
    },

    goToSeries(series) {
      console.log("goToSeries()");
      console.log(series.title);
      console.log(series.id);
      router.push({
        name: "TheSeries",
        params: {id: series.id},
      }).catch(error => {
        if (
            error.name !== 'NavigationDuplicated' &&
            !error.message.includes('Avoided redundant navigation to current location')
        ) {
          console.log(error)
        }
        else router.g;
      });
    },

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
