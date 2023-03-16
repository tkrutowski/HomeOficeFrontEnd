<template>
  <div class="home">
    <div style="margin-top: 200px">
      <b-card-group deck class="main-card">
        <b-card
            title="Go Ahead"
            body-bg-variant="ahead"
            text-variant="ahead-green"
            border-variant="ahead"
            style="max-width: 20rem;"
            class="mb-2"
        >
          <!--        <template #header >-->
          <!--          <h6 class="mb-0">GoAhead</h6>-->
          <!--        </template>-->
          <b-card-text>
            Aplikacja do wystawiania faktur.
          </b-card-text>

          <template #footer>
            <b-button class="enter-btn " @click="goahead" variant="ahead">wejście</b-button>
          </template>
        </b-card>


        <b-card
            title="Biblioteka"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
          <b-card-text>
            Spis przeczytanych książek.
          </b-card-text>
          <template #footer>
            <b-button href="#" class="enter-btn" @click="library" variant="office">wejście</b-button>
          </template>
        </b-card>

        <b-card
            title="Ustawienia"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
          <b-card-text>
            Użytkownicy i uprawnienia
          </b-card-text>
          <template #footer>
            <b-button href="#" class="enter-btn" @click="settings" variant="office">wejście</b-button>
          </template>
        </b-card>
      </b-card-group>
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
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  created() {
    console.log("created");
    // this.isAuthenticated = this.$store.getters.getAuthenticationState;
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
      console.log("START - goahead()");
      if (this.hasAccessGoAhead) {
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

    settings() {
      console.log("START - goahead()");
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
  /*display: block;*/
  width: 100%;
  /*margin-left: 50px;*/
  /*float: left;*/
}

.main-card {
  display: inline-flex;
}
</style>
