<template>
  <el-tooltip effect="dark" content="等级评定是针对房价，设施和服务器等各方面水平的综合评估。" placement="bottom-start">
    <div>
      <i class="iconfont iconhuangguan" v-for="item in startList" :key="item"></i>
      <span class="price_budget">￥{{price}}</span>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  props: ["starLevel", "price"],
  data() {
    return {
      startList: []
    };
  },
  mounted() {
    for (let i = 0; i < this.starLevel; i++) {
      this.startList.push(i);
    }
  }
};
</script>

<style lang="less" scoped>
.iconhuangguan {
  color: #f90;
}
</style>