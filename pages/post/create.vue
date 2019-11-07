<template>
  <div class="create">
    <div class="create_tab">
      <div class="tab_left">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <div class="tab_form">
          <el-input placeholder="请输入标题" v-model="form.title" clearable></el-input>
        </div>
        <VueEditor :config="config" ref="wenzhang" style="margin-bottom: 50px;height: 400px;" />
        <div class="tab-city">
          <el-form label-width="80px">
            <el-form-item label="选择城市">
              <el-autocomplete
                placeholder="请搜索游玩城市"
                :fetch-suggestions="querySearchAsync"
                @select="handleSelect"
                v-model="form.city"
              ></el-autocomplete>
            </el-form-item>
          </el-form>
        </div>
        <div class="tab_release">
          <el-button type="primary" @click="setPost">发布</el-button>
          <span>
            或者
            <a href="#" @click="baocuncao">保存到草稿</a>
          </span>
        </div>
      </div>

      <div class="tab_right">
        <div class="tab_box">
          <div class="box-cao">草稿箱（{{this.caogao.length}}）
            
            </div>
            <div class="box-cao-neiron" v-for="(item,index) in caogao " :key="index" @click="getcaogao(item)" style="cursor:pointer">
              <div>{{item.title}} 
                <span class="iconfont el-icon-edit"></span>
                <p>{{item.time}}</p>
              </div>
              <!-- <i class="el-icon-error" @click="delBtn(index)"></i> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  data() {
    return {
      form: {
        title: "", //文章标题
        content: "", //文章内容
        city: "", //选择城市
        
      },
      caogao: [],
      time:"",
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://127.0.0.1:1337/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            console.log(res);
            insert("http://127.0.0.1:1337" + res.data[0].url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://127.0.0.1:1337/upload",
          name: "files",
          uploadSuccess(res, insert) {
            insert("http://127.0.0.1:1337" + res.data[0].url);
          }
        }
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    // getToken(){
    //   let token = this.$store.state.user.userinfo.token
    //   // console.log(token);
    //   return{
    //     Authorization:`${this.$store.state.user.userinfo.token}`
    //   }
    // },
    querySearchAsync(queryString, callback) {
      // 1 queryString  =  当前输入框的值
      if (queryString) {
        this.$axios
          .get("/airs/city", { params: { name: queryString } })
          .then(res => {
            let cityArr = res.data.data;
            cityArr.forEach(v => {
              // 把 广州市  “市” 移除 因为 后台不需要 “市”
              v.name = v.name.replace("市", "");
              v.value = v.name;
            });
            callback(cityArr);
          });
      }
    },
    handleSelect(item) {
      console.log(item);
      this.form.city = item.value;
    },
    setPost() {
      let token = this.$store.state.user.userinfo.token;
      //获取到富文本框里的数据
      var quill = this.$refs.wenzhang.editor.root.innerHTML;
      this.form.content = quill;

      if (this.form.title == "") {
        this.$message({
          message: "请输入标题",
          type: "warning"
        });
      } else if (this.form.city == "") {
        this.$message({
          message: "请输入城市",
          type: "warning"
        });
      } else if (this.form.content == "") {
        this.$message({
          message: "请输入内容",
          type: "warning"
        });
      } else {
        this.$axios
          .post("/posts", this.form, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            console.log(res);
            if (res.data.message == "新增成功") {
              this.form = "";
              this.$refs.wenzhang.editor.root.innerHTML = "";
              this.$router.push("/post");
            }
          });
        this.$message({
          message: "新增成功",
          type: "success"
        });
      }
    },
    baocuncao() {
      // console.log(this.form);
      var quill = this.$refs.wenzhang.editor.root.innerHTML;
      this.form.content = quill;
      let tempObj = {...this.form}
      tempObj.time = this.time
      console.log(this.caogao);
      this.caogao.push(tempObj);
      let json = JSON.stringify(this.caogao);
      localStorage.setItem("posts", json);
    },
    getcaogao(item){
      // console.log(this.caogao);
      this.form = {...item}
      this.$refs.wenzhang.editor.root.innerHTML = item.content;
    },
    // delBtn(index){
    //   console.log(index)
    //   let flage = localStorage.getItem('post')
    //   let tempArr = JSON.parse(flage)
    //   tempArr.splice(index,1)
    //   let json = JSON.stringify(tempArr)
    //   localStorage.setItem('post',json)
    // }
  },
  mounted() {
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month =
      nowDate.getMonth() + 1 < 10
        ? "0" + (nowDate.getMonth() + 1)
        : nowDate.getMonth() + 1;
    let day =
      nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    this.time = year + "-" + month + "-" + day;
    
    
    let json = localStorage.getItem("posts");
    if (json) {
      this.caogao = JSON.parse(json);
      this.caogaoshu = this.caogao.length;
    } else {
      this.caogao = [];
    }
    console.log(this.caogao);
    
  }
};
</script>

<style lang="less" scoped>
.create {
  width: 1000px;
  padding: 20px 0;
  margin: 0 auto;

  .create_tab {
    display: flex;

    .tab_left {
      flex: 4;
      h2 {
        font-weight: 400;
        font-size: 22px;
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
      }
      .tab_form {
        position: relative;
        margin-bottom: 22px;
      }
      .tab_release {
        a {
          text-decoration: none;
          color: orange;
        }
      }
    }

    .tab_right {
      flex: 1;
      margin-left: 10px;
      .tab_box {
        border: 1px solid #ddd;
        padding: 10px;
        .box-cao {
          margin-bottom: 10px;
          font-weight: 400;
          color: #666;
        }
        .box-cao-neiron{
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          >i{
            color: red;
          }
        }
      }
    }
  }
}
</style>