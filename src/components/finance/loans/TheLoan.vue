<template>
  <b-container id="container">

    <b-card class="text-office-orange"
            :title="isEdit ? 'EDYCJA KREDYTU':'NOWY KREDYT'"
            bg-variant="office-dark1"
    >
      <b-button
          v-show="loadingLoan"
          style="height: fit-content"
          variant="office"
          class="ml-3"
          disabled
      >
        <b-spinner small></b-spinner>
        <span class="sr-only">Loading...</span>
      </b-button>
      <b-form @submit.stop.prevent="saveLoan" autocomplete="off">
            <!-- ROW-1 NAME-->
            <div class="row card-elem-office ">
              <b-form-group class="col" label="Nazwa:" label-for="input-loanName">
                <b-form-input class="input-office-orange border-orange"
                              id="input-loanName"
                              v-model="loan.name"
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
            <div class="row card-elem-office " v-if="hasLoansAllAccess">
              <b-form-group class="col" label="Użytkownik:" label-for="input-user">
                <div style="display: flex">
                <b-form-select class="input-office-orange border-orange"
                              id="input-user"
                               v-model="loan.idUser"
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

            <!-- ROW-3  BANK -->
            <div class="row card-elem-office   ">
              <b-form-group class="col" label="Bank:" label-for="input-bank">
                <div style="display: flex">
                  <b-form-select class="input-office-orange border-orange"
                                 id="input-bank"
                                 v-model="loan.bank.id"
                                 :options="optionsBanks"
                                 required
                  ></b-form-select>
                  <b-button
                      v-if="loadingBank"
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

            <!-- ROW-4 LOAN NUMBER-->
            <div class="row card-elem-office ">
              <b-form-group class="col" label="Nr kredytu:" label-for="input-loanNumber">
                <b-form-input class="input-office-orange border-orange"
                              id="input-loanNumber"
                              v-model="loan.loanNumber"
                              :state="validationLoanNumber"
                              placeholder=""
                              required
                ></b-form-input>
                <b-form-invalid-feedback :state="validationLoanNumber">
                  Nie może mieć więcej niż 50 znaków.
                </b-form-invalid-feedback>
              </b-form-group>
            </div>

            <!-- ROW-5 LOAN DATE-->
            <div class="row card-elem-office ">
              <b-form-group class="col" label="Z dnia:" label-for="input-loanDate">
                <b-form-input class="input-office-orange border-orange"
                              id="input-loanDate"
                              v-model="loan.date"
                              type="date"
                              required
                ></b-form-input>
              </b-form-group>
            </div>

            <!-- ROW-6 -->
            <div class="row card-elem-office" >
              <!-- LOAN AMOUNT -->
              <b-form-group class="col mr-1" label="Kwota kredytu:" label-for="input-amount">
                <b-form-input class="input-office-orange border-orange"
                              id="input-amount"
                              v-model="loan.amount"
                              :state="validationAmount"
                              placeholder=""
                              :formatter="commaToDotFormatter"
                              required
                ></b-form-input>
                <b-form-invalid-feedback :state="validationAmount">
                  Kwota np: 1048.52 lub 3280
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- LOAN COST -->
              <b-form-group class="col mr-1" label="Koszt kredytu:" label-for="input-cost"
              description="marża, prowizja...">
                <b-form-input class="input-office-orange border-orange"
                              id="input-cost"
                              v-model="loan.loanCost"
                              :state="validationCost"
                              placeholder=""
                              :formatter="commaToDotFormatter"
                              required

                ></b-form-input>
                <b-form-invalid-feedback :state="validationCost">
                  Kwota np: 1048.52 lub 3280
                </b-form-invalid-feedback>
              </b-form-group>
            </div>

            <!-- ROW-7 -->
            <div class="row card-elem-office">
              <!-- NUMBER OF INSTALLMENTS -->
              <b-form-group class="col" label="Ilość rat:" label-for="input-numberOfInstallment">
                <b-form-input class="input-office-orange border-orange"
                              id="input-numberOfInstallment"
                              v-model="loan.numberOfInstallments"
                              required
                              type="number"
                              min="1"
                              max="100"
                              step="1"
                              :disabled="isEdit"
                ></b-form-input>
              </b-form-group>

              <!-- INSTALLMENT AMOUNT -->
              <b-form-group class="col mr-1" label="Kwota raty:" label-for="input-amountToPay">
                <b-form-input class="input-office-orange border-orange"
                              id="input-amountToPay"
                              v-model="loan.installmentAmount"
                              :state="validationInstallmentAmount"
                              placeholder=""
                              :formatter="commaToDotFormatter"
                              :disabled="isEdit"
                              required
                ></b-form-input>
                <b-form-invalid-feedback :state="validationInstallmentAmount">
                  Kwota np: 1048.52 lub 3280
                </b-form-invalid-feedback>
              </b-form-group>
            </div>

            <!-- ROW-8 ACCOUNT NUMBER-->
            <div class="row card-elem-office ">
              <b-form-group class="col" label="Nr kredytu:" label-for="input-accountNumber">
                <b-form-input class="input-office-orange border-orange"
                              id="input-accountNumber"
                              v-model="loan.accountNumber"
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
                              v-model="loan.firstPaymentDate"
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
                                 v-model="loan.otherInfo"
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
import {loanMixin} from "@/mixins/loan";
import {userMixin} from "@/mixins/user";
import {bankMixin} from "@/mixins/bank";
import jwt_decode from "jwt-decode";
import {mapGetters} from "vuex";

export default {
  name: "finance-loan",
  mixins: [errorMixin, loanMixin, userMixin, bankMixin],
  data() {
    return {
      idLoan: 0,
      isEdit: false,
      url: "",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

      //user
      optionsUsers: [],
      // selectedUser:0,

      //bank
      optionsBanks:[],

      busyIcon: false,
      savedIcon: false,
      errorIcon: false,
      saveDisabled: false,
    };
  },
  mounted() {
    console.log("mounted TheLoan");
    this.isEdit = this.$route.params.isEdit;
    this.idLoan = this.$route.params.idLoan;
    this.getLoanIfEdit();
  },
  created() {
    console.log("created TheLoan");
    this.fillOptions();
  },
  computed: {
    ...mapGetters(["getAuthenticationState", "getUserId", "getToken"]),
    getIdUser(){
        return  jwt_decode(this.getUserId);
      },
    hasLoansAllAccess() {
      try {
        let token2 = jwt_decode(this.getToken);
        console.log("token: ROLE_TASK_CALEDAR: " + token2.authorities.includes('ROLE_TASK_CALENDAR'))
        return (
            token2.authorities.includes("HR_FINANCE_LOAN_WRITE_ALL") ||
            token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
    validationName() {
      return this.loan.name.length <= 100;
    },
    validationAmount() {
      return (
          this.loan.amount.length > 0 &&
          this.loan.amount.length <= 9 &&
          (/(^\d+\.\d{0,2}$)/.test(this.loan.amount) ||
              /^[0-9]+$/.test(this.loan.amount))
      );
    },
    validationCost() {
      return (
          this.loan.loanCost.length > 0 &&
          this.loan.loanCost.length <= 7 &&
          (/(^\d+\.\d{0,2}$)/.test(this.loan.loanCost) ||
              /^[0-9]+$/.test(this.loan.loanCost))
      );
    },
    validationInstallmentAmount() {
      return (
          this.loan.installmentAmount.length > 0 &&
          this.loan.installmentAmount.length <= 7 &&
          (/(^\d+\.\d{0,2}$)/.test(this.loan.installmentAmount) ||
              /^[0-9]+$/.test(this.loan.installmentAmount))
      );
    },
    validationLoanNumber() {
      return this.loan.loanNumber.length <= 50;
    },
    validationAccountNumber() {
      return this.loan.accountNumber.length <= 50;
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
      this.loadingBank = true;
      this.getBanksFromDb().then((response) => {
        // console.log(JSON.stringify(response.data));
        this.optionsBanks = this.convertToOptionsBank(response.data);
        this.loadingBank = false;
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
    //get loan if edit
    //
    getLoanIfEdit() {
      console.log("START - getLoanIfEdit()), ID = " + this.idLoan);
      if (this.isEdit === true) {
        this.loadingLoan = true;
        this.getLoanByIdFromDb(this.idLoan).then((response) => {
          this.loan = response.data;
          // console.log(JSON.stringify(this.loan));
          this.loadingLoan = false;
        });
        console.log("END - getLoanIfEdit()), ID = " + this.idLoan);
      }
    },

    //
    //save loan
    //
    saveLoan() {
      console.log("START - saveLoan()");
      this.saveDisabled = true;
      this.changeStatusIcon(true, false, false);
      if (!this.validLoan()) {
        this.changeStatusIcon(false, false, true);
        this.saveDisabled = false;
        this.displaySmallMessage("warning", "Niepoprawne dane.");
        setTimeout(() => this.changeStatusIcon(false, false, false), 5000);
      } else {
        this.loan.loanStatus="TO_PAY";
        if(!this.hasLoansAllAccess){
          this.loan.idUser = this.getUserId;
        }
        if (this.loan.id === 0 || this.loan.id == null) {
          this.addLoanDB(this.loan)
              .then((response) => {
                this.loan = response.data;
                this.displaySmallMessage("success", "Dodano kredyt.");
                // console.log(JSON.stringify(response.data));
                this.changeStatusIcon(false, true, false);
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.saveDisabled = false;
                //update store
                this.$store.commit("addLoan", JSON.parse(JSON.stringify(this.loan)));
                this.cleanForm();
              })
              .catch((e) => {
                this.changeStatusIcon(false, false, true);
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.saveDisabled = false;
                this.validateError(e);
              });
        } else {
          this.updateLoanDB()
              .then((response) => {
                this.loan = response.data;
                this.displaySmallMessage("success", "Zaaktualizowano kredyt.");
                // console.log(JSON.stringify(response.data));
                this.changeStatusIcon(false, true, false);
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.saveDisabled = false;
                //update store
                this.$store.commit("editLoan", JSON.parse(JSON.stringify(this.loan)));
              })
              .catch((e) => {
                this.changeStatusIcon(false, false, true);
                this.saveDisabled = false;
                setTimeout(() => this.changeStatusIcon(false, false, false), 10000);
                this.validateError(e);
              });
        }
        console.log("END - saveLoan()");
      }
    },

    cleanForm() {
      console.log("START - cleanForm()");
      this.loan.id = 0;
      this.loan.bank.id = 0;
      this.loan.bank.name = "";
      this.loan.idUser = 0;
      this.loan.name = "";
      this.loan.amount = "";
      this.loan.date = "";
      this.loan.loanNumber = "";
      this.loan.accountNumber = "";
      this.loan.firstPaymentDate = "";
      this.loan.numberOfInstallments = "";
      this.loan.installmentAmount = "";
      this.loan.loanStatus = "";
      this.loan.loanCost = "";
      this.loan.otherInfo = "";
      this.loan.installmentDtoList = [];
      this.loan.amountToPay = "";
    },

    validLoan() {
      return (
          this.validationAccountNumber &&
          this.validationAmount &&
          this.validationInstallmentAmount &&
          this.validationCost &&
          this.validationLoanNumber &&
          this.validationName
      );
    },

    changeStatusIcon(busy, saved, error) {
      console.log("START - changeStatusIcon(busy: "+busy+", saved: "+saved+", error: "+error+")");
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