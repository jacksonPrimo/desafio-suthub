<template>
  <div>
    <div v-if="country">
      <v-card class="mx-3 my-3">
        <v-row>
          <v-col class="flag-container" md="4" sm="6" cols="12">
            <v-img :src="country.flags.svg" class="flag"></v-img>
          </v-col>
          <v-col md="8" sm="6" cols="12">
            <v-card-title> {{ country.name.common }} </v-card-title>
            <v-card-text>
              <v-row>
                <v-col lg="6" cols="12">
                  <v-icon>mdi-map-marker-question</v-icon> Lat/Long: {{country.latlng[0]}}/{{country.latlng[1]}}
                </v-col>
                <v-col lg="6" cols="12">
                  <v-icon>mdi-account-group</v-icon> População: {{country.population}}
                </v-col>
                <v-col lg="6" cols="12">
                  <v-icon>mdi-earth-box</v-icon> Região: {{country.region}}
                </v-col>
                <v-col lg="6" cols="12">
                  <v-icon>mdi-sort-alphabetical-variant</v-icon> Nome Oficial: {{country.name.official}}
                </v-col>
                <v-col v-if="country.capital" lg="6" cols="12">
                  <v-icon>mdi-city-variant</v-icon> Capital: {{country.capital.join(' / ')}}
                </v-col>
                <v-col v-if="country.languages" cols="12">
                  <v-icon>mdi-chat-processing-outline</v-icon> Idiomas: {{langs.join(' / ')}}
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div v-else-if="!country && !notFound">
      <country-loading></country-loading>
    </div>
    <div v-else class="text-center mt-5 red--text">
      <span>Conteúdo não encontrado</span>
      <v-icon color="red">mdi-emoticon-sad-outline</v-icon>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CountryLoading from '@/components/CountryLoading.vue'
export default Vue.extend({
  components: {
    CountryLoading
  },
  data: ()=>({
    country: null,
    notFound: false,
  }),
  computed: {
    langs(): Array<string>{
      if(this.country){
        return Object.values((this.country as any).languages)
      } else return []
    }
  },
  mounted(){
    const { code } = this.$route.params;
    this.$axios.$get(`${process.env.API_COUNTRIES}/alpha/${code}`)
      .then(resp=>{
        if(resp.length){
          this.country = resp[0]
        } else {
          this.notFound = true
        }
      })
  }  
})
</script>
<style lang="scss" scoped>
.flag-container {
  padding-top: 0 !important;
}
.flag-container .flag {
  border-top-left-radius: 4px !important;
  border-bottom-left-radius: 4px !important;
}
@media(max-width: 700px){
  .flag-container .flag {
    border-top-right-radius: 4px !important;
  }
}
</style>