<template>
  <div>
    <TheHeaderLibrary/>
    <TheUserBooks />
  </div>
</template>

<script>
import TheUserBooksToRead from "@/components/library/TheUserBooksToRead";
import TheHeaderLibrary from "@/components/library/TheHeaderLibrary";
export default {
  name: "library-user-books-to",
  components: {
    TheUserBooks: TheUserBooksToRead,
    TheHeaderLibrary
  },
};
</script>

<style scoped>
</style>