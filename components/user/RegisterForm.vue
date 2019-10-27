<template>
  <div class="register_form">
    <el-form
      label-position="top"
      label-width="80px"
    >
      <el-form-item>
        <el-input  v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input  v-model="form.nickname" placeholder="请输入内容">
          <template slot="append">.com</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input  v-model="form.captcha"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input  v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input  v-model="form.password2"></el-input>
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
        username: "1111",
        nickname: "222",
        captcha: "333",
        password: "444",
        password2: "555"
      }
    };
  }
};
</script>

<style>
.register_form {
  padding: 20px;
}
</style>