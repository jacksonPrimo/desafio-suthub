<template>
  <v-app>
    <v-app-bar app dark color="blue-grey darken-4">
      <div>
        <v-toolbar-title> SUTHUB </v-toolbar-title>
      </div>
      <v-icon>mdi-earth</v-icon>
      <v-tabs>
        <v-tab to="/countries">
          <v-icon>mdi-map-search-outline</v-icon>
          PAÍSES
        </v-tab>
        <v-tab to="/">
          <v-icon>mdi-account-plus</v-icon>
          CADASTRO
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
    <v-footer class="pa-0" dark color="blue-grey darken-4">
      <v-card flat tile width="100%" class="lighten-1 text-center">
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Desafio Suthub</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style>
.v-tabs-bar {
  float: right !important;
}

.v-tab {
  text-transform: none !important;
}
</style>
