<template>
<b-container>
  <b-card
          title="Książki z cyklu..."
          bg-variant="office-dark1"
          class="mb-5 text-office-orange"
  >
    <b-form @submit.stop.prevent="getSeriesById" autocomplete="off">

      <!-- ROW-1  URL-->
      <div class="row card-elem-office">
        <b-form-group class="col" label="Wybierz cykl:" label-for="input-series">
          <div style="display: flex">
            <b-form-select class="input-office-orange border-orange"
                id="input-series"
                v-model="selectedSeries"
                :options="optionsSeries"
                required
            >
              <b-icon
                  class="pl-2"
                  scale="2.6"
                  icon="check"
                  variant="success"
                  aria-hidden="true"
              ></b-icon>
            </b-form-select>
            <b-button
                v-if="loadingSeries"
                style="height: fit-content"
                variant="office"
                class="ml-3"
                disabled
            >
              <b-spinner small></b-spinner>
              <span class="sr-only">Loading...</span>
            </b-button>
          </div>
        </b-form-group>
      </div>

      <b-button class="edit-button" variant="office" :disabled="searchDisabled" type="submit"
      >Wyszukaj
        <b-icon
            v-if="savedSearchIcon"
            class="pl-2"
            scale="2.6"
            icon="check"
            variant="success"
            aria-hidden="true"
        ></b-icon>
        <b-icon
            v-if="errorSearchIcon"
            class="pl-2"
            scale="1.6"
            icon="x-circle"
            variant="danger"
            aria-hidden="true"
        ></b-icon>
        <b-icon
            v-if="busySearchIcon"
            icon="arrow-clockwise"
            animation="spin-pulse"
            font-scale="1"
        ></b-icon>
      </b-button>
    </b-form>
  </b-card>

  <div v-for="book in bookBySeries" :key="book.id">
    <SeriesBook   :book="book"/>
  </div>
</b-container>
</template>

<script>
import {errorMixin} from "@/mixins/error";
import {bookMixin} from "@/mixins/book";
import SeriesBook from "@/components/library/SeriesBook";
import {seriesMixin} from "@/mixins/series";

export default {
  components: {SeriesBook},
  mixins: [errorMixin, bookMixin, seriesMixin],
  name: "TheSeries",
  data() {
    return {
      selectedSeries:0,
      optionsSeries:[],
      bookBySeries:[],

      busySearchIcon: false,
      savedSearchIcon: false,
      errorSearchIcon: false,
      searchDisabled: false
      }
  },

  mounted() {
    console.log("mounted TheSeries");
  },
  created() {
    console.log("created TheSeries");
    this.fillOptions();
  },
  methods: {
    getSeriesById(){
      console.log("getSeriesById()");
      this.changeStatusSearchIcon(true, false, false);
      this.getBookBySeriesIdFromDb(this.selectedSeries).then((response) => {
        this.bookBySeries = response.data;
      this.changeStatusSearchIcon(false, false, false);
      });
      console.log("Book by series: " + JSON.stringify(this.bookBySeries));
    },

    fillOptions() {
      console.log("START - fillOptions() for SERIES");
      this.loadingSeries =  true;
      this.getSeriesFromDb().then((response) => {
        // console.log(JSON.stringify(response.data));
        this.convertSeriesToOptions(response.data);
      this.loadingSeries =  false;
        console.log("END - fillOptions() for SERIES");
      });
    },

    changeStatusSearchIcon(busy, saved, error) {
      this.busySearchIcon = busy;
      this.errorSearchIcon = error;
      this.savedSearchIcon = saved;
    },

    //---------------------------------------  CONVERT TO OPTION ----------------------------------------------------
    convertSeriesToOptions(series) {
      console.log("convert to convertSeriesToOptions...");
      // console.log(JSON.stringify(types));
      series.forEach((e) => {
        let opt = {
          value: e.id,
          text: e.title,
        };
        this.optionsSeries.push(opt);
        console.log(e.name + " - " + e.viewName);
      });
    },
  }
}
</script>

<style scoped>
@import "../../assets/css/main.css";
</style>