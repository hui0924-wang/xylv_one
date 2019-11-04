<template>
  <div class="h">
    <div>酒店</div>
    <searchHotel/>
    <hotelList/>
  </div>
</template>

<script>
import searchHotel from '@/components/hotel/searchHotel.vue'
import hotelList from '@/components/hotel/hotelList.vue'
export default {
  components:{
    searchHotel,hotelList
  }
}
</script>

<style lang="less" scoped>
.hotel{
  width: 1000px;
  margin: 0 auto;
}
</style>