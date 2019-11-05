<template>
  <div class="hotel_options">
    <el-row :gutter="10">
      <!-- 这里 -->
      <el-col :span="14">
        <el-row type="flex" class="options_row">
          <el-col :span="3">区域:</el-col>
          <el-col :class="{'hidden_content':!show}">
            <div class="scenics_box">
              <a href="#" :class="{'location_name':true}">全部</a>
              <a
                v-for="(item,index) in scenicsList"
                :key="index"
                :class="{'location_name':true}"
              >{{item.name}}</a>
            </div>
            <a href="#" @click="toggleshow">
              <i class="el-icon-d-arrow-right"></i>
              等{{scenicsList.length}}个区域
            </a>
          </el-col>
        </el-row>
        <el-row type="flex" class="options_row">
          <el-col :span="3">攻略:</el-col>
          <el-col>暂无攻略</el-col>
        </el-row>
        <el-row type="flex" class="options_row price_row">
          <el-col :span="3">
            均价
            <el-tooltip
              class="item"
              effect="dark"
              content="等级均价由平日价格计算得出，节假日价格会有上浮。"
              placement="top-start"
            >
              <sup class="question_mark">?</sup>
            </el-tooltip>:
          </el-col>
          <el-col>
            <el-row type="flex" justify="start">
              <el-col :span="6">
                <AveragePrice :starLevel="3" :price="332" />
              </el-col>
              <el-col :span="6">
                <AveragePrice :starLevel="4" :price="521" />
              </el-col>
              <el-col :span="6">
                <AveragePrice :starLevel="5" :price="768" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10">
       <MapBox/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AveragePrice from "@/components/hotel/AveragePrice";
import MapBox from "@/components/hotel/MapBox";
export default {
  components: {
    AveragePrice,MapBox
  },
  props: {
    scenicsList: {
      type: Array,
      default: []
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.scenicsList);
    }, 1000);
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    toggleshow() {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="less" scoped>
a {
  color: inherit;
  text-decoration: none;
}
.options_row {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
  .location_name {
    padding: 0 2px;
    margin-right: 14px;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: #09f;
    }
    &.active {
      background: #eee;
      cursor: auto;
      text-decoration: none;
      color: #999;
    }
  }

  &.price_row {
    .question_mark {
      background-color: #ccc;
      color: #fff;
      display: inline-block;
      text-align: center;
      width: 14px;
      height: 14px;
      border-radius: 100%;
      font-size: 12px;
    }
  }
  .el-icon-d-arrow-right {
    color: rgb(255, 153, 0);
    transform: rotate(270deg);
  }
  .hidden_content {
    .scenics_box {
      max-height: 40px;
      overflow: hidden;
    }
    .el-icon-d-arrow-right {
      transform: rotate(90deg);
    }
  }
}
</style>