<template>
  <b-container id="container">
    <div class="row">
      <div class="col-12 col-md-3 p-0 order-0">
        <h3 class="mt-2 d-md-none">{{bookToAdd.title}}</h3>
        <b-img :src="bookToAdd.cover"></b-img>
      </div>
      <div class="col-12 col-md-8">
        <h3 class="mt-2 d-none d-md-inline-flex align-self-center">{{bookToAdd.title}}</h3>
        <div class="book-subtitle ml-2 justify-content-md-center">
          <p class="book-subtitle-sub">Autor: </p>
          <p class="book-subtitle-sub book-subtitle-bold">{{ book.authors }}</p>
        </div>
        <div class="book-subtitle ml-2 justify-content-md-center">
          <p class="book-subtitle-sub">Kategoria: </p>
          <p class="book-subtitle-sub book-subtitle-bold text-truncate">{{ book.categories }}</p>
        </div>
        <div class="book-discription">
          <b-form-textarea id="textarea-plaintext" plaintext :value="book.description"
                           rows="3"
                           max-rows="7"
                           class="ml-md-2 book-discription-area book-subtitle-sub text-office-orange"></b-form-textarea>
        </div>
      </div>
      <div class="col-12 col-md-1 d-flex  flex-md-column justify-content-between">
        <h1 class="color-orange">#{{ bookToAdd.bookInSeriesNo }}</h1>
        <b-button :id='"notInLibrary"+bookToAdd.title' v-if="bookToAdd.id===0" class="image-button"  @click="showItemModal"
                  :disabled="addBookDisabled">
          <img alt="" src="../../assets/add-to-library.png"/>
        </b-button>
        <b-button :id='"onShell"+bookToAdd.title' v-else-if="existedUserBooks.length>0" class="image-button"
                  :disabled="addBookDisabled">
          <img alt="" src="../../assets/already-on-shell.png"/>
        </b-button>
        <b-button :id='"inLibrary"+bookToAdd.title' v-else class="image-button"  @click="addToShell"
                  :disabled="addBookDisabled">
          <img alt="" src="../../assets/add-to-shell.png"/>
        </b-button>

        <b-tooltip :target='"notInLibrary"+bookToAdd.title' triggers="hover" v-if="bookToAdd.id===0">
          Dodaj książkę do biblioteki
        </b-tooltip>
        <b-tooltip :target='"onShell"+bookToAdd.title' triggers="hover" v-else-if="existedUserBooks.length>0">
          {{ifExistsMsg}}
        </b-tooltip>
        <b-tooltip :target='"inLibrary"+bookToAdd.title' triggers="hover" v-else>
          Książka już w bibliotece. Dodaj na moją półkę
        </b-tooltip>
      </div>
    </div>

    <!-- New book modal -->
    <b-modal ref="newBookModal" class="add-book"
             headerBgVariant="office-dark1"
             header-border-variant="orange"
             headerClass="text-office-orange"
             size="xl"
             bodyBgVariant="office-dark2"
             bodyClass="text-office-orange"

             footerBgVariant="office-dark1"
             footerClass="p-2"
             footer-border-variant="orange">
      <template #modal-header>
        <div class="add-book-title">
          <h2>NOWA KSIĄŻKA</h2>

        </div>
      </template>
      <!--    BOOK CARD  -->
      <b-card class="text-office-orange"
              bg-variant="office-dark1"
      >
        <b-form>
          <div class="row ">
            <div class="col col-md-8" >
              <!-- ROW-1 TITLE-->
              <div class="row card-elem-office ">
                <b-form-group class="col-12" label="Tytuł:" label-for="input-bookTitle">
                  <b-form-input class="input-office-orange border-orange"
                                id="input-bookTitle"
                                v-model="bookToAdd.title"
                                placeholder=""
                                required
                                readonly
                  ></b-form-input>
                </b-form-group>
              </div>

              <!-- ROW-2  AUTHORS -->
              <div class="row card-elem-office   ">
                <b-form-group class="col" label="Autor:" label-for="input-authors">
                  <b-form-input class="input-office-orange border-orange"
                                id="input-authors"
                                v-model="bookToAdd.authors"
                                required
                                readonly
                  ></b-form-input>
                </b-form-group>
              </div>

              <!-- ROW-3 -->
              <div class="row card-elem-office">
                <!-- SERIES -->
                <b-form-group class="col mr-1" label="Seria:" label-for="input-series">
                  <b-form-input class="input-office-orange border-orange"
                                id="input-series"
                                v-model="bookToAdd.series"
                                placeholder=""
                                readonly
                  ></b-form-input>
                </b-form-group>

                <!-- SERIES NUMBER -->
                <b-form-group class="col ml-1" label="Numer:" label-for="input-number">
                  <b-form-input class="input-office-orange border-orange"
                                id="input-number"
                                v-model="bookToAdd.bookInSeriesNo"
                                required
                                readonly
                                type="number"
                                min="0"
                                max="30"
                  ></b-form-input>
                </b-form-group>
              </div>

              <!-- ROW-4 CATEGORY-->
              <div class="row card-elem-office">
                <b-form-group class="col" label="Kategoria:" label-for="input-category">
                  <b-form-input class="input-office-orange border-orange"
                                id="input-category"
                                v-model="bookToAdd.categories"
                                required
                                readonly
                  ></b-form-input>
                </b-form-group>
              </div>

            </div>
            <div class="col img-center d-none d-md-flex  col-md-3 card-elem-office" style="max-width: 32%">
              <b-img-lazy v-if="bookToAdd.cover.length>0" :src="bookToAdd.cover" height="400" style="width: -webkit-fill-available"
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
                                 v-model="bookToAdd.description"
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
                              v-model="bookToAdd.cover"
                              placeholder=""

                ></b-form-input>
              </b-form-group>
            </div>

          </div>
        </b-form>
      </b-card>
      <template #modal-footer>
        <div class="row justify-content-around justify-content-md-end">

          <b-button class="edit-button mr-2" variant="office" @click="closeModal">Anuluj</b-button>
          <b-button class="edit-button mr-2" variant="office-save" @click="saveBook">Zapisz</b-button>
        </div>

      </template>
    </b-modal>
  </b-container>
</template>

<script>
import {userBookMixin} from "@/mixins/userBook";
import {errorMixin} from "@/mixins/error";
import {bookMixin} from "@/mixins/book";
export default {
  name: "SeriesBook",
  mixins: [userBookMixin, errorMixin, bookMixin],
  data() {
    return {
      existedUserBooks: [],
      addBookDisabled: false,
      bookToAdd: {
        id: 0,
        series: "",
        authors: "",
        categories: "",
        title: "",
        description: "",
        cover: "",
        bookInSeriesNo: 0
      },
    }
  },
  props: {
    book: {
      id: 0,
      series: "",
      authors: "",
      categories: "",
      title: "",
      description: "",
      cover: "",
      bookInSeriesNo: 0
    },
  },
  created() {
    console.log("created SeriesBook");
    this.bookToAdd = this.book;
  },
  mounted() {
    console.log("mounted SeriesBook");
    this.checkBook();
  },
  computed: {
    ifExistsMsg(){
      if(this.existedUserBooks.length>0){
        let msg="";
        this.existedUserBooks.forEach(book => {
          if(book.readingStatus==="READ"){
            msg+="Przeczytana ("+book.readFrom+" - "+book.readTo+")";
          }else   if(book.readingStatus==="NOT_READ"){
            msg+="Nie przeczytana";
          }else if(book.readingStatus==="READ_NOW"){
            msg+="Czytam ("+book.readFrom+" - ... )";
          }
        });
        return msg;
      }else{
        return "Książka na mojej półce";
      }
    },
    validationTitle() {
      return this.bookToAdd.title.length <= 100;
    },
    validationAuthors() {
      let result = true;
      let authors = this.bookToAdd.authors.split(",");
      authors.forEach(value => {
        if (value.length > 90) {
          result = false;
        }
      });
      return result;
    },
    validationSeries() {
      return this.bookToAdd.series.length <= 45;
    },
    validationCategory() {
      let result = true;
      let categories = this.bookToAdd.categories.split(",");
      categories.forEach(value => {
        if (value.length > 45) {
          result = false;
        }
      });
      return result;
    },
  },
  methods: {
    checkBook() {
      console.log("START - checkBook()");
      this.checkIfBookUserDb(this.bookToAdd.id).then((response) => {
        this.existedUserBooks = response.data;
        console.log("is userBook: " + this.existedUserBooks.length);
      });
    },

    addToShell() {
      this.$router.push({
        name: 'TheUserBook',
        params: {book: this.bookToAdd, isEdit: false},
      })
    },
    showItemModal() {
      this.$refs["newBookModal"].show();
    },
    closeModal() {
      this.$refs["newBookModal"].hide();
    },
    saveBook() {
      console.log("START - saveBook()");
      this.addBookDisabled = true;
      if (!this.validBook()) {
        this.addBookDisabled = false;
        this.displaySmallMessage("warning", "Niepoprawne dane.");
      } else {
        this.addBookDB(this.bookToAdd)
            .then((response) => {
              this.bookToAdd = response.data;
              this.closeModal();
              this.checkBook();
              this.displaySmallMessage("success", "Dodano książkę.");
              // console.log(JSON.stringify(response.data));
              this.addBookDisabled = false;
            })
            .catch((e) => {
              this.addBookDisabled = false;
              this.validateError(e);
            });
        console.log("END - saveBook()");
      }
    },
    validBook() {
      return (
          this.validationAuthors &&
          this.validationCategory &&
          this.validationSeries &&
          this.validationTitle
      );
    },
  }
}
</script>

<style scoped>

.add-book {
  width: 1200px;
}

.add-book-title {
  display: flex;
  align-content: center;
  justify-content: center;
  width: -webkit-fill-available;
}

.footer-icons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.book_large {
  height: 300px;
  border: black 2px solid;
  margin: 15px;
}

.book-subtitle {
  display: flex;
}

.book-subtitle-sub {
  margin: 5px 5px 5px 0;
  font-size: 14px;
}

.book-subtitle-bold {
  margin: 5px 5px 5px 0;
  font-weight: bold;
  font-size: 14px;
}

.book-discription {
  text-align: left;
}
.image-button {
  display: inline-block;
  background-color: transparent;
  border-style: solid;
  border-color: transparent;
  cursor: pointer;
  outline: none;
  padding: 5px;
  margin-bottom: 10px;
  width: 50px;
}

.image-button:hover {
  background-color: transparent;
  border-style: solid;
  border-color: rgba(219, 117, 0, 1)!important;
}

.image-button:focus {
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border: none;
}

.image-button img {
  height: 35px;
  margin-right: 5px;
  vertical-align: middle;
  /*margin-bottom: 10px;*/
}

</style>