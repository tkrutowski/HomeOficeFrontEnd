<template>
  <b-container fluid id="container">
    <!--     FILTER -->
    <b-card
        bg-variant="office-dark1"
        class="mb-5 text-office-orange"
    >
      <div class="row card-elem-office">
        <b-form-group
            label="Filtrowanie tabeli"
            label-for="filter-input"
            label-size="sm"
            class="col "
            label-class="mb-0"

        >
          <b-input-group size="sm">
            <b-form-input class="input-office-orange border-orange"
                          id="filter-input"
                          v-model="filter"
                          type="search"
                          placeholder="wpisz aby wyszukać..."
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''" variant="office">Wyczyść</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group class="col-2 ml-1"
                      label="Na strone:"
                      label-for="select-per-page"
                      label-class="mb-0"
                      label-size="sm">
          <b-form-select class="input-office-orange border-orange"
                         id="select-input-per-page"
                         v-model="perPage"
                         :options="pageOptions"
                         size="sm"
          ></b-form-select>
        </b-form-group>

      </div>

    </b-card>

    <!-- --------------------------------- TABELA ---------------------------------- -->
    <b-row class="mt-5">
      <b-col>
        <b-table
            :busy="isBusy"
            :items="bookList"
            :fields="fields"
            tbody-tr-class="text-office-orange table-row"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            id="table"
            responsive="sm"
            thead-tr-class="bg-office text-office-orange table-head"
        >
          <!-- ICON BUSY -->
          <template #table-busy>
            <div class="text-center text-office-orange  my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>

          <!-- ----------------------------------AKCJA --------------------------------- -->
          <template #cell(action)="row">
            <b-button-group>

              <!-- DETAILS -->
              <b-button
                  size="sm"
                  @click="row.toggleDetails"
                  variant="office"
                  class="mr-2"
                  title="Rozwiń szczegóły"
              >
                <b-icon icon="three-dots" aria-hidden="true"></b-icon>
              </b-button>
              <!-- USERBOOK -->
              <b-button
                  size="sm"
                  @click="addToShell(row.item)"
                  variant="office"
                  class="mr-2 "
                  title="Dodaj na swoją półkę"
              >
                <img alt="" src="../../assets/add-to-shell.png" height="25px"/>
              </b-button>
              <!-- EDIT -->
              <b-button
                  size="sm"
                  @click="editBook(row.item)"
                  class="mr-2"
                  variant="office"
                  title="Edycja książki"
              >
                <img alt="" src="../../assets/edit-book-icon.png" height="25px"/>
              </b-button>
              <!-- DELETE -->
              <b-button
                  size="sm"
                  @click="deleteBook(row.item)"
                  class="mr-2 "
                  variant="office-save"
                  title="Usuń książkę"
                  style="width: 40px"
              >
                <b-icon icon="trash" aria-hidden="true"></b-icon>
              </b-button>
            </b-button-group>
          </template>

          <!-- --------------------DETAILS----------------------- -->
          <template #row-details="row">
            <b-card id="details" class="card-office">
              <b-row class="mb-2">
                <!-- <b-col>{{ row.item.pesel }}</b-col> -->
                <b-col class="col-8 text-sm-left"><b>Opis:<br></b>{{ row.item.description }}</b-col>
                <div class="col img-center">
                  <b-img-lazy v-if="row.item.cover.length>0" :src="row.item.cover" height="250" width="160"
                              alt="Okładka do książki"></b-img-lazy>
                  <img v-else src="../../assets/HomeOffice.png" height="250" width="250" alt="Okładka do książki"/>
                </div>
              </b-row>
            </b-card>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <!--  PAGEING-->
    <b-row class="paging">
      <b-col sm="7" md="6" class="my-1">
        <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0 paging"

        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" size="lg" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
import router from "@/router";
import {bookMixin} from "@/mixins/book";
import {errorMixin} from "@/mixins/error";

export default {
  name: "library-books",
  mixins: [errorMixin, bookMixin],
  data() {
    return {
      fields: [
        {
          key: "authors",
          label: "Autor",
          sortable: true,
        },
        {
          key: "title",
          label: "Tytuł",
          sortable: true,
        },
        {
          key: "categories",
          label: "Kategoria",
        },
        {
          key: "series",
          label: "Seria",
          sortable: true,
        },
        {
          key: "bookInSeriesNo",
          label: "Część",
          sortable: true,
        },
        {
          key: "action",
          label: "Akcja",
        },
      ],
      isBusy: false,
      bookList: [],
      //searching
      filter: null,
      filterOn: ["authors", "title", "categories", "series"],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [10, 20, 50],

      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  created() {
    console.log("created");
    this.getAllBooks();
  },
  mounted() {
    console.log("mounted");
  },
  computed: {

    calculateAll() {
      return this.bookList.length;
    },
    calculateActive() {
      let count = 0;
      this.bookList.forEach((customer) => {
        if (customer.customerStatus === "ACTIVE") {
          count++;
        }
      });
      return count;
    },
    calculateInActive() {
      let count = 0;
      this.bookList.forEach((customer) => {
        if (customer.customerStatus === "INACTIVE") {
          count++;
        }
      });
      return count;
    },
  },
  methods: {
    rowClass() {
      // if (!item || type !== 'row') return
      //if (item.isHoliday === true) return "table-dark";
      return "text-office-orange table-row";
    },

    getAllBooks() {
      console.log("START - getAllBooks()");
      let tempBooks = this.$store.getters.getLibrary;
      let tempTimeToRefresh = this.$store.getters.getTimeToRefresh;
      console.log("TempTime: " + tempTimeToRefresh);
      console.log("tempBook : " + tempBooks.length);
      if ((new Date().getTime() < tempTimeToRefresh + 600_000) && tempBooks.length > 0) {
        this.isBusy = true;
        console.log("take books from store");
        this.bookList = tempBooks;
        this.totalRows = this.bookList.length
        this.isBusy = false;
      } else {

        console.log("take books from DB");
        this.isBusy = true;
        this.getBooksFromDb("ALL").then((response) => {
          this.bookList = response.data;
          this.totalRows = this.bookList.length
          this.isBusy = false;
          this.$store.commit("updateLibrary", this.bookList);
          this.$store.commit("updateTimeToRefresh", new Date().getTime());
        });
      }
      console.log("END - getAllBooks()");
    },

    addToShell(item) {
      this.$router.push({
        name: 'TheUserBook',
        params: {book: item, isEdit: false},
      })
    },

    //
    //add new customer
    //
    newBook() {
      console.log("newBook()");
      router.push({
        name: "TheBook",
        params: {idBook: 0, isEdit: false},
      });
    },

    //
    //edit book
    //
    editBook(item) {
      console.log("editBook(): " + item.id);
      router.push({
        name: "TheBook",
        params: {idBook: item.id, isEdit: true},
      });
    },

    //
    //delete book
    //
    deleteBook(item) {
      this.$bvModal
          .msgBoxConfirm(`Czy chcesz usunąć książkę pt.: '${item.title}' ?`, {
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
              this.deleteBookDB(item.id).then(() => {
                console.log("rozmiar przed DEL: " + this.bookList.length)
                let index = this.bookList.indexOf(item);
                if (index !== -1) {
                  this.bookList.splice(index, 1);
                }
                console.log("rozmiar po DEL: " + this.bookList.length)
                this.displaySmallMessage("success", "Usunięto książkę.");
              });
            }
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
}
</script>

<style scoped>
@import "../../assets/css/ahead.css";
</style>