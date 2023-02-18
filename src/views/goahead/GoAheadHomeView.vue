<template>
  <div>
    <TheHeaderGoAhead/>
    <TheHomePageGoAhead/>
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeaderGoAhead from "@/components/goahead/TheHeaderGoAhead";
import TheHomePageGoAhead from "@/components/goahead/TheHomePageGoAhead";
export default {
  name: 'HomeView',
  components: {
    TheHomePageGoAhead,
    TheHeaderGoAhead
  },
};
</script>
