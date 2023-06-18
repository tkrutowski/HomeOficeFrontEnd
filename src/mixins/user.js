import axios from "axios";

export const userMixin = {
  data() {
    return {
      // urlUser: "http://localhost:8089",
      // urlUser: "http://localhost:8077",
      urlUser: "https://goahead.focikhome.synology.me",

      loadingUser: false,

      // idUser: 0,
      // isEdit: false,
      user: {
        id: 0,
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        username: "",
        enabled: true,
        notLocked: true,
        idEmployee: 0,
      },
    };
  },
  methods: {


    //
    //get users
    //
    getUsersFromDb() {
      console.log("START - getUsersFromDb()");
      // console.log("Bearer " + this.$store.getters.getToken);
      return axios({
        method: 'get',
        url: this.urlUser + `/api/user`,
        headers: {
          // "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.$store.getters.getToken
        },
      })
          .then((response) => {
            // JSON responses are automatically parsed.
            this.usersList = response.data;
            console.log(
                "getUsersFromDb() - Ilosc usersList[]: " + this.usersList.length
            );
            // console.log("USERS: ",JSON.stringify(response.data));
            console.log("END - getUsersFromDb()");
            return response;
          })
          .catch((e) => {
            this.validateError(e);
          });
    },


    //
    //get user from DB
    //
    getUserFromDb(userID) {
      console.log("getUserFromDb() - start, ID = " + userID);
      const header = {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      };
      axios
        .get(this.urlUser + `/api/user/` + userID, header)
        .then((response) => {
          this.user = response.data;
          console.log("Odpowiedz HTTP: " + response.status + ", " + response.statusText);
          // console.log("getUserFromDb(): " + this.user);
        })
        .catch((e) => {
          this.validateError(e);
        });
    },
    //
    //add USER into db
    //
    // addUserDB() {
    //   console.log("addUserDB() - start");
    //   console.log(JSON.stringify(this.user));
    //   const headers = {
    //     "Content-type": "application/json; charset=UTF-8",
    //     Authorization: "Bearer " + this.$store.getters.getToken,
    //   };
    //   axios
    //     .post(this.urlUser + `/api/user`, this.user, {
    //       headers,
    //     })
    //     .then(() => {
    //       this.displaySmallMessage("success", "Dodano użytkownika.");
    //       this.resetForm();
    //     })
    //     .catch((e) => {
    //       this.validateError(e);
    //     });
    // },

    //
    //add user into db
    //
    addUserDB() {
      console.log("START - addUserDB()");
      console.log(JSON.stringify(this.user));
      axios({
        method: 'post',
        url: this.urlEmpl + `/api/user`,
        data: this.user,
        headers: {
          // "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.$store.getters.getToken
        },
      })
          .then(() => {
            this.displaySmallMessage("success", "Dodano użytkownika.");
            this.resetForm();
            console.log("END - addUserDB()");
          })
          .catch((e) => {
            this.validateError(e);
          });
    },

    //
    //update user
    //
    updateUserDb() {
      console.log("updateUser() - start");
      const header = {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.$store.getters.getToken,
        },
      };
      axios
        .put(this.urlUser + `/api/user/update`, this.user, header)
        .then((response) => {
          this.user = response.data;
          this.displaySmallMessage("success", "Zaaktualizowano użytkownika.");
          console.log("Odpowiedz HTTP: " + response.status + ", " + response.statusText);
          // console.log("after updateUser(): " + this.user);
        })
        .catch((e) => {
          this.validateError(e);
        });
    },

//---------------------------------------  CONVERT TO OPTION ----------------------------------------------------
    convertToOptionsUsers(users) {
      console.log("convert users to options...");
      let converted=[];
      users.forEach((e) => {
        let opt = {
          value: e.id,
          text: e.lastName + " " + e.firstName,
        };
        converted.push(opt);
        // console.log(e.id + " " + e.lastName);
      });
      return converted;
    },
  },
};
