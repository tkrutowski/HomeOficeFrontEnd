import axios from "axios";

export const customerMixin = {
    data() {
        return {
            // urlTeam: "http://localhost:8089",
            // urlEmpl: "http://localhost:8077",
            // urlEmpl: "http://192.168.1.33:8082",
            urlEmpl: "https://goahead.focikhome.synology.me",

            loadingCustomer: false,

            customers: [],

            customer: {
                id: 0,
                name: "",
                firstName: "",
                nip: "",
                phone: "",
                mail: "",
                customerType: "",
                customerStatus: "",
                otherInfo: "",
                city: "",
                street: "",
                zip: "",
                regon: ""
            },
        };
    },
    methods: {
        //
        //get customer by ID from DB
        //
        async getCustomerFromDb(customerID, isAddress) {
            console.log("START - getCustomerFromDb() ID = " + customerID);
            return axios({
                method: 'get',
                url: this.urlEmpl + `/api/goahead/customer/` + customerID + "?isAddress=" + isAddress,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("Odpowiedz HTTP: " + response.status + ", " + response.statusText);
                    // console.log(JSON.stringify(response.data));
                    console.log("END - getCustomerFromDb()");

                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //Get ACTIVE/INACTIVE/ALL customers
        async getCustomersFromDb(customerStatus) {
            console.log("START - getCustomersFromDb(" + customerStatus + ")");

            return axios({
                method: 'get',
                url: this.urlEmpl + `/api/goahead/customer?status=` + customerStatus,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getCustomersFromDb() - Ilosc klientów[]: " + response.data.length);
                    console.log("END - getCustomersFromDb(" + customerStatus + ")");

                    return response;
                })
                .catch((e) => {
                    this.loadingCustomer = false;
                    this.validateError(e);
                });
        },

        //
        //Get customerType
        getCustomerTypeFromDb() {
            console.log("START - getCustomerTypeFromDb()");
            return axios({
                method: 'get',
                url: this.urlEmpl + `/api/goahead/customer/customertype`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getCustomerTypeFromDb() - Ilosc customerType[]: " + response.data.length);
                    console.log("END - getCustomerTypeFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //add Customer into db
        //
        addCustomerDB() {
            console.log("START - addCustomerDB()");
            return axios({
                method: 'post',
                url: this.urlEmpl + `/api/goahead/customer`,
                data: this.customer,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    this.customer.id = response.data;
                    console.log("END - addCustomerDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },
        //
        //update CUSTOMER
        //
        updateCustomerDb() {
            console.log("START - updateCustomerDb()");
            return axios({
                method: 'put',
                url: this.urlEmpl + `/api/goahead/customer`,
                data: this.customer,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - updateCustomerDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //delete CUSTOMER from db
        //
        deleteCustomerDB(customerID) {
            console.log("START - deleteCustomerDB()");
            return axios({
                method: 'delete',
                url: this.urlEmpl + `/api/goahead/customer/` + customerID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - deleteCustomerDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update customer status
        //
        setCustomerStatusDb(customerID, newStatus) {
            console.log("START - setCustomerStatusDb()");
            console.log("customer id: " + customerID + ", status: " + newStatus);
            return axios({
                method: 'put',
                url: this.urlEmpl + `/api/goahead/customer/customerstatus/` + customerID,
                data: {
                    value: newStatus
                },
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    this.displaySmallMessage("success", "Zaaktualizowano status klienta.");
                    console.log("END - setCustomerStatusDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },


    },
};