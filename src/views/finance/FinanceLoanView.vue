<template>
  <div>
    <TheHeaderFinance/>
    <TheLoan/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheLoan from "@/components/finance/loans/TheLoan";
import TheHeaderFinance from "@/components/finance/TheHeaderFinance";

export default {
  name: 'finance-loan-view',
  components: {
    TheLoan,
    TheHeaderFinance
  },
};
</script>
