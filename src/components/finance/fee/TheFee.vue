<template>
  <b-container id="container">

    <b-card class="text-office-orange"
            :title="isEdit ? 'EDYCJA OPŁATY':'NOWA OPŁATA'"
            bg-variant="office-dark1"
    >
      <b-button
          v-show="loadingFee"
          style="height: fit-content"
          variant="office"
          class="ml-3"
          disabled
      >
        <b-spinner small></b-spinner>
        <span class="sr-only">Loading...</span>
      </b-button>
      <b-form @submit.stop.prevent="saveFee" autocomplete="off">
        <!-- ROW-1 NAME-->
        <div class="row card-elem-office ">
          <b-form-group class="col" label="Nazwa:" label-for="input-feeName">
            <b-form-input class="input-office-orange border-orange"
                          id="input-feeName"
                          v-model="fee.name"
                          :state="validationName"
                          placeholder=""
                          required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationName">
              Nie może mieć więcej niż 100 znaków.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <!-- ROW-2  USER -->
        <div class="row card-elem-office " v-if="hasFeesAllAccess">
          <b-form-group class="col" label="Użytkownik:" label-for="input-user">
            <div style="display: flex">
              <b-form-select class="input-office-orange border-orange"
                             id="input-user"
                             v-model="fee.idUser"
                             :options="optionsUsers"
                             required
              ></b-form-select>
              <b-button
                  v-if="loadingUser"
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

        <!-- ROW-3  FIRM -->
        <div class="row card-elem-office   ">
          <b-form-group class="col" label="Firma:" label-for="input-firm">
            <div style="display: flex">
              <b-form-select class="input-office-orange border-orange"
                             id="input-firm"
                             v-model="fee.firm.id"
                             :options="optionsFirms"
                             required
              ></b-form-select>
              <b-button
                  v-if="loadingFirm"
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

        <!-- ROW-4 FEE NUMBER-->
        <div class="row card-elem-office ">
          <b-form-group class="col" label="Nr kredytu:" label-for="input-feeNumber">
            <b-form-input class="input-office-orange border-orange"
                          id="input-feeNumber"
                          v-model="fee.feeNumber"
                          :state="validationFeeNumber"
                          placeholder=""
                          required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationFeeNumber">
              Nie może mieć więcej niż 50 znaków.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <!-- ROW-5 FEE DATE-->
        <div class="row card-elem-office ">
          <b-form-group class="col" label="Z dnia:" label-for="input-feeDate">
            <b-form-input class="input-office-orange border-orange"
                          id="input-feeDate"
                          v-model="fee.date"
                          type="date"
                          required
                          :disabled="isEdit"
            ></b-form-input>
          </b-form-group>
        </div>


        <!-- ROW-6  FREQUENCY -->
        <div class="row card-elem-office   ">
          <b-form-group class="col" label="Częstotliwość opłat:" label-for="input-frequency">
            <div style="display: flex">
              <b-form-select class="input-office-orange border-orange"
                             id="input-frequency"
                             v-model="fee.feeFrequency"
                             :options="optionsFrequency"
                             required
                             :disabled="isEdit"
              ></b-form-select>
              <b-button
                  v-if="loadingFrequency"
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

        <!-- ROW-7 -->
        <div class="row card-elem-office">
          <!-- NUMBER OF PAYMENTS -->
          <b-form-group class="col" label="Ilość rat:" label-for="input-numberOfPayments">
            <b-form-input class="input-office-orange border-orange"
                          id="input-numberOfPayments"
                          v-model="fee.numberOfPayments"
                          required
                          type="number"
                          min="1"
                          max="100"
                          step="1"
                          :disabled="isEdit"
            ></b-form-input>
          </b-form-group>

          <!-- FEE AMOUNT -->
          <b-form-group class="col mr-1" label="Kwota raty:" label-for="input-amount">
            <b-form-input class="input-office-orange border-orange"
                          id="input-amount"
                          v-model="fee.amount"
                          :state="validationAmount"
                          placeholder=""
                          :formatter="commaToDotFormatter"
                          :disabled="isEdit"
                          required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationAmount">
              Kwota np: 1048.52 lub 3280
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <!-- ROW-8 ACCOUNT NUMBER-->
        <div class="row card-elem-office ">
          <b-form-group class="col" label="Nr kredytu:" label-for="input-accountNumber">
            <b-form-input class="input-office-orange border-orange"
                          id="input-accountNumber"
                          v-model="fee.accountNumber"
                          :state="validationAccountNumber"
                          placeholder=""
                          required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationAccountNumber">
              Nie może mieć więcej niż 50 znaków.
            </b-form-invalid-feedback>
          </b-form-group>
        </div>

        <!-- ROW-9 FIRST DATE-->
        <div class="row card-elem-office ">
          <b-form-group class="col" label="Data pierwszej raty:" label-for="input-firstDate">
            <b-form-input class="input-office-orange border-orange"
                          id="input-firstDate"
                          v-model="fee.firstPaymentDate"
                          type="date"
                          required
                          :disabled="isEdit"
            ></b-form-input>
          </b-form-group>
        </div>

        <!-- ROW-10 DESCRIPTION-->
        <div class="row card-elem-office">
          <b-form-group class="col" label="Opis:" label-for="input-description">
            <b-form-textarea class="input-office-orange border-orange"
                             id="input-description"
                             v-model="fee.otherInfo"
                             rows="3"
                             max-rows="6"
            ></b-form-textarea>

          </b-form-group>
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
        <template #footer></template>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
import {errorMixin} from "@/mixins/error";
import {feeMixin} from "@/mixins/fee";
import {userMixin} from "@/mixins/user";
import {firmMixin} from "@/mixins/firm";
import jwt_decode from "jwt-decode";
import {mapGetters} from "vuex";

export default {
  name: "finance-fee",
  mixins: [errorMixin, feeMixin, userMixin, firmMixin],
  data() {
    return {
      idFee: 0,
      isEdit: false,
      url: "",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      //user
      optionsUsers: [],

      optionsFirms: [],
      optionsFrequency: [],

      busyIcon: false,
      savedIcon: false,
      errorIcon: false,
      saveDisabled: false,
    };
  },
  mounted() {
    console.log("mounted TheLoan");
    this.isEdit = this.$route.params.isEdit;
    this.idFee = this.$route.params.idFee;
    this.getFeeIfEdit();
  },
  created() {
    console.log("created TheFee");
    this.fillOptions();
  },
  computed: {
    ...mapGetters(["getAuthenticationState", "getUserId", "getToken"]),
    getIdUser() {
      return jwt_decode(this.getUserId);
    },
    hasFeesAllAccess() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: ROLE_TASK_CALEDAR: " + token2.authorities.includes('ROLE_TASK_CALENDAR'))
        return (
            token2.authorities.includes("HR_FINANCE_FEE_WRITE_ALL") ||
            token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
    validationName() {
      return this.fee.name.length <= 100;
    },
    validationAmount() {
      return (
          this.fee.amount.length > 0 &&
          this.fee.amount.length <= 9 &&
          (/(^\d+\.\d{0,2}$)/.test(this.fee.amount) ||
              /^[0-9]+$/.test(this.fee.amount))
      );
    },

    validationFeeNumber() {
      return this.fee.feeNumber.length <= 50;
    },
    validationAccountNumber() {
      return this.fee.accountNumber.length <= 50;
    },
  },
  methods: {

    fillOptions() {
      console.log("START - fillOptions()");
      this.loadingUser = true;
      this.getUsersFromDb().then((response) => {
        // console.log(JSON.stringify(response.data));
        this.optionsUsers = this.convertToOptionsUsers(response.data);
        this.loadingUser = false;
      });
      this.loadingFirm = true;
      this.getFirmsFromDb().then((response) => {
        // console.log(JSON.stringify(response.data));
        this.optionsFirms = this.convertToOptionsFirm(response.data);
        this.loadingFirm = false;
      });
      this.loadingFrequency = true;
      this.getFrequencyFromDb().then((response) => {
        // console.log(JSON.stringify(response.data));
        this.optionsFrequency = this.convertToOptionsFrequency(response.data);
        this.loadingFrequency = false;
      });
      console.log("END - fillOptions()");
    },

    commaToDotFormatter(value) {
      // console.log("commaToDotFormater: " + value)
      if (value.includes(",")) {
        return value.replaceAll(",", ".");
      } else
        return value;
    },

    //
    //get fee if edit
    //
    getFeeIfEdit() {
      console.log("START - getFeeIfEdit()), ID = " + this.idFee);
      if (this.isEdit === true) {
        this.loadingFee = true;
        this.getFeeByIdFromDb(this.idFee).then((response) => {
          this.fee = response.data;
          // console.log(JSON.stringify(this.loan));
          this.loadingFee = false;
        });
        console.log("END - getFeeIfEdit()), ID = " + this.idFee);
      }
    },

    //
    //save fee
    //
    saveFee() {
      console.log("START - saveFee()");
      this.saveDisabled = true;
      this.changeStatusIcon(true, false, false);
      if (!this.validFee()) {
        this.changeStatusIcon(false, false, true);
        this.saveDisabled = false;
        this.displaySmallMessage("warning", "Niepoprawne dane.");
        setTimeout(() => this.changeStatusIcon(false, false, false), 5000);
      } else {
        this.fee.feeStatus = "TO_PAY";
        if (!this.hasFeesAllAccess) {
          this.fee.idUser = this.getUserId;
        }
        if (this.fee.id === 0 || this.fee.id == null) {
          this.addFeeDB(this.fee)
              .then((response) => {
                this.fee = response.data;
                this.displaySmallMessage("success", "Dodano opłatę.");
                // console.log(JSON.stringify(response.data));
                this.changeStatusIcon(false, true, false);
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.saveDisabled = false;
                //update store
                this.$store.commit("addFee", JSON.parse(JSON.stringify(this.fee)));
                this.cleanForm();
              })
              .catch((e) => {
                this.changeStatusIcon(false, false, true);
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.saveDisabled = false;
                this.validateError(e);
              });
        } else {
          this.updateFeeDB()
              .then((response) => {
                this.fee = response.data;
                this.displaySmallMessage("success", "Zaaktualizowano opłatę.");
                // console.log(JSON.stringify(response.data));
                this.changeStatusIcon(false, true, false);
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.saveDisabled = false;
                //update store
                this.$store.commit("editFee", JSON.parse(JSON.stringify(this.fee)));
              })
              .catch((e) => {
                this.changeStatusIcon(false, false, true);
                this.saveDisabled = false;
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.validateError(e);
              });
        }
        console.log("END - saveFee()");
      }
    },

    cleanForm() {
      console.log("START - cleanForm()");
      this.fee.id = 0;
      this.fee.firm.id = 0;
      this.fee.firm.name = "";
      this.fee.idUser = 0;
      this.fee.name = "";
      this.fee.feeNumber = "";
      this.fee.date = "";
      this.fee.feeFrequency = "";
      this.fee.numberOfPayments = "";
      this.fee.amount = "";
      this.fee.firstPaymentDate = "";
      this.fee.accountNumber = "";
      this.fee.feeStatus = "";
      this.fee.otherInfo = "";
      this.fee.installmentDtoList = [];
    },

    validFee() {
      return (
          this.validationAccountNumber &&
          this.validationAmount &&
          this.validationFeeNumber &&
          this.validationName
      );
    },

    changeStatusIcon(busy, saved, error) {
      console.log("START - changeStatusIcon(busy: " + busy + ", saved: " + saved + ", error: " + error + ")");
      this.busyIcon = busy;
      this.errorIcon = error;
      this.savedIcon = saved;
    },

  },
};
</script>

<style scoped>
@import "../../../assets/css/main.css";

#container {
  margin-top: 20px;
}
</style>