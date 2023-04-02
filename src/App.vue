<template>
  <div id="app">
<!--    <TheHeader/>-->
    <router-view/>
<!--    <TheFooter/>-->
  </div>
</template>

<script>
// import TheFooter from "./components/TheFooter.vue"
export default {
  name: 'App',
  components: {
    // TheFooter,
    // TheHeader
}
}
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
   /*background-color: rgb(29,29,29); */
  /*goahead*/
  /*background-color: #e4e1d8 !important;*/

  background-color: #222526 !important;
  /*background-color: crimson;*/
  /* color: #2c3e50; */
  /*goahead*/
  color: #2da687 !important;
  /* margin-top: 60px; */
}

</style>
