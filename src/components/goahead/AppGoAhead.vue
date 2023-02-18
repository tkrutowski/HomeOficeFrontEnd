<template>
  <div id="appgoahead">
    <TheHeaderGoAhead/>
    <router-view/>
    <TheFooterGoAhead/>
  </div>
</template>

<script>
import TheHeaderGoAhead from "@/components/goahead/TheHeaderGoAhead";
import TheFooterGoAhead from "@/components/goahead/TheFooterGoAhead";
export default {
  name: 'AppGoAhead',
  components: {
    TheHeaderGoAhead,
    TheFooterGoAhead
}
}
</script>

<style >
#appgoahead {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color: rgb(29,29,29); */
  background-color: #e4e1d8;
  /* color: #2c3e50; */
  color: #a3b8ce;
  /* margin-top: 60px; */
}

</style>
