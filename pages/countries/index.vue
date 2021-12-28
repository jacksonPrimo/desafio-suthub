<template>
  <div class="d-flex flex-column">
    <v-row class="mx-2">
      <v-col lg="4">
        <v-autocomplete
          v-model="searchType"
          :items="searchTypes"
          label="Buscar por"
        ></v-autocomplete>
      </v-col>
      <v-col lg="4">
        <v-autocomplete
          v-model="searchValue"
          :items="searchOptions"
          label="Valor"
        ></v-autocomplete>
      </v-col>
      <v-col lg="4" class="d-flex align-items-center">
        <v-btn color="teal draken-4" dark class="my-auto" @click="search()">
          <v-icon>mdi-map-search</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(country, index) in paginedCountries"
          :key="index"
          lg="3"
          md="4"
          sm="6"
          cols="12"
        >
          <CountryCard :country="country" />
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="pages"
        :total-visible="6"
        color="teal draken-4"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CountryCard from "@/components/CountryCard.vue";
import { CountryInterface } from "@/interfaces/countryInterface";
export default Vue.extend({
  name: 'IndexPage',
  components: { CountryCard },
  data: () => ({
    page: 1,
    itemsPerPage: 8,
    allCountries: [],
    filteredCountries: [],
    searchTypes: [ "Nome", "Região", "Idioma" ],
    searchType: "",
    searchValue: ""
  }),
  computed: {
    searchOptions() {
      if(this.searchType === "Nome"){
        return this.allCountries.map((ac: CountryInterface)=>{
          return ac.name.common
        })
      } 
      else if(this.searchType === "Região"){
        return [...new Set(this.allCountries.map((ac: CountryInterface)=>{
          return ac.region
        }))]
      }
      else if(this.searchType === "Idioma"){
        const langsByCountry = this.allCountries.map((ac: CountryInterface)=>{
          if(ac.languages){
            return Object.values(ac.languages)
          } else {
            return []
          }
        })
        const concatened = langsByCountry.flat(1)
        const withoutRepeat = [...new Set(concatened)]
        return withoutRepeat;
      }
      else {
        return []
      }
    },
    pages(): number {
      return Math.ceil(this.filteredCountries.length / this.itemsPerPage)
    },
    paginedCountries(): Array<CountryInterface> {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCountries.slice(start, end);
    },
  },
  mounted() {
    this.$axios.$get(`${process.env.API_COUNTRIES}/all`).then((resp) => {
      this.allCountries = resp;
      this.filteredCountries = resp;
    });
  },
  methods: {
    search(){
      this.page = 1
      const type = 
        this.searchType === 'Nome' ? 'name': 
        this.searchType === 'Idioma' ? 'lang':
        this.searchType === 'Região' ? 'region': null;
      if(type && this.searchValue){
        this.$axios.$get(`${process.env.API_COUNTRIES}/${type}/${this.searchValue}`).then((resp) => {
          this.filteredCountries = resp;
        })
      } else {
        this.filteredCountries = this.allCountries
      }
    },
  }
})
</script>
