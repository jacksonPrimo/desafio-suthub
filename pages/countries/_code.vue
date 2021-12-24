<template>
  <div>
    <div v-if="country">
      <v-card class="mx-3 my-3 card d-flex">
        <v-row>
          <v-col lg="4" cols="12" class="d-flex justify-content-center">
            <v-img :src="country.flags.svg" class="flag"></v-img>
          </v-col>
          <v-col lg="8" cols="12">
            <v-card-title> {{ country.name.common }} </v-card-title>
            <v-card-text>
              <v-row>
                <v-col lg="6" cols="12">
                  <v-icon>mdi-account-group</v-icon> população: {{country.population}}
                </v-col>
                <v-col lg="6" cols="12">
                  <v-icon>mdi-earth-box</v-icon> Região: {{country.region}}
                </v-col>
                <v-col lg="6" cols="12">
                  <v-icon>mdi-sort-alphabetical-variant</v-icon> Nome Oficial: {{country.name.official}}
                </v-col>
                <v-col v-if="country.capital" lg="6" cols="12">
                  <v-icon>mdi-city-variant</v-icon> Capital: {{country.capital.join('/')}}
                </v-col>
                <v-col v-if="country.languages" cols="12">
                  <v-icon>mdi-city-variant</v-icon> Idiomas: 
                  <ul>
                    <li v-for="(lang, index) in langs" :key="index">
                      {{lang}}
                    </li>
                  </ul>
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
     items: [
        {
          icon: 'mdi-inbox',
          text: 'Inbox',
        },
        {
          icon: 'mdi-star',
          text: 'Star',
        },
        {
          icon: 'mdi-send',
          text: 'Send',
        },
        {
          icon: 'mdi-email-open',
          text: 'Drafts',
        },
      ],
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
    this.$axios.$get(`/alpha/${code}`)
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
@media(max-width: 700px){
  .flag {
    width: 400px !important;
  }
}
</style>