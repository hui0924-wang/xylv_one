<template>
  <div class="hotel_options">
    <el-row :gutter="10">
      <!-- 这里 -->
      <el-col :span="14">
        <el-row type="flex">
          <el-col :span="3">区域:</el-col>
          <el-col>
            <div class="scenics_box">
              <a href="#">全部</a>
              <a v-for="(item,index) in cityData.scenics" :key="index">{{item.name}}</a>
            </div>
            <a href="#">
              <i class="el-icon-d-arrow-right"></i>
              等43个区域
            </a>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">攻略:</el-col>
          <el-col>4</el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">
            均价:
            <div class="div">
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <div class="question_mark">?</div>
              </el-tooltip>
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
  // props: {
  //   cityData: {
  //     type: Object,
  //     default: {}
  //   },
  //   hotelDetail: {
  //     type: Object,
  //     default: {}
  //   }
  // },
  // 监听城市变化
  // watch: {
  //   cityData(newV, oldV) {
  //     // console.log(newV);
  //     this.cityData = newV;
  //     console.log(this.cityData);
  //   },
  //   // 监听酒店详情变化
  //   hotelDetail(newV, oldV) {
  //     this.hotelDetail = newV;
  //     // console.log(this.hotelDetail);
  //   }
  // }
};
</script>

<style lang="less" scoped>
.hotel_options {
  color: #666;
  a {
    color: inherit;
    text-decoration: none;
  }
  .scenics_box {
    a {
      font-size: 14px;
      padding: 0 2px;
      margin-right: 10px;
    }
  }
  .el-icon-d-arrow-right {
    color: rgb(255, 153, 0);
  }
}
</style>