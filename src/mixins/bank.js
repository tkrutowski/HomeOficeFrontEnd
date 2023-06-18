import axios from "axios";

export const bankMixin = {
    data() {
        return {
            urlBank: "http://localhost:8077",
            // urlLibrary: "http://192.168.1.33:8082",
            // urlLibrary: "https://goahead.focikhome.synology.me",

            loadingBank: false,

            banks: [],

                bank: {
                    id:0,
                    name:""
                },
        };
    },
    methods: {
        //
        //Get banks
        getBanksFromDb() {
            console.log("START - getBanksFromDb()");

            return axios({
                method: 'get',
                url: this.urlBank + `/api/finance/bank`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getBanksFromDb() - Ilosc []: " + response.data.length);
                    console.log("END -- getBanksFromDb()");

                    return response;
                })
                .catch((e) => {
                    this.loadingBank = false;
                    this.validateError(e);
                });
        },


        //
        //Get bank by ID
        async getBankByIdFromDb(idBank) {
            console.log("START - getBankByIdFromDb()");

            return axios({
                method: 'get',
                url: this.urlBank + `/api/finance/bank/` + idBank,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - getBankByIdFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.loadingBank = false;
                    this.validateError(e);
                });
        },

        //
        //add bank into db
        //
        addBankDB(bank) {
            console.log("START - addBankDB()");
            return axios({
                method: 'post',
                url: this.urlBank + `/api/finance/bank`,
                data: bank,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - addBankDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update bank in db
        //
        updateBankDB() {
            console.log("START - updateBankDB()");
            return axios({
                method: 'put',
                url: this.urlBank + `/api/finance/bank`,
                data: this.bank,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - updateBankDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },


        //
        //delete bank from db
        //
        deleteBankDB(bankID) {
            console.log("START - deleteBankDB()");
            return axios({
                method: 'delete',
                url: this.urlBank + `/api/finance/bank/` + bankID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - deleteBankDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //---------------------------------------  CONVERT TO OPTION ----------------------------------------------------
        convertToOptionsBank(banks) {
            console.log("convert banks to options...");
            let converted=[];
            banks.forEach((e) => {
                let opt = {
                    value: e.id,
                    text: e.name,
                };
                converted.push(opt);
            });
            return converted;
        },
    },
};

