<template>
<div>
  <TheHeaderGoAhead/>
    <TheCustomer/>
  </div>
</template>

<script>
// @ is an alias to /src
// import Menu from '@/components/TheHeader.vue';
import TheCustomer from "@/components/goahead/TheCustomer";
import TheHeaderGoAhead from "@/components/goahead/TheHeaderGoAhead";
export default {
  name: 'Customer-View',
  components: {
    TheCustomer,
    TheHeaderGoAhead
},
};
</script>
