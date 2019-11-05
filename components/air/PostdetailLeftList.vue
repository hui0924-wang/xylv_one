<template>
  <div class="detail_comments_list">
      <div class="comments_list">
       <div class="list_info">
         <div class="info_left">
           <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
         13800138000 
         <i>2019-11-03 5:03</i>
         </div>
         <div class="info_right">
           <span>1</span>
         </div>
       </div>
       <div class="list_text">
         <div class="text_area">
           <p>y</p>
         </div>
         <div class="text_reply" @mouseover="mouseover" @mouseout="mouseover">
           <a href="javascript:;" v-html="isShow?'回复':''"></a>
         </div>
       </div>
     </div>
     <div class="comments_list">
       <div class="list_info">
         <div class="info_left">
           <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
         
         <i></i>
         </div>
         <div class="info_right">
           <span>1</span>
         </div>
       </div>
       <div class="list_text">
         <div class="text_area">
           <p></p>
         </div>
         <div class="text_reply" @mouseover="mouseover" @mouseout="mouseover">
           <a href="javascript:;" v-html="isShow?'回复':''"></a>
         </div>
       </div>
     </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false
    }
  },
 methods:{
    mouseover(){
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang='less' scoped>
 .detail_comments_list {
      margin-top: 20px;
      .comments_list {
      border: 1px solid #ddd;
      padding: 20px 20px 5px;
     .list_info {
       font-size: 12px;
       display: flex;
       justify-content: space-between;
      //  align-items: center;
        .info_left {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
          width: 16px;
          height: 16px;
          border-radius: 50%;
           margin-right: 4px;
        }
        i {
          font-style: normal;
          color: #999;
          padding-left: 4px;
         }
        }
        .info_right {
          color: #999;
        }
      }
      .list_text {
        padding: 0 0 0 30px;
        .text_area {
          p {
            padding: 10px 0;
          }
        }
        .text_reply {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #1e50a2;
          text-align: right;
          a {
            text-decoration: none;
            color: inherit;
            // display: none;
          }
        }
      }
    }
    }
</style>