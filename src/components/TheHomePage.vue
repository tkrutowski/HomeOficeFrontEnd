<template>
  <div class="home">
    <div style="margin-top: 200px">
    <b-card-group deck>
      <b-card
          title="Go Ahead"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>

        <b-button href="/goahead/" variant="primary">GoAhead</b-button>
      </b-card>

      <b-card
          title="Płatności"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
      >
        <b-card-text>
          Rachunki, kredyty
        </b-card-text>

        <b-button href="#" variant="primary">Płatności</b-button>
      </b-card>

      <b-card
          title="Rozliczenia"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
      >
        <b-card-text>
          Rozliczenia zakupów.
        </b-card-text>

        <b-button href="#" variant="primary">Zakupy</b-button>
      </b-card>

      <b-card
          title="Płatności"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
      >
        <b-card-text>
          Rachunki, kredyty
        </b-card-text>

        <b-button href="#" variant="primary">Płatności</b-button>
      </b-card>

      <b-card
          title="Biblioteka"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
      >
        <b-card-text>
          Spis przeczytanych książek.
        </b-card-text>

        <b-button href="#" variant="primary">Biblioteka</b-button>
      </b-card>

      <b-card
          title="Płatności"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
      >
        <b-card-text>
          Rachunki, kredyty
        </b-card-text>

        <b-button href="#" variant="primary">Płatności</b-button>
      </b-card>

      <b-card
          title="Urządzenia"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
      >
        <b-card-text>
          Spis zakupionych urządzeń: cena, gwarancja itp.
        </b-card-text>

        <b-button href="#" variant="primary">Urządzenia</b-button>
      </b-card>

    </b-card-group>
      <h1 class="mb-5" v-if="!isAuthenticated">Najpierw się zaloguj...</h1>
      <div v-else class="mb-5">
        <h1>Część już działa. Można używać...</h1>
        <h4>Działa cały moduł PRACOWNICY</h4>
        <h4>Działa Zadania -> Kalendarz</h4>

        <br />
        <b-link class="text-ahead-green" href="/goahead/">--GOAHEAD--</b-link>
        <br />
        <p class="text-center">
          ps. Wszelkie uwagi miłe widziane
          <b-icon icon="emoji-smile" scale="1.3" variant="progas"></b-icon>
        </p>
      </div>
<!--      <img src="../assets/under-construction.png" alt="Girl in a jacket" height="343" width="686" />-->
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      isAuthenticated: true,
    };
  },
  created() {
    console.log("created");
    // this.isAuthenticated = this.$store.getters.getAuthenticationState;
  },
};
</script>
