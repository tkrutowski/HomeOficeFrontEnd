<template>
  <div>
    <TheHeaderLibrary/>
    <TheHomePageLibrary/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeaderLibrary from "@/components/library/TheHeaderLibrary";
import TheHomePageLibrary from "@/components/library/TheHomePageLibrary";
export default {
  name: 'HomeView',
  components: {
    TheHomePageLibrary,
    TheHeaderLibrary
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
