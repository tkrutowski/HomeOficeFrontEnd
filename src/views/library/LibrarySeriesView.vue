<template>
  <div>
    <TheHeaderLibrary/>
    <TheSeries/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheSeries from "@/components/library/TheSeries";
import TheHeaderLibrary from "@/components/library/TheHeaderLibrary";

export default {
  name: 'Library-Book-View',
  components: {
    TheSeries,
    TheHeaderLibrary
  },
};
</script>
