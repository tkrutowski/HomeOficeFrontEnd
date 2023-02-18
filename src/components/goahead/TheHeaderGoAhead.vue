<template>
  <div>

    <div class="top-logo text-ahead-light mb-3">

      <h1 class="text-left pl-3">GO AHEAD</h1>
      <h6 class="text-left pl-3">usługi językowe</h6>
      <h5 class="text-left pl-3">Agnieszka Krutowska</h5>
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
            <b-dropdown-item href="/goahead/invoice/all" :disabled="!hasAccessGoAhead">Lista faktur</b-dropdown-item>
            <b-dropdown-item href="/goahead/invoice" :disabled="!hasAccessGoAhead">Nowa faktura</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Klienci" right>
            <b-dropdown-item href="/goahead/customer/all" :disabled="!hasAccessGoAhead">Lista klientów</b-dropdown-item>
            <b-dropdown-item href="/goahead/customer" :disabled="!hasAccessGoAhead">Nowy klient</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" @click="search" >Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import jwt_decode from "jwt-decode";

export default {
  name: "TheHeader",
  data() {
    return {
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
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
    hasAccessGoAhead() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_TASK_CALEDAR: " + token2.authorities.includes('ROLE_TASK_CALENDAR'))
        return (
            token2.authorities.includes("ROLE_GOAHEAD") ||
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
    search() {
      console.log("START - search()");
      this.$bvModal
          .msgBoxOk(`Nie działa jeszcze ;)`,
              {
                title: "Informacja",
                size: "sm",
                buttonSize: "sm",
                okVariant: "danger",
                okTitle: "OK",
                footerClass: "p-2",
                hideHeaderClose: false,
                centered: true,
              }
          )
          .then(() => {
            // nothing to do
          })
          .catch(() => {
            // An error occurred
          });
    },

    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
  },
};
</script>

<style scoped>
.top-logo {
  height: 170px;
  padding-top: 18px;
  margin-top: 60px;
  background-color: #2da687;
  color: #e4e1d8;
}
</style>