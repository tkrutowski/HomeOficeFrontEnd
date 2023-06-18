import axios from "axios";

export const firmMixin = {
    data() {
        return {
            urlFirm: "http://localhost:8077",
            // urlLibrary: "http://192.168.1.33:8082",
            // urlLibrary: "https://goahead.focikhome.synology.me",

            loadingFirm: false,

            firms: [],

                firm: {
                    id:0,
                    name:""
                },
        };
    },
    methods: {
        //
        //Get firms
        getFirmsFromDb() {
            console.log("START - getFirmsFromDb()");

            return axios({
                method: 'get',
                url: this.urlFirm + `/api/finance/firm`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getFirmsFromDb() - Ilosc []: " + response.data.length);
                    console.log("END -- getFirmsFromDb()");

                    return response;
                })
                .catch((e) => {
                    this.loadingFirm = false;
                    this.validateError(e);
                });
        },


        //
        //Get firm by ID
        async getFirmByIdFromDb(idFirm) {
            console.log("START - getFirmByIdFromDb()");

            return axios({
                method: 'get',
                url: this.urlFirm + `/api/finance/firm/` + idFirm,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - getFirmByIdFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.loadingFirm = false;
                    this.validateError(e);
                });
        },

        //
        //add firm into db
        //
        addFirmDB(firm) {
            console.log("START - addFirmDB()");
            return axios({
                method: 'post',
                url: this.urlFirm + `/api/finance/firm`,
                data: firm,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - addFirmDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update firm in db
        //
        updateFirmDB() {
            console.log("START - updateFirmDB()");
            return axios({
                method: 'put',
                url: this.urlFirm + `/api/finance/firm`,
                data: this.firm,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - updateFirmDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },


        //
        //delete firm from db
        //
        deleteFirmDB(firmID) {
            console.log("START - deleteFirmDB()");
            return axios({
                method: 'delete',
                url: this.urlFirm + `/api/finance/firm/` + firmID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - deleteFirmDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //---------------------------------------  CONVERT TO OPTION ----------------------------------------------------
        convertToOptionsFirm(firms) {
            console.log("convert firms to options...");
            let converted=[];
            firms.forEach((e) => {
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

