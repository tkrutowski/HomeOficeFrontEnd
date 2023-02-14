<template>
  <b-container id="container">
    <div class="text-left">
      <b-link class="text-ahead-green" href="/goahead/customer/all">--powrót do listy klientów--</b-link>
    </div>
    <b-card
      :title="isEdit === 'false' ? 'Dodawanie nowego klienta' : 'Edycja klienta'"
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
      <b-form @submit.stop.prevent="saveCustomer" autocomplete="off">

        <!-- ROW-1 -->
        <div class="row">
          <b-form-group class="col" label="Typ klienta:" label-for="input-customerType">
            <b-form-select
                id="input-customerType"
                v-model="customer.customerType"
                :options="optionsCustomerTypes"
                required
            ></b-form-select>
          </b-form-group>


        </div>


        <!-- ROW-2 -->
        <div class="row">
          <!-- FIRSTNAME -->
          <b-form-group class="col" label="Imię:" label-for="input-firstname">
            <b-form-input
              id="input-firstname"
              v-model="customer.firstName"
              :state="validationFirstName"
              placeholder=""
              autofocus
            ></b-form-input>
            <b-form-invalid-feedback :state="validationFirstName">
              Nie może mieć więcej niż 40 znaków.
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- LASTNAME -->
          <b-form-group class="col" label="Nazwisko/Nazwa:" label-for="input-lastname">
            <b-form-input
              id="input-lastname"
              v-model="customer.name"
              :state="validationLastName"
              placeholder=""
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationLastName">
              Nie może mieć więcej niż 100 znaków.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <!-- ROW-3 -->
        <div class="row">
          <!-- REGON -->
          <b-form-group class="col" label="REGON:" label-for="input-regon">
            <b-form-input
                id="input-regon"
                v-model="customer.regon"
                :state="validationRegon"
                placeholder=""
            ></b-form-input>
            <b-form-invalid-feedback :state="validationRegon">
              REGON musi mieć 9 lub 14 cyfr.
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- NIP -->
          <b-form-group class="col" label="NIP:" label-for="input-nip">
            <b-form-input
                id="input-nip"
                v-model="customer.nip"
                :state="validationNip"
                placeholder=""
            ></b-form-input>
            <b-form-invalid-feedback :state="validationNip">
              NIP musi mieć 10 znaków.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <!-- ROW-4 -->
        <div class="row">
          <!-- STREET -->
          <b-form-group class="col" label="Ulica:" label-for="input-street">
            <b-form-input
              id="input-street"
              v-model="customer.street"
              :state="validationStreet"
              placeholder=""
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationStreet">
              Nie może mieć więcej niż 100 znaków.
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- ZIP -->
          <b-form-group class="col" label="Kod pocztowy:" label-for="input-zip">
            <b-form-input
              id="input-zip"
              v-model="customer.zip"
              :state="validationZip"
              placeholder=""
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationZip">
              Format 61754 lub 61-754.
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- CITY -->
          <b-form-group class="col" label="Miasto:" label-for="input-city">
            <b-form-input
              id="input-city"
              v-model="customer.city"
              :state="validationCity"
              placeholder=""
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationCity">
              Nie może mieć więcej niż 100 znaków.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>


        <!-- ROW-5 -->
        <div class="row">
          <!-- EMAIL -->
          <b-form-group class="col" label="Email adres:" label-for="input-mail">
            <b-form-input
              id="input-mail"
              v-model="customer.mail"
              type="email"
              placeholder="Example@com.pl"
              :state="validationEmail"
            ></b-form-input>
            <b-form-invalid-feedback :state="validationEmail">
              Pole nie może mieć więcej niż 100 znaków.
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- PHONE_NR -->
          <b-form-group class="col" label="Telefon:" label-for="input-phoneNr">
            <b-form-input
              id="input-phoneNr"
              v-model="customer.phone"
              :state="validationTelNumber"
              placeholder=""
            ></b-form-input>
            <b-form-invalid-feedback :state="validationTelNumber">
              Pole nie może mieć więcej niż 15 znaków.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>


        <!-- ROW-6 -->
        <div class="row">
          <!-- OTHER_INFO -->
          <b-form-group class="col" label="Inne informacje:" label-for="other-info">
            <b-form-textarea
              id="other-info"
              v-model="customer.otherInfo"
              rows="3"
              max-rows="6"
              :state="validationInfo"
            ></b-form-textarea>
            <b-form-invalid-feedback :state="validationInfo">
              Pole nie może mieć więcej niż 500 znaków.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <b-button class="edit-button" variant="ahead-save" :disabled="saveDisabled" type="submit"
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
      </b-form>
      <template #footer> </template>
    </b-card>

    <!-- Info modal -->
    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal> -->

  </b-container>
</template>

<script>
// import { mapGetters } from "vuex";
// import jwt_decode from "jwt-decode";
import { errorMixin } from "@/mixins/error";
import { customerMixin } from "@/mixins/customer";
export default {
  name: "GoAhead-Customer",
  mixins: [errorMixin, customerMixin],
  data() {
    return {
      idCustomer: 0,
      isEdit: false,
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
    };
  },
  mounted() {
    // let idTemp = this.$route.params.idUser;
    this.isEdit = this.$route.params.isEdit;
    // console.log("TempID: " + idTemp + ", edit: " + this.$route.params.isEdit);
    // this.idUser = idTemp;
    this.idCustomer = this.$route.params.idCustomer;
    //  this.getEmployee(idEmployee);
    this.getCustomerIfEdit();
    console.log("mounted");
  },
  created() {
    console.log("created");
    this.fillOptions();
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
    validationFirstName() {
      if(this.customer.customerType === "CUSTOMER"){
        return this.customer.firstName.length > 0 && this.customer.firstName.length <= 40;
      }else {
        return this.customer.firstName.length <= 40;
      }
    },
    validationLastName() {
      return this.customer.name.length > 0 && this.customer.name.length <= 100;
    },
    validationStreet() {
      return this.customer.street.length > 0 && this.customer.street.length <= 100;
    },
    validationInfo() {
      return this.customer.otherInfo.length <= 500;
    },
    validationCity() {
      return this.customer.city.length > 0 && this.customer.city.length <= 100;
    },
    validationZip() {
      return (
        (this.customer.zip.length <= 6 && /(^\d{2}-\d{3}$)/.test(this.customer.zip)) ||
        (this.customer.zip.length <= 5 && /(^\d{5})/.test(this.customer.zip))
      );
    },
    validationNip() {
      if(this.customer.customerType === "COMPANY"){
        return /^\d{10}$/.test(this.customer.nip);
      }else{
        return this.customer.nip.length === 0 || /^\d{10}$/.test(this.customer.nip);
      }
    },
    validationRegon() {
      return (
          this.customer.regon.length === 0 ||
          (this.customer.regon.length === 9 &&
              /^\d{9}$/.test(this.customer.regon)) ||
          (this.customer.regon.length === 14 &&
              /^\d{14}$/.test(this.customer.regon))
      )},
    validationEmail() {
      return (
        this.customer.mail.length === 0 ||
        (this.customer.mail.length <= 100 && this.customer.mail.includes("@"))
      );
    },
    validationTelNumber() {
      return this.customer.phone.length <= 15;
    },
  },
  methods: {

    //
    //get customer if edit
    //
    getCustomerIfEdit() {
      console.log("getCustomerIfEdit()) - start, ID = " + this.idCustomer);
      if (this.isEdit === "true") {
        this.loadingCustomer = true;
        this.getCustomerFromDb(this.idCustomer, true).then((response) => {
          this.customer = response.data;
          console.log(JSON.stringify(this.customer));
          this.loadingCustomer = false;
        });
      }
    },

    getCustomer(id) {
      console.log("START - getCustomer()");
      this.customer = this.getCustomerFromDb(id, true);
      console.log("END - getCustomer()");
    },

    fillOptions() {
      console.log("START - fillOptions() for TYPE");
      this.getCustomerTypeFromDb().then((response) => {
         console.log(JSON.stringify(response.data));
        this.convertToOptionsCustomerType(response.data);
      console.log("END - fillOptions() for TYPE");
      });
    },

    saveCustomer() {
      this.saveDisabled = true;
      this.changeStatusIcon(true, false, false);
      // console.log("validEMployee: " + this.validEmployee());
      if (!this.validCustomer()) {
        this.changeStatusIcon(false, false, true);
        this.saveDisabled = false;
        this.displaySmallMessage("warning", "Niepoprawne dane.");
      } else {
        if (this.customer.id === 0) {
          this.customer.customerStatus = "ACTIVE";
          this.addCustomerDB()
            .then((response) => {
              this.customer.id = response.data;
              this.displaySmallMessage("success", "Dodano klienta.");
              // console.log(JSON.stringify(response.data));
              this.changeStatusIcon(false, true, false);
              this.saveDisabled = false;
            })
            .catch((e) => {
              this.changeStatusIcon(false, false, true);
              this.saveDisabled = false;
              this.validateError(e);
            });
        } else {
          this.updateCustomerDb()
            .then((response) => {
              this.customer = response.data;
              this.displaySmallMessage("success", "Zaktualizowano dane klienta.");
              // console.log(JSON.stringify(response.data));
              this.changeStatusIcon(false, true, false);
              this.saveDisabled = false;
            })
            .catch((e) => {
              this.changeStatusIcon(false, false, true);
              this.saveDisabled = false;
              this.validateError(e);
            });
        }
      }
    },

    validCustomer() {
      return (
        this.validationFirstName &&
        this.validationLastName &&
        this.validationStreet &&
        this.validationCity &&
        this.validationInfo &&
        this.validationZip &&
        this.validationNip &&
        this.validationEmail &&
        this.validationTelNumber&&
        this.validationRegon
      );
    },

    changeStatusIcon(busy, saved, error) {
      this.busyIcon = busy;
      this.errorIcon = error;
      this.savedIcon = saved;
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
@import "../../assets/css/ahead.css";

#container {
  color: #2da687 !important;
  background-color: #e4e1d8;
  margin-top: 20px;
}

#table {
  color: rgba(255, 245, 0, 0.8);
}
</style>
