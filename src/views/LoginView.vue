<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <Menu/> -->
<!-- <h1>login</h1> -->
    <TheLogin/>

  </div>
</template>

<script>
import TheLogin from "@/components/TheLogin.vue";
// @ is an alias to /src
// import Menu from '@/components/TheHeader.vue';

export default {
  name: 'LoginView',
  components: {
    TheLogin
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
