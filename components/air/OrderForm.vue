<template>
  <div>
    <!-- 1 乘机人 -->
    <div class="fly_people">
      <div class="fly_people_title">乘机人</div>
      <div class="fly_people_content">
        <el-form
          label-position="top"
          label-width="80px"
        >
          <div
            class="user_item"
            v-for="(item,index) in users"
            :key="index"
          >
            <el-form-item label="乘机人类型">
              <el-row>
                <el-col :span="6">
                  <el-select
                    value="成人"
                    placeholder=""
                  >
                    <el-option
                      label="成人"
                      value="成人"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="item.username"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <div
              class="decrement"
              @click="handleDecrement(index)"
              v-if="index!==0"
            >-</div>
            <el-form-item label="证件类型">
              <el-row>
                <el-col :span="6">
                  <el-select
                    value="身份证"
                    placeholder=""
                  >
                    <el-option
                      label="身份证"
                      value="身份证"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="item.id"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button
              @click="handleAddUser"
              type="primary"
            >添加乘机人</el-button>

          </el-form-item>

        </el-form>
      </div>
    </div>
    <!-- 1 乘机人 -->
    <!-- 2 保险 -->
    <div class="insurance">
      <div class="insurance_title">保险</div>
      <div class="insurance_content">
        <div
          class="insurance_row"
          v-for="(item,index) in ticket.insurances"
          :key="index"
        >
          <el-checkbox
            label="备选项1"
            border
          >{{item.type}}：￥{{item.price}}/份×1最高赔付{{item.compensation}}</el-checkbox>
        </div>

      </div>
    </div>
    <!-- 2 保险 -->
    <!-- 3 联系人 -->
    <div class="contact">
      <div class="contact_title">联系人</div>
      <div class="contact_content">
        <el-form label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="contactPhone" > <template slot="append">发送验证码</template></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 3 联系人 -->
  </div>
</template>

<script>
export default {
  props: {
    ticket: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // 乘机人
      users: [{ username: "中三", id: "123" }],
      // 保险id
      insurances: [],
      // 联系人名字
      contactName: "李小四",
      // 联系人电话
      contactPhone: "31231232",
      // 验证码  
      captcha:"000000",
      // 是否需要发票
      invoice: false,
      // 座位id
      seat_xid: this.$route.query.seat_xid,
      // 航班id
      air: this.$route.query.id
    };
  },
  methods: {
    handleAddUser() {
      this.users.push({ username: "", id: "" });
    },
    // 减少乘机人
    handleDecrement(index) {
      this.users.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.fly_people_title,
.insurance_title,
.contact_title {
  padding: 20px 0;
  font-size: 30px;
}
.insurance_row {
  margin: 10px 0;
}

.user_item {
  position: relative;
  .decrement {
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: #666;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 114px;
    right: 13px;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>