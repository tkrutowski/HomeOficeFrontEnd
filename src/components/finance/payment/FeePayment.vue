<template>
  <b-container id="container">
    <b-card id="details" class="card-office">
      <b-row class="mb-2">
        <b-col class="col-5 text-sm-left">
          <p class="mb-1 mt-3"><small>Nazwa opłaty:</small> {{ payment.name }}</p>
          <p class="mb-1"><small>Nazwa firmy:</small> {{ payment.firm.name }}</p>
          <p class="mb-1"><small>Nr umowy:</small> {{ payment.feeNumber }}</p>
          <p class="mb-1"><small>Z dnia:</small> {{ payment.date }}</p>
          <p class="mb-1"><small>Data pierwszej opłaty:</small> {{ payment.firstPaymentDate }}</p>
          <p class="mb-1"><small>Termin całkowitej spłaty:</small>
            {{ countDeadLine }}</p>
          <p class="mb-5"><small>Nr konta:</small> {{ payment.accountNumber }}</p>

          <p class="mb-1"><small>Kwota opłaty:</small> {{ payment.amount }} zł</p>
          <p class="mb-1"><small>Częstotliwość opłat:</small>
            {{ payment.feeFrequency === 'ONE_MONTH' ? 'miesięczna' : payment.feeFrequency === 'TWO_MONTHS' ? 'dwumiesięczna' : payment.feeFrequency }}</p>

          <p class="mb-1"><small>Ilość opłat:</small> {{ payment.numberOfPayments }}</p>
          <p class="mb-1"><small>Koszt planowany:</small> <span class="color-red"> {{ plannedInterest }} zł</span></p>

          <p class="mb-3"><small>Koszt rzeczywisty:</small> <span class="color-red">{{ realInterest }} zł</span></p>

          <b-form-group class="col p-0 mt-4" label="Opis:" label-for="input-description">
            <b-form-textarea class="input-office-orange border-orange"
                             id="input-description"
                             v-model="payment.otherInfo"
                             rows="3"
                             max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col class="col-7 text-sm-left">
          <b-table style="max-height: 800px; overflow-y: auto;"
                   :items="payment.installmentDtoList"
                   :fields="fields"
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
            <!-- ----------------------------------AKCJA --------------------------------- -->
            <template #cell(action)="row">
              <b-button-group>
                <!-- EDIT -->
                <b-button
                    size="sm"
                    @click="showPayModal(row.item)"
                    class="mr-2"
                    variant="office"
                    title="Dodaj lub edytuj wpłatę"
                >
                  <img alt="" src="../../../assets/edit-book-icon.png" height="25px"/>
                </b-button>
                <!-- DELETE -->
                <b-button
                    size="sm"
                    @click="deletePayment(row.item)"
                    class="mr-2 "
                    variant="office-save"
                    :disabled="isPaid(row.item.paymentDate)"
                    title="Usuń wpłatę"
                    style="width: 40px"
                >
                  <b-icon icon="trash" aria-hidden="true"></b-icon>
                </b-button>
              </b-button-group>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import {feeMixin} from "@/mixins/fee";
import {errorMixin} from "@/mixins/error";

export default {
  name: "FeePayment",
  mixins: [errorMixin, feeMixin],
  data() {
    return {
      payment: {},
      fields: [
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
        {
          key: "action",
          label: "Akcja",
        },
      ],

      amount: "",
      date: ""
    }
  },
  props: {
    id: Number,
    paymentType: String,
    idUser: String,
  },
  mounted() {
    console.log("mounted FeePayment");

  },
  created() {
    console.log("created FeePayment");
    this.getFee();
    // console.log("UserBookSmall: " + JSON.stringify(this.userbook));
  },
  computed: {
    countDeadLine() {
      let deadline = this.payment.installmentDtoList[this.payment.installmentDtoList.length - 1].paymentDeadline;
      console.log("countDeadLine() = ", deadline);
      return deadline;
    },
    plannedInterest() {
      return (this.payment.installmentDtoList.map(installment => installment.installmentAmountToPay)
          .map(value => parseFloat(value))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)
    },
    realInterest() {
      return (this.payment.installmentDtoList
          .filter(l => l.paymentStatus === "PAID")
          .map(installment => installment.installmentAmountPaid - installment.installmentAmountToPay)
          .map(value => parseFloat(value))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)
    },
    calculateCost() {
      return (this.payment.installmentDtoList.map(installment => installment.installmentAmountPaid)
          .map(value => parseFloat(value))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)).toFixed(2)
    },
    calculatePaid() {
      return this.payment.installmentDtoList.filter(installment => installment.paymentStatus === 'PAID').length;
    },
    validPayment() {
      return (
          this.validationAmount
      );
    },
    validationAmount() {
      return (
          this.amount.length > 0 &&
          this.amount.length <= 7 &&
          (/(^\d+\.\d{0,2}$)/.test(this.amount) ||
              /^[0-9]+$/.test(this.amount))
      );
    },
  },
  methods: {
    isPaid(value) {
      // console.log("VALUE: ",value);
      return ((value === "0001-01-01") || (value===""));
    },
    getFee() {
      console.log("START - getFee()), ID = " + this.id);
      this.loadingFee = true;
      this.getFeeByIdFromDb(this.id).then((response) => {
        this.payment = response.data;
        // console.log(this.payment);
        this.loadingFee = false;
      });
      console.log("END - getFee()), ID = " + this.id);
    },
    //
    //delete payment
    //
    deletePayment(item) {
      this.$bvModal
          .msgBoxConfirm(`Czy chcesz usunąć opłatę z dnia: "'${item.paymentDate}'" ?`, {
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
              item.paymentStatus = "TO_PAY";
              item.paymentDate = "0001-01-01";
              item.installmentAmountPaid = 0;
              console.log("payDate przed save DELETE", item);
              this.updateFeeInstallmentStatusDb(item).then((response) => {
                console.log("After save DELETE: " ,JSON.stringify(response.date));
                this.$store.commit("updateFeePayment", response.data);
                //reset
                this.displaySmallMessage("success", "Usunięto opłatę.");
                this.getLoan();
              })
            }
          })
          .catch(() => {
            // An error occurred
          });
    },

    showPayModal(item) {
      this.$store.commit("updateInstallment", item);
      this.$bvModal.show('payModalFee' + this.idUser);
    },
  }
}

</script>

<style scoped>

</style>