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
    <el-pagination 
      class="comments_paging"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 4, 6]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import PostdetailComments from '@/components/air/PostdetailComments'
export default {
  data () {
    return {
      isShow: false,
      list:[],
      total:0,
      pageInfo:{
        page:1,
        size:2
      }   
    }
  },
  components:{
    PostdetailComments
  },
  mounted () {
    this.init(true)
  },
 methods:{
    mouseover(){
      this.isShow = !this.isShow
    },
    handleSizeChange(val){
      this.pageInfo.size = val
      this.init(false)
    },
    handleCurrentChange(val){
      this.pageInfo.page = val
      this.init(false)
    },
    init(isFirst){
      let str = this.$route.query.id
      if(!isFirst){
        str += `&_limit=${this.pageInfo.size}`
        str += `&_start=${(this.pageInfo.page - 1)*this.pageInfo.size}`
      }else{
        str+=`&_limit=${this.pageInfo.size}`
      }
      
      // console.log(this.$route.query.id);
      this.$axios.get(`/posts/comments?post=${str}`).then(res => {
        console.log(res);
        this.list = res.data.data
        this.total = res.data.total
      })
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
    .comments_paging {
      padding: 20px 0;
    }
    }
</style>