<template>
  <v-card class="card mx-1 my-1" role="button" :to="'/countries/'+country.cca2">
    <v-img 
      :src="country.flags.svg" 
      class="white--text align-end img-card"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
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
<style lang="scss" scoped>
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
.card .img-card {
  height: 210px;
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
@media (max-width: 700px) {
  .card .img-card {
    height: auto;
  }
}
</style>