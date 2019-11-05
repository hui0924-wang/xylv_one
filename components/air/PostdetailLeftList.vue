<template>
  <div class="detail_comments_list">
      <div style="border: 1px solid #ddd;  ">
        <div class="comments_list" v-for="(item,index) in list" :key="index">
       <div class="list_info">
         <div class="info_left">
           <img :src="'http://157.122.54.189:9095' + item.account.defaultAvatar" alt="">
         {{item.account.nickname}} 
         <i>{{item.created_at}}</i>
         </div>
         <div class="info_right">
           <span>{{item.level}}</span>
         </div>
       </div>
       <div class="list_text">
         <PostdetailComments v-if="item.parent" :commentParents="item.parent" />
         <div class="text_area">
           <p>{{item.content}}</p>
         </div>
         <!-- <div>
           <div class="text_picture">
             <img src="" alt="">
           </div>
         </div> -->
         <div class="text_reply" @mouseover="mouseover" @mouseout="mouseover">
           <a href="javascript:;" v-html="isShow?'回复':''"></a>
         </div>
       </div>
     </div>
      </div>
     
    </div>
</template>

<script>
import PostdetailComments from '@/components/air/PostdetailComments'
export default {
  data () {
    return {
      isShow: false,
      list:[]
    }
  },
  components:{
    PostdetailComments
  },
  mounted () {
    let id = this.$route.query.id
    console.log(this.$route.query.id);
    this.$axios.get(`/posts/comments?post=${id}`).then(res => {
      console.log(res);
      this.list = res.data.data
    })
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
        padding: 20px 20px 5px;
      border-bottom: 1px dashed #ddd;
     .list_info {
       font-size: 12px;
       display: flex;
       justify-content: space-between;
      //  align-items: center;
        .info_left {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
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
        // padding: 0 0 0 30px;
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
        // .text_picture {
        //   width: 80px;
        //   height: 80px;
        //   border-radius: 6px;
        //   overflow: hidden;
        //   margin-right: 5px;
        //   margin-top: 10px;
        //   padding: 5px;
        //   border: 1px dashed #ddd;
        // }
      }
    }
    }
</style>