<template>
  <div>
    <TheHeaderFinance/>
    <TheLoans />
  </div>
</template>

<script>
import TheLoans from "@/components/finance/loans/TheLoans";
import TheHeaderFinance from "@/components/finance/TheHeaderFinance";
export default {
  name: "finance-loans",
  components: {
    TheLoans,
    TheHeaderFinance
  },
};
</script>

<style scoped>
</style>