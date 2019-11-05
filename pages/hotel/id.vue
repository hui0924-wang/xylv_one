<template>
  <div class="Thehoteldetails">
    <el-breadcrumb class="breadcrumbs">
  <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
  <el-breadcrumb-item>南京酒店</el-breadcrumb-item>
  <el-breadcrumb-item>好来阁酒店</el-breadcrumb-item>
</el-breadcrumb>
  <div class="hotel-thehead">
     <h2>好来阁商务宾馆</h2>
     <span>
       <i class="iconfont iconhuangguan"></i>
       <i class="iconfont iconhuangguan"></i>
       <i class="iconfont iconhuangguan"></i>
       <i class="iconfont iconhuangguan"></i>
       <i class="iconfont iconhuangguan"></i>
     </span>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.Thehoteldetails{
  width: 1000px;
  margin: 0 auto;
  .breadcrumbs{
    padding: 20px 0;
  }
  .hotel-thehead{
    display: flex;
    > h2{
      font-weight: normal;
      margin-right: 10px;
    }
    > span{
      margin-top: 8px;
      color: orange;
    }
  }
}
</style>
