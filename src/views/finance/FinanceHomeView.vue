<template>
  <div>
    <TheHeaderFinance/>
    <TheHomePageFinance/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeaderFinance from "@/components/finance/TheHeaderFinance";
import TheHomePageFinance from "@/components/finance/TheHomePageFinance";
export default {
  name: 'HomeView',
  components: {
    TheHomePageFinance,
    TheHeaderFinance
  },
};
</script>
<style>


::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #2E3236;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(219, 117, 0, 1) !important;
  border-radius: 10px;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:active {
  background-color: #C25C00;
  cursor: pointer;
}
</style>
