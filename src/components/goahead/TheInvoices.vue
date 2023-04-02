<template>
  <b-container fluid id="container">
    <b-row class="mt-5">
      <b-col>
        <!-- --------------------------------- TABELA ---------------------------------- -->
        <b-table
            striped
            small
            :busy="isBusy"
            :items="invoicesListToDisplay"
            :fields="fields"
            tbody-tr-class="text-ahead-green table-row"
            id="table"
            responsive="sm"
            thead-tr-class="bg-office-dark2 text-ahead-green table-head-ahead"
        >
          <!-- ICON BUSY -->
          <template #table-busy>
            <div class="text-center text-ahead-green  my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>


          <template #cell(status)="row">
            <!-- ---------------------------- Status icons -------------------------------- -->
            <div>
              <!-- Enabled -->
              <b-button
                  v-if="row.item.paymentStatus === 'PAID'"
                  size="sm"
                  variant="outline"
                  @click="setInvoiceStatus(row.item)"
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
                  @click="setInvoiceStatus(row.item)"
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
                  variant="ahead"
                  class="mr-2"
                  title="Rozwiń szczegóły"
              >
                <b-icon icon="three-dots" aria-hidden="true"></b-icon>
              </b-button>
              <!-- PDF -->
              <b-button
                  size="sm"
                  @click="getInvoicePdf(row.item)"
                  class="mr-2"
                  variant="ahead"
                  title="Pobierz pdf"
              >
                <b-icon icon="file-pdf" aria-hidden="true"></b-icon>
              </b-button>
              <!-- EDIT -->
              <b-button
                  size="sm"
                  @click="editInvoice(row.item)"
                  class="mr-2"
                  variant="ahead"
                  title="Edycja faktury"
              >
                Edit
              </b-button>
              <!-- DELETE -->
              <b-button
                  size="sm"
                  @click="deleteInvoice(row.item)"
                  class="mr-2 bg-danger"
                  title="Usuń fakturę"
              >
                <b-icon icon="trash" aria-hidden="true"></b-icon>
              </b-button>
            </b-button-group>
          </template>

          <!-- --------------------DETAILS----------------------- -->
          <template #row-details="row">
            <b-card id="details">
              <b-row v-for="item in row.item.invoiceItems" :key="item.id" class="mb-2">
                <!-- <b-col>{{ row.item.pesel }}</b-col> -->
                <b-col sm="5" class="text-sm-left">Nazwa: {{ item.name }}</b-col>
                <b-col sm="2" class="text-sm-left">Ilość: {{ item.quantity }}</b-col>
                <b-col sm="2" class="text-sm-left">Kwota: {{ item.amount }}</b-col>
                <b-col sm="3" class="text-sm-left">Razem: {{ item.amountSum }}</b-col>
              </b-row>
              <b-row class="mb-2">
              <b-col sm="12" class="text-sm-center">Informacje dodatkowe: {{ row.item.otherInfo }}</b-col>
            </b-row>

            </b-card>
          </template>
        </b-table>
      </b-col>

      <!-- ----------------------------------SIDE CARD --------------------------------- -->
      <b-col cols="12" md="auto" class="mb-3">
        <b-card id="card-info" bg-variant="office-dark1" header-tag="header">
          <template #header>
            <b-button variant="ahead" @click="newInvoice">Nowa faktura</b-button>
          </template>

          <b-card-text class="text-left pl-3 mb-1 text-ahead-green">Wszystkie / {{ calculateAll }}</b-card-text>
          <b-card-text class="text-left pl-3 mb-1 color-green"
          >Zapłacone / {{ calculatePaid }}</b-card-text
          >
          <b-card-text class="text-left pl-3 mb-1 color-red"
          >Niezapłacone / {{ calculateToPay }}</b-card-text
          >
          <b-card-text class="text-left pl-3 mb-1 color-red"
          >Przeterminowane / {{ calculateOverDue }}</b-card-text
          >

          <hr class="my-4" style="color: green; background-color: green" />

          <b-form-group label="Wyświetl:" class="text-ahead-green">
            <b-form-radio
                v-model="selectedDisplay"
                class="pb-1"
                value="ALL"
                @change="displayRadio($event)"
            >Wszystkie
            </b-form-radio>
            <b-form-radio
                v-model="selectedDisplay"
                class="color-green pb-1"
                value="PAID"
                @change="displayRadio($event)"
            >Zapłacone</b-form-radio
            >
            <b-form-radio
                v-model="selectedDisplay"
                class="color-red pb-1"
                value="TO_PAY"
                @change="displayRadio($event)"
            >Niezapłacone</b-form-radio
            >
            <b-form-radio
                v-model="selectedDisplay"
                class="color-red pb-1"
                value="OVER_DUE"
                @change="displayRadio($event)"
            >Przeterminowane</b-form-radio
            >
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
import router from "@/router";
import { invoiceMixin } from "@/mixins/invoice";
import { errorMixin } from "@/mixins/error";
export default {
  name: "goahead-invoices",
  mixins: [errorMixin, invoiceMixin],
  data() {
    return {
      timeAlmostUp: 30,
      fields: [
        {
          key: "invoiceNumber",
          label: "Nr faktury",
          sortable: true,
        },
        {
          key: "customerName",
          label: "Nazwa klienta",
          sortable: true,
        },
        {
          key: "sellDate",
          label: "Data sprzedaży",
          isActive: true,
        },
        {
          key: "invoiceDate",
          label: "Data wystawienia",
          isActive: false,
        },
        {
          key: "paymentTypeView",
          label: "Rodzaj płatności",
        },
        {
          key: "paymentDate",
          label: "Termin płatności",
        },
        {
          key: "amount",
          label: "Wartość",
        },
        {
          key: "status",
          label: "Status",
        },
        {
          key: "action",
          label: "Akcja",
        },
      ],
      isBusy: false,
      invoiceList: [],
      invoicesListToDisplay: [],
      selectedDisplay: "TO_PAY",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  created() {
    this.getAllInvoices();
  },
  computed: {
    calculateAll() {
      return this.invoiceList.length;
    },
    calculatePaid() {
      let count = 0;
      this.invoiceList.forEach((invoice) => {
        if (invoice.paymentStatus === "PAID") {
          count++;
        }
      });
      return count;
    },
    calculateToPay() {
      let count = 0;
      this.invoiceList.forEach((invoice) => {
        if (invoice.paymentStatus === "TO_PAY") {
          count++;
        }
      });
      return count;
    },
    calculateOverDue() {
      let count = 0;
      this.invoiceList.forEach((invoice) => {
        if (invoice.paymentStatus === "OVER_DUE") {
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
      return "text-ahead-green";
    },

    getAllInvoices() {
      this.isBusy = true;
      this.getInvoicesFromDb("ALL").then((response) => {
        this.invoiceList = response.data;
        //wyświetla tabele
        this.displayRadio(this.selectedDisplay);
        this.isBusy = false;
      });
    },

    //
    //add new invoice
    //
    newInvoice() {
      console.log("newInvoice()");
        router.push({
          name: "TheInvoice",
          params: { idInvoice: 0, isEdit: "false" },
        });
    },

    //
    //edit invoice
    //
    editInvoice(item) {
      console.log("editInvoice(): " + item.idInvoice);
      console.log(JSON.stringify(item));
      router.push({
        name: "TheInvoice",
        params: { idInvoice: item.idInvoice, isEdit: "true" },
      });
    },
    //
    //delete invoice
    //
    deleteInvoice(item) {
      this.$bvModal
          .msgBoxConfirm(`Czy chcesz usunąć fakturę:\n ${item.invoiceNumber}?`, {
            title: "Potwierdzenie",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "TAK",
            cancelTitle: "NIE",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          })
          .then((value) => {
            if (value) {
              this.deleteInvoiceDB(item.idInvoice).then(() => {
                this.getAllInvoices();
                this.displaySmallMessage("success", "Usunięto fakturę.");
              });
            }
          })
          .catch(() => {
            // An error occurred
          });
    },

    //
    //get invoice PDF
    //
    getInvoicePdf(item) {
      console.log(JSON.stringify(item));
      console.log("getInvoicePdf(): " + item.idInvoice);
      this.getInvoicePdfFromDb(item.idInvoice, item.invoiceNumber);
    },


    //
    //set invoice status active/inactive
    //
    setInvoiceStatus(item) {
      // console.log(JSON.stringify(item));
      console.log("setInvoiceStatus id: " + item.idInvoice + ", status: " + item.paymentStatus);
        this.$bvModal
            .msgBoxConfirm(
                `Czy chcesz zmienić status faktury nr: ${item.invoiceNumber} na
         ${item.customerStatus === "PAID" ? "NIEZAPŁACONE" : "ZAPŁACONE"}?`,
                {
                  title: "Potwierdzenie",
                  size: "sm",
                  buttonSize: "sm",
                  okVariant: "danger",
                  okTitle: "TAK",
                  cancelTitle: "NIE",
                  footerClass: "p-2",
                  hideHeaderClose: false,
                  centered: true,
                }
            )
            .then((value) => {
              // console.log(value);
              if (value) {
                this.updateInvoiceStatusDb(
                    item.idInvoice,
                    item.customerStatus === "PAID" ? "TO_PAY" : "PAID"
                ).then(() => {
                  this.getAllInvoices();
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
    //-------------------------------------------DISPLAY-------------------------------------------
    displayRadio(event) {
      console.log("DisplayRadio(): " + event + ", List size: " + this.invoiceList.length);
      if (event === "ALL") {
        this.invoicesListToDisplay = [];
        this.invoiceList.forEach((invoice) => {
          this.invoicesListToDisplay.push(invoice);
        });
      }
      if (event === "PAID") {
        console.log("event active" )
        this.invoicesListToDisplay = [];
        this.invoiceList.forEach((invoice) => {
          if (invoice.paymentStatus === "PAID") {
        console.log("if active" )
            this.invoicesListToDisplay.push(invoice);
          }
        });
      }

      if (event === "TO_PAY") {
        this.invoicesListToDisplay = [];
        this.invoiceList.forEach((invoice) => {
          if (invoice.paymentStatus === "TO_PAY") {
            this.invoicesListToDisplay.push(invoice);
          }
        });
      }

      if (event === "OVER_DUE") {
        this.invoicesListToDisplay = [];
        this.invoiceList.forEach((invoice) => {
          if (invoice.paymentStatus === "OVER_DUE") {
            this.invoicesListToDisplay.push(invoice);
          }
        });
      }
    },
  },
}
</script>

<style scoped>
@import "../../assets/css/ahead.css";

</style>