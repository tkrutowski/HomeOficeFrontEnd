import axios from "axios";

export const userBookMixin = {
    data() {
        return {
            // urlUserBook: "http://localhost:8077",
            // urlUserBook: "http://192.168.1.33:8082",
            urlUserBook: "https://goahead.focikhome.synology.me",

            loadingUserBook: false,
            loadingOwnership: false,
            loadingReadingStatus: false,
            loadingEditionType: false,

            userbook: {
                id: 0,
                book:{},
                idUser:0,
                idBookstore:0,
                editionType:"",
                readingStatus:"",
                ownershipStatus:"",
                readFrom:"",
                readTo:"",
                info:""
            },
        };
    },
    methods: {

        //
        //check if user already read the book
        checkIfBookUserDb(id) {
            console.log("START - checkIfBookUser("+id+")");

            return axios({
                method: 'get',
                url: this.urlUserBook + `/api/library/userbook/check?id=` + id,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("checkIfBookUser() : " + response.data);
                    console.log("END - checkIfBookUser()");

                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //get userbooks by status
        async getUserBookByReadingStatusFromDb(status) {
            console.log("START - getUserBookByReadingStatus()");

            return axios({
                method: 'get',
                url: this.urlUserBook + `/api/library/userbook/status/?status=` + status,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("UserBooks size []: "+response.data.length);
                    // console.log("Book by series: " + JSON.stringify(response.data));
                    console.log("END - getUserBookByReadingStatus()");
                    return response;
                })
                .catch((e) => {
                    this.loadingBook = false;
                    this.validateError(e);
                });
        },

        //
        //get userbooks by status and year
        async getUserBookByReadingStatusAndYearDb(status, year) {
            console.log("START - getUserBookByReadingStatus()");

            return axios({
                method: 'get',
                url: this.urlUserBook + `/api/library/userbook/status/?status=` + status + '&year=' + year,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("UserBooks size []: "+response.data.length);
                    // console.log("Book by series: " + JSON.stringify(response.data));
                    console.log("END - getUserBookByReadingStatus()");
                    return response;
                })
                .catch((e) => {
                    this.loadingBook = false;
                    this.validateError(e);
                });
        },
        //
        //Get userbook by ID
        async getUserBookByIdFromDb(idUserBook) {
            console.log("START - getUserBookByIdFromDb()");

            return axios({
                method: 'get',
                url: this.urlUserBook + `/api/library/userbook/` + idUserBook,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - getUserBookByIdFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.loadingBook = false;
                    this.validateError(e);
                });
        },


        //
        //Get reading status
        getReadingStatusFromDb() {
            console.log("START - getReadingStatusFromDb()");
            return axios({
                method: 'get',
                url: this.urlUserBook + `/api/library/userbook/reading_status`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getReadingStatusFromDb() - Ilosc []: " + response.data.length);
                    console.log("END - getReadingStatusFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },
        //
        //Get ownership status
        getOwnershipStatusFromDb() {
            console.log("START - getOwnershipStatusFromDb()");
            return axios({
                method: 'get',
                url: this.urlUserBook + `/api/library/userbook/ownership_status`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getOwnershipStatusFromDb() - Ilosc []: " + response.data.length);
                    console.log("END - getOwnershipStatusFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },
        //
        //Get ownership status
        getEditionTypeFromDb() {
            console.log("START - getOwnershipStatusFromDb()");
            return axios({
                method: 'get',
                url: this.urlUserBook + `/api/library/userbook/edition_type`,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // JSON responses are automatically parsed.
                    console.log("getOwnershipStatusFromDb() - Ilosc []: " + response.data.length);
                    console.log("END - getOwnershipStatusFromDb()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },
        //
        //add userbook into db
        //
        addUserBookDB(userbook) {
            console.log("START - addUserBookDB()");
            return axios({
                method: 'post',
                url: this.urlUserBook + `/api/library/userbook`,
                data: userbook,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - addUserBookDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },

        //
        //update userbook into db
        //
        updateUserBookDB() {
            console.log("START - updateUserBookDB()");
            return axios({
                method: 'put',
                url: this.urlUserBook + `/api/library/userbook`,
                data: this.userbook,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                }
            })
                .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    console.log("END - updateUserBookDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },
        //
        //delete book from db
        //
        deleteUserBookDB(userbookID) {
            console.log("START - deleteUserBookDB()");
            return axios({
                method: 'delete',
                url: this.urlUserBook + `/api/library/userbook/` + userbookID,
                headers: {
                    // "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + this.$store.getters.getToken
                },
            })
                .then((response) => {
                    console.log("END - deleteUserBookDB()");
                    return response;
                })
                .catch((e) => {
                    this.validateError(e);
                });
        },
    },
};

