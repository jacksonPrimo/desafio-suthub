<template>
  <div class="loading">
    <div class="load image"></div>
    <div>
      <div class="load information"></div>
      <div class="load information"></div>
      <div class="load information"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CountryLoading'
})
</script>
<style lang="scss" scoped>
.loading {
  margin: 10px;
  display: flex;
  .load {
    background-color: rgba(151, 151, 151, 0.274);
    border-radius: 15px;
  }
  .image {
    width: 50vh;
    height: 40vh;
    margin-right: 10px;
  }
  .information {
    width: 50vh;
    height: 25px;
    margin-bottom: 10px;
  }
}
@media(max-width: 600px){
  .loading {
    flex-direction: column;
    align-items: center;
    .image {
      width: 50vh;
      height: 40vh;
      margin-right: 0px;
      margin-bottom: 10px;
    }
    .information {
      width: 40vh;
      height: 25px;
      margin-bottom: 10px;
    }
  }
}
</style>