<template>
  <div class="container">
    <HotelSearch @getCity="getCityData" />
    <searchHotel />
    <hotelList />
  </div>
</template>

<script>
import searchHotel from "@/components/hotel/searchHotel.vue";
import hotelList from "@/components/hotel/hotelList.vue";
import HotelSearch from "@/components/hotel/HotelSearch.vue";
export default {
  components: {
    HotelSearch,
    searchHotel,
    hotelList
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