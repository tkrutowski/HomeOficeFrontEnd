<template>
  <div>
    <TheHeader/>
    <Login/>
  </div>
</template>

<script>
import Login from "@/components/TheLogin.vue";
import TheHeader from "@/components/TheHeaderHome.vue"
export default {
  name: "Error_401",
  components: { Login, TheHeader },
}
</script>