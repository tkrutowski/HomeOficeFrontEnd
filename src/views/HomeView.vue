<template>
  <div>
    <TheHeaderHome/>
   <HomePage/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/TheHomePage.vue';
import TheHeaderHome from "@/components/TheHeaderHome";

export default {
  name: 'HomeView',
  components: {
    TheHeaderHome,
    HomePage
  },
};
</script>
