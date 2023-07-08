<template>
  <b-container fluid class="mb-5">

    <!-- --------------------------------- TABELA ---------------------------------- -->
    <!--    <b-row class="mt-5">-->
    <!--      <b-col>-->
    <b-card bg-variant="office-dark1"
            body-class="pb-0" header-bg-variant="office-dark2" footer-bg-variant="office-dark2">

      <template #header>
        <h3> {{ userName }} </h3>
      </template>
      <!--          :tbody-tr-class="rowClass"-->
<b-card-body style="overflow-x: auto;">

      <b-table  hover
          tbody-tr-class="text-office-orange table-row "
          :busy="isBusy"
          :items="paymentsCopy"
          :fields="fields"
          id="table"
          responsive="sm"
          thead-tr-class="bg-office text-office-orange table-head"
          @row-clicked="handleRowClicked"
      >

<!--        <template #head()="">-->
<!--          <div class="bg-office-dark1">-->
<!--          </div>-->
<!--        </template>-->

        <!-- ICON BUSY -->
        <template #table-busy>
          <div class="text-center text-office-orange  my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <template v-slot:cell(january)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.january),
                'installment-paid': isPaid(item.januaryDate),
              }"
          >
            {{ item.january }}
          </div>
        </template>
        <template v-slot:cell(february)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.february),
                'installment-paid': isPaid(item.februaryDate),
              }"
          >
            {{ item.february }}
          </div>
        </template>
        <template v-slot:cell(march)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.march),
                'installment-paid': isPaid(item.marchDate),
              }"
          >
           {{ item.march }}
          </div>
        </template>
        <template v-slot:cell(april)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.april),
                'installment-paid': isPaid(item.aprilDate),
              }"
          >
            {{ item.april }}
          </div>
        </template>
        <template v-slot:cell(may)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.may),
                'installment-paid': isPaid(item.mayDate),
              }"
          >
            {{ item.may }}
          </div>
        </template>
        <template v-slot:cell(june)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.june),
                'installment-paid': isPaid(item.juneDate),
              }"
          >
            {{ item.june }}
          </div>
        </template>
        <template v-slot:cell(july)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.july),
                'installment-paid': isPaid(item.julyDate),
              }"
          >
            {{ item.july }}
          </div>
        </template>
        <template v-slot:cell(august)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.august),
                'installment-paid': isPaid(item.augustDate),
              }"
          >
            {{ item.august }}
          </div>
        </template>
        <template v-slot:cell(september)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.september),
                'installment-paid': isPaid(item.septemberDate),
              }"
          >
            {{ item.september }}
          </div>
        </template>
        <template v-slot:cell(october)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.october),
                'installment-paid': isPaid(item.octoberDate),
              }"
          >
            {{ item.october }}
          </div>
        </template>
        <template v-slot:cell(november)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.november),
                'installment-paid': isPaid(item.novemberDate),
              }"
          >
            {{ item.november }}
          </div>
        </template>
        <template v-slot:cell(december)="{item}">
          <div
              :class="{
                'no-installment': isInstallment(item.december),
                'installment-paid': isPaid(item.decemberDate),
              }"
          >
            {{ item.december }}
          </div>
        </template>
      </b-table>
</b-card-body>

    </b-card>

    <!-- MODAL PAYMENT DETAILS  -->
    <b-modal ref="paymentModal"
             headerBgVariant="office-dark1"
             header-border-variant="orange"
             headerClass="text-office-orange d-flex justify-content-center"
             size="xl"
             bodyBgVariant="office-dark2"
             bodyClass="text-office-orange"

             footerBgVariant="office-dark1"
             footerClass="p-2"
             footer-border-variant="orange">
      <template #modal-header>
        <h2>{{paymentType===`LOAN` ? 'SZCZEGÓŁY KREDYTU' : 'SZCZEGÓŁY OPŁATY' }}</h2>
      </template>
      <LoanPayment :id="idSelected" :id-user="idUser" ref="loanPayment" v-if="paymentType===`LOAN`"/>
      <FeePayment :id="idSelected" :id-user="idUser" ref="feePayment" v-else/>
      <template #modal-footer>
        <div class="row justify-content-around justify-content-md-end">
          <b-button class="edit-button mr-2" variant="office" @click="closeModal">Zamknij</b-button>
        </div>
      </template>
    </b-modal>

    <!-- MODAL PAY LOAN-->
    <b-modal :id="'payModalLoan' + idUser" centered @show="fillPayment"
             headerBgVariant="office-dark1"
             header-border-variant="orange"
             headerClass="text-office-orange d-flex justify-content-center"
             size="lg"
             bodyBgVariant="office-dark2"
             bodyClass="text-office-orange"

             footerBgVariant="office-dark1"
             footerClass="p-2"
             footer-border-variant="orange">
      <template #modal-header>
        <h3>PŁATNOŚĆ</h3>
      </template>
          <b-card-group deck>
            <b-card header-tag="header" footer-tag="footer"  bg-variant="dark" >
              <template #header>
                <h4 class="mb-0 text-progas">Do zapłaty</h4>
              </template>
              <p class="mb-1"><small>Rata nr:</small> {{ installmentCopy.installmentNumber }}</p>
              <p class="mb-1"><small>Termin płatności:</small> {{ installmentCopy.paymentDeadline }}</p>
              <p class="mb-1"><small>Kwota do zapłaty:</small> {{ installmentCopy.installmentAmountToPay }}</p>
            </b-card>

            <b-card header-tag="header" footer-tag="footer"  bg-variant="dark" >
              <template #header>
                <h4 class="mb-0">Zapłacono</h4>
              </template>
              <b-form-group class="col" label="Data płatności:" label-for="input-date">
                <b-form-input class="input-office border-orange"
                              id="input-date"
                              v-model="installmentCopy.paymentDate"
                              type="date"
                              required
                ></b-form-input>
              </b-form-group>
              <b-form-group class="col" label="Kwota zapłacona:" label-for="input-amount">
                <b-form-input
                    id="input-amount"
                    v-model="installmentCopy.installmentAmountPaid"
                    :state="validationAmount"
                    placeholder=""
                    :formatter="commaToDotFormatter"
                    required
                ></b-form-input>
                <b-form-invalid-feedback :state="validationAmount">
                  Kwota np: 1048.52 lub 3280
                </b-form-invalid-feedback>
              </b-form-group>
            </b-card>
          </b-card-group>
      <template #modal-footer>
        <div class="row justify-content-around justify-content-md-end">
          <b-button class="edit-button mr-2" variant="office" @click="cancelEditLoan">Anuluj</b-button>
          <b-button class="edit-button mr-2" variant="office-save" @click="saveLoanPayment" :disabled="!validPayment">Zapisz</b-button>
        </div>
      </template>
    </b-modal>

    <!-- MODAL PAY FEE-->
    <b-modal :id="'payModalFee' + idUser" centered @show="fillPayment"
             headerBgVariant="office-dark1"
             header-border-variant="orange"
             headerClass="text-office-orange d-flex justify-content-center"
             size="lg"
             bodyBgVariant="office-dark2"
             bodyClass="text-office-orange"

             footerBgVariant="office-dark1"
             footerClass="p-2"
             footer-border-variant="orange">
      <template #modal-header>
        <h3>PŁATNOŚĆ</h3>
      </template>
      <b-card-group deck>
        <b-card header-tag="header" footer-tag="footer"  bg-variant="dark" >
          <template #header>
            <h4 class="mb-0 text-progas">Do zapłaty</h4>
          </template>
          <p class="mb-1"><small>Termin płatności:</small> {{ installmentCopy.paymentDeadline }}</p>
          <p class="mb-1"><small>Kwota do zapłaty:</small> {{ installmentCopy.installmentAmountToPay }}</p>
        </b-card>

        <b-card header-tag="header" footer-tag="footer"  bg-variant="dark" >
          <template #header>
            <h4 class="mb-0">Zapłacono</h4>
          </template>
          <b-form-group class="col" label="Data płatności:" label-for="input-date">
            <b-form-input class="input-office border-orange"
                          id="input-date"
                          v-model="installmentCopy.paymentDate"
                          type="date"
                          required
            ></b-form-input>
          </b-form-group>
          <b-form-group class="col" label="Kwota zapłacona:" label-for="input-amount">
            <b-form-input
                id="input-amount"
                v-model="installmentCopy.installmentAmountPaid"
                :state="validationAmount"
                placeholder=""
                :formatter="commaToDotFormatter"
                required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationAmount">
              Kwota np: 1048.52 lub 3280
            </b-form-invalid-feedback>
          </b-form-group>
        </b-card>
      </b-card-group>
      <template #modal-footer>
        <div class="row justify-content-around justify-content-md-end">
          <b-button class="edit-button mr-2" variant="office" @click="cancelEditFee">Anuluj</b-button>
          <b-button class="edit-button mr-2" variant="office-save" @click="saveFeePayment" :disabled="!validPayment">Zapisz</b-button>
        </div>
      </template>
    </b-modal>

  </b-container>
</template>
<script>
import moment from "moment";
import {userMixin} from "@/mixins/user";
import {errorMixin} from "@/mixins/error";
import {loanMixin} from "@/mixins/loan";
import LoanPayment from "@/components/finance/payment/LoanPayment";
import FeePayment from "@/components/finance/payment/FeePayment";
import {feeMixin} from "@/mixins/fee";

export default {
  name: "finance-payment-card",
  components: { LoanPayment, FeePayment },
  mixins: [errorMixin, userMixin, loanMixin, feeMixin],
  data() {
    return {

      idSelected: 0,
      userName: "",
      paymentType: "",
      isBusy: false,
      fields: [
        {
          key: "name",
          label: "Nazwa",
          sortable: true,
          stickyColumn: true,
          // isRowHeader: true,
          variant: "office"
        },
        {
          key: "day",
          label: "Dzień płat.",
          // sortable: true,
          // stickyColumn: true,
        },
        {
          key: "january",
          label: "Styczeń",
        },
        {
          key: "januaryDate",
          label: "Data zapł.",
        },
        {
          key: "february",
          label: "Luty",
        },
        {
          key: "februaryDate",
          label: "Data zapł.",
        },
        {
          key: "march",
          label: "Marzec",
        },
        {
          key: "marchDate",
          label: "Data zapł.",
        },
        {
          key: "april",
          label: "Kwiecień",
        },
        {
          key: "aprilDate",
          label: "Data zapł.",
        },
        {
          key: "may",
          label: "Maj",
        },
        {
          key: "mayDate",
          label: "Data zapł.",
        },
        {
          key: "june",
          label: "Czerwiec",
        },
        {
          key: "juneDate",
          label: "Data zapł.",
        },
        {
          key: "july",
          label: "Lipiec",
        },
        {
          key: "julyDate",
          label: "Data zapł.",
        },
        {
          key: "august",
          label: "Sierpień",
        },
        {
          key: "augustDate",
          label: "Data zapł.",
        },
        {
          key: "september",
          label: "Wrzesień",
        },
        {
          key: "septemberDate",
          label: "Data zapł.",
        },
        {
          key: "october",
          label: "Październik",
        },
        {
          key: "octoberDate",
          label: "Data zapł.",
        }, {
          key: "november",
          label: "Listopad",
        },
        {
          key: "novemberDate",
          label: "Data zapł.",
        }, {
          key: "december",
          label: "Grudzień",
        },
        {
          key: "decemberDate",
          label: "Data zapł.",
        },
      ],
      paymentsCopy: [],

      rowItem: {
        id:0,
        paymentType:"",
        name: "",
        day: 0,
        january: "",
        januaryDate: "",
        february: "",
        februaryDate: "",
        march: "",
        marchDate: "",
        april: "",
        aprilDate: "",
        may: "",
        mayDate: "",
        june: "",
        juneDate: "",
        july: "",
        julyDate: "",
        august: "",
        augustDate: "",
        september: "",
        septemberDate: "",
        october: "",
        octoberDate: "",
        november: "",
        novemberDate: "",
        december: "",
        decemberDate: "",
      },

      //payModal
      installmentCopy:{},
      payment:{},
      amount:"",
      date:""
    }
  },
  props: {
    idUser: String,
    payments: [],
    year: Number
  },
    mounted() {
      console.log("mounted payment-card");
      this.changeColorIfNoInstallment();
      this.changeColorIfInstallmentPaid();
    },
    created() {
      console.log("created payment-card");
      this.createRows();
      this.getUserName();
    },
    computed: {
      validPayment() {
        return (
            this.validationAmount
        );
      },
      validationAmount() {
        return (
            this.installmentCopy.installmentAmountPaid?.length > 0 &&
            this.installmentCopy.installmentAmountPaid?.length <= 7 &&
            (/(^\d+\.\d{0,2}$)/.test(this.installmentCopy.installmentAmountPaid) ||
                /^[0-9]+$/.test(this.installmentCopy.installmentAmountPaid))
        );
      },
    },
    methods: {
      changeRefresh() {
        console.log("REFRESH ThePayment")
        this.$store.commit("updateRefresh", Math.random());
      },

      getUserName() {
        this.getUserFromDb(this.idUser).then(user => {
          this.userName = user.firstName + " " + user.lastName;
        })
      },
      commaToDotFormatter(value) {
        console.log("commaToDotFormater: " + value)
        if (value.includes(",")) {
          return value.replaceAll(",", ".");
        } else
          return value;
      },
      handleRowClicked(item, index, event) {
        console.log("Clicked row:", item); // Kliknięty wiersz
        console.log("idPayment:", item.id); // Kliknięty wiersz
        console.log("paymentType:", item.paymentType); // Kliknięty wiersz
        console.log("Index:", index); // Indeks klikniętego wiersza
        console.log("Event:", event); // Obiekt zdarzenia kliknięcia
        this.idSelected = item.id;
        this.paymentType=item.paymentType;
        this.$refs["paymentModal"].show();
      },

      changeColorIfNoInstallment() {
        console.log("changeColorIfNoInstallment()")
        let nodes = document.querySelectorAll('.installment-paid');
        // console.log(nodes);
        for (const node of nodes) {
          //change color for MONTH
          node.parentNode.style.backgroundColor = "green";
        }
      },
      changeColorIfInstallmentPaid() {
        console.log("changeColorIfInstallmentPaid()")
        let nodes = document.querySelectorAll('.no-installment');
        // console.log(nodes);
        for (const element of nodes) {
          const node = element;
          //change color for MONTH
          node.parentNode.style.backgroundColor = "red";
          ////and MONTH_DATE
          node.parentNode.nextElementSibling.style.backgroundColor = "red";
        }
      },
      isInstallment(value) {
        // console.log("isInstallment(value): ",value)
        return !value;
      },

      isPaid(value) {
        // console.log("isPaid(value): ",value)
        return value;
      },

      createRows() {
        console.log("createRows()");
        let tempPayment = this.payments.toSorted((a, b) => a.paymentDay - b.paymentDay);
        console.log(tempPayment);
          tempPayment.forEach(item => {
          this.rowItem.id = item.id;
          this.rowItem.paymentType = item.paymentType;
          this.rowItem.name = item.name;
          this.rowItem.day = item.paymentDay;
          this.rowItem.january = this.calculateAmount(item.installments, 1);
          this.rowItem.januaryDate = this.calculateDate(item.installments, 1);
          this.rowItem.february = this.calculateAmount(item.installments, 2);
          this.rowItem.februaryDate = this.calculateDate(item.installments, 2);
          this.rowItem.march = this.calculateAmount(item.installments, 3);
          this.rowItem.marchDate = this.calculateDate(item.installments, 3);
          this.rowItem.april = this.calculateAmount(item.installments, 4);
          this.rowItem.aprilDate = this.calculateDate(item.installments, 4);
          this.rowItem.may = this.calculateAmount(item.installments, 5);
          this.rowItem.mayDate = this.calculateDate(item.installments, 5);
          this.rowItem.june = this.calculateAmount(item.installments, 6);
          this.rowItem.juneDate = this.calculateDate(item.installments, 6);
          this.rowItem.july = this.calculateAmount(item.installments, 7);
          this.rowItem.julyDate = this.calculateDate(item.installments, 7);
          this.rowItem.august = this.calculateAmount(item.installments, 8);
          this.rowItem.augustDate = this.calculateDate(item.installments, 8);
          this.rowItem.september = this.calculateAmount(item.installments, 9);
          this.rowItem.septemberDate = this.calculateDate(item.installments, 9);
          this.rowItem.october = this.calculateAmount(item.installments, 10);
          this.rowItem.octoberDate = this.calculateDate(item.installments, 10);
          this.rowItem.november = this.calculateAmount(item.installments, 11);
          this.rowItem.novemberDate = this.calculateDate(item.installments, 11);
          this.rowItem.december = this.calculateAmount(item.installments, 12);
          this.rowItem.decemberDate = this.calculateDate(item.installments, 12);

          // console.log("rowitem: ", (JSON.stringify(this.rowItem)));
          this.paymentsCopy.push(JSON.parse(JSON.stringify(this.rowItem)));
        })
      },

      calculateAmount(installments, month) {
        // console.log("calculateAmount()", month);
        let installment = installments.find(pay => parseInt(moment(pay.paymentDeadline).format("yyyy")) === this.year && parseInt(moment(pay.paymentDeadline).format("M")) === month);
        return installment === undefined ? "" : +installment.installmentAmountPaid === 0 ? installment.installmentAmountToPay : installment.installmentAmountPaid;
      },
      calculateDate(installments, month) {
        // console.log("calculateDate()", month);
        let installment = installments.find(pay => parseInt(moment(pay.paymentDeadline).format("yyyy")) === this.year && parseInt(moment(pay.paymentDeadline).format("M")) === month);
        return installment === undefined ? "" : installment.paymentDate === "0001-01-01" ? "" : installment.paymentDate;
      },
      closeModal() {
        //REFRESH
        this.$store.commit("updateRefresh", Math.random());
        this.$refs["loanPaymentModal"].hide();
      },

      //-----------------------MODAL PAY---------------------------------------------
      //
      //add payment
      //
      async saveLoanPayment() {
        console.log("START - savePayment ()");
        this.installmentCopy.paymentStatus = "PAID"
        console.log("payDate przed save EDIT", this.installmentCopy);
        await this.updateLoanInstallmentStatusDb(this.installmentCopy).then((response) => {
          console.log("After save EDIT: ", JSON.stringify(response.data));
          this.$store.commit("updateLoanPayment", response.data);
          this.displaySmallMessage("success", "Zapłacono ratę.");
        });
        this.cancelEditLoan();
      },

      async saveFeePayment() {
        console.log("START - saveFeePayment ()");
        this.installmentCopy.paymentStatus = "PAID"
        console.log("payDate przed save EDIT", this.installmentCopy);
        await this.updateFeeInstallmentStatusDb(this.installmentCopy).then((response) => {
          console.log("After save EDIT: ", JSON.stringify(response.data));
          this.$store.commit("updateFeePayment", response.data);
          this.displaySmallMessage("success", "Zapłacono opłatę.");
        });
        this.cancelEditFee();
      },

      fillPayment() {
        this.installmentCopy = JSON.parse(JSON.stringify(this.$store.getters.getInstallment));
        console.log("payDate przed", this.installmentCopy.paymentDate);
        if (this.installmentCopy.paymentDate === "0001-01-01" || this.installmentCopy.paymentDate === "") {
          this.installmentCopy.paymentDate = moment().format("YYYY-MM-DD");
          this.installmentCopy.installmentAmountPaid = this.installmentCopy.installmentAmountToPay;
        }
        console.log("payDate po", this.installmentCopy);
      },

      cancelEditLoan() {
        console.log("cancelEditLoan()");
        this.$bvModal.hide('payModalLoan' + this.idUser);
        //refresh installment list in loanPaymentModal
        const nestedLoanPayment = this.$refs.loanPayment;
        nestedLoanPayment.getLoan();
      },

      cancelEditFee() {
        console.log("cancelEditFee()");
        this.$bvModal.hide('payModalFee' + this.idUser);
        //refresh installment list in loanPaymentModal
        const nestedLoanPayment = this.$refs.feePayment;
        nestedLoanPayment.getFee();
      },

    }
  };
</script>

<style scoped>
@import "../../../assets/css/main.css";
.installment-paid {
  color: black;
  /*background-color: #2da687  !important;*/
}

.no-installment {
  /*color: white;*/
  /*background-color: rgb(241, 63, 14) !important;*/
  /*background-color: #dc3545 !important;*/
}
</style>