<template>
  <div>
    <TheHeaderFinance/>
    <TheFees />
  </div>
</template>

<script>
import TheFees from "@/components/finance/fee/TheFees";
import TheHeaderFinance from "@/components/finance/TheHeaderFinance";
export default {
  name: "finance-fees",
  components: {
    TheFees,
    TheHeaderFinance
  },
};
</script>

<style scoped>
</style>