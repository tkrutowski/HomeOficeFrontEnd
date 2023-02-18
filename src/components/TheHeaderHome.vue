<template>
  <div>
    <div id="logo-back" class="color-orange">
      <img id="logo" alt="HomeOffice logo" src="../assets/HomeOffice.png" />
      <h1 id="name" class="d-none d-md-block">HomeOffice</h1>
    </div>

    <div class="log color-orange" v-if="!getAuthenticationState">
      <h6 class="user">Nie jesteś zalogowany ... </h6>
      <router-link :to="{ name: 'Login' }">
        <button  class="btn-outline-office ml-3">ZALOGUJ</button>
      </router-link>
    </div>
    <div v-else class="log color-orange mt-2">
      <h6 class="user">Jesteś zalogowany jako {{getUserFirstName}}</h6>
      <button  @click="logout"  class="btn-outline-office ml-3">WYLOGUJ</button>
    </div>

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
      console.log("Po wylogowaniu store: " + this.$store.getters.getAuthenticationState);
      // this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
#logo {
  /*display: block;*/
  width: 150px;
  height: 150px;
  margin-left: 50px;
  margin-top: 50px;
  /*float: left;*/
  /*margin-bottom: 50px;*/
}

#logo-back {
  display: flex;
  justify-content: space-between;
  height: 250px;
  width: auto;
  background-color: rgba(238, 127, 0, 0.1);
}

#name {
  padding-top: 100px;
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
