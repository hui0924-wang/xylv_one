<template>
  <div class="container">
    <!-- <HotelSearch @getCity="getCityData" /> -->
    <HotelSearch />
    <HotelOptions />
    <searchHotel />
    <hotelList />
  </div>
</template>

<script>
import searchHotel from "@/components/hotel/searchHotel.vue";
import HotelOptions from "@/components/hotel/HotelOptions";
import hotelList from "@/components/hotel/hotelList.vue";
import HotelSearch from "@/components/hotel/HotelSearch.vue";
export default {
  components: {
    HotelSearch,
    searchHotel,
    hotelList,
    HotelOptions
  },
  // methods: {
  //   // 当前选择城市
  //   getCityData(value) {
  //     console.log(value);
  //   }
  // }
  mounted() {
    console.log(this.$store.state);
    // this.$store.commit('')
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
</style>