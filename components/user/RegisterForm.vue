<template>
  <div class="register_form">
    <el-form
      label-position="top"
      label-width="80px"
    >
      <el-form-item>
        <el-input
          placeholder="用户名/手机"
          v-model="form.username"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.captcha"
          placeholder="验证码"
        >
          <!-- template 只是一个占位符 不能 绑定事件！！！！  -->
          <template slot="append">
            <div @click="sendCaptcha">发送验证码</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="你的名字"
          v-model="form.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="密码"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="确认密码"
          v-model="form.password2"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;"
        >注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "13800138000",
        captcha: "000000",
        nickname: "13800138000",
        password: "13800138000",
        password2: "13800138000"
      }
    };
  },
  methods: {
    sendCaptcha() {
      //  1 获取 用户的手机号码
      let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;

      if (reg.test(this.form.username)) {
        
        this.$axios.get("/captchas",{
          params:{tel:this.form.username}
        })
        .then(res=>{
          // console.log(res);
        })

      } else {
  
        this.$message.warning("手机号码不合法");
      }
    }
  }
};
</script>

<style>
.register_form {
  padding: 20px;
}
</style>