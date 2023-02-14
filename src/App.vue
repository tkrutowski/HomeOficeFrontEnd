<template>
  <div id="app">
<!--    <TheHeader/>-->
    <router-view/>
<!--    <TheFooter/>-->
  </div>
</template>

<script>
// import TheFooter from "./components/TheFooter.vue"
// import TheHeader from "./components/TheHeader.vue"
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
  /* background-color: rgb(29,29,29); */
  background-color: #e4e1d8 !important;
  /* color: #2c3e50; */
  color: #2da687 !important;
  /* margin-top: 60px; */
}

</style>
