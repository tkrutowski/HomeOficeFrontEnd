<template>
  <b-card bg-variant="office-dark1" class="book_small"
          body-class="pb-0" header-bg-variant="office-dark2" footer-bg-variant="office-dark2">

    <template #header>
      <div class="book_small-header">
        <h3>{{ userbook.editionType }}</h3>

        <div>
          <b-button :id='"editUserBook"+userbook.id' class="image-button" @click="updateUserBook">
            <img alt="" src="../../assets/edit-book-icon.png"/>
          </b-button>
          <b-tooltip :target='"editUserBook"+userbook.id' triggers="hover">
            Edycja książki na mojej półce
          </b-tooltip>
          <b-button :id='"delUserBook"+userbook.id' class="image-button" @click="deleteUserBook">
            <img alt="" src="../../assets/delete-book-icon.png"/>
          </b-button>
          <b-tooltip :target='"delUserBook"+userbook.id' triggers="hover">
            Usunięcie książki z mojej półki
          </b-tooltip>
        </div>
      </div>
    </template>
    <div class="img-center">
      <b-img-lazy v-if="userbook.book.cover.length>0" :src="userbook.book.cover" height="375" width="250"
                  alt="Okładka do książki"></b-img-lazy>
      <img v-else src="../../assets/HomeOffice.png" height="300" width="250" alt="Okładka do książki"/>
    </div>

    <h6 class="mt-1">{{ userbook.book.authors }}</h6>
    <h4 :id='"title"+userbook.id'> {{ titleCal }}</h4>
    <b-tooltip v-if="isTitleFits" :target='"title"+userbook.id' triggers="hover">
      {{ userbook.book.title }}
    </b-tooltip>
    <div class="book-series">
      <span :id='"series"+userbook.id' class="book__large-subtitle-sub">Cykl: <strong>{{ seriesCal }}</strong></span>
      <h3 class="book__large-subtitle-sub book__large-subtitle-bold">#{{ userbook.book.bookInSeriesNo }}</h3>
    </div>
    <b-tooltip v-if="isSeriesFits" :target='"series"+userbook.id' triggers="hover">
      {{ userbook.book.series }}
    </b-tooltip>
    <template #footer>
      <div class="mt-0 mb-0">
        <p class="mt-0 mb-0">Czytana/Słuchana</p>
        <p class="mt-0 mb-0"><strong>{{ userbook.readFrom }}</strong> do <strong>{{ isRead }}</strong></p>
      </div>
    </template>
  </b-card>
</template>

<script>
export default {
  name: "UserBookSmall",
  data() {
    return {
    }
  },
  mounted() {
    console.log("mounted UserBookSmall");
  },
  created() {
    console.log("created UserBookSmall");
    // console.log("UserBookSmall: " + JSON.stringify(this.userbook));
  },
  props: {
    userbook: {
      id: 0,
      book: {
        id: 0,
        series: "",
        authors: "",
        categories: "",
        title: "",
        description: "",
        cover: "",
        bookInSeriesNo: 0
      },
      id_user: 0,
      bookstore: {},
      editionType: "",
      readingStatus: "",
      ownershipStatus: "",
      readFrom: "",
      readTo: "",
      info: ""
    },
  },
  computed: {
    seriesCal() {
      let tempSeries = this.userbook.book.series;
      if (tempSeries.length > 18) {
        return tempSeries.substr(0, 18) + "..."
      }
      return tempSeries;
    },
    isSeriesFits() {
      return this.userbook.book.series.length > 18;
    },
    titleCal() {
      let org = this.userbook.book.title;
      if (org.length > 18) {
        return org.substr(0, 18) + "..."
      }
      return org;
    },
    isTitleFits() {
      return this.userbook.book.title.length > 20;
    },
    isRead() {
      return this.userbook.readTo.length > 0 ? this.userbook.readTo : "nieskończona";
    }
  },
  methods: {
    updateUserBook() {
      console.log("book: "+JSON.stringify(this.userbook.book));
      console.log("id: "+this.userbook.id);
      this.$router.push({
        name: 'TheUserBook',
        params: {book: this.userbook.book, id: this.userbook.id, isEdit: true},
      })
    },
    deleteUserBook(){
      this.$root.$emit('send', this.userbook.id);
    }
  }

}
</script>

<style scoped>
@import "../../assets/css/main.css";
.book_small {
  width: 300px;
  /*height: 700px;*/
  border: black 2px solid;
  margin: 15px;
}

.book_small-header {
  display: flex;
  justify-content: space-between;
}

.book-series {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0;
}
/*----------------------------------------- button with logo*/
.image-button {
  display: inline-block;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
}

.image-button:hover {
  background-color: transparent;
}

.image-button:focus {
  outline: none;
  box-shadow: none;
  background-color: transparent;
  border: none;
}

.image-button img {
  height: 35px;
  margin-right: 5px;
  vertical-align: middle;
}

</style>