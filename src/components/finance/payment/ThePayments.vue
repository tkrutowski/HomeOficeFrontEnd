<template>
  <b-container fluid id="container">

    <!-- SETTINGS ?? -->
    <div class="d-flex justify-content-end mb-3">
      <b-button
          @click="refreshPaymentsDB(selectedYear, selectedStatus)"
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

    <!-- WAITING....    -->
    <b-button
        v-show="loadingPayment"
        style="height: fit-content"
        variant="office"
        class="ml-3"
        disabled
    >
      <b-spinner ></b-spinner>
      <span class="sr-only">Loading...</span>
    </b-button>

    <!-- --------------------------------- TABELA ---------------------------------- -->
    <div v-for="(value, key) in paymentCopy" :key="key">
      <UserPayments :idUser="value[0]" :payments="value[1]" :year="+selectedYear" :key="refreshKey"/>
    </div>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" size="lg" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
// import router from "@/router";
import {errorMixin} from "@/mixins/error";
import moment from "moment";
import {paymentMixin} from "@/mixins/payment";
import UserPayments from "@/components/finance/payment/UserPayments";

export default {
  name: "finance-payments",
  components: { UserPayments },
  mixins: [errorMixin, paymentMixin],
  data() {
    return {
      //refresh
      refreshKey: 0,

      fields: [
        {
          key: "name",
          label: "Nazwa",
          sortable: true,
        },
        {
          key: "day",
          label: "Dzień płat.",
          sortable: true,
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
        },{
          key: "november",
          label: "Listopad",
        },
        {
          key: "novemberDate",
          label: "Data zapł.",
        },{
          key: "december",
          label: "Grudzień",
        },
        {
          key: "decemberDate",
          label: "Data zapł.",
        },
      ],

      selectedYear: Number,
      selectedStatus:"TO_PAY",
      paymentCopy: Map,
      //settings
      settingAnimation: "",

      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },

    };
  },
  created() {
    console.log("created");
    this.selectedYear = moment().format("YYYY");
    this.getAllPayments(this.selectedYear, this.selectedStatus);
  },
  watch: {
    '$store.state.finance.refreshPayment': function(storeValue) {
      console.log("WATCH: ",storeValue);
      this.refreshPaymentsSTORE();
      //refresh
      this.refreshKey+=1;
    },
  },
  mounted() {
    console.log("mounted");
  },
  computed: {

  },
  methods: {
    rowClass() {
      // if (!item || type !== 'row') return
      //if (item.isHoliday === true) return "table-dark";
      return "text-office-orange table-row";
    },
    changeRefresh(){
      console.log("REFRESH ThePAyments")
      this.$store.commit("updateRefresh", Math.random());
    },

    async getAllPayments(year, status) {
      console.log("START - getAllPayments(year: " + year + ", status: " + status + ")");
      this.loadingPayment=true;

      console.log("size from store: ", this.$store.getters.getPayments.size);
      // console.log("size: ",JSON.stringify(this.$store.getters.getPayments));
      if (this.$store.getters.getPayments?.size > 0) {
        console.log("take payments from store");
        await this.refreshPaymentsSTORE();
      } else {
        console.log("take payments from DB");
        await this.refreshPaymentsDB(year, status);
      }
      this.loadingPayment=false;
      console.log("END -  getAllPayments(year: " + year + ", status: " + status + ")");
    },

    async refreshPaymentsSTORE() {
      console.log("START - refreshPaymentsSTORE()");

      this.settingAnimation = "spin";
      this.paymentCopy = JSON.parse(JSON.stringify(this.$store.getters.getPayments));
      console.log("paymentCopy size: ", this.paymentCopy.size);
      this.settingAnimation = "";

      console.log("END - refreshPaymentsSTORE()");
    },

    async refreshPaymentsDB(year, status) {
      console.log("START - refreshPaymentsDB(year: " + year + ", status: " + status + ")");

      this.settingAnimation = "spin";
      await this.getPaymentsFromDb(year, status).then((response) => {
        const mapTest = new Map(Object.entries(response.data));
        this.$store.commit("refreshPayments", Array.from(mapTest));

        this.paymentCopy = JSON.parse(JSON.stringify(this.$store.getters.getPayments));
        console.log("paymentCopy size: ", this.paymentCopy.size);
        // console.log("paymentCopy: ", (JSON.stringify(this.paymentCopy)));
        // console.log("paymentCopy: ", (JSON.stringify(Array.from(this.paymentCopy))));
        this.settingAnimation = "";
        this.changeRefresh();
        //wyświetla tabele
      });

      console.log("END - refreshPaymentsDB(year: " + year + ", status: " + status + ")");
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