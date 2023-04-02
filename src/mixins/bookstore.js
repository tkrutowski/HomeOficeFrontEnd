import axios from "axios";

export const bookstoreMixin = {
    data() {
        return {
            // urlBookStore: "http://localhost:8077",
            // urlBookStore: "http://192.168.1.33:8082",
            urlBookStore: "https://goahead.focikhome.synology.me",

            loadingBookstore: false,

            bookstore: {
                id: 0,
                name:"",
                url:""
            },
        };
    },
    methods: {

        //
        //Get bookstores
        async getBookStoresFromDB() {
            console.log("START - getBookStores()");

            return axios({
                method: 'get',
                url: this.urlBookStore + `/api/library/bookstore`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("Bookstores size []: "+response.data.length);
                    // console.log("Book by series: " + JSON.stringify(response.data));
                    console.log("END - getBookStores()");
                    return response;
                })
                .catch((e) => {
                    this.loadingBook = false;
                    this.validateError(e);
                });
        },


    },
};
