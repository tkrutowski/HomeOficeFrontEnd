<template>
  <b-container fluid class="mb-5">

    <!-- --------------------------------- TABELA ---------------------------------- -->
    <b-card bg-variant="office-dark1"
            body-class="pb-0" header-bg-variant="office-dark2" footer-bg-variant="office-dark2">

      <template #header>
        <h3> {{ userName }} </h3>
      </template>
      <!--          tbody-tr-class="text-office-orange table-row "-->
      <b-card-body style="overflow-x: auto;">

        <b-table
            :tbody-tr-class="rowClass"
            :busy="isBusy"
            :items="paymentsCopy"
            :fields="fields"
            id="table"
            responsive="sm"
            thead-tr-class="bg-office text-office-orange table-head"
            @row-dblclicked="handleRowClicked"
        >

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
                'no-installment': isInstallment(item.paymentType, item.january),
                'installment-paid': isPaid(item.paymentType, item.januaryDate),
              }"
            >
              {{ item.january }}
            </div>
          </template>
          <template v-slot:cell(february)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.february),
                'installment-paid': isPaid(item.paymentType, item.februaryDate),
              }"
            >
              {{ item.february }}
            </div>
          </template>
          <template v-slot:cell(march)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.march),
                'installment-paid': isPaid(item.paymentType, item.marchDate),
              }"
            >
              {{ item.march }}
            </div>
          </template>
          <template v-slot:cell(april)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.april),
                'installment-paid': isPaid(item.paymentType, item.aprilDate),
              }"
            >
              {{ item.april }}
            </div>
          </template>
          <template v-slot:cell(may)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.may),
                'installment-paid': isPaid(item.paymentType, item.mayDate),
              }"
            >
              {{ item.may }}
            </div>
          </template>
          <template v-slot:cell(june)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.june),
                'installment-paid': isPaid(item.paymentType, item.juneDate),
              }"
            >
              {{ item.june }}
            </div>
          </template>
          <template v-slot:cell(july)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.july),
                'installment-paid': isPaid(item.paymentType, item.julyDate),
              }"
            >
              {{ item.july }}
            </div>
          </template>
          <template v-slot:cell(august)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.august),
                'installment-paid': isPaid(item.paymentType, item.augustDate),
              }"
            >
              {{ item.august }}
            </div>
          </template>
          <template v-slot:cell(september)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.september),
                'installment-paid': isPaid(item.paymentType, item.septemberDate),
              }"
            >
              {{ item.september }}
            </div>
          </template>
          <template v-slot:cell(october)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.october),
                'installment-paid': isPaid(item.paymentType, item.octoberDate),
              }"
            >
              {{ item.october }}
            </div>
          </template>
          <template v-slot:cell(november)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.november),
                'installment-paid': isPaid(item.paymentType, item.novemberDate),
              }"
            >
              {{ item.november }}
            </div>
          </template>
          <template v-slot:cell(december)="{item}">
            <div
                :class="{
                'no-installment': isInstallment(item.paymentType, item.december),
                'installment-paid': isPaid(item.paymentType, item.decemberDate),
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
        <h2>{{ paymentType === `LOAN` ? 'SZCZEGÓŁY KREDYTU' : 'SZCZEGÓŁY OPŁATY' }}</h2>
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
        <b-card header-tag="header" footer-tag="footer" bg-variant="dark">
          <template #header>
            <h4 class="mb-0 text-progas">Do zapłaty</h4>
          </template>
          <p class="mb-1"><small>Rata nr:</small> {{ installmentCopy.installmentNumber }}</p>
          <p class="mb-1"><small>Termin płatności:</small> {{ installmentCopy.paymentDeadline }}</p>
          <p class="mb-1"><small>Kwota do zapłaty:</small> {{ installmentCopy.installmentAmountToPay }}</p>
        </b-card>

        <b-card header-tag="header" footer-tag="footer" bg-variant="dark">
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
          <b-button class="edit-button mr-2" variant="office-save" @click="saveLoanPayment" :disabled="!validPayment">
            Zapisz
          </b-button>
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
        <b-card header-tag="header" footer-tag="footer" bg-variant="dark">
          <template #header>
            <h4 class="mb-0 text-progas">Do zapłaty</h4>
          </template>
          <p class="mb-1"><small>Termin płatności:</small> {{ installmentCopy.paymentDeadline }}</p>
          <p class="mb-1"><small>Kwota do zapłaty:</small> {{ installmentCopy.installmentAmountToPay }}</p>
        </b-card>

        <b-card header-tag="header" footer-tag="footer" bg-variant="dark">
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
          <b-button class="edit-button mr-2" variant="office-save" @click="saveFeePayment" :disabled="!validPayment">
            Zapisz
          </b-button>
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
  components: {LoanPayment, FeePayment},
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
          // sortable: true,
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

      januaryTotal: 0,
      februaryTotal: 0,
      marchTotal: 0,
      aprilTotal: 0,
      mayTotal: 0,
      juneTotal: 0,
      julyTotal: 0,
      augustTotal: 0,
      septemberTotal: 0,
      octoberTotal: 0,
      novemberTotal: 0,
      decemberTotal: 0,

      januaryToPay: 0,
      februaryToPay: 0,
      marchToPay: 0,
      aprilToPay: 0,
      mayToPay: 0,
      juneToPay: 0,
      julyToPay: 0,
      augustToPay: 0,
      septemberToPay: 0,
      octoberToPay: 0,
      novemberToPay: 0,
      decemberToPay: 0,

      januaryPaid: 0,
      februaryPaid: 0,
      marchPaid: 0,
      aprilPaid: 0,
      mayPaid: 0,
      junePaid: 0,
      julyPaid: 0,
      augustPaid: 0,
      septemberPaid: 0,
      octoberPaid: 0,
      novemberPaid: 0,
      decemberPaid: 0,

      // rowItem: {
      //   id:0,
      //   paymentType:"",
      //   name: "",
      //   day: 0,
      //   january: "",
      //   januaryDate: "",
      //   february: "",
      //   februaryDate: "",
      //   march: "",
      //   marchDate: "",
      //   april: "",
      //   aprilDate: "",
      //   may: "",
      //   mayDate: "",
      //   june: "",
      //   juneDate: "",
      //   july: "",
      //   julyDate: "",
      //   august: "",
      //   augustDate: "",
      //   september: "",
      //   septemberDate: "",
      //   october: "",
      //   octoberDate: "",
      //   november: "",
      //   novemberDate: "",
      //   december: "",
      //   decemberDate: "",
      // },

      //payModal
      installmentCopy: {},
      payment: {},
      amount: "",
      date: ""
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
    this.getUserName();
    this.createRows();
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
    rowClass(item) {
      // console.log('type: ', type)
      if (!item) return;
      if (item.paymentType === 'TOTAL') {
        return 'text-gray table-row bg-office-orange';
      } else {
        return 'text-office-orange table-row ';
      }
    },

    changeRefresh() {
      console.log("REFRESH ThePayment")
      this.$store.commit("updateRefresh", Math.random());
    },

    getUserName() {
      console.log("START - getUserName()")
      this.getUserFromDb(this.idUser).then(user => {
        this.userName = user.firstName + " " + user.lastName;
        console.log("END - getUserName()")
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
      if (!item.paymentType.startsWith('TOTAL')) {
        this.idSelected = item.id;
        this.paymentType = item.paymentType;
        this.$refs["paymentModal"].show();
      }
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
    isInstallment(type, value) {
      // console.log("isInstallment(value): ",value)
      return !value && !type.startsWith('TOTAL');
    },

    isPaid(type, value) {
      // console.log("isPaid(value): ",value)
      return value && !type.startsWith('TOTAL');
    },

    createRows() {
      console.log("START - createRows()");
      let tempPayment = this.payments.toSorted((a, b) => a.paymentDay - b.paymentDay);
      console.log(tempPayment);
      tempPayment.forEach(item => {
        let row = {};
        row.id = item.id;
        row.paymentType = item.paymentType;
        row.name = item.name;
        row.day = item.paymentDay;
        row.january = this.calculateAmount(item.installments, 1);
        row.januaryDate = this.calculateDate(item.installments, 1);
        row.february = this.calculateAmount(item.installments, 2);
        row.februaryDate = this.calculateDate(item.installments, 2);
        row.march = this.calculateAmount(item.installments, 3);
        row.marchDate = this.calculateDate(item.installments, 3);
        row.april = this.calculateAmount(item.installments, 4);
        row.aprilDate = this.calculateDate(item.installments, 4);
        row.may = this.calculateAmount(item.installments, 5);
        row.mayDate = this.calculateDate(item.installments, 5);
        row.june = this.calculateAmount(item.installments, 6);
        row.juneDate = this.calculateDate(item.installments, 6);
        row.july = this.calculateAmount(item.installments, 7);
        row.julyDate = this.calculateDate(item.installments, 7);
        row.august = this.calculateAmount(item.installments, 8);
        row.augustDate = this.calculateDate(item.installments, 8);
        row.september = this.calculateAmount(item.installments, 9);
        row.septemberDate = this.calculateDate(item.installments, 9);
        row.october = this.calculateAmount(item.installments, 10);
        row.octoberDate = this.calculateDate(item.installments, 10);
        row.november = this.calculateAmount(item.installments, 11);
        row.novemberDate = this.calculateDate(item.installments, 11);
        row.december = this.calculateAmount(item.installments, 12);
        row.decemberDate = this.calculateDate(item.installments, 12);

        // console.log("rowitem: ", (JSON.stringify(this.rowItem)));
        // this.paymentsCopy.push(JSON.parse(JSON.stringify(row)));
        this.paymentsCopy.push(row);
      })

      let total = {};
      total.name = "Razem"
      total.paymentType = "TOTAL";
      total.january = this.januaryTotal;
      total.february = this.februaryTotal;
      total.march = this.marchTotal;
      total.april = this.aprilTotal;
      total.may = this.mayTotal;
      total.june = this.juneTotal;
      total.july = this.julyTotal;
      total.august = this.augustTotal;
      total.september = this.septemberTotal;
      total.october = this.octoberTotal;
      total.november = this.novemberTotal;
      total.december = this.decemberTotal;
      this.paymentsCopy.push(total);

      let paid = {};
      paid.name = "Zapłacono"
      paid.paymentType = "TOTAL_PAID";
      paid.january = this.januaryPaid;
      paid.february = this.februaryPaid;
      paid.march = this.marchPaid;
      paid.april = this.aprilPaid;
      paid.may = this.mayPaid;
      paid.june = this.junePaid;
      paid.july = this.julyPaid;
      paid.august = this.augustPaid;
      paid.september = this.septemberPaid;
      paid.october = this.octoberPaid;
      paid.november = this.novemberPaid;
      paid.december = this.decemberPaid;
      this.paymentsCopy.push(paid);

      let toPay = {};
      toPay.name = "Do zapłaty"
      toPay.paymentType = "TOTAL_TO_PAY";
      toPay.january = this.januaryToPay;
      toPay.february = this.februaryToPay;
      toPay.march = this.marchToPay;
      toPay.april = this.aprilToPay;
      toPay.may = this.mayToPay;
      toPay.june = this.juneToPay;
      toPay.july = this.julyToPay;
      toPay.august = this.augustToPay;
      toPay.september = this.septemberToPay;
      toPay.october = this.octoberToPay;
      toPay.november = this.novemberToPay;
      toPay.december = this.decemberToPay;
      this.paymentsCopy.push(toPay);

      console.log("END - createRows()");
    },

    calculateAmount(installments, month) {
      console.log("calculateAmount()", month);
      let installment = installments.find(pay => parseInt(moment(pay.paymentDeadline).format("yyyy")) === this.year && parseInt(moment(pay.paymentDeadline).format("M")) === month);
      console.log("installment", installment);
      // console.log("installment", installment.paymentStatus);

      if (installment?.paymentStatus === "TO_PAY")
        this.calculateTotal(+installment.installmentAmountToPay, 0, month);
      else if (installment?.paymentStatus === "PAID")
        this.calculateTotal(0, +installment.installmentAmountToPay, month);
      return installment === undefined ? "" : +installment.installmentAmountPaid === 0 ? installment.installmentAmountToPay : installment.installmentAmountPaid;
    },
    calculateDate(installments, month) {
      // console.log("calculateDate()", month);
      let installment = installments.find(pay => parseInt(moment(pay.paymentDeadline).format("yyyy")) === this.year && parseInt(moment(pay.paymentDeadline).format("M")) === month);
      return installment === undefined ? "" : installment.paymentDate === "0001-01-01" ? "" : installment.paymentDate;
    },
    calculateTotal(toPay, paid, month) {
      switch (month) {
        case 1:
          this.januaryToPay = this.januaryToPay + toPay;
          this.januaryPaid = this.januaryPaid + paid;
          this.januaryTotal = this.januaryPaid + this.januaryToPay
          break;
        case 2:
          this.februaryToPay = this.februaryToPay + toPay;
          this.februaryPaid = this.februaryPaid + paid;
          this.februaryTotal = this.februaryPaid + this.februaryToPay
          break;
        case 3:
          this.marchToPay = this.marchToPay + toPay;
          this.marchPaid = this.marchPaid + paid;
          this.marchTotal = this.marchPaid + this.marchToPay
          break;
        case 4:
          this.aprilToPay = this.aprilToPay + toPay;
          this.aprilPaid = this.aprilPaid + paid;
          this.aprilTotal = this.aprilPaid + this.aprilToPay
          break;
        case 5:
          this.mayToPay = this.mayToPay + toPay;
          this.mayPaid = this.mayPaid + paid;
          this.mayTotal = this.mayPaid + this.mayToPay
          break;
        case 6:
          this.juneToPay = this.juneToPay + toPay;
          this.junePaid = this.junePaid + paid;
          this.juneTotal = this.junePaid + this.juneToPay
          break;
        case 7:
          this.julyToPay = this.julyToPay + toPay;
          this.julyPaid = this.julyPaid + paid;
          this.julyTotal = this.julyPaid + this.julyToPay
          break;
        case 8:
          this.augustToPay = this.augustToPay + toPay;
          this.augustPaid = this.augustPaid + paid;
          this.augustTotal = this.augustPaid + this.augustToPay
          break;
        case 9:
          this.septemberToPay = this.septemberToPay + toPay;
          this.septemberPaid = this.septemberPaid + paid;
          this.septemberTotal = this.septemberPaid + this.septemberToPay
          break;
        case 10:
          this.octoberToPay = this.octoberToPay + toPay;
          this.octoberPaid = this.octoberPaid + paid;
          this.octoberTotal = this.octoberPaid + this.octoberToPay
          break;
        case 11:
          this.novemberToPay = this.novemberToPay + toPay;
          this.novemberPaid = this.novemberPaid + paid;
          this.novemberTotal = this.novemberPaid + this.novemberToPay
          break;
        case 12:
          this.decemberToPay = this.decemberToPay + toPay;
          this.decemberPaid = this.decemberPaid + paid;
          this.decemberTotal = this.decemberPaid + this.decemberToPay
          break;
      }
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