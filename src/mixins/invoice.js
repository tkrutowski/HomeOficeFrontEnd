import axios from "axios";

export const invoiceMixin = {
    data() {
        return {
            // urlTeam: "http://localhost:8089",
            // urlEmpl: "http://localhost:8077",
            // urlEmpl: "http://192.168.1.33:8082",
            urlEmpl: "https://docker.focikhome.synology.me",

            loadingInvoices: false,

            invoices: [],
            invoiceItems: [],


            invoice: {
                idInvoice: 0,
                idCustomer: 0,
                invoiceNumber: "0000/00",
                sellDate: "",
                invoiceDate: "",
                paymentType: "TRANSFER",
                paymentStatus: "",
                paymentDeadline: 14,
                paymentDate: "",
                otherInfo: "",
                invoiceItems: [],
                customerName: ""
            },

            invoiceItem: {
                id: 0,
                idInvoice: 0,
                name: "",
                jm: "",
                quantity: 1,
                amount: "",
            },
        };
    },
    methods: {

        //
        //get invoice by ID from DB
        //
        async getInvoiceFromDb(invoiceID) {
            console.log("START - getInvoiceFromDb() ID = " + invoiceID);
            return axios({
                method: 'get',
                url: this.urlEmpl + `/api/goahead/invoice/` + invoiceID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("Odpowiedz HTTP: " + response.status + ", " + response.statusText);
                    // console.log(JSON.stringify(response.data));
                    console.log("END - getInvoiceFromDb()");

                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        getInvoicePdfFromDb(invoiceID) {
            console.log("START - getInvoicePdfFromDb() ID = " + invoiceID);
            axios({
                method: 'get',
                url: this.urlEmpl + `/api/goahead/invoice/pdf/` + invoiceID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
                responseType: "blob",
            })
                .then((response) => {
                    console.log("Odpowiedz HTTP: " + response.status + ", " + response.statusText);
                    console.log("END - getInvoicePdfFromDb()");
                    let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    let fileLink = document.createElement("a");
                    fileLink.href = fileURL;
                    fileLink.setAttribute("download", "faktura.pdf");
                    document.body.appendChild(fileLink);
                    this.btnDisabled = false;
                    fileLink.click();
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //get invoice number  by year
        //
        async getInvoiceNumberFromDb(year) {
            console.log("START - getInvoiceNumberFromDb(" + year + ")");
            return axios({
                method: 'get',
                url: this.urlEmpl + `/api/goahead/invoice/number/` + year,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("Odpowiedz HTTP: " + response.status + ", " + response.statusText);
                    // console.log(JSON.stringify(response.data));
                    console.log("END - getInvoiceNumberFromDb()");

                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //Get PAYD/TO_PAY/ALL invoices
        async getInvoicesFromDb(paymentStatus) {
            console.log("START - getInvoicesFromDb(" + paymentStatus + ")");
            return axios({
                method: 'get',
                url: this.urlEmpl + `/api/goahead/invoice?status=` + paymentStatus,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getCustomersFromDb() - Ilosc faktur[]: " + response.data.length);
                    console.log("END - getInvoicesFromDb(" + paymentStatus + ")");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //Get paymentType
        getPaymentTypeFromDb() {
            console.log("START - getPaymentTypeFromDb()");
            return axios({
                method: 'get',
                url: this.urlEmpl + `/api/goahead/invoice/paymenttype`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getPaymentTypeFromDb() - Ilosc paymentType[]: " + response.data.length);
                    console.log("END - getPaymentTypeFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //add invoice into db
        //
        addInvoiceDB() {
            console.log("START - addInvoiceDB()");
            return axios({
                method: 'post',
                url: this.urlEmpl + `/api/goahead/invoice`,
                data: this.invoice,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    this.invoice.id = response.data;
                    console.log("END - addInvoiceDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },
        //
        //update Invoice
        //
        updateInvoiceDb() {
            console.log("START - updateInvoiceDb()");
            return axios({
                method: 'put',
                url: this.urlEmpl + `/api/goahead/invoice`,
                data: this.invoice,
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
        //delete invoice from db
        //
        deleteInvoiceDB(invoiceID) {
            console.log("START - deleteInvoiceDB()");
            return axios({
                method: 'delete',
                url: this.urlEmpl + `/api/goahead/invoice/` + invoiceID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - deleteInvoiceDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update invoice status
        //
        updateInvoiceStatusDb(invoiceID, newStatus) {
            console.log("START - updateInvoiceStatusDb()");
            console.log("invoice id: " + invoiceID + ", status: " + newStatus);
            return axios({
                method: 'put',
                url: this.urlEmpl + `/api/goahead/invoice/paymentstatus/` + invoiceID,
                data: {
                    value: newStatus
                },
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then(() => {
                    // JSON responses are automatically parsed.
                    this.displaySmallMessage("success", "Zaaktualizowano status faktury.");
                    console.log("END - updateInvoiceStatusDb()");
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

    },
};
