<template>
  <div class="home">
    <TheHeader/>
    <TheLogin/>

  </div>
</template>

<script>
import TheLogin from "@/components/TheLogin.vue";
import TheHeader from "@/components/TheHeaderHome.vue"
// @ is an alias to /src

export default {
  name: 'LoginView',
  components: {
    TheLogin, TheHeader
},
};
</script>
<style>
.home {
  color: rgb(238, 127, 0);
  margin-top: 20px;
  background-color: #222526;

}

</style>
