<template>
  <div class="hotel_search">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{cityData.name}}酒店预定</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索栏 -->
    <div class="searchBar">
      <el-form :inline="true">
        <!-- 城市 -->
        <el-form-item>
          <el-autocomplete
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            v-model="currentCity"
            placeholder="目的地"
          ></el-autocomplete>
        </el-form-item>
        <!-- 住房时间 -->
        <el-form-item>
          <div class="clock">
            <el-date-picker
              v-model="time"
              type="daterange"
              range-separator="-"
              start-placeholder="入住日期"
              end-placeholder="离店日期"
              value-format="yyyy-MM-dd"
              @change="changeTime"
            ></el-date-picker>
          </div>
        </el-form-item>
        <!-- 人数选择 -->
        <el-form-item>
          <el-popover placement="bottom-start" width="300" :visible-arrow="false" v-model="visable">
            <el-row class="options" type="flex" align="middle" :gutter="10">
              <el-col :span="8">每间</el-col>
              <el-col :span="8">
                <el-select :value="adultCount+ '成人'" size="mini" @change="handleAdultChange">
                  <el-option :label="item" :value="item" v-for="item in adultNumList " :key="item"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select :value="childrenCount +'儿童'" size="mini" @change="handleChildrenChange">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="item in childrenNumList"
                    :key="item"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row type="flex" justify="end" class="sureBtn">
              <el-button type="primary" size="mini" @click="onSure">确定</el-button>
            </el-row>
            <el-input
              slot="reference"
              placeholder="人数未定"
              :value="totalCountLabel"
              suffix-icon="el-input__icon iconfont iconuser"
            >人数未定</el-input>
          </el-popover>
        </el-form-item>
        <!-- 查看价格 -->
        <el-form-item>
          <el-button type="primary" @click="searchPrice">查看价格</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 住房时间
      time: [],
      visable: false,
      // 成人数
      adultCount: 2,
      // 儿童数
      childrenCount: 0,
      // 成人数组
      adultNumList: [1, 2, 3, 4, 5, 6, 7],
      // 儿童数组
      childrenNumList: [0, 1, 2, 3, 4],
      // 成人+儿童 人数 绑定值
      totalCountLabel: "",

      // 当前城市
      currentCity: "南京",
      // form: {
      //   city: 74
      // },
      // 子传父数据
      searchData: {
        person: 0,
        city: 74,
        enterTime: "",
        leftTime: ""
      },

      // 城市相关数据
      cityData: {
        name: "南京"
      }
      // // 酒店详情数据
      // hotelDetail: {}
    };
  },

  methods: {
    // 1 搜索城市的输入 事件
    querySearchAsync(queryString, callback) {
      // 1 queryString  =  当前输入框的值
      if (queryString) {
        this.$axios
          .get("/cities", { params: { name: queryString } })
          .then(res => {
            // console.log(res);
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
    // 2 点击 城市
    handleSelect(item) {
      // console.log(item);
      // this.form.city = item.id;
      this.searchData.city = item.id;
      // 发射事件
      this.$emit("getCity", item.id);
    },
    // 时间改变事件
    changeTime() {
      this.searchData.enterTime = this.time[0];
      this.searchData.leftTime = this.time[1];
    },
    // 成人人数 改变事件  select选中值改变时
    handleAdultChange(value) {
      // console.log(value);
      this.adultCount = value;
    },
    // 儿童人数  改变事件
    handleChildrenChange(value) {
      this.childrenCount = value;
    },
    //点击确定事件
    onSure() {
      var totalCount = [this.adultCount, this.childrenCount];
      const suffix = ["成人", "儿童"];
      //先.filter() 筛选人数大于0
      //再 .map()  返回新值
      //最后.join() 数组 转换为字符串
      this.totalCountLabel = totalCount
        .filter(v => v > 0)
        .map((v, index) => {
          return (v = v + suffix[index]);
        })
        .join(" ");
      this.visable = false;
      this.searchData.person = this.adultCount + this.childrenCount;
      // console.log(this.totalCountLabel);
    },
    // 查询价格
    searchPrice() {
      let { city, ...resSearchData } = this.searchData;
      // console.log(resSearchData);
      // 发射事件
      this.$emit("othersData", resSearchData);
    }
  },
  // 页面刷新
  mounted() {
    // 获取城市数据
    this.$axios
      .get("/cities", { params: { name: this.currentCity } })
      .then(res => {
        // console.log(res);
        this.cityData = res.data.data[0];
        // console.log(this.cityData);
        this.$emit("getCity", this.cityData.id);
      });
  }
};
</script>

<style lang="less" scoped>
.hotel_search {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb {
    padding: 20px 0;
  }
}
.el-popover {
  padding: 12px;
}
.sureBtn {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
}
</style>