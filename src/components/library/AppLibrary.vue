<template>
  <div id="applibrary">
    <TheHeaderLibrary/>
    <router-view/>
    <TheFooterLibrary/>
  </div>
</template>

<script>
import TheHeaderLibrary from "@/components/library/TheHeaderLibrary";
import TheFooterLibrary from "@/components/library/TheFooterLibrary";
export default {
  name: 'AppLibrary',
  components: {
    TheHeaderLibrary,
    TheFooterLibrary
}
}
</script>

<style >
#applibrary {
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
