<template>
  <div class="container">
    <!-- <HotelSearch @getCity="getCityData" /> -->
    <HotelSearch @getCity="getCityData" />
    <!-- 我改动的 -->
    <HotelOptions :scenicsList="scenicsList" />
    <searchHotel />
    <hotelList />
  </div>
</template>

<script>
import searchHotel from "@/components/hotel/searchHotel";
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
  //============ 我改动的====================
  data() {
    return {
      scenicsList: []
    };
  },
  methods: {
    // 当前选择城市
    getCityData(value) {
      // console.log(value);
      this.scenicsList = value.scenics;
    }
  },
  //============ 我改动的=====================
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