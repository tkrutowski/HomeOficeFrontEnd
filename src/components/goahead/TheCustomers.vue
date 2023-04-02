<template>
  <b-container fluid id="container">
    <b-row class="mt-5">
      <b-col>
        <!-- --------------------------------- TABELA ---------------------------------- -->
        <b-table
            striped
            small
            :busy="isBusy"
            :items="customersListToDisplay"
            :fields="fields"
            :tbody-tr-class="rowClass"
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
                  v-if="row.item.customerStatus === 'ACTIVE'"
                  size="sm"
                  variant="outline"
                  @click="setCustomerStatus(row.item)"
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
                  @click="setCustomerStatus(row.item)"
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
              <!-- EDIT -->
              <b-button
                  size="sm"
                  @click="editCustomer(row.item)"
                  class="mr-2"
                  variant="ahead"
                  title="Edycja klienta"
              >
                Edit
              </b-button>
              <!-- DELETE -->
              <b-button
                  size="sm"
                  @click="deleteCustomer(row.item)"
                  class="mr-2 bg-danger"
                  title="Usuń klienta"
              >
                <b-icon icon="trash" aria-hidden="true"></b-icon>
              </b-button>
            </b-button-group>
          </template>

          <!-- --------------------DETAILS----------------------- -->
          <template #row-details="row">
            <b-card id="details">
              <b-row class="mb-2">
                <!-- <b-col>{{ row.item.pesel }}</b-col> -->
                <b-col sm="3" class="text-sm-left">REGON: {{ row.item.regon }}</b-col>
              </b-row>
              <b-row class="mb-2">
              <b-col sm="3" class="text-sm-left">Inne info: {{ row.item.otherInfo }}</b-col>
            </b-row>

            </b-card>
          </template>
        </b-table>
      </b-col>

      <!-- ----------------------------------SIDE CARD --------------------------------- -->
      <b-col cols="12" md="auto" class="mb-3">
        <b-card id="card-info" bg-variant="office-dark1" header-tag="header">
          <template #header>
            <b-button variant="ahead" @click="newCustomer">Nowy klient</b-button>
          </template>

          <b-card-text class="text-left pl-3 mb-1 text-ahead-green">Wszyscy / {{ calculateAll }}</b-card-text>
          <b-card-text class="text-left pl-3 mb-1 color-green"
          >Aktywni / {{ calculateActive }}</b-card-text
          >
          <b-card-text class="text-left pl-3 mb-1 color-red"
          >Nieaktywni / {{ calculateInActive }}</b-card-text
          >
          <hr class="my-4" style="color: green; background-color: green" />

          <b-form-group label="Wyświetl:" class="text-ahead-green">
            <b-form-radio
                v-model="selectedDisplay"
                class="pb-1"
                value="ALL"
                @change="displayRadio($event)"
            >Wszyscy
            </b-form-radio>
            <b-form-radio
                v-model="selectedDisplay"
                class="color-green pb-1"
                value="ACTIVE"
                @change="displayRadio($event)"
            >Aktywni</b-form-radio
            >
            <b-form-radio
                v-model="selectedDisplay"
                class="color-red pb-1"
                value="INACTIVE"
                @change="displayRadio($event)"
            >Nieaktywni</b-form-radio
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
import { mapGetters } from "vuex";
import jwt_decode from "jwt-decode";
import { customerMixin } from "@/mixins/customer";
import { errorMixin } from "@/mixins/error";
export default {
  name: "goahead-customers",
  mixins: [errorMixin, customerMixin],
  data() {
    return {
      timeAlmostUp: 30,
      fields: [
        {
          key: "firstName",
          label: "Imie",
        },
        {
          key: "name",
          label: "Nazwisko/Nazwa",
          sortable: true,
        },
        {
          key: "street",
          label: "Ulica",
          isActive: true,
        },
        {
          key: "city",
          label: "Miasto",
          isActive: false,
        },
        {
          key: "zip",
          label: "Kod",
        },
        {
          key: "nip",
          label: "NIP",
        },
        {
          key: "phone",
          label: "Telefon",
        },
        {
          key: "mail",
          label: "E-mail",
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
      customersList: [],
      customersListToDisplay: [],
      selectedDisplay: "ACTIVE",
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  created() {
    console.log("created");
    this.getAllCustomers();
  },
  computed: {
    ...mapGetters(["getToken"]),
    hasAccessRateRead() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: HR_RATE_READ_ALL: " + token2.authorities.includes('HR_RATE_READ_ALL'))
        return (
            token2.authorities.includes("HR_RATE_READ_ALL") ||
            token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
        // return true;
      }
    },
    hasAccessEmployeeWrite() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: HR_EMPLOYEE_WRITE_ALL: " + token2.authorities.includes('HR_EMPLOYEE_WRITE_ALL'))
        return (
            token2.authorities.includes("HR_EMPLOYEE_WRITE_ALL") ||
            token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
        // return true;
      }
    },
    hasAccessEmployeeDelete() {
      try {
        let token2 = jwt_decode(this.getToken);
        // console.log("token: HR_EMPLOYEE_DELETE_ALL: " + token2.authorities.includes('HR_EMPLOYEE_DELETE_ALL'))
        return (
            token2.authorities.includes("HR_EMPLOYEE_DELETE_ALL") ||
            token2.authorities.includes("ROLE_ADMIN")
        );
      } catch (error) {
        return false;
      }
    },
    calculateAll() {
      return this.customersList.length;
    },
    calculateActive() {
      let count = 0;
      this.customersList.forEach((customer) => {
        if (customer.customerStatus === "ACTIVE") {
          count++;
        }
      });
      return count;
    },
    calculateInActive() {
      let count = 0;
      this.customersList.forEach((customer) => {
        if (customer.customerStatus === "INACTIVE") {
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

    getAllCustomers() {
      console.log("START - getAllCustomers()");
      this.isBusy = true;
      this.getCustomersFromDb("ALL").then((response) => {
        this.customersList = response.data;
        //wyświetla tabele
        this.displayRadio(this.selectedDisplay);
        this.isBusy = false;
      });
      console.log("END - getAllCustomers()");
    },

    //
    //add new customer
    //
    newCustomer() {
      console.log("newCustomer()");
        router.push({
          name: "TheCustomer",
          params: { idCustomer: 0, isEdit: "false" },
        });
    },

    //
    //edit customer
    //
    editCustomer(item) {
      console.log("editCustomer(): " + item.id);
      router.push({
        name: "TheCustomer",
        params: { idCustomer: item.id, isEdit: "true" },
      });
    },
    //
    //delete customer
    //
    deleteCustomer(item) {
      this.$bvModal
          .msgBoxConfirm(`Czy chcesz usunąć pracownika:\n ${item.firstName} ${item.lastName}?`, {
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
              this.deleteCustomerDB(item.id).then(() => {
                this.getAllCustomers();
                this.displaySmallMessage("success", "Usunięto klienta.");
              });
            }
          })
          .catch(() => {
            // An error occurred
          });
    },

    //
    //set customer status active/inactive
    //
    setCustomerStatus(item,) {
      console.log("setCustomerStatus id: " + item.id + ", status: " + item.customerStatus);
        this.$bvModal
            .msgBoxConfirm(
                `Czy chcesz zmienić status klienta:
        ${item.firstName} ${item.name} na
         ${item.customerStatus === "ACTIVE" ? "NIE AKTYWNY" : "AKTYWNY"}?`,
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
                this.setCustomerStatusDb(
                    item.id,
                    item.customerStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                ).then(() => {
                  this.getAllCustomers();
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
      console.log("DisplayRadio(): " + event + "List size: " + this.customersList.length);
      if (event === "ALL") {
        this.customersListToDisplay = [];
        this.customersList.forEach((customer) => {
          this.customersListToDisplay.push(customer);
        });
      }
      if (event === "ACTIVE") {
        console.log("event active" )
        this.customersListToDisplay = [];
        this.customersList.forEach((customer) => {
          if (customer.customerStatus === "ACTIVE") {
        console.log("if active" )
            this.customersListToDisplay.push(customer);
          }
        });
      }

      if (event === "INACTIVE") {
        this.customersListToDisplay = [];
        this.customersList.forEach((customer) => {
          if (customer.customerStatus === "INACTIVE") {
            this.customersListToDisplay.push(customer);
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