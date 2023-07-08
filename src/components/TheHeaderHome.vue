<template>
  <div>
    <div id="logo-back" class="color-orange d-none d-md-flex">
      <img id="logo" alt="HomeOffice logo" src="../assets/HomeOffice.png" />
      <h1 id="name">HomeOffice</h1>
    </div>
    <div id="logo-back-mobile" class="color-orange d-md-none">
      <img id="logo-mobile" alt="HomeOffice logo" src="../assets/HomeOffice.png" />
      <h1 id="name-mobile">HomeOffice</h1>
    </div>
    <b-navbar toggleable="lg" type="dark" variant="dark" >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <div v-if="!getAuthenticationState">
            <router-link :to="{ name: 'Login' }">
              <b-button size="sm" class="my-2 ml-2 my-sm-0 " variant="office"> Zaloguj się </b-button>
            </router-link>
          </div>

          <div class="log color-orange flex-row" v-else>
            <h6 class="user">Jesteś zalogowany jako </h6>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ getUserFirstName }}</em>
            </template>
            <b-dropdown-item href="/user/profile" disabled>Profil użytkownika</b-dropdown-item>
            <b-dropdown-item @click="logout" href="/">Wyloguj</b-dropdown-item>
          </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>


<!--    <div class="log color-orange" v-if="!getAuthenticationState">-->
<!--      <h6 class="user">Nie jesteś zalogowany ... </h6>-->
<!--      <router-link :to="{ name: 'Login' }">-->
<!--        <button  class="btn-outline-office ml-3">ZALOGUJ</button>-->
<!--      </router-link>-->
<!--    </div>-->
<!--    <div v-else class="log color-orange mt-2">-->
<!--      <h6 class="user">Jesteś zalogowany jako {{getUserFirstName}}</h6>-->
<!--      <button  @click="logout"  class="btn-outline-office ml-3">WYLOGUJ</button>-->
<!--    </div>-->

  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheHeader",
  data() {
    return {
    };
  },

  computed: {
    ...mapGetters(["getUserFirstName", "getAuthenticationState"]),
  },
  created() {
    //  this.isAuthenticated = this.$store.getters.getAuthenticationState;
  },
  methods: {
    logout() {
      this.$store.commit("updateToken", "");
      this.$store.commit("updateAuthenticateState", false);
      this.$store.commit("updateUser", {});
      this.userFirstName = "";
      this.isAuthenticated = false;
      this.$store.commit("resetFinance", []);
      console.log("Po wylogowaniu store: " + this.$store.getters.getAuthenticationState);
      // this.$router.push("/login");
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

.log{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 20px;
}

.user{
  justify-self: center;
  padding-top: 10px;
}

</style>
