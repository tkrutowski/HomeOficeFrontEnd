<template>
  <div id="container" class="bg-office">
    <form class="login-form mb-3" @submit.prevent="login">
      <h2 class="mb-5">Logowanie</h2>

      <!-- ERROR -->
      <div v-if="error">
        <p id="error">Niestety podałeś niewłaściwy login lub hasło.</p>
      </div>

      <!-- LOGIN id="form-group-login"-->
      <div class="form-group">
        <label for="login">Login</label>
        <input
          type="text"
          id="login"
          class="form-control form-control-lg"
          placeholder="Nazwa użytkownika"
          autocomplete="username"
          required
          v-model="username"
        />
<!--         <small id="emailHelp" class="form-text text-muted"-->
<!--          >We'll never share your email with anyone else.</small>-->
      </div>

      <!-- PASSWORD -->
      <div class="form-group">
        <label for="password">Hasło</label>
        <input
          type="password"
          id="password"
          class="form-control form-control-lg"
          placeholder="Hasło"
          autocomplete="current-password"
          required
          v-model="password"
        />
      </div>

      <!-- BUTTON -->
      <b-button
        class="mt-3 mb-1"
        style="width: 100%"
        variant="office"
        type="submit"
        :disabled="btnDisabled"
        >Zaloguj się
        <b-icon
          v-if="busyIcon"
          icon="arrow-clockwise"
          animation="spin-pulse"
          font-scale="1"          
        ></b-icon>
      </b-button>
      <p class="text-right mb-4">
         <router-link  class="color-gray link"  to="/forgot-password">Nie pamiętam hasła</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { errorMixin } from "@/mixins/error";
import { userMixin } from "@/mixins/user";
export default {
  name: "TheLogin",
  mixins: [errorMixin, userMixin],
  data() {
    return {
      error: false,
      // urlLogin: "http://localhost:8077",
      urlLogin: "https://goahead.focikhome.synology.me",

      username: "",
      password: "",
      busyIcon: false,
      btnDisabled: false,
    };
  },
  computed: {
    // jeżeli coś się zmieni w tych polach to strona się odświerzy
  },
  created() {
    // console.log("Czy zalogowano: " + this.userStateLogin.isAuthenticated);
    // this.userStateLogin = this.$store.getters.getAuthenticationState;
    // console.log("Czy zalogowano: " + this.userStateLogin.isAuthenticated);
    // this.isAuthenticated = this.state.userState.isAuthenticated;
    this.$store.commit("updateToken", "null");
    this.$store.commit("updateAuthenticateState", false);
    this.$store.commit("updateUser", {});
  },
  methods: {
    login() {
      console.log("START - login()");
      this.busyIcon=true;
      this.btnDisabled=true;
       axios({
        method: 'post',
        url: this.urlLogin + `/api/auth/login`,
        data: {
          username: this.username,
          password: this.password,
        },
      })
           .then((response) => {
             console.log("login() - SUCCESS");
             this.loginSuccessful(response)
             this.busyIcon=false;
             this.btnDisabled=false;
           })
           .catch((e) => {
             console.log("login() - ERROR");
             this.busyIcon=false;
             this.btnDisabled=false;
             this.loginFailed(e)
           });
    },

    loginSuccessful(res) {
      console.log("loginSuccessful() - start" + res);
      console.log("data: " + JSON.stringify(res.headers));
      this.resp = res;
      console.log("header token: " + res.headers["jwt-token"]);
      this.user = res.data;
      let data = res.data;
      console.log("data: " + JSON.stringify(data));

      if (!res.headers["jwt-token"] && res.status != 200) {
        this.loginFailed();
        return;
      }

      this.$store.commit("updateToken", res.headers["jwt-token"]);
      this.$store.commit("updateAuthenticateState", true);
      this.$store.commit("updateUser", res.data);

      this.busyIcon = false;
      this.btnDisabled = false;

      this.$router.replace(this.$route.query.redirect || "/");
    },

    loginFailed(e) {
      console.log("START - loginFaild()");
      this.error = true;
      console.log("error: " + JSON.stringify(e));
      this.$store.commit("updateToken", "null");
      this.$store.commit("updateAuthenticateState", false);
      this.$store.commit("updateUser", {});

      this.busyIcon = false;
      this.btnDisabled = false;
      // this.validateError(e);
    },
  },
};
</script>

<style>
#error {
  color: red;
}
#container {
  color: rgb(238, 127, 0);
  margin-top: 20px;
  background-color: #222526 !important;

}
/* unvisited link */
.link:link {
  color: #a29a8e;
}

/* visited link */
.link:visited {
  color: #a29a8e;
}

/* mouse over link */
.link:hover {
 color:rgb(238, 127, 0);
  text-decoration: none;
}

.login-form {
  max-width: 400px;
  margin: auto;
  margin-top: 200px;
}
</style>
