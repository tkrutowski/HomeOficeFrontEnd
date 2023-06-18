<template>
  <div id="app-finance">
    <TheHeaderFinance/>
    <router-view/>
    <TheFooterFinance/>
  </div>
</template>

<script>
import TheHeaderFinance from "@/components/finance/TheHeaderFinance";
import TheFooterFinance from "@/components/finance/TheFooterFinance";
export default {
  name: 'AppFinance',
  components: {
    TheHeaderFinance,
    TheFooterFinance
}
}
</script>

<style >
#app-finance {
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
