<template>
  <b-container fluid id="container">

    <div class="info-bar">
      <h4 class="font-weight-bold">Moja półka - przeczytane</h4>
      <b-button
          v-if="loadingUserBook"
          style="height: fit-content"
          class="ml-3 info-bar-button"
          disabled
      >
        <b-spinner small></b-spinner>
      </b-button>
    </div>

    <b-container id="dateSwitch">
      <b-row align-h="center">
        <b-button class="mr-3 btn-office" @click="prevDate" :disabled="isButtonDisabled"   >Poprzedni</b-button>
        <h3 class="mt-1 color-orange">{{startDate.getFullYear()}}</h3>
        <b-button class="ml-3 btn-office" @click="nextDate" :disabled="isButtonDisabled" >Następny</b-button>
      </b-row>
    </b-container>

    <b-card-group>
      <div v-for="userbook in userBooks" :key="userbook.id">
        <UserBookSmall :userbook="userbook"/>
      </div>
    </b-card-group>

  </b-container>
</template>

<script>
import {userBookMixin} from "@/mixins/userBook";
import {errorMixin} from "@/mixins/error";
import UserBookSmall from "@/components/library/UserBookSmall";
export default {
  name: "library-user-books",
  components: {UserBookSmall},
  mixins: [errorMixin, userBookMixin],
  data() {
    return {
      userBooks: [],
      isButtonDisabled: false,
      startDate: new Date(),
    };
  },

  created() {
    console.log("created");
    this.getUserBookByIdReadStatus();
    this.$root.$on('send', (idUB) => {
      this.deleteUserBook(idUB);
    });
  },
  mounted() {
    console.log("mounted");
    this.readStatus = this.$route.params.readStatus;
    this.displayTitle = this.$route.params.displayTitle;
    console.log("props[] displayTitle: " + this.displayTitle + ", readStatus: " + this.readStatus);
  },
  methods: {

    prevDate() {
      console.log("Preview date.")
      //block buttons
      this.isButtonDisabled = true;
      this.startDate =  new Date(this.startDate.setFullYear(this.startDate.getFullYear() - 1));
      this.getUserBookByIdReadStatus();
      this.isButtonDisabled = false;
    },
    nextDate() {
      console.log("Next date.")
      this.isButtonDisabled = true;
      this.startDate =  new Date(this.startDate.setFullYear(this.startDate.getFullYear() + 1));
      this.getUserBookByIdReadStatus();
      this.isButtonDisabled = false;
    },


    getUserBookByIdReadStatus() {
      console.log("START - getUserBookByIdReadStatus()");
      this.loadingUserBook = true;
      this.getUserBookByReadingStatusAndYearDb("READ", this.startDate.getFullYear()).then((response) => {
        this.userBooks = response.data;
        console.log("END - getUserBookByIdReadStatus()");
        this.loadingUserBook = false;
      });
    },

    //
    //delete userbook
    //
    deleteUserBook(idUserBook) {
      let userbookDel;
      this.userBooks.forEach((item) => {
        if (item.id === idUserBook) {
          userbookDel = item;
        }
      })

      this.$bvModal
          .msgBoxConfirm(`Czy chcesz usunąć książkę pt.: '${userbookDel.book.title}' z półki?`, {
            title: "Potwierdzenie",
            headerBgVariant: "office-dark1",
            headerClass: "text-office-orange",
            size: "lg",

            bodyBgVariant: "office-dark2",
            bodyClass: "text-office-orange",

            buttonSize: "sm",
            okVariant: "office-save",
            okTitle: "TAK",

            footerBgVariant: "office-dark1",

            cancelTitle: "NIE",
            cancelVariant: "office",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value) => {
            if (value) {
              this.deleteUserBookDB(idUserBook).then((response) => {
                if (response.data) {
                  const index = this.userBooks.indexOf(userbookDel);
                  if (index !== -1) {
                    this.userBooks.splice(index, 1);
                  }
                  this.displaySmallMessage("success", "Usunięto książkę.");
                }
              });
            }
          })
          .catch(() => {
            // An error occurred
          });
    },
  },
}
</script>

<style scoped>
@import "../../assets/css/ahead.css";

#dateSwitch {
  flex-direction: column;
  margin-top: 50px;
}
</style>