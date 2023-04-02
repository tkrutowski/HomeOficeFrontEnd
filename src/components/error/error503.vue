<template>
  <div>
    <TheHeader/>
    <div class="mt-5 pt-5">
      <h2>Serwis chwilowo niedostępny</h2>
      <h3>Proszę spróbować za chwilę...</h3>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeaderHome";

export default {
  name: "Error_503",
  components: {TheHeader},
}
</script>