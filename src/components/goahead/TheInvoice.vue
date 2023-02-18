<template>
  <b-container id="container">
    <div class="text-left">
      <b-link class="text-ahead-green" href="/goahead/invoice/all">--powrót do listy faktur--</b-link>
    </div>
    <b-card
        :title="isEdit === 'false' ? 'Nowa faktura' : 'Edycja faktury'"
        bg-variant="light"
    >
      <b-button
          v-show="loadingCustomer"
          style="height: fit-content"
          variant="ahead"
          class="ml-3"
          disabled
      >
        <b-spinner small></b-spinner>
        <span class="sr-only">Loading...</span>
      </b-button>
      <b-form @submit.stop.prevent="saveInvoice" autocomplete="off">

        <!-- ROW-1 -->
        <div class="row">
          <b-form-group class="col" label="Wybierz klienta:" label-for="input-customer">
            <div style="display: flex">
              <b-form-select
                  id="input-customer"
                  v-model="selectedCustomer"
                  :options="optionsCustomers"
                  required
              ></b-form-select>
              <b-button
                  v-if="loadingCustomer"
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


        <!-- ROW-2 -->
        <div class="row">
          <!-- INVOICE NUMBER -->
          <b-form-group class="col" label="Numer faktury:" label-for="input-number">
            <b-form-input
                id="input-number"
                v-model="invoiceNumber"
                required
                type="number"
                min="1"
                max="300"
            ></b-form-input>
          </b-form-group>

          <!-- INVOICE YEAR -->
          <b-form-group class="col" label="Rok faktury:" label-for="input-year">
            <b-form-input
                id="input-year"
                v-model="invoiceYear"
                required

                type="number"
                min="2020"
                max="2050"
            ></b-form-input>
          </b-form-group>
        </div>


        <!-- ROW-3 -->
        <div class="row">
          <!-- HIRED DATE -->
          <b-form-group class="col" label="Data wystawienia:" label-for="input-issue-date">
            <b-form-input
                id="input-issue-date"
                v-model="invoice.invoiceDate"
                type="date"
                required
            ></b-form-input>
          </b-form-group>

          <!-- RELEASE DATE -->
          <b-form-group class="col" label="Data wykonania/sprzedaży:" label-for="input-execution-date">
            <b-form-input
                id="input-execution-date"
                v-model="invoice.sellDate"
                type="date"
            ></b-form-input>
          </b-form-group>
        </div>

        <!-- ROW-4 -->
        <div class="row">
          <!-- PAYMENT DEADLINE -->
          <b-form-group class="col" label="Termin płatności:" label-for="input-deadline">
            <b-form-input
                id="input-deadline"
                v-model="invoice.paymentDeadline"
                required
                type="number"
                min="1"
                max="30"
            ></b-form-input>
          </b-form-group>

          <!-- PAYMENT METHOD -->
          <b-form-group class="col" label="Forma płatności:" label-for="input-pay-method">
            <b-form-select
                id="input-pay-method"
                v-model="invoice.paymentType"
                :options="optionsPaymentType"
                required
            ></b-form-select>
          </b-form-group>
        </div>


        <!-- ROW-5 -->
        <div class="row">
          <!-- OTHER_INFO -->
          <b-form-group class="col" label="Inne informacje:" label-for="other-info">
            <b-form-textarea
                id="other-info"
                v-model="invoice.otherInfo"
                rows="3"
                max-rows="6"
                :state="validationInfo"
            ></b-form-textarea>
            <b-form-invalid-feedback :state="validationInfo">
              Pole nie może mieć więcej niż 500 znaków.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <b-button class="edit-button mb-3" style="width: 200px" variant="ahead" :disabled="saveDisabled"
                  @click="showItemModal">Dodaj nową pozycję

        </b-button>

        <!-- ROW-6 -->
        <div class="row" id="table">
          <!-- --------------------------------- TABELA ---------------------------------- -->
          <b-table
              striped
              small
              :busy="isBusy"
              :items="invoiceItems"
              :fields="fields"
              id="table"
              responsive="sm"
              thead-tr-class="table-bg text-ahead-light"
          >
            <!-- ICON BUSY -->
            <template #table-busy>
              <div class="text-center text-ahead-green  my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>

            <!-- ----------------------------------AKCJA --------------------------------- -->
            <template #cell(action)="row">
              <b-button-group>

                <!-- EDIT -->
                <b-button
                    size="sm"
                    @click="editItem(row.item)"
                    class="mr-2"
                    variant="ahead"
                    title="Edycja pozycji"
                >
                  Edit
                </b-button>
                <!-- DELETE -->
                <b-button
                    size="sm"
                    @click="deleteItem(row.item)"
                    class="mr-2 bg-danger"
                    title="Usuń pozycję"
                >
                  <b-icon icon="trash" aria-hidden="true"></b-icon>
                </b-button>
              </b-button-group>
            </template>

          </b-table>
        </div>

        <!-- ROW-7 -->
        <div class="row mr-5" style="justify-content: flex-end">
          <p><b>Razem: {{ amountTotal }} zł</b></p>
        </div>

        <b-button class="edit-button" variant="ahead-save" :disabled="saveDisabled" type="submit"
        >Zapisz
          <b-icon
              v-if="startIcon"
              class="pl-2"
              scale="1.4"
              icon="upload"
              variant="success"
              aria-hidden="true"
          ></b-icon>
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
      </b-form>
      <template #footer></template>
    </b-card>

    <!-- MODAL   NEW INVOICE ITEM-->
    <b-modal ref="itemModal" centered title="Dodaj nową pozycję" @ok="addNewItem" @cancel="cancelEdit"
             header-bg-variant="light" header-text-variant="ahead"
             body-bg-variant="light" body-text-variant="ahead"
             footer-bg-variant="light" footer-text-variant="ahead"
             ok-title="Dodaj" ok-variant="ahead" :ok-disabled='!validInvoiceItem'
             cancel-title="Anuluj">
      <div>
        <!-- NAME -->
        <b-form-group class="col" label="Nazwa towaru / usługi:" label-for="input-phoneNr">
          <b-form-input
              id="input-phoneNr"
              v-model="name"
              :state="validationName"
              placeholder=""
          ></b-form-input>
          <b-form-invalid-feedback :state="validationName">
            Pole nie może mieć więcej niż 150 znaków.
          </b-form-invalid-feedback>
        </b-form-group>
        <!-- JM -->
        <b-form-group class="col" label="Jednostka miary:" label-for="input-jm">
          <b-form-input
              id="input-jm"
              v-model="jm"
              :state="validationJm"
              placeholder=""
          ></b-form-input>
          <b-form-invalid-feedback :state="validationJm">
            Pole nie może mieć więcej niż 10 znaków.
          </b-form-invalid-feedback>
        </b-form-group>
        <!-- COUNT -->
        <b-form-group class="col" label="Ilość:" label-for="input-amount">
          <b-form-input
              id="input-amount"
              v-model="quantity"
              :state="validationQuantity"
              placeholder=""
              required
          ></b-form-input>
          <b-form-invalid-feedback :state="validationQuantity">
            Np: 10.5 lub 32
          </b-form-invalid-feedback>
        </b-form-group>
        <!--                    AMOUNT         -->
        <b-form-group class="col" label="Kwota:" label-for="input-amount">
          <b-form-input
              id="input-amount"
              v-model="amount"
              :state="validationAmount"
              placeholder=""
              required
          ></b-form-input>
          <b-form-invalid-feedback :state="validationAmount">
            Kwota np: 1048.52 lub 3280
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
    </b-modal>

    <!-- Info modal -->
    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal> -->

  </b-container>
</template>

<script>
// import { mapGetters } from "vuex";
// import jwt_decode from "jwt-decode";
import moment from "moment";
import {errorMixin} from "@/mixins/error";
import {customerMixin} from "@/mixins/customer";
import {invoiceMixin} from "@/mixins/invoice";

export default {
  name: "GoAhead-invoice",
  mixins: [errorMixin, customerMixin, invoiceMixin],
  data() {
    return {

      fields: [
        {
          key: "name",
          label: "Nazwa towaru / usługi",
        },

        {
          key: "jm",
          label: "Jm",
        },
        {
          key: "quantity",
          label: "Ilość",
        },
        {
          key: "amount",
          label: "Wartość jednostkowa",
        },
        {
          key: "amountSum",
          label: "Wartość towaru / usługi",
        },
        {
          key: "action",
          label: "Akcja",
        },
      ],

      //new item
      name: "Kurs języka angielskiego 60 min",
      jm: "l",
      quantity: "",
      amount: "",
      idItem: 0,

      idInvoice: 0,
      selectedCustomer: 0,
      invoiceNumber: 0,
      invoiceYear: moment().format("YYYY"),

      isBusy: false,
      isEdit: false,
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      optionsCustomers: [],
      optionsPaymentType: [],

      amountTotal: 0,
      tempEditItem: {},

      startIcon: true,
      busyIcon: false,
      savedIcon: false,
      errorIcon: false,

      saveDisabled: false,
    };
  },
  mounted() {
    console.log("mounted");
    // let idTemp = this.$route.params.idUser;
    this.isEdit = this.$route.params.isEdit;
    // console.log("TempID: " + idTemp + ", edit: " + this.$route.params.isEdit);
    // this.idUser = idTemp;
    this.idInvoice = this.$route.params.idInvoice;
    //  this.getEmployee(idEmployee);
    // this.getCustomerIfEdit();
    this.getDataIfEdit();
  },
  created() {
    console.log("created");
    this.fillOptions();

    this.invoiceItems = [];
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
    validationAmount() {
      return (
          this.amount.length > 0 &&
          this.amount.length <= 7 &&
          (/(^\d+\.\d{0,2}$)/.test(this.amount) ||
              /^[0-9]+$/.test(this.amount))
      );
    },
    validationQuantity() {
      return (
          this.quantity.length > 0 &&
          this.quantity.length <= 7 &&
          (/(^\d+\.\d{0,2}$)/.test(this.quantity) ||
              /^[0-9]+$/.test(this.quantity))
      );
    },
    validationInfo() {
      return this.invoice.otherInfo.length <= 500;
    },
    validationName() {
      return this.name.length > 0 &&
          this.name.length <= 150;
    },
    validationJm() {
      return this.jm.length > 0 &&
          this.jm.length <= 10;
    },
    validInvoiceItem() {
      return (
          this.validationName &&
          this.validationJm &&
          this.validationQuantity &&
          this.validationAmount
      );
    },
  },
  methods: {
    showItemModal() {
      // this.getRemainingRoles();
      // if (this.optionsRemainingRoles.length > 0) {
      this.$refs["itemModal"].show();
      // } else {
      //   this.displayLargeMessage("warning", "W chwili obecnej nie ma więcej ról do dodania.");
      // }
    },


    addNewItem() {
      console.log("START - addNewItem (size): " + this.invoiceItems.length);
      const item = {};
      if (this.tempEditItem != null) {
        this.invoiceItems = this.invoiceItems.filter(i =>i !== this.tempEditItem);
        console.log("deleted tempEditItem (size): " + this.invoiceItems.length);
      }
      item.id = 0;
      item.name = this.name;
      item.jm = this.jm;
      item.quantity = this.quantity;
      item.amount = parseFloat(this.amount).toFixed(2);
      item.amountSum = (parseFloat(this.quantity) * parseFloat(this.amount)).toFixed(2);

      this.invoiceItems.push(item);
      const total = this.invoiceItems.reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue.amountSum), 0);
      console.log("Total: "+ total);
      this.amountTotal = total.toFixed(2);

      // this.name="";
      // this.jm="";
      this.quantity = "";
      this.amount = "";
      this.amount = "";
      this.tempEditItem = {};
      console.log("Pozycje na fakturze (size): " + this.invoiceItems.length);
      this.invoiceItems.forEach(value => console.log(JSON.stringify(value)));
    },

    editItem(item) {
      console.log("edit item")
      this.tempEditItem = item;
      console.log(JSON.stringify(item));

      this.idItem = item.id;
      this.name = item.name;
      this.jm = item.jm;
      this.quantity = item.quantity;
      this.amount = item.amount;
      this.$refs["itemModal"].show();
    },

    cancelEdit() {
      console.log("cancelEdit")
      this.tempEditItem = {};
      console.log(JSON.stringify(this.tempEditItem));
    },

    deleteItem(item) {
      console.log("START - deleteItem (size): " + this.invoiceItems.length);
      // const item = {};
      // if (this.tempEditItem != null) {
        this.invoiceItems = this.invoiceItems.filter(i =>i !== item);
        console.log("deleted Item (size): " + this.invoiceItems.length);
    },
    // getAllCustomersByStatus(status) {
    //   this.getCustomersFromDb(status).then((response) => {
    //     this.customersList = response.data;
    //     //wyświetla tabele
    //     this.displayRadio(this.selectedDisplay);
    //     this.isBusy = false;
    //   });
    // },


    //
    //get customer if edit
    //
    getDataIfEdit() {
      console.log("getDataIfEdit()) - start, ID = " + this.idInvoice + " isEdit: " + this.isEdit);
      this.customers = [];
      this.invoiceItems = [];
      this.loadingCustomer = true;
      //EDIT
      if (this.isEdit === "true") {
        this.getCustomersFromDb("ALL").then(res => {
          this.customers = res.data;
          this.convertToOptionsCustomer();
          // console.log(JSON.stringify(res.data));

          this.getInvoiceFromDb(this.idInvoice).then(res => {
            this.invoice = res.data;
            this.selectedCustomer = this.invoice.idCustomer;
            let numberFv = this.invoice.invoiceNumber.split("/");
            this.invoiceNumber = numberFv[1];
            this.invoiceYear = numberFv[0];

            this.invoice.invoiceItems.forEach(it => {
              it.amountSum = it.amountSum.replace("zł","").trimEnd()
                  .replace(/\s+/g,'')
                  .replace(',','.');
              it.amount = it.amount.replace("zł","").trimEnd()
                  .replace(',','.');
              it.quantity = it.quantity.replace(',','.');


            });

            this.invoiceItems =this.invoice.invoiceItems;

            const total = this.invoiceItems.reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue.amountSum), 0);
            console.log("Total: "+ total);
            this.amountTotal = total.toFixed(2);

            console.log(JSON.stringify(res.data));
          })
        })
      } else {
        //NEW
        this.getCustomersFromDb("ACTIVE").then(res => {
          this.customers = res.data;
          this.convertToOptionsCustomer();
          // console.log(JSON.stringify(res.data));
        });
        this.getInvoiceNumberFromDb(this.invoiceYear).then(res => {
          this.invoiceNumber = res.data;
          console.log(JSON.stringify(res.data));
        });
        //reset ID
        // this.invoice.idInvoice = 0;
      }

      this.loadingCustomer = false;
    },

    // getCustomer(id) {
    //   console.log("START - getCustomer()");
    //   this.customer = this.getCustomerFromDb(id);
    //   console.log("END - getCustomer()");
    // },

    fillOptions() {
      console.log("START - fillOptions() for TYPE");
      this.getPaymentTypeFromDb().then((response) => {
        console.log(JSON.stringify(response.data));
        this.convertToOptionsPaymentType(response.data);
        console.log("END - fillOptions() for TYPE");
      });
    },

    saveInvoice() {
      console.log("START - saveInvoice()");
      this.saveDisabled = true;
      this.changeStatusIcon(false, true, false, false);
      // console.log("validEMployee: " + this.validEmployee());
      if (!this.validInvoice()) {
        this.changeStatusIcon(false, false, true);
        this.saveDisabled = false;
        this.displaySmallMessage("warning", "Niepoprawne dane lub brak pozycji.");
      } else {
        //NEW INVOICE
        if (this.invoice.idInvoice === 0) {
          console.log("new invoice ID: " + this.invoice.id);
          this.invoice.paymentStatus = "TO_PAY";
          this.invoice.idCustomer = this.selectedCustomer;
          this.invoice.invoiceNumber = this.invoiceYear + "/" + this.invoiceNumber;
          this.invoice.invoiceItems = this.invoiceItems;
          this.addInvoiceDB()
              .then((response) => {
                this.invoice.id = response.data;
                this.displaySmallMessage("success", "Dodano fakturę.");
                // console.log(JSON.stringify(response.data));
                this.changeStatusIcon(false, false, true, false);
                setTimeout(() =>this.changeStatusIcon(true, false, false, false), 10000);
                this.saveDisabled = false;
                this.clearForm();
              })
              .catch((e) => {
                this.changeStatusIcon(false, false, false, true);
                setTimeout(() =>this.changeStatusIcon(true, false, false, false), 10000);
                this.saveDisabled = false;
                this.validateError(e);
              });
        } else {
          console.log("edit invoiceID: " + this.invoice.idInvoice);
          this.invoice.idCustomer = this.selectedCustomer;
          this.invoice.invoiceNumber = this.invoiceYear + "/" + this.invoiceNumber;
          this.invoice.invoiceItems = this.invoiceItems;
          this.updateInvoiceDb()
              .then((response) => {
                this.invoice = response.data;
                this.displaySmallMessage("success", "Zaktualizowano dane faktury.");
                // console.log(JSON.stringify(response.data));
                this.changeStatusIcon(false, false, true, false);
                setTimeout(() =>this.changeStatusIcon(true, false, false, false), 10000);
                this.saveDisabled = false;
                this.clearForm();
              })
              .catch((e) => {
                this.changeStatusIcon(false, false, false,true);
                setTimeout(() =>this.changeStatusIcon(true, false, false, false), 10000);
                this.saveDisabled = false;
                this.validateError(e);
              });
        }
      }
      console.log("END - saveInvoice()");
    },

    clearForm() {
      this.selectedCustomer = 0;
      this.getInvoiceNumberFromDb(this.invoiceYear).then(res => {
        this.invoiceNumber = res.data + 1;
        this.invoiceItems = [];
        this.amountTotal = "0.00";
        console.log(JSON.stringify(res.data));
      });

      this.invoice.otherInfo = "";

    },
    validInvoice() {
      return this.validationInfo &&
          this.invoiceItems.length > 0;
    },


    changeStatusIcon(start, busy, save, error) {
      this.busyIcon = busy;
      this.errorIcon = error;
      this.savedIcon = save;
      this.startIcon = start;
    },


    //---------------------------------------  CONVERT TO OPTION ----------------------------------------------------
    convertToOptionsPaymentType(types) {
      console.log("convert to convertToOptionsPaymentType...");
      // console.log(JSON.stringify(types));
      types.forEach((e) => {
        let opt = {
          value: e.name,
          text: e.viewName,
        };
        this.optionsPaymentType.push(opt);
        console.log(e.name + " - " + e.viewName);
      });
    },
    convertToOptionsCustomer() {
      console.log("convertToOptionsCustomer() ...");
      this.customers.forEach((e) => {
        let opt = {
          value: e.id,
          text: e.name + " " + e.firstName,
        };
        this.optionsCustomers.push(opt);
        // console.log(e.id + " " + e.lastName);
      });
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/ahead.css";

#container {
  color: #2da687 !important;
  background-color: #e4e1d8;
  margin-top: 20px;
}

#table {
  color: rgba(255, 245, 0, 0.8);
  display: block;
}
</style>
