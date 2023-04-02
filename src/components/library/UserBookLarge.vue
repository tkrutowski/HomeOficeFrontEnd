<template>
  <b-card  bg-variant="office-dark1" class="book_small"
  header-bg-variant="office-dark2">

    <template #header>
      <div>
<p>{{userbook.editionType}}</p>
      </div>
    </template>
      <div class="col img-center  card-elem-office">
        <b-img-lazy v-if="userbook.book.cover.length>0" :src="userbook.book.cover" height="375" width="250"
                    alt="Okładka do książki"></b-img-lazy>
        <img v-else src="../../assets/HomeOffice.png" height="300" width="250" alt="Okładka do książki"/>
      </div>


<!--      <div class="book__large-all" style="float: left">-->
        <div class="book-subtitle">
          <p class="book-subtitle-sub">Autor: </p>
          <p class="book-subtitle-sub book-subtitle-bold">{{ userbook.book.authors }}</p>
        </div>
        <div class="book-subtitle">
          <p class="book-subtitle-sub">Kategoria: </p>
          <p class="book-subtitle-sub book-subtitle-bold">{{ userbook.book.categories }}</p>
        </div>
<!--        <div class="book__large-subtitle">-->
<!--          <p class="book__large-subtitle-sub">Cykl: </p>-->
<!--          <p class="book__large-subtitle-sub book__large-subtitle-bold">{{ book.series }}</p>-->
<!--        </div>-->
<!--        <div class="book__large-subtitle">-->
<!--          <p class="book__large-subtitle-sub">Czesc cyklu: </p>-->
<!--          <p class="book__large-subtitle-sub book__large-subtitle-bold">{{ book.bookInSeriesNo }}</p>-->
<!--        </div>-->
<!--        <div class="book-discription">-->
<!--&lt;!&ndash;          <p class="book__large-subtitle-sub">Opis: </p>&ndash;&gt;-->
<!--&lt;!&ndash;          <textarea class="book__large-discription-area book__large-subtitle-sub book__large-discription-text"&ndash;&gt;-->
<!--&lt;!&ndash;                    rows="15" cols="80" readonly="true" v-model="book.description"></textarea>&ndash;&gt;-->
<!--          <b-form-textarea id="textarea-plaintext" plaintext :value="userbook.book.description"-->
<!--                           rows="3"-->
<!--                           max-rows="7"-->
<!--                           class="book-discription-area book-subtitle-sub text-office-orange"></b-form-textarea>-->
<!--        </div>-->
<!--      </div>-->

    <template #footer>
      <h1 class="color-orange">#{{userbook.book.bookInSeriesNo}}</h1>
    </template>
  </b-card>
</template>

<script>
export default {
  name: "UserBookSmall",
  data() {
    return {
      userbook: {
        id: 0,
        book:{
          id: 0,
          series: "Odyssey One",
          authors: "Evan Currie",
          categories: "Literatura, Fantastyka, Science fiction",
          title: "W samo sedno",
          description: "Okręt badawczy „Odyseja” powrócił z dziewiczej podróży. Powrócił, wioząc złe nowiny oraz ambasadorów – przedstawicieli innej, chodź ludzkiej, cywilizacji kosmicznej, uwikłanej w krwawą wojnę z okrutnymi obcymi. Ziemianie muszą podjąć decyzję, czy angażować się w walkę, podejmować ryzyko, czy też schować głowę w piasek i udawać, że odległy konflikt nie dotyczy Układu Słonecznego. Tymczasem sprawy się komplikują, jak zawsze, kiedy w grę zaczyna wchodzić polityka, a do tego pojawiają się nowe tajemnice. Kapitan Eric Weston jest gotów do czynu, czeka, aż władze jego świata pozwolą mu na działanie. Na szczęście nie musi czekać zbyt długo. A kiedy zapada już decyzja i okręt wyrusza z misją, zaczynają się prawdziwe kłopoty… W drugiej części cyklu Evana Currie poznajemy dalsze losy „Odysei”, jej nietuzinkowego dowódcy i dzielnej załogi. Powieść nie zawiedzie miłośników kosmicznej batalistyki, czytelnik zostaje wrzucony w wir akcji i są takie chwile, kiedy nie ma czasu zaczerpnąć oddechu przed kolejnym zwrotem akcji.",
          cover: "https://upolujebooka.pl/_data_cache/_data/offer/005/190_290_0_0_0_1_42943-odyssey_one_w_samo_sedno.jpg",
          bookInSeriesNo: 2
        },
        id_user:0,
        bookstore:{},
        editionType:"AUDIOBOOK",
        readingStatus:"",
        ownershipStatus:"",
        readFrom:"",
        readTo:"",
        info:""
      },

    }
  }


}
</script>

<style scoped>


.book_small {
  width: 300px;
  /*height: 500px;*/
  border: black 2px solid;
  margin: 15px;
  /*display: inline-block;*/
}

.book__large-type {
  margin: 10px 10px 0 10px;
  background-color: #343a40;
  padding: 10px 0px 1px 0px;
  text-align: center;
}

.book__large-picture {
  /*width: 95%;*/
  width: auto;
  height: 310px;
  margin: 10px;
}

.book__large-all {
  /*height: 347px;*/
  margin: 5px 0 0 20px;
  /*width: 50%;*/
  justify-content: left;
  text-align: left;
  overflow: auto;
}

.book__large-title {
  margin: 0px 10px 1px 0;
}

.book-subtitle {
  display: flex;
  flex-direction: row;
  margin: 0;
}

.book-subtitle-sub {
  margin: 5px 5px 5px 0;
  font-size: 14px;
}

.book-subtitle-bold {
  margin: 5px 5px 5px 0;
  font-weight: bold;
  font-size: 14px;
}

.book-discription {
  /*margin-left: 10px;*/
  /*float: left;*/
  text-align: left;
}

.book__large-discription-text {
  /*width: 475px;*/
  /*height: 153px;*/
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  color: #a3b8ce;
  resize: none;
}

.book-discription-area {
  /*background-color: #545b62;*/
  /*color: #a3b8ce;*/
}
</style>