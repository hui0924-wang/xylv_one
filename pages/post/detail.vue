<template>
  <div class="postdetail">
    <div class="postdetail_left">
      <PostdetailLeft :id="id"/>
    </div>
    <div class="postdetail_right">
      <PostdetailRight @sendId="getId"/>
    </div>
  </div>
</template>

<script>
import PostdetailLeft from "@/components/air/PostdetailLeft";
import PostdetailRight from "@/components/air/PostdetailRight";

export default {
  data(){
    return{
      id:''
    }
  },
  components: {
    PostdetailLeft,
    PostdetailRight
  },
  methods:{
    getId(v){
      this.id = v
    }
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