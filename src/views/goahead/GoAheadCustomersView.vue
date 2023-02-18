<template>
  <div>
    <TheHeaderGoAhead/>
    <TheCustomers />
  </div>
</template>

<script>
import TheCustomers from "@/components/goahead/TheCustomers";
import TheHeaderGoAhead from "@/components/goahead/TheHeaderGoAhead";
export default {
  name: "goahead-customers",
  components: {
    TheCustomers,
    TheHeaderGoAhead
  },
};
</script>

<style scoped>
</style>