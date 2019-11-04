<template>
  <div class="hotel_options">
    <el-row :gutter="10">
      <!-- 这里 -->
      <el-col :span="14">
        <el-row type="flex">
          <el-col :span="3">区域:</el-col>
          <el-col>3</el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">攻略:</el-col>
          <el-col>4</el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">
            均价:
            <div class="div">
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">?</el-tooltip>
            </div>
          </el-col>
          <el-col>5</el-col>
        </el-row>
      </el-col>
      <el-col :span="10">2</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    cityData: {
      type: Object,
      default: {}
    },
    hotelDetail: {
      type: Object,
      default: {}
    }
  },
  // 监听城市变化
  watch: {
    cityData(newV, oldV) {
      // console.log(newV);
      this.cityData = newV;
      console.log(this.cityData);
    },
    // 监听酒店详情变化
    hotelDetail(newV, oldV) {
      this.hotelDetail = newV;
      console.log(this.hotelDetail);
    }
  }
};
</script>

<style>
</style>