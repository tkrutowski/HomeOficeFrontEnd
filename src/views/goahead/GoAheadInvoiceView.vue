<template>
<div>
  <TheHeaderGoAhead/>
    <TheInvoice/>
  </div>
</template>

<script>
// @ is an alias to /src
// import Menu from '@/components/TheHeader.vue';
import TheInvoice from "@/components/goahead/TheInvoice";
import TheHeaderGoAhead from "@/components/goahead/TheHeaderGoAhead";
export default {
  name: 'Invoice-View',
  components: {
    TheInvoice,
    TheHeaderGoAhead
},
};
</script>
