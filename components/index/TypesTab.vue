<template>
  <div class="types_tab">
    <div class="types_tab_title">
      <div
        @click="titleChange(index)"
        class="title_item"
        :class="index===currentIndex?'active':''"
        v-for="(item,index) in titles"
        :key="index"
      >{{item.text}}</div>
    </div>
    <div class="types_tab_content">
      <input
        type="text"
        :placeholder="titles[currentIndex].ph"
        @blur="handleValue(currentIndex)"
        v-model="value"
      />
      <i class="el-icon-search" @click="handleValue(currentIndex)"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: [
        { text: "攻略", ph: "搜索城市" },
        { text: "酒店", ph: "请输入城市搜索酒店" },
        { text: "机票", ph: "请输入机票" }
      ],
      currentIndex: 0,
      value: ""
    };
  },
  methods: {
    titleChange(index) {
      this.currentIndex = index;

      if (index === 2) {
        this.$router.push("/air");
      }
    },
    handleValue(currentIndex) {
      let str = "";
      console.log(this.value);
      if (currentIndex === 0) {
        // 跳转到攻略主页
        str += `city=${this.value}`;
        this.$router.push(`/post?${str}`);
      } else if (currentIndex === 1) {
        // 获取城市数据
        this.$axios
          .get("/cities", { params: { name: this.value } })
          .then(res => {
            console.log(res);
            let cityId = res.data.data[0].id;
            str += `&city=${cityId}`;
            this.$router.push(`/hotel?${str}`);
            localStorage.setItem("cityName", this.value);
            // console.log(this.cityData);
            // this.$emit("getCity", this.cityData);
          });
      }
    }
  }
};
</script>

<style  lang="less" scoped>
.types_tab {
  width: 550px;
}
.types_tab_title {
  height: 40px;
  display: flex;
  .title_item {
    width: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    transform: skewX(19deg);
    margin-left: 15px;
  }
  .active {
    background-color: #eeeeee;
    color: #000;
  }
}
.types_tab_content {
  position: relative;
  height: 50px;
  input {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: none;
    outline: none;
    font-size: 16px;
    text-indent: 15px;
    border-radius: 5px;
    border-top-left-radius: 0px;
  }
  .el-icon-search {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 20px;
  }
}
</style>