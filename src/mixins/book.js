import axios from "axios";

export const bookMixin = {
    data() {
        return {
            // urlLibrary: "http://localhost:8077",
            // urlLibrary: "http://192.168.1.33:8082",
            urlLibrary: "https://goahead.focikhome.synology.me",

            loadingBook: false,

            books: [],

            book: {
                id: 0,
                series: "",
                seriesURL: "",
                authors: "",
                categories: "",
                title: "",
                description: "",
                cover: "",
                bookInSeriesNo: 0
            },
        };
    },
    methods: {
        //
        //Get books
        async getBooksFromDb() {
            console.log("START - getBooksFromDb()");

            return axios({
                method: 'get',
                url: this.urlLibrary + `/api/library/book`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getBooksFromDb() - Ilosc książek[]: " + response.data.length);
                    console.log("END - getBooksFromDb()");

                    return response;
                })
                .catch((e) => {
                    this.loadingBook = false;
                    this.validateError(e);
                });
        },


        //
        //Get book by ID
        async getBookByIdFromDb(idBook) {
            console.log("START - getBookByIdFromDb()");

            return axios({
                method: 'get',
                url: this.urlLibrary + `/api/library/book/` + idBook,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - getBookByIdFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.loadingBook = false;
                    this.validateError(e);
                });
        },

        //
        //Get book by seriesID
        async getBookBySeriesIdFromDb(idSeries) {
            console.log("START - getBookByIdFromDb()");

            return axios({
                method: 'get',
                url: this.urlLibrary + `/api/library/book/series/` + idSeries,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - getBookByIdFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.loadingBook = false;
                    this.validateError(e);
                });
        },

        //
        //Get books from url
        getBookFromUrl(webSite, url) {
            console.log("START - getBookFromUrl(" + webSite + ")");
            console.log("URL: " + url);

            return axios({
                method: 'get',
                url: this.urlLibrary + `/api/library/book/url?site=` + webSite + '&url=' + url,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - getBookFromUrl(" + webSite + ")");
                    return response;
                })
                .catch((e) => {
                    this.loadingBook = false;
                    this.validateError(e);
                });
        },

        //
        //add book into db
        //
        addBookDB(book) {
            console.log("START - addBookDB()");
            return axios({
                method: 'post',
                url: this.urlLibrary + `/api/library/book`,
                data: book,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - addBookDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update book into db
        //
        updateBookDB() {
            console.log("START - updateBookDB()");
            return axios({
                method: 'put',
                url: this.urlLibrary + `/api/library/book`,
                data: this.book,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - updateBookDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },


        //
        //delete book from db
        //
        deleteBookDB(bookID) {
            console.log("START - deleteBookDB()");
            return axios({
                method: 'delete',
                url: this.urlLibrary + `/api/library/book/` + bookID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - deleteBookDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },
    },
};

