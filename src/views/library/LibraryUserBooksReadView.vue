<template>
  <div>
    <TheHeaderLibrary/>
    <TheUserBooks />
  </div>
</template>

<script>
import TheUserBooksRead from "@/components/library/TheUserBooksRead";
import TheHeaderLibrary from "@/components/library/TheHeaderLibrary";
export default {
  name: "library-user-books-read",
  components: {
    TheUserBooks: TheUserBooksRead,
    TheHeaderLibrary
  },
};
</script>

<style scoped>
</style>