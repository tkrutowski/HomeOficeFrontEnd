<template>
  <div>
    <TheHeaderFinance/>
    <TheFee/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheFee from "@/components/finance/fee/TheFee";
import TheHeaderFinance from "@/components/finance/TheHeaderFinance";

export default {
  name: 'finance-fee-view',
  components: {
    TheFee,
    TheHeaderFinance
  },
};
</script>
