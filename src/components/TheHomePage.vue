<template>
  <div class="home container-fluid">
    <div class="mt-1 mt-md-5">

      <h1 class="mb-5" v-if="!isAuthenticated">Najpierw się zaloguj...</h1>

      <div  v-else class="row justify-content-center">
        <!--        GOAHEAD       -->
        <b-card
            header-bg-variant="office-dark2"
            bg-variant="office-dark1"
            footer-bg-variant="office-dark2"

            text-variant="ahead-green"
            border-variant="ahead"
            style="max-width: 20rem;"
            class="mb-2 card-ahead col-12 col-md-3 px-0"
        >
          <template #header>
            <h4 class="mb-0">GoAhead</h4>
          </template>
          <b-card-text>
            Aplikacja do wystawiania faktur.
          </b-card-text>

          <template #footer>
            <b-button class="enter-btn " @click="goahead" variant="ahead">wejście</b-button>
          </template>
        </b-card>

        <!--LIBRARY-->
        <b-card
            header-bg-variant="office-dark2"
            bg-variant="office-dark1"
            footer-bg-variant="office-dark2"
            style="max-width: 20rem;"
            class="mb-2 card-library col-12 col-md-3 px-0"
        >
          <template #header>
            <h4 class="mb-0">Biblioteka</h4>
          </template>
          <b-card-text>
            Spis przeczytanych książek.
          </b-card-text>
          <template #footer>
            <b-button href="#" class="enter-btn" @click="library" variant="office">wejście</b-button>
          </template>
        </b-card>

        <!--LIBRARY-->
        <b-card
            header-bg-variant="office-dark2"
            bg-variant="office-dark1"
            footer-bg-variant="office-dark2"
            style="max-width: 20rem;"
            class="mb-2 card-library col-12 col-md-3 px-0"
        >
          <template #header>
            <h4 class="mb-0">Finanse</h4>
          </template>
          <b-card-text>
            Kredyty, płatności i zakupy.
          </b-card-text>
          <template #footer>
            <b-button href="#" class="enter-btn" @click="finance" variant="office">wejście</b-button>
          </template>
        </b-card>

        <!--        SETTINGS-->
        <b-card
            header-bg-variant="office-dark2"
            bg-variant="office-dark1"
            footer-bg-variant="office-dark2"
            style="max-width: 20rem;"
            class="mb-2 card-library col-12 col-md-3 px-0"
        >
          <template #header>
            <h4 class="mb-0">Ustawienia</h4>
          </template>
          <b-card-text>
            Użytkownicy i uprawnienia
          </b-card-text>
          <template #footer>
            <b-button href="#" class="enter-btn" @click="settings" variant="office">wejście</b-button>
          </template>
        </b-card>
      </div>
    </div>
    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import jwt_decode from "jwt-decode";
import router from "@/router";

export default {
  name: "HomePage",
  data() {
    return {
      isAuthenticated: false,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  created() {
    console.log("created");
    this.isAuthenticated = this.$store.getters.getAuthenticationState;
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
    hasAccessLibrary() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_TASK_CALEDAR: " + token2.authorities.includes('ROLE_TASK_CALENDAR'))
        return (
            token2.authorities.includes("ROLE_LIBRARY") ||
            token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
    hasAccessFinance() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_TASK_CALEDAR: " + token2.authorities.includes('ROLE_TASK_CALENDAR'))
        return (
            token2.authorities.includes("ROLE_FINANCE") ||
            token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
    hasAccessGoAhead() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_HR_EMPLOYEE: " + token2.authorities.includes('ROLE_HR_EMPLOYEE'))
        return (token2.authorities.includes("ROLE_GOAHEAD") ||
            token2.authorities.includes("ROLE_ADMIN"));
      } catch (error) {
        return false;
      }
    },
  },
  methods: {
    goahead() {
      console.log("START - goahead()");
      if (this.hasAccessGoAhead) {
        router.push({
          name: "GoAheadHome",
          // params: { idUser: 0, isEdit: "false" },
        });
      } else {
        this.$bvModal
            .msgBoxOk(`Nie masz dostępu do tej aplikacji.`,
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
      }
    },

    library() {
      console.log("START - library()");
      if (this.hasAccessLibrary) {
        router.push({
          name: "LibraryHome",
          // params: { idUser: 0, isEdit: "false" },
        });
      } else {
        this.$bvModal
            .msgBoxOk(`Nie masz dostępu do tej aplikacji.`,
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
      }
    },

    finance() {
      console.log("START - finance()");
      if (this.hasAccessFinance) {
        router.push({
          name: "FinanceHome",
          // params: { idUser: 0, isEdit: "false" },
        });
      } else {
        this.$bvModal
            .msgBoxOk(`Nie masz dostępu do tej aplikacji.`,
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
      }
    },

    settings() {
      console.log("START - settings()");
      // if (this.hasAccessGoAhead) {
      //   router.push({
      //     name: "GoAheadHome",
      //     // params: { idUser: 0, isEdit: "false" },
      //   });
      // } else {
      this.$bvModal
          .msgBoxOk(`Nie masz dostępu do tej aplikacji.`,
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
      // }
    },

    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
  },

};
</script>
<style scoped>
.enter-btn {
  width: 100%;
}

.card-ahead {
  border: 2px solid #268c73;
  margin: 15px;
}

.card-library {
  border: 2px solid #ee7f00;
  margin: 15px;
}

.main-card {
  display: inline-flex;
}
</style>
