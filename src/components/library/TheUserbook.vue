<template>
  <b-container id="container">

    <!--    BOOK CARD  -->
    <b-card class="text-office-orange"
            header-border-variant="orange"
            bg-variant="office-dark1"
    >
      <template #header>
        <h3 v-if="isEdit" class="mb-0">EDYCJA KSIĄŻKI Z PÓŁKI</h3>
        <h3 v-else class="mb-0">NOWA KSIĄŻKA NA PÓŁKĘ</h3>
      </template>
      <b-form @submit.stop.prevent="saveUserBook" autocomplete="off">
        <div class="row ">
          <div class="col col-sm-8">
            <!-- ROW-1  BookStore-->
            <div class="row">
              <b-form-group class="col" label="Wybierz księgarnię:" label-for="input-bookstore">
                <div style="display: flex">
                  <b-form-select class="input-office-orange border-orange"
                                 id="input-bookstore"
                                 v-model="userbook.idBookstore"
                                 :options="optionsBookstores"
                                 required
                  ></b-form-select>
                  <b-button
                      v-if="loadingBookstore"
                      style="height: fit-content"
                      variant="office"
                      class="ml-3"
                      disabled
                  >
                    <b-spinner small></b-spinner>
                    <span class="sr-only">Loading...</span>
                  </b-button>
                </div>
              </b-form-group>
            </div>

            <!-- ROW-2 OWNERSHIP-->
            <div class="row">
              <b-form-group class="col" label="Własność:" label-for="input-ownership">
                <div style="display: flex">
                  <b-form-select class="input-office-orange border-orange"
                                 id="input-ownership"
                                 v-model="userbook.ownershipStatus"
                                 :options="optionsOwnershipStatus"
                                 required
                  ></b-form-select>
                  <b-button
                      v-if="loadingOwnership"
                      style="height: fit-content"
                      variant="ahead"
                      class="ml-3"
                      disabled
                  >
                    <b-spinner small></b-spinner>
                    <span class="sr-only">Loading...</span>
                  </b-button>
                </div>
              </b-form-group>
            </div>

            <!-- ROW-3 EDITION TYPE-->
            <div class="row">
              <b-form-group class="col" label="Rodzaj:" label-for="input-edition">
                <div style="display: flex">
                  <b-form-select class="input-office-orange border-orange"
                                 id="input-edition"
                                 v-model="userbook.editionType"
                                 :options="optionsEditionTypes"
                                 required
                  ></b-form-select>
                  <b-button
                      v-if="loadingEditionType"
                      style="height: fit-content"
                      variant="office"
                      class="ml-3"
                      disabled
                  >
                    <b-spinner small></b-spinner>
                    <span class="sr-only">Loading...</span>
                  </b-button>
                </div>
              </b-form-group>
            </div>

            <!-- ROW - 4 READING STATUS-->
            <div class="row">
              <b-form-group class="col" label="Stan czytania:" label-for="input-reading">
                <div style="display: flex">
                  <b-form-select class="input-office-orange border-orange"
                                 id="input-reading"
                                 v-model="userbook.readingStatus"
                                 :options="optionsReadingStatus"
                                 required
                  ></b-form-select>
                  <b-button
                      v-if="loadingReadingStatus"
                      style="height: fit-content"
                      variant="office"
                      class="ml-3"
                      disabled
                  >
                    <b-spinner small></b-spinner>
                    <span class="sr-only">Loading...</span>
                  </b-button>
                </div>
              </b-form-group>
            </div>

            <!-- ROW-3 -->
            <div class="row">
              <!-- READ FROM -->
              <b-form-group class="col" label="Czytana od:" label-for="input-read-from">
                <b-form-input class="input-office-orange border-orange"
                              id="input-read-from"
                              v-model="userbook.readFrom"
                              type="date"
                              :required="isReadFromRequired"
                ></b-form-input>
              </b-form-group>

              <!-- READ TO -->
              <b-form-group class="col" label="Data wykonania/sprzedaży:" label-for="input-read-to">
                <b-form-input class="input-office-orange border-orange"
                              id="input-read-to"
                              v-model="userbook.readTo"
                              type="date"
                              :required="isReadToRequired"
                ></b-form-input>
              </b-form-group>
            </div>


          </div>
          <!-- COL2 IMG         -->
          <div class="col img-center  card-elem-office">
            <b-img-lazy v-if="book.cover.length>0" :src="book.cover" height="500" width="333"
                        alt="Okładka do książki"></b-img-lazy>
            <img v-else src="../../assets/HomeOffice.png" height="300" width="300" alt="Okładka do książki"/>
          </div>
        </div>

        <div class="row flex-column-reverse">
          <!-- ROW-5 NOTES-->
          <div class="row card-elem-office">
            <b-form-group class="col" label="Moje notatki:" label-for="input-description">
              <b-form-textarea class="input-office-orange border-orange"

                               id="input-description"
                               v-model="userbook.info"
                               rows="3"
                               max-rows="6"
              ></b-form-textarea>

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
        <template #footer><p></p></template>
      </b-form>
    </b-card>

  </b-container>
</template>

<script>
import {errorMixin} from "@/mixins/error";
import {userBookMixin} from "@/mixins/userBook";
import {bookstoreMixin} from "@/mixins/bookstore";

export default {
  name: "Library-Book",
  mixins: [errorMixin, bookstoreMixin, userBookMixin],
  data() {
    return {
      idUserBook: 0,
      book: {},
      isEdit: false,
      url: "",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      selectedBookstore: 0,
      selectedOwnership: "",
      selectedReadingStatus: 0,
      optionsEditionTypes: [],
      optionsOwnershipStatus: [],
      optionsReadingStatus: [],
      optionsBookstores: [],

      busyIcon: false,
      savedIcon: false,
      errorIcon: false,
      saveDisabled: false,
    };
  },
  mounted() {
    console.log("mounted TheBook");
    this.isEdit = this.$route.params.isEdit;
    this.book = this.$route.params.book;
    this.idUserBook = this.$route.params.id;
    console.log("param isEdit: "+this.isEdit);
    // console.log("param book: "+JSON.stringify(this.book));
    console.log("param id: "+ this.idUserBook);
    this.getUserBookIfEdit();
  },
  created() {
    console.log("created TheBook");
    this.fillOptions();
  },
  computed: {
    isReadFromRequired() {
      return this.userbook.readingStatus !== "NOT_READ";
    },
    isReadToRequired() {
      return this.userbook.readingStatus === "READ";
    },

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

    fillOptions() {
      console.log("START - fillOptions() for READING_STATUS");
      this.getReadingStatusFromDb().then((response) => {
        // console.log(JSON.stringify(response.data));
        this.convertToOptionsReadingStatus(response.data);
        console.log("END - fillOptions() for READING_STATUS");
      });
      console.log("START - fillOptions() for OWNERSHIP_STATUS");
      this.getOwnershipStatusFromDb().then((response) => {
        // console.log(JSON.stringify(response.data));
        this.convertToOptionsOwnershipStatus(response.data);
        console.log("END - fillOptions() for OWNERSHIP_STATUS");
      });
      console.log("START - fillOptions() for EDITION_TYPE");
      this.getEditionTypeFromDb().then((response) => {
        // console.log(JSON.stringify(response.data));
        this.convertToOptionsEditionType(response.data);
        console.log("END - fillOptions() for EDITION_TYPE");
      });
      console.log("START - fillOptions() for BOOKSTORES");
      this.getBookStoresFromDB().then((response) => {
        // console.log(JSON.stringify(response.data));
        this.convertToOptionsBookstore(response.data);
        console.log("END - fillOptions() for BOOKSTORES");
      });
    },

    //
    //get book if edit
    //
    getUserBookIfEdit() {
      console.log("START - getUserBookIfEdit()), ID = " + this.idUserBook);
      if (this.isEdit === true) {
        this.loadingUserBook = true;
        this.getUserBookByIdFromDb(this.idUserBook).then((response) => {
          this.userbook = response.data;
          console.log(JSON.stringify(this.userbook));
          this.loadingUserBook = false;
        });
      }
      console.log("END - getUserBookIfEdit()), ID = " + this.idUserBook);
    },

    saveUserBook() {
      console.log("START - saveUserBook()");
      this.saveDisabled = true;
      this.changeStatusIcon(true, false, false);
      if (this.idUserBook === 0 || this.idUserBook == null) {
        this.userbook.book=this.book;
        this.addUserBookDB(this.userbook)
            .then((response) => {
              this.userbook = response.data;
              this.displaySmallMessage("success", "Dodano książkę na półkę.");
              // console.log(JSON.stringify(response.data));
              this.changeStatusIcon(false, true, false);
              setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
              this.saveDisabled = false;
              //go to prev page
              setTimeout(() => this.$router.go(-1), 3000);
            })
            .catch((e) => {
              this.changeStatusIcon(false, false, true);
              setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
              this.saveDisabled = false;
              this.validateError(e);
            });
      } else {
        this.updateUserBookDB()
            .then((response) => {
              this.userbook = response.data;
              this.displaySmallMessage("success", "Zaaktualizowano książkę.");
              // console.log(JSON.stringify(response.data));
              this.changeStatusIcon(false, true, false);
              setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
              this.saveDisabled = false;
              //go to prev page
              setTimeout(() => this.$router.go(-1), 3000);
            })
            .catch((e) => {
              this.changeStatusIcon(false, false, true);
              this.saveDisabled = false;
              setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
              this.validateError(e);
            });
      }
      console.log("END - saveUserBook()");

  },


  changeStatusIcon(busy, saved, error) {
    this.busyIcon = busy;
    this.errorIcon = error;
    this.savedIcon = saved;
  },

  //---------------------------------------  CONVERT TO OPTION ----------------------------------------------------
  convertToOptionsReadingStatus(types) {
    console.log("convert to convertToOptionsReadingStatus...");
    // console.log(JSON.stringify(types));
    types.forEach((e) => {
      let opt = {
        value: e.name,
        text: e.viewName,
      };
      this.optionsReadingStatus.push(opt);
      console.log(e.name + " - " + e.viewName);
    });
  },
  convertToOptionsOwnershipStatus(types) {
    console.log("convert to convertToOptionsOwnershipStatus...");
    // console.log(JSON.stringify(types));
    types.forEach((e) => {
      let opt = {
        value: e.name,
        text: e.viewName,
      };
      this.optionsOwnershipStatus.push(opt);
      console.log(e.name + " - " + e.viewName);
    });
  },
  convertToOptionsEditionType(types) {
    console.log("convert to convertToOptionsEditionType...");
    // console.log(JSON.stringify(types));
    types.forEach((e) => {
      let opt = {
        value: e.name,
        text: e.name,
      };
      this.optionsEditionTypes.push(opt);
      console.log(e.name + " - " + e.name);
    });
  },
    convertToOptionsBookstore(types) {
      console.log("convert to convertToOptionsBookstore...");
      // console.log(JSON.stringify(types));
      types.forEach((e) => {
        let opt = {
          value: e.id,
          text: e.name,
        };
        this.optionsBookstores.push(opt);
        console.log(e.id + " - " + e.name);
      });
    },
}
,
}
;
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
