<template>
  <v-card class="card mx-1 my-1" role="button" :to="'/countries/'+country.cca2">
    <v-img 
      :src="country.flags.svg" 
      height="200px"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    >
      <v-card-title class="card-title"> {{ country.name.common }} </v-card-title>
    </v-img>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { CountryInterface } from "@/interfaces/countryInterface";
export default Vue.extend({
  props: {
    country: {
      type: Object as () => CountryInterface,
      default: {} as CountryInterface
    },
  },
  data: () => ({
    show: false,
  }),
});
</script>
<style lang="scss">
.card {
  position: relative;
}
.card-title {
  visibility: hidden;
  position: absolute;
  bottom: 0; 
}
.card:hover .card-title {
  animation: showTitle 700ms ease-in-out forwards;
}
@keyframes showTitle {
  0% {
    visibility: hidden;
    transform: translateY(45px);
  }
  100% {
    visibility: visible;
    transform: translateY(0px);
  }
}
</style>