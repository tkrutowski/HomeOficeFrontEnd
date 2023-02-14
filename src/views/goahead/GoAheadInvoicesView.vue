<template>
  <div>
    <TheHeaderGoAhead/>
    <TheInvoices />
  </div>
</template>

<script>
import TheInvoices from "@/components/goahead/TheInvoices";
import TheHeaderGoAhead from "@/components/goahead/TheHeaderGoAhead";
export default {
  name: "goahead-invoices",
  components: {
    TheInvoices,
    TheHeaderGoAhead
  },
};
</script>

<style scoped>
</style>