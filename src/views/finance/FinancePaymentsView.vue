<template>
  <div>
    <TheHeaderFinance/>
    <ThePayments />
  </div>
</template>

<script>
import ThePayments from "@/components/finance/payment/ThePayments";
import TheHeaderFinance from "@/components/finance/TheHeaderFinance";
export default {
  name: "finance-payments",
  components: {
    ThePayments,
    TheHeaderFinance
  },
};
</script>

<style scoped>
</style>