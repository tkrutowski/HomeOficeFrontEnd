import axios from "axios";

export const paymentMixin = {
    data() {
        return {
            // urlPayment: "http://localhost:8077",
            // urlPayment: "http://192.168.1.33:8082",
            urlPayment: "https://goahead.focikhome.synology.me",

            loadingPayment: false,

            payment: {
                id: 0,
                idUser: 0,
                name: "",
                paymentDay: 0,
                installments: [],
                paymentType: ""
            },
            installment: {
                idLoanInstallment: 0,
                idLoan: 0,
                installmentNumber: 0,
                installmentAmountToPay: 0,
                installmentAmountPaid: 0,
                paymentDeadline: "",
                paymentDate: "",
                paymentStatus: "",
                deadLineDate: ""
            }
        };
    },
    methods: {
        //
        //Get patments by status
        //return MAP
         getPaymentsFromDb(year, status) {
            console.log("START - getPaymentsFromDb(year: ",year + ", status: ",status,")");

            return axios({
                method: 'get',
                url: this.urlPayment + `/api/finance/payment?date=`+year+`&status=`+status,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    const resultMap = new Map(Object.entries(response.data));
                    console.log("getPaymentsFromDb() - Ilosc []: " + resultMap.size);
                    console.log("END - getPaymentsFromDb(year: ",year + ", status: ",status,")");
                    return response;
                })
                .catch((e) => {
                    this.loadingPayment = false;
                    this.validateError(e);
                });
        },
    },
};