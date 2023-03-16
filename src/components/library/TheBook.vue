<template>
  <b-container id="container">

    <!--    SEARCH CARD  -->
    <b-card v-if="!isEdit"
            title="UpolujEboka.pl"
            bg-variant="office-dark1"
            class="mb-5 text-office-orange"
    >
      <b-form @submit.stop.prevent="findBookUE" autocomplete="off">

        <!-- ROW-1  URL-->
        <div class="row card-elem-office">
          <b-form-group class="col" label="URL:" label-for="input-url">
            <b-form-input class="input-office-orange border-orange"
                          id="input-url"
                          v-model="url"
                          placeholder="url książki"
                          required
                          autofocus
            ></b-form-input>
          </b-form-group>
        </div>

        <b-button class="edit-button" variant="office" :disabled="searchDisabled" type="submit"
        >Wyszukaj
          <b-icon
              v-if="savedSearchIcon"
              class="pl-2"
              scale="2.6"
              icon="check"
              variant="success"
              aria-hidden="true"
          ></b-icon>
          <b-icon
              v-if="errorSearchIcon"
              class="pl-2"
              scale="1.6"
              icon="x-circle"
              variant="danger"
              aria-hidden="true"
          ></b-icon>
          <b-icon
              v-if="busySearchIcon"
              icon="arrow-clockwise"
              animation="spin-pulse"
              font-scale="1"
          ></b-icon>
        </b-button>
      </b-form>
    </b-card>


    <!--    BOOK CARD  -->
    <b-card class="text-office-orange"
            :title="isEdit ? 'EDYCJA KSIĄŻKI':'NOWA KSIĄŻKA'"
            bg-variant="office-dark1"
    >
      <b-button
          v-show="loadingBook"
          style="height: fit-content"
          variant="office"
          class="ml-3"
          disabled
      >
        <b-spinner small></b-spinner>
        <span class="sr-only">Loading...</span>
      </b-button>
      <b-form @submit.stop.prevent="saveBook" autocomplete="off">
        <div class="row ">
          <div class="col col-sm-8">
            <!-- ROW-1 TITLE-->
            <div class="row card-elem-office ">
              <b-form-group class="col" label="Tytuł:" label-for="input-bookTitle">
                <b-form-input class="input-office-orange border-orange"
                              id="input-bookTitle"
                              v-model="book.title"
                              :state="validationTitle"
                              placeholder=""
                              required
                ></b-form-input>
                <b-form-invalid-feedback :state="validationTitle">
                  Nie może mieć więcej niż 100 znaków.
                </b-form-invalid-feedback>
              </b-form-group>
            </div>


            <!-- ROW-2  AUTHORS -->
            <div class="row card-elem-office   ">
              <b-form-group class="col" label="Autor:" label-for="input-authors"
                            description="Autorzy oddzieleni przecinkiem">
                <b-form-input class="input-office-orange border-orange"
                              id="input-authors"
                              v-model="book.authors"
                              :state="validationAuthors"
                              placeholder="Imie1 Nazwisko1, Imię2 Nazwisko2"
                              required
                              :disabled="isEdit"
                ></b-form-input>
                <b-form-invalid-feedback :state="validationAuthors">
                  Imię/Nazwisko nie może mieć więcej niż 45 znaków
                </b-form-invalid-feedback>
              </b-form-group>
            </div>


            <!-- ROW-3 -->
            <div class="row card-elem-office">
              <!-- SERIES -->
              <b-form-group class="col mr-1" label="Seria:" label-for="input-series">
                <b-form-input class="input-office-orange border-orange"
                              id="input-series"
                              v-model="book.series"
                              :state="validationSeries"
                              placeholder=""
                              :disabled="isEdit"
                ></b-form-input>
                <b-form-invalid-feedback :state="validationSeries">
                  Nie może mieć więcej niż 45 znaków.
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- SERIES NUMBER -->
              <b-form-group class="col ml-1" label="Numer:" label-for="input-number">
                <b-form-input class="input-office-orange border-orange"
                              id="input-number"
                              v-model="book.bookInSeriesNo"
                              required
                              :disabled="isEdit"
                              type="number"
                              min="0"
                              max="30"
                ></b-form-input>
              </b-form-group>
            </div>


            <!-- ROW-4 CATEGORY-->
            <div class="row card-elem-office">
              <b-form-group class="col" label="Kategoria:" label-for="input-category"
                            description="Kategorie oddzielone przecinkiem.">
                <b-form-input class="input-office-orange border-orange"
                              id="input-category"
                              v-model="book.categories"
                              placeholder="Kategoria1,Kategoria2"
                              :state="validationCategory"
                              required
                              :disabled="isEdit"
                ></b-form-input>
                <b-form-invalid-feedback :state="validationCategory">
                  Kategoria nie może mieć więcej niż 45 znaków.
                </b-form-invalid-feedback>
              </b-form-group>
            </div>

          </div>
          <div class="col img-center  card-elem-office">
            <b-img-lazy v-if="book.cover.length>0" :src="book.cover" height="500" width="333"
                        alt="Okładka do książki"></b-img-lazy>
            <img v-else src="../../assets/HomeOffice.png" height="300" width="300" alt="Okładka do książki"/>
          </div>
        </div>

        <div class="row flex-column-reverse">
          <!-- ROW-5 DESCRIPTION-->
          <div class="row card-elem-office">
            <b-form-group class="col" label="Opis:" label-for="input-description">
              <b-form-textarea class="input-office-orange border-orange"

                               id="input-description"
                               v-model="book.description"
                               rows="3"
                               max-rows="6"
              ></b-form-textarea>

            </b-form-group>
          </div>

          <!-- ROW-6 URL-->
          <div class="row card-elem-office">
            <b-form-group class="col" label="URL okładki:" label-for="input-url">
              <b-form-input class="input-office-orange border-orange"
                            id="input-url"
                            v-model="book.cover"
                            placeholder=""

              ></b-form-input>
            </b-form-group>
          </div>

        </div>

        <b-button class="edit-button" variant="office-save" :disabled="saveDisabled" type="submit"
        >Zapisz
          <b-icon
              v-if="savedIcon"
              class="pl-2"
              scale="2.6"
              icon="check"
              variant="success"
              aria-hidden="true"
          ></b-icon>
          <b-icon
              v-if="errorIcon"
              class="pl-2"
              scale="1.6"
              icon="x-circle"
              variant="danger"
              aria-hidden="true"
          ></b-icon>
          <b-icon
              v-if="busyIcon"
              icon="arrow-clockwise"
              animation="spin-pulse"
              font-scale="1"
          ></b-icon>
        </b-button>
        <template #footer><p>dfgdgdgdg</p></template>
      </b-form>
    </b-card>

  </b-container>
</template>

<script>
// import { mapGetters } from "vuex";
// import jwt_decode from "jwt-decode";
import {errorMixin} from "@/mixins/error";
import {bookMixin} from "@/mixins/book";

export default {
  name: "Library-Book",
  mixins: [errorMixin, bookMixin],
  data() {
    return {
      idBook: 0,
      isEdit: false,
      url: "",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      optionsCustomerTypes: [],
      optionsCustomerStatus: [],

      saveIcon: true,
      busyIcon: false,
      savedIcon: false,
      errorIcon: false,
      saveDisabled: false,

      busySearchIcon: false,
      savedSearchIcon: false,
      errorSearchIcon: false,
      searchDisabled: false
    };
  },
  mounted() {
    console.log("mounted TheBook");
    this.isEdit = this.$route.params.isEdit;
    this.idBook = this.$route.params.idBook;
    this.getBookIfEdit();
  },
  created() {
    console.log("created TheBook");
  },
  computed: {
    // ...mapGetters(["getToken"]),

    // hasAccessRateRead() {
    //    try {
    //      let token2 = jwt_decode(this.getToken);
    //      // console.log("token: ROLE_HR_WORKTIME: " + token2.authorities.includes('ROLE_HR_WORKTIME'))
    //      return (
    //        token2.authorities.includes("HR_RATE_READ_ALL") ||
    //        token2.authorities.includes("ROLE_ADMIN")
    //      );
    //    } catch (error) {
    //      return false;
    //      // return true;
    //    }
    //  },
    //  hasAccessRateWrite() {
    //    try {
    //      let token2 = jwt_decode(this.getToken);
    //      // console.log("token: ROLE_HR_WORKTIME: " + token2.authorities.includes('ROLE_HR_WORKTIME'))
    //      return (
    //        token2.authorities.includes("HR_RATE_WRITE_ALL") ||
    //        token2.authorities.includes("ROLE_ADMIN")
    //      );
    //    } catch (error) {
    //      return false;
    //      // return true;
    //    }
    //  },
    //  hasAccessRateDelete() {
    //    try {
    //      let token2 = jwt_decode(this.getToken);
    //      // console.log("token: HR_RATE_DELETE_ALL: " + token2.authorities.includes('HR_RATE_DELETE_ALL'))
    //      return (
    //        token2.authorities.includes("HR_RATE_DELETE_ALL") ||
    //        token2.authorities.includes("ROLE_ADMIN")
    //      );
    //    } catch (error) {
    //      return false;
    //      // return true;
    //    }
    //  },
    //  hasAccessEmployeeWrite() {
    //    try {
    //      let token2 = jwt_decode(this.getToken);
    //      // console.log("token: ROLE_HR_WORKTIME: " + token2.authorities.includes('ROLE_HR_WORKTIME'))
    //      return (
    //        token2.authorities.includes("HR_EMPLOYEE_WRITE_ALL") ||
    //        token2.authorities.includes("ROLE_ADMIN")
    //      );
    //    } catch (error) {
    //      return false;
    //      // return true;
    //    }
    //  },
    validationTitle() {
      return this.book.title.length <= 100;
    },
    validationAuthors() {
      let result = true;
      let authors = this.book.authors.split(",");
      authors.forEach(value => {
        if (value.length > 90) {
          result = false;
        }
      });
      return result;
    },
    validationSeries() {
      return this.book.series.length <= 45;
    },
    validationCategory() {
      let result = true;
      let categories = this.book.categories.split(",");
      categories.forEach(value => {
        if (value.length > 45) {
          result = false;
        }
      });
      return result;
    },
  },
  methods: {

    //
    //get book if edit
    //
    getBookIfEdit() {
      console.log("START - getBookIfEdit()), ID = " + this.idBook);
      if (this.isEdit === true) {
        this.loadingBook = true;
        this.getBookByIdFromDb(this.idBook).then((response) => {
          this.book = response.data;
          console.log(JSON.stringify(this.book));
          this.loadingBook = false;
        });
        console.log("END - getBookIfEdit()), ID = " + this.idBook);
      }
    },

    //
    //find the book na upoluj ebooka
    //
    findBookUE() {
      console.log("START - findBookUE(" + this.url + ")");
      this.searchDisabled = true;
      this.changeStatusSearchIcon(true, false, false);
      this.loadingBook = true;
      this.getBookFromUrl("UPOLUJ_EBOOKA", this.url).then((response) => {
        console.log("BOOK: " + JSON.stringify(response.data));

        let tempBook = response.data;
        console.log("BOOK1: " + JSON.stringify(tempBook));
        if (tempBook.title === "") {
          this.loadingBook = false;
          this.searchDisabled = false;
          this.changeStatusSearchIcon(false, false, true);
          setTimeout(() => this.changeStatusSearchIcon(false, false, false), 8000);
          this.displayLargeMessage("danger", "Nie znaleziono książki??.");
        } else {
          this.loadingBook = false;
          this.searchDisabled = false;
          this.changeStatusSearchIcon(false, true, false);
          setTimeout(() => this.changeStatusSearchIcon(false, false, false), 8000);
          this.book = response.data;
        }
      })
    },

    saveBook() {
      console.log("START - saveBook()");
      this.saveDisabled = true;
      this.changeStatusIcon(true, false, false);
      // console.log("validEMployee: " + this.validEmployee());
      if (!this.validBook()) {
        this.changeStatusIcon(false, false, true);
        this.saveDisabled = false;
        this.displaySmallMessage("warning", "Niepoprawne dane.");
        setTimeout(() => this.changeStatusIcon(false, false, false), 5000);
      } else {
        if (this.book.id === 0 || this.book.id == null) {
          this.addBookDB(this.book)
              .then((response) => {
                this.book = response.data;
                this.displaySmallMessage("success", "Dodano książkę.");
                // console.log(JSON.stringify(response.data));
                this.changeStatusIcon(false, true, false);
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.saveDisabled = false;
                this.cleanForm();
              })
              .catch((e) => {
                this.changeStatusIcon(false, false, true);
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.saveDisabled = false;
                this.validateError(e);
              });
        } else {
          this.updateBookDB()
              .then((response) => {
                this.book = response.data;
                this.displaySmallMessage("success", "Zaaktualizowano książkę.");
                // console.log(JSON.stringify(response.data));
                this.changeStatusIcon(false, true, false);
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.saveDisabled = false;
              })
              .catch((e) => {
                this.changeStatusIcon(false, false, true);
                this.saveDisabled = false;
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.validateError(e);
              });
        }
        console.log("END - saveBook()");
      }
    },

    cleanForm() {
      this.book.id = 0;
      this.book.title = "";
      this.book.authors = "";
      this.book.series = "";
      this.book.bookInSeriesNo = 0;
      this.book.categories = "";
      this.book.cover = "";
      this.book.description = "";
    },
    validBook() {
      return (
          this.validationAuthors &&
          this.validationCategory &&
          this.validationSeries &&
          this.validationTitle
      );
    },

    changeStatusIcon(busy, saved, error) {
      this.busyIcon = busy;
      this.errorIcon = error;
      this.savedIcon = saved;
    },

    changeStatusSearchIcon(busy, saved, error) {
      this.busySearchIcon = busy;
      this.errorSearchIcon = error;
      this.savedSearchIcon = saved;
    },


    //---------------------------------------  CONVERT TO OPTION ----------------------------------------------------
    convertToOptionsCustomerType(types) {
      console.log("convert to convertToOptionsCustomer...");
      // console.log(JSON.stringify(types));
      types.forEach((e) => {
        let opt = {
          value: e.name,
          text: e.viewName,
        };
        this.optionsCustomerTypes.push(opt);
        console.log(e.name + " - " + e.viewName);
      });
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/main.css";

#container {
  margin-top: 20px;
}

.img-center {
  display: flex;
  align-items: center;
  align-self: center;
}
</style>
