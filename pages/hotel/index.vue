<template>
  <div class="container">
    <HotelSearch @getCity="getCityData" />
  </div>
</template>

<script>
import HotelSearch from "@/components/hotel/HotelSearch.vue";
export default {
  components: {
    HotelSearch
  },
  methods: {
    // 当前选择城市
    getCityData(value) {
      console.log(value);
    }
  }
};
</script>

<style>
</style>