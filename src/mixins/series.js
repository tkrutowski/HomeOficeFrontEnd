import axios from "axios";

export const seriesMixin = {
    data() {
        return {
            // urlSeries: "http://localhost:8077",
            // urlSeries: "http://192.168.1.33:8082",
            urlSeries: "https://goahead.focikhome.synology.me",

            loadingSeries: false,

            series: {
                id: 0,
                title: "",
                description: "",
                url:""
            },
        };
    },
    methods: {

        //
        //Get series
        getSeriesFromDb() {
            console.log("START - getSeriesFromDb()");

            return axios({
                method: 'get',
                url: this.urlSeries + `/api/library/series`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getSeriesFromDb() - Ilosc cykli[]: " + response.data.length);
                    console.log("END - getSeriesFromDb()");

                    return response;
                })
                .catch((e) => {
                    this.loadingSeries = false;
                    this.validateError(e);
                });
        },

    },
};

