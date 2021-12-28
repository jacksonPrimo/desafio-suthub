<template>
  <v-app>
    <v-app-bar app light>
      <v-img 
        class="mr-3" 
        src="/logo-suthub.png" 
        width="150px"
      ></v-img>
      <v-tabs color="teal draken-3">
        <v-tab to="/">
          <v-icon>mdi-account-plus</v-icon>
          CADASTRO
        </v-tab>
        <v-tab to="/countries">
          <v-icon>mdi-map-search-outline</v-icon>
          PAÍSES
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="my-4">
      <Nuxt />
    </v-main>
    <v-footer class="pa-0" dark>
      <v-card flat tile width="100%" class="text-center py-4" color="teal draken-4">
        <v-card-text class="gray--text">
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
