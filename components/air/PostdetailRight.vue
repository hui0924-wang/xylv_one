<template>
  <div class="Postdetailright">
    <h4>相关攻略</h4>
    <div class="detail_article" v-for="(item,index) in postDetail" :key="index">
      <div @click="handleClick(item.id)">
        <div class="article">
          <div class="article_left">
            <img src="" alt="">
          </div>
          <div class="article_right">
            <div class="right_text">
              {{item.title}}
            </div>
            <div class="right_bottom"><p>{{item.updated_at}} <div >阅读 {{item.watch}}</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      postDetail:[]
    }
  },
  mounted() {
    this.$axios.get("/posts").then(res => {
      console.log(res);
      this.postDetail = res.data.data
      console.log(this.postDetail);
    });
  },
  methods:{
    handleClick(v){
      this.$emit('sendId',v)
    }
  }
}
</script>

<style lang='less' scoped>
.Postdetailright {
  h4 {
    padding: 10px 0;
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  >div {
    cursor: pointer;
    display: block;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    .article {
      display: flex;
     .article_left {
        width: 100px;
        height: 80px;
        flex-shrink: 0;
        background: #ddd;
        overflow: hidden;
        margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
              }
          }
          .article_right {
            flex: 1;
            position: relative;
            .right_text {
              line-height: 1.4em;
              height: 2.8em;
              overflow: hidden;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              color: #000;
            }
            .right_bottom {
              display: flex;
              justify-content: space-around;
              position: absolute;
              bottom: 0;
              left: 0;
              font-size: 12px;
              color: #999;
              p {
                padding-right: 5px;
              }
            }
          }
    }
    
  }
}
</style>