<template>
  <div class="order">
    <div class="order_main">
      <!-- 1 乘机人 -->
      <div class="fly_people">
        <div class="fly_people_title">乘机人</div>
        <div class="fly_people_content">
          <el-form
            label-position="top"
            label-width="80px"
          >
            <el-form-item label="乘机人类型">
              <el-row>
                <el-col :span="6">
                  <el-select placeholder="">
                    <el-option
                      label="成人"
                      value="成人"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="证件类型">
              <el-row>
                <el-col :span="6">
                  <el-select placeholder="">
                    <el-option
                      label="成人"
                      value="成人"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">立即创建</el-button>

            </el-form-item>

          </el-form>
        </div>
      </div>
      <!-- 1 乘机人 -->
      <!-- 2 保险 -->
      <div class="insurance">
        <div class="insurance_title">保险</div>
        <div class="insurance_content">
          <div class="insurance_row">
            <el-checkbox
              label="备选项1"
              border
            >航空意外险：￥30/份×1最高赔付260万</el-checkbox>
          </div>
          <div class="insurance_row">
            <el-checkbox
              label="备选项1"
              border
            >航空意外险：￥30/份×1最高赔付260万</el-checkbox>
          </div>
        </div>
      </div>
      <!-- 2 保险 -->
      <!-- 3 联系人 -->
      <div class="contact">
        <div class="insurance_title">联系人</div>
        <div class="insurance_content">
          <el-form label-width="80px">
            <el-form-item label="活动名称">
              <el-input ></el-input>
            </el-form-item>

             <el-form-item label="活动名称">
              <el-input > <template slot="append">.com</template></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input ></el-input>
            </el-form-item>
           
            <el-form-item>
              <el-button
                type="primary"
              >立即创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 3 联系人 -->
    </div>
    <div class="order_aside">2</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.order {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.order_main {
  flex: 2;
}
.order_aside {
  flex: 1;
}

.fly_people_title,
.insurance_title {
  padding: 20px 0;
  font-size: 30px;
}
.insurance_row {
  margin: 10px 0;
}
</style>