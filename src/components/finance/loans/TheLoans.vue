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
            class="col-12 col-md-10"
            label-class="mb-0"

        >
          <b-input-group size="sm">
            <b-form-input class="input-office-orange border-orange"
                          id="filter-input"
                          v-model="filter"
                          type="search"
                          placeholder="wpisz aby wyszukać..."
            ></b-form-input>

            <b-input-group-append class="d-none d-md-flex">
              <b-button :disabled="!filter" @click="filter = ''" variant="office">Wyczyść</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group class="col-12 col-md-2 pl-md-1 "
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


      <!-- SETTINGS ?? -->
      <div class="d-flex justify-content-end">
        <b-button
            @click="refreshLoans"
            size="sm"
            variant="office"
            class="mr-2"
            title="Odśwież"
        >
          <b-icon icon="arrow-clockwise" :animation="settingAnimation" aria-hidden="true"></b-icon>
        </b-button>

        <b-button
            v-b-toggle.sidebar-loans
            size="sm"
            variant="office"
            class="mr-2"
            title="Ustawienia"
        >
          <b-icon icon="info-circle" aria-hidden="true"></b-icon>
        </b-button>
      </div>
    </b-card>

    <!-- --------------------------------- TABELA ---------------------------------- -->
    <b-row class="mt-5">
      <b-col>
        <b-table
            :busy="isBusy"
            :items="loansCopy"
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

          <template #cell(loanStatus)="row">
            <!-- ---------------------------- Status icons -------------------------------- -->
            <div>
              <!-- Enabled -->
              <b-button
                  v-if="row.item.loanStatus === 'PAID'"
                  size="sm"
                  variant="outline"
                  @click="setLoanStatus(row.item)"
              >
                <b-icon
                    class="pr-4 pt-1"
                    scale="1.3"
                    icon="toggle-on"
                    variant="success"
                    aria-hidden="true"
                ></b-icon>
              </b-button>
              <b-button
                  v-else
                  size="sm"
                  variant="outline"
                  @click="setLoanStatus(row.item)"
              >
                <b-icon
                    class="pr-4"
                    scale="1.3"
                    icon="toggle-off"
                    variant="danger"
                    aria-hidden="true"
                ></b-icon>
              </b-button>
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
              <!-- EDIT -->
              <b-button
                  size="sm"
                  @click="editLoan(row.item)"
                  class="mr-2"
                  variant="office"
                  title="Edycja pożyczki"
              >
                <img alt="" src="../../../assets/edit-book-icon.png" height="25px"/>
              </b-button>
              <!-- DELETE -->
              <b-button
                  size="sm"
                  @click="deleteLoan(row.item)"
                  class="mr-2 "
                  variant="office-save"
                  title="Usuń kredyt"
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
                <b-col class="col text-sm-left">
                  <p class="mb-1 mt-3"><small>Nazwa kredytu:</small> {{ row.item.name }}</p>
                  <p class="mb-1"><small>Nazwa banku:</small> {{ row.item.bank.name }}</p>
                  <p class="mb-1"><small>Nr kredytu:</small> {{ row.item.loanNumber }}</p>
                  <p class="mb-1"><small>Z dnia:</small> {{ row.item.date }}</p>
                  <p class="mb-1"><small>Data pierwszej raty:</small> {{ row.item.firstPaymentDate }}</p>
                  <p class="mb-1"><small>Termin całkowitej spłaty:</small>
                    {{ row.item.installmentDtoList[row.item.installmentDtoList.length - 1].paymentDeadline }}</p>
                  <p class="mb-5"><small>Nr konta:</small> {{ row.item.accountNumber }}</p>

                  <p class="mb-1"><small>Kwota kredytu:</small> {{ row.item.amount }} zł</p>
                  <p class="mb-1"><small>Koszt kredytu:</small> <span class="color-red"> {{
                      row.item.loanCost
                    }} zł</span></p>
                  <p class="mb-1"><small>Ilość rat:</small> {{ row.item.numberOfInstallments }}</p>
                  <p class="mb-1"><small>Kwota raty:</small> {{ row.item.installmentAmount }} zł</p>
                  <p class="mb-1"><small>Odsetki planowane:</small> <span class="color-red">
                  {{
                      ((row.item.amount - row.item.numberOfInstallments * row.item.installmentAmount) * (-1)).toFixed(2)
                    }} zł
                </span></p>
                  <p class="mb-3"><small>Odsetki rzeczywiste:</small> <span class="color-red">{{
                      (row.item.installmentDtoList
                          .filter(payment => payment.paymentStatus === "PAID")
                          .map(installment => installment.installmentAmountPaid - installment.installmentAmountToPay)
                          .map(value => parseFloat(value))
                          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)
                    }} zł</span></p>

                  <p class="mb-4"><small>Całkowity koszt kredytu:</small>
                    <span class="color-red h4">
                  {{
                        ((row.item.amount - row.item.loanCost - row.item.numberOfInstallments * row.item.installmentAmount) * (-1)).toFixed(2)
                      }} zł
                </span></p>

                  <p class="mb-1"><small>Spłacono:</small>
                    {{ row.item.installmentDtoList.filter(installment => installment.paymentStatus === 'PAID').length }}
                    z {{ row.item.numberOfInstallments }}</p>
                  <b-progress class="progress-office" height="20px"
                              :max="row.item.numberOfInstallments">
                    <b-progress-bar class="progress-bar-office"
                                    :value="row.item.installmentDtoList.filter(installment => installment.paymentStatus==='PAID').length"
                                    :label="((row.item.installmentDtoList.filter(installment => installment.paymentStatus==='PAID').length / row.item.numberOfInstallments)*100).toFixed(0)+`%`"
                    >
                    </b-progress-bar>
                  </b-progress>
                  <b-form-group class="col p-0 mt-4" label="Opis:" label-for="input-description">
                    <b-form-textarea class="input-office-orange border-orange"

                                     id="input-description"
                                     v-model="row.item.otherInfo"
                                     rows="3"
                                     max-rows="6"
                    ></b-form-textarea>

                  </b-form-group>
                </b-col>
                <b-col class="col text-sm-left">
                  <b-table
                      :busy="isBusy"
                      :items="row.item.installmentDtoList"
                      :fields="fieldsDetails"
                      tbody-tr-class="text-office-orange table-row"
                      id="table-details"
                      responsive="sm"
                      thead-tr-class="bg-office text-office-orange table-head"
                  >

                    <!-- A custom formatted column -->
                    <template #cell(paymentDate)="data">
                      {{ data.item.paymentDate === `0001-01-01` ? `` : data.item.paymentDate }}
                    </template>
                    <template #cell(installmentAmountPaid)="data">
                      {{ data.item.installmentAmountPaid === `0.00` ? `` : data.item.installmentAmountPaid }}
                    </template>

                  </b-table>
                </b-col>

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

    <!-- --------------------------------- SIDEBAR ---------------------------------- -->
    <b-sidebar id="sidebar-loans" right sidebar-class="border-right border-office" bg-variant="office"
               text-variant="orange">
      <template #footer="{ hide }">
        <div class="d-flex bg-office-dark2 px-3 py-2  ">
          <b-button size="sm" variant="office" @click="hide">Zamknij</b-button>
        </div>
      </template>
      <div class="px-3 py-2">
        <b-card id="card-info" bg-variant="office-dark1" header-tag="header">
          <template #header>
            <h3 class="text-office-orange">Wyświetlanie</h3>
          </template>

          <b-card-text class="text-left pl-3 mb-1 text-office-orange">Wszystkie / {{ calculateAll }}</b-card-text>
          <b-card-text class="text-left pl-3 mb-1 color-green"
          >Spłacone / {{ calculatePaid }}
          </b-card-text
          >
          <b-card-text class="text-left pl-3 mb-1 color-red"
          >Niesapłacone / {{ calculateToPay }}
          </b-card-text
          >

          <hr class="my-4" style="color: green; background-color: green"/>

          <b-form-group label="Wyświetl:" class="text-office-orange">
            <b-form-radio
                v-model="selectedDisplay"
                class="pb-1"
                value="ALL"
                @change="displaySelectedLoansTable($event)"
            >Wszystkie
            </b-form-radio>
            <b-form-radio
                v-model="selectedDisplay"
                class="color-green pb-1"
                value="PAID"
                @change="displaySelectedLoansTable($event)"
            >Spłacone
            </b-form-radio
            >
            <b-form-radio
                v-model="selectedDisplay"
                class="color-red pb-1"
                value="TO_PAY"
                @change="displaySelectedLoansTable($event)"
            >Niesapłacone
            </b-form-radio
            >
          </b-form-group>
        </b-card>
      </div>
    </b-sidebar>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" size="lg" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
import router from "@/router";
import {errorMixin} from "@/mixins/error";
import {loanMixin} from "@/mixins/loan";

export default {
  name: "finance-loans",
  mixins: [errorMixin, loanMixin],
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Nazwa",
          sortable: true,
        },
        {
          key: "bank.name",
          label: "Bank",
          sortable: true,
        },
        {
          key: "date",
          label: "Data",
          sortable: true,
        },
        {
          key: "amount",
          label: "Kwota",
          sortable: true,
        },
        {
          key: "numberOfInstallments",
          label: "Ilość rat",
        },
        {
          key: "installmentAmount",
          label: "Kwota raty",
          sortable: true,
        },
        {
          key: "amountToPay",
          label: "Pozostało",
          sortable: true,
        },
        {
          key: "loanStatus",
          label: "Status",
        },
        {
          key: "action",
          label: "Akcja",
        },
      ],
      fieldsDetails: [
        {
          key: "installmentNumber",
          label: "Nr raty",
        },
        {
          key: "paymentDeadline",
          label: "Termin płat.",
        },
        {
          key: "installmentAmountToPay",
          label: "Kwota",
        },
        {
          key: "paymentDate",
          label: "Data zapł.",
        },
        {
          key: "installmentAmountPaid",
          label: "Kwota zapł.",
        },
      ],
      isBusy: false,
      loansCopy: [],
      //searching
      filter: null,
      filterOn: ["name", "date", "bank"],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [10, 20, 50],

      //settings
      settingAnimation: "",

      //sidebar
      selectedDisplay: "TO_PAY",

      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  created() {
    console.log("created");
    this.getAllLoans();
  },
  mounted() {
    console.log("mounted");
  },
  computed: {
    parseFloat(value) {
      return parseFloat(value);
    },
    calculateAll() {
      return this.$store.getters.getLoans.length;
    },
    calculatePaid() {
      let count = 0;
      this.$store.getters.getLoans.forEach((loan) => {
        if (loan.loanStatus === "PAID") {
          count++;
        }
      });
      return count;
    },
    calculateToPay() {
      let count = 0;
      this.$store.getters.getLoans.forEach((loan) => {
        if (loan.loanStatus === "TO_PAY") {
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

    getAllLoans() {
      console.log("START - getAllLoans()");
      if (this.$store.getters.getLoans?.length > 0) {
        console.log("take loans from store");
        this.loansCopy = JSON.parse(JSON.stringify(this.$store.getters.getLoans));
      } else {
        console.log("take fees from DB");
        this.refreshLoans();
      }
      //wyświetla tabele
      this.displaySelectedLoansTable(this.selectedDisplay);
      this.totalRows = this.loansCopy.length
      console.log("Total rows: ", this.totalRows);
      console.log("END - getAllBooks()");
    },

    refreshLoans() {
      console.log("START - refresh()");
      this.isBusy = true;
      this.settingAnimation = "spin";
      this.getLoansFromDb("ALL", true).then((response) => {
        this.$store.commit("updateLoans", response.data);
        this.loansCopy = JSON.parse(JSON.stringify(this.$store.getters.getLoans));
        this.isBusy = false;
        this.settingAnimation = "";
        //wyświetla tabele
        this.displaySelectedLoansTable(this.selectedDisplay);
        this.totalRows = this.loansCopy.length
        console.log("Total rows: ", this.totalRows);
      });
      console.log("END - refreshLoans()");
    },

    //
    //edit loan
    //
    editLoan(item) {
      console.log("editLoan(): " + item.id);
      router.push({
        name: "TheLoan",
        params: {idLoan: item.id, isEdit: true},
      });
    },

    //
    //delete loan
    //
    deleteLoan(item) {
      this.$bvModal
          .msgBoxConfirm(`Czy chcesz usunąć kredyt: "'${item.name}'" ?`, {
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
              this.deleteLoanDB(item.id).then(() => {
                let tempLoans = this.$store.getters.getLoans;
                console.log("rozmiar przed DEL: " + tempLoans.length)
                this.$store.commit("deleteLoan", item);
                console.log("rozmiar po DEL: " + tempLoans.length)
                this.loansCopy = JSON.parse(JSON.stringify(this.$store.getters.getLoans));
                this.displaySmallMessage("success", "Usunięto kredyt.");
              });
            }
          })
          .catch(() => {
            // An error occurred
          });
    },

    setLoanStatus(item) {
      // console.log(JSON.stringify(item));
      console.log("setLoanStatus id: " + item.id + ", status: " + item.loanStatus);
      this.$bvModal
          .msgBoxConfirm(
              `Czy chcesz zmienić status kredytu  "${item.name}" na
         ${item.loanStatus === "PAID" ? "NIEZAPŁACONY" : "SPŁACONY"}?`,
              {
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
              }
          )
          .then((value) => {
            // console.log(value);
            if (value) {
              this.updateLoanStatusDb(
                  item.id,
                  item.loanStatus === "PAID" ? "TO_PAY" : "PAID"
              ).then((response) => {
                this.$store.commit("editLoan", response.data);
                const index = this.loansCopy.findIndex(loan => loan.id === item.id);
                if (index !== -1) this.loansCopy.splice(index, 1);
              });
            }
          })
          .catch(() => {
            // An error occurred
          });
    },

    //-------------------------------------------DISPLAY-------------------------------------------
    displaySelectedLoansTable(event) {
      console.log("DisplayRadio(): " + event);
      if (event === "ALL") {
        console.log("event ALL")
        this.loansCopy = [];
        let copy = JSON.parse(JSON.stringify(this.$store.getters.getLoans));
        copy.forEach((loan) => {
          this.loansCopy.push(loan);
        });
        this.totalRows = this.loansCopy.length
      }
      if (event === "PAID") {
        console.log("event PAID")
        this.loansCopy = [];
        let copy = JSON.parse(JSON.stringify(this.$store.getters.getLoans));
        copy.forEach((loan) => {
          if (loan.loanStatus === "PAID") {
            this.loansCopy.push(loan);
          }
        });
        this.totalRows = this.loansCopy.length
      }

      if (event === "TO_PAY") {
        console.log("event TO_PAY")
        this.loansCopy = [];
        let copy = JSON.parse(JSON.stringify(this.$store.getters.getLoans));
        copy.forEach((loan) => {
          if (loan.loanStatus === "TO_PAY") {
            this.loansCopy.push(loan);
          }
        });
        this.totalRows = this.loansCopy.length
      }
    },

    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },

  },
}
</script>

<style scoped>
@import "../../../assets/css/main.css";
</style>