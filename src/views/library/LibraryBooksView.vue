<template>
  <div>
    <TheHeaderLibrary/>
    <TheBooks />
  </div>
</template>

<script>
import TheBooks from "@/components/library/TheBooks";
import TheHeaderLibrary from "@/components/library/TheHeaderLibrary";
export default {
  name: "library-books",
  components: {
    TheBooks,
    TheHeaderLibrary
  },
};
</script>

<style scoped>
</style>