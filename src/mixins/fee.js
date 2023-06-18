import axios from "axios";

export const feeMixin = {
    data() {
        return {
            urlFee: "http://localhost:8077",
            // urlLoan: "http://192.168.1.33:8082",
            // urlLoan: "https://goahead.focikhome.synology.me",

            loadingFee: false,
            loadingFrequency: false,

            fee: {
                id:0,
                firm: {
                    id:0,
                    name:""
                },
                idUser:0,
                name:"",
                feeNumber:"",
                date:"",
                feeFrequency:"",
                numberOfPayments:"",
                amount:"",
                firstPaymentDate:"",
                accountNumber:"",
                feeStatus:"",
                otherInfo:"",
                installmentDtoList:[],
            },
            feeInstallment: {
                idFeeInstallment: 0,
                idFee: 0,
                installmentAmountToPay: 0,
                installmentAmountPaid: 0,
                paymentDeadline: "",
                paymentDate: "",
                paymentStatus: ""
            }
        };
    },
    methods: {
        //
        //Get fees by status
        //
        async getFeesFromDb(status,installment) {
            console.log("START - getFeesFromDb(status: ",status,")");

            return axios({
                method: 'get',
                url: this.urlFee + `/api/finance/fee/status?status=`+status+"&installment="+installment,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getFeesFromDb() - Ilosc []: " + response.data.length);
                    console.log("END -- getFeesFromDb(status: ",status,")");
                    return response;
                })
                .catch((e) => {
                    this.loadingFee = false;
                    this.validateError(e);
                });
        },


        //
        //Get fee by ID
        //
        async getFeeByIdFromDb(idFee) {
            console.log("START - getFeeByIdFromDb("+idFee+")");
            return axios({
                method: 'get',
                url: this.urlFee + `/api/finance/fee/` + idFee,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - getFeeByIdFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.loadingFee = false;
                    this.validateError(e);
                });
        },

        //
        //Get frequency enum
        getFrequencyFromDb() {
            console.log("START - getFrequencyFromDb()");
            return axios({
                method: 'get',
                url: this.urlFee + `/api/finance/fee/frequency`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getFrequencyFromDb() - Ilosc []: " + response.data.length);
                    console.log("END - getFrequencyFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //add fee into db
        //
        addFeeDB(loan) {
            console.log("START - addFeeDB()");
            return axios({
                method: 'post',
                url: this.urlFee + `/api/finance/fee`,
                data: loan,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - addFeeDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update fee into db
        //
        updateFeeDB() {
            console.log("START - updateFeeDB()");
            return axios({
                method: 'put',
                url: this.urlFee + `/api/finance/fee`,
                data: this.fee,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - updateFeeDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update fee status
        //
        updateFeeStatusDb(feeID, newStatus) {
            console.log("START - updateFeeStatusDb()");
            console.log("invoice id: " + feeID + ", status: " + newStatus);
            return axios({
                method: 'put',
                url: this.urlFee + `/api/finance/fee/status/` + feeID,
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
                    this.displaySmallMessage("success", "Zaaktualizowano status opłaty.");
                    console.log("END - updateFeeStatusDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //delete fee from db
        //
        deleteFeeDB(feeID) {
            console.log("START - deleteFeeDB()");
            return axios({
                method: 'delete',
                url: this.urlFee + `/api/finance/fee/` + feeID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - deleteFeeDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //---------------------------------------  CONVERT TO OPTION ----------------------------------------------------
        convertToOptionsFrequency(types) {
            console.log("convert to convertToOptionsFrequency...");
            // console.log(JSON.stringify(types));
            let converted=[];
            types.forEach((e) => {
                let opt = {
                    value: e.name,
                    text: e.viewName,
                };
                converted.push(opt);
                // console.log(e.name + " - " + e.viewName);
            });
            return converted;
        },
    },
};