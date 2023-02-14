<template>
  <div>
    <TheHeaderGoAhead/>
    <TheHomePageGoAhead/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheHomePageGoAhead from "@/components/goahead/TheHomePageGoAhead";
import TheHeaderGoAhead from "@/components/goahead/TheHeaderGoAhead";
export default {
  name: 'HomeView',
  components: {
    TheHomePageGoAhead,
    TheHeaderGoAhead
  },
};
</script>
