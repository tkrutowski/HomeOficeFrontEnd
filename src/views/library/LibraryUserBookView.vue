<template>
  <div>
    <TheHeaderLibrary/>
    <TheUserBook/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheUserBook from "@/components/library/TheUserbook";
import TheHeaderLibrary from "@/components/library/TheHeaderLibrary";

export default {
  name: 'Library-UserBook-View',
  components: {
    TheUserBook,
    TheHeaderLibrary
  },
};
</script>
