<template>
  <div>
    <TheHeaderLibrary/>
    <TheUserBooks />
  </div>
</template>

<script>
import TheUserBooksReadNow from "@/components/library/TheUserBooksReadNow";
import TheHeaderLibrary from "@/components/library/TheHeaderLibrary";
export default {
  name: "library-user-books-now",
  components: {
    TheUserBooks: TheUserBooksReadNow,
    TheHeaderLibrary
  },
};
</script>

<style scoped>
</style>