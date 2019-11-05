<template>
  <div class="comments_list" >
    <PostdetailComments :commentParents="commentParents.parent" v-if="commentParents.parent" />
       <div class="list_info">
         <div class="info_left">
           <!-- <img :src="'http://157.122.54.189:9095' + commentParents.account.defaultAvatar" alt=""> -->
         {{commentParents.account.nickname}}
         <i>{{commentParents.updated_at}}</i>
         </div>
         <div class="info_right">
           <span>{{commentParents.level}}</span>
         </div>
       </div>
       <div class="list_text">
         <div class="text_area">
           <p>{{commentParents.content}}</p>
         </div>
         <div class="text_reply" @mouseover="mouseover" @mouseout="mouseover">
           <a href="javascript:;" v-html="isShow?'回复':''"></a>
         </div>
       </div>
     </div>
</template>

<script>
import PostdetailComments from '@/components/air/PostdetailComments'
export default {
  name:'PostdetailComments',
  props:{
    commentParents:{
      type:Object,
      default:{}
    }
  },
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
.comments_list {
      border: 1px solid #ddd;
      padding: 2px;
      background-color: #f9f9f9;
     .list_info {
       font-size: 12px;
       display: flex;
       justify-content: space-between;
        padding: 5px 0 0 5px;
      //  align-items: center;
        .info_left {
          display: flex;
          justify-content: center;
          align-items: center;
         
          color: #999;
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
        padding: 0 0 0 10px;
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
</style>