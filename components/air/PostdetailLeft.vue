<template>
  <div class="Postdetailleft">
    <div class="detail_head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detail_title">
      <h1>{{postDetail.title}}</h1>
    </div>
    <div class="detail_time">攻略：{{postDetail.updated_at | filtersL}}&nbsp;&nbsp;&nbsp;阅读：{{postDetail.watch}}</div>
    <div class="detail_content">
      <div v-html="postDetail.content"></div>
    </div>
    <div class="detail_ctrl">
      <div class="detail_ctrl_item">
        <i class="el-icon-edit-outline"></i>
        <p>评论(6)</p>
      </div>
      <div class="detail_ctrl_item" @click="handlerstar">
        <i class="el-icon-star-off" :class="isOK?'active':''"></i>
        <p>收藏</p>
      </div>
      <div class="detail_ctrl_item">
        <i class="el-icon-share"></i>
        <p>分享</p>
      </div>
      <div class="detail_ctrl_item" @click="likethisartical">
        <i class="iconfont iconding"></i>
        <p>评论({{postDetail.like}})</p>
      </div>
    </div>
    <div class="detail_comments">
      <h5>评论</h5>
      <el-tag v-if="id" closable :type="info" @close="delId"></el-tag>
      <!-- 文本框开始 -->
      <el-input
        class="comments_text"
        v-model="commentsText"
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
      ></el-input>
      <!-- 文本框结束 -->

      <div class="comments_picture">
        <!-- 图片上传开始 -->
        <div class="picture">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <!-- 图片上传结束 -->

        <!-- 提交按钮 -->
        <div>
          <el-button type="primary" @click="setComment">提交</el-button>
        </div>
        <!-- 提交按钮 -->
      </div>

      <!-- 评论 -->
      <PostdetailLeftList @replayID="getID" />
      <!-- 评论 -->
    </div>
  </div>
</template>

<script>
import PostdetailLeftList from "@/components/air/PostdetailLeftList";
export default {
  props: ["id"],
  data() {
    return {
      postDetail: [],
      isOK: false,
      commentsText: "",
      id: "",
      replayWho: ""
    };
  },
  components: {
    PostdetailLeftList
  },
  methods: {
    handlerstar() {
      let id = this.$route.query.id;
      console.log(this.$store.state.user.userinfo.token);
      let token = this.$store.state.user.userinfo.token;
      this.$axios
        .get(`/posts/star?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          console.log(res);
          if (res.data.message === "收藏成功") {
            this.isOK = !this.isOK;
            this.$message.success(res.data.message);
          }
        });
    },
    likethisartical() {
      let id = this.$route.query.id;
      let token = this.$store.state.user.userinfo.token;
      this.$axios
        .get(`/posts/like?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          console.log(res);
          if (res.data.message === "点赞成功") {
            this.$message.success(res.data.message);
            console.log(this.postDetail.like);
            this.postDetail.like += 1;
          }
        });
    },
    getID(id) {
      this.id = id;
    },
    setComment() {
      let token = this.$store.state.user.userinfo.token;
      let postID = this.$route.query.id;
      this.$axios
        .post(`/comments`,
        {
          content:this.commentsText,
          post:postID
        },
         {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  mounted() {
    console.log(this.$route.query.id);
    let id = this.$route.query.id;
    this.$axios.get("/posts", { params: { id } }).then(res => {
      console.log(res);
      this.postDetail = res.data.data[0];
      console.log(this.postDetail);
    });
  },
  watch: {
    id() {
      this.$router.push(`/post/detail?id=${this.id}`);
      this.$axios.get(`/posts?id=${this.id}`).then(res => {
        console.log(res);
        this.postDetail = res.data.data[0];
        console.log(this.postDetail);
      });
    }
  }
};
</script>

<style lang='less' scoped>
* {
  max-width: 700px !important;
}
.Postdetailleft {
  width: 1000px;
  .detail_head {
    padding: 20px 0;
  }
  .detail_title {
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .detail_time {
    color: #999;
    text-align: right;
    padding: 20px;
  }
  .detail_content {
    /deep/ img {
      max-width: 100%;
    }
  }
  .detail_ctrl {
    display: flex;
    justify-content: center;
    .detail_ctrl_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 20px;
      .active {
        color: green;
      }

      i {
        font-size: 34px;
        color: orange;
      }
      p {
        padding-top: 5px;
        color: #999;
        font-size: 14px;
      }
    }
  }
  .detail_comments {
    h5 {
      font-size: 18px;
    }
    .comments_text {
      padding-top: 16px;
      padding-bottom: 10px;
    }
    .comments_picture {
      display: flex;
      justify-content: space-between;

      /deep/.el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 100px;
      }
    }
  }
}
</style>