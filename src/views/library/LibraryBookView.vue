<template>
  <div>
    <TheHeaderLibrary/>
    <TheBook/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheBook from "@/components/library/TheBook";
import TheHeaderLibrary from "@/components/library/TheHeaderLibrary";

export default {
  name: 'Library-Book-View',
  components: {
    TheBook,
    TheHeaderLibrary
  },
};
</script>
