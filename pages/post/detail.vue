<template>
  <div class="postdetail">
    <div class="postdetail_left">
      <PostdetailLeft />
    </div>
    <div class="postdetail_right">
      2
    </div>
  </div>
</template>

<script>
import PostdetailLeft from "@/components/air/PostdetailLeft";

export default {
components: {
  PostdetailLeft
}
}
</script>

<style lang='less' scoped>
.postdetail {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  .postdetail_left {
    flex: 3;
  }
  .postdetail_right {
    flex: 1;
  }
}
</style>