import axios from "axios";

export const loanMixin = {
    data() {
        return {
            // urlLoan: "http://localhost:8077",
            // urlLoan: "http://192.168.1.33:8082",
            urlLoan: "https://goahead.focikhome.synology.me",

            loadingLoan: false,

            loan: {
                id:0,
                bank: {
                    id:0,
                    name:""
                },
                idUser:0,
                name:"",
                amount:"",
                date:"",
                loanNumber:"",
                accountNumber:"",
                firstPaymentDate:"",
                numberOfInstallments:"",
                installmentAmount:"",
                loanStatus:"",
                loanCost:"",//prowizja itp
                otherInfo:"",
                installmentDtoList:[],
                amountToPay:""
            },
            loanInstallment: {
                idLoanInstallment: 0,
                idLoan: 0,
                installmentNumber: 0,
                installmentAmountToPay: "",
                installmentAmountPaid: "",
                paymentDeadline: "",
                paymentDate: "",
                paymentStatus: ""
            }
        };
    },
    methods: {
        //
        //Get loans
        async getLoansFromDb(status,installment) {
            console.log("START - getLoansFromDb(status: ",status,")");

            return axios({
                method: 'get',
                url: this.urlLoan + `/api/finance/loan/status?status=`+status+"&installment="+installment,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getLoansFromDb() - Ilosc []: " + response.data.length);
                    console.log("END -- getLoansFromDb(status: ",status,")");
                    return response;
                })
                .catch((e) => {
                    this.loadingLoan = false;
                    this.validateError(e);
                });
        },


        //
        //Get loan by ID
        async getLoanByIdFromDb(idLoan) {
            console.log("START - getLoanByIdFromDb("+idLoan+")");
            return axios({
                method: 'get',
                url: this.urlLoan + `/api/finance/loan/` + idLoan,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - getLoanByIdFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.loadingLoan = false;
                    this.validateError(e);
                });
        },

        //
        //add book into db
        //
        addLoanDB(loan) {
            console.log("START - addLoanDB()");
            return axios({
                method: 'post',
                url: this.urlLoan + `/api/finance/loan`,
                data: loan,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - addLoanDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update loan into db
        //
        updateLoanDB() {
            console.log("START - updateLoanDB()");
            return axios({
                method: 'put',
                url: this.urlLoan + `/api/finance/loan`,
                data: this.loan,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - updateLoanDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update loan status
        //
        updateLoanStatusDb(loanID, newStatus) {
            console.log("START - updateLoanStatusDb()");
            console.log("invoice id: " + loanID + ", status: " + newStatus);
            return axios({
                method: 'put',
                url: this.urlLoan + `/api/finance/loan/status/` + loanID,
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
                    this.displaySmallMessage("success", "Zaaktualizowano status kredytu.");
                    console.log("END - updateLoanStatusDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //delete loan from db
        //
        deleteLoanDB(loanID) {
            console.log("START - deleteLoanDB()");
            return axios({
                method: 'delete',
                url: this.urlLoan + `/api/finance/loan/` + loanID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - deleteLoanDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //delete loan installment from db
        //
        deleteLoanInstallmentDB(loanInstallmentID) {
            console.log("START - deleteLoanInstallmentDB()");
            return axios({
                method: 'delete',
                url: this.urlLoan + `/api/finance/loan/installment/` + loanInstallmentID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - deleteLoanInstallmentDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update loan status
        //
        updateLoanInstallmentStatusDb(loanInstallment) {
            console.log("START - updateLoanInstallmentStatusDb()");
            console.log(loanInstallment);
            return axios({
                method: 'put',
                url: this.urlLoan + `/api/finance/loan/installment/`,
                data: loanInstallment,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    // console.log("After save DB: " + JSON.stringify(response))
                    console.log("END - updateLoanInstallmentStatusDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },
    },
};