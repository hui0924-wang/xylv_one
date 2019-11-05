<template>
  <div class="hotelList">
    <div class="hotelItem" v-for="(item,index) in hotelDate.data" :key="index" @click="Hoteljump">
      <img :src="item.photos" style="width:320px;height:210px" alt />
      <div class="info">
        <div class="name">
          <p>{{item.name}}</p>
          <div>
            <span>{{item.alias}}</span>
            <span v-if="item.hotellevel">
              <i v-for="i in item.hotellevel.level" :key="i" class="iconfont iconhuangguan"></i>
            </span>
            <span>{{item.hoteltype.name}}</span>
          </div>
        </div>
        <div class="baseInfo">
          <div class="rate">
            <el-rate v-model="item.stars" disabled text-color="#ff9900" score-template="{value}"></el-rate>
            <p>
              <span>{{item.stars}}</span>分
            </p>
          </div>
          <div class="comm">
            <span>{{0|random}}</span>
            <span>条评价</span>
          </div>
          <div class="post">
            <span>{{0|random}}</span>
            <span>篇游记</span>
          </div>
        </div>
        <div class="address">
          <i class="el-icon-location"></i>
          <span>位于:{{item.address}}</span>
        </div>
      </div>
      <div class="priceList" style="width:230px">
        <div class="priceItem" v-for="(name,index) in item.products" :key="index">
          <div>{{name.name}}</div>
          <div>
            <span>￥{{name.price}}</span>起
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        @current-change="pageChange"
        :page-size="10"
        :total="hotelDate.total"
        prev-text="< 上一页"
        next-text="下一页 >"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotelDate: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      star: 3.5,
      // city: '',
      // tdate:[],
      // hotelDate:[],
      total: 0
    };
  },
  filters: {
    // 随机的评价数量和游记数量
    random() {
      return Math.floor(Math.random() * 101);
    }
  },
  methods: {
    pageChange(val) {
      // console.log(val)
      // this.init({_start:(val-1)*10})
      let str = `&_start=${(val - 1) * 10}`;
      this.$emit("handlePage", val);
    },
    Hoteljump() {
      this.$router.push("/hotel/id");
    }
  }
};
</script>

<style lang="less" scoped>
.hotelList {
  padding: 20px 0;
  .hotelItem {
    display: flex;
    justify-content: space-between;
    padding: 20px 0 20px 10px;
    border-bottom: 1px solid rgb(238, 238, 238);
    .info {
      flex: 1;
      padding-left: 20px;
      padding-right: 60px;
      .name {
        font-size: 18px;
        p {
          font-size: 26px;
        }
        div {
          color: rgb(153, 153, 153);
          i {
            color: orange;
          }
        }
      }
      .baseInfo {
        display: flex;
        padding: 10px 0;
        align-items: center;
        // justify-content: space-between;
        .rate {
          display: flex;
          font-size: 14px;
          color: orange;
          padding-top: 2px;
          p {
            :first-child {
              font-size: 12px;
            }
          }
        }
        .comm {
          padding-left: 30px;
          flex: 1;
        }
        .comm,
        .post {
          font-size: 18px;
          :first-child {
            color: orange;
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
      .address {
        color: rgb(105, 105, 105);
        font-size: 14px;
      }
    }
    .priceList {
      padding-top: 10px;
      .priceItem {
        padding: 16px 40px 16px 10px;
        color: rgb(120, 122, 125);
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(238, 240, 246);
        :last-child {
          :first-child {
            color: orange;
            font-weight: 600;
          }
        }
      }
    }
  }
  .pagination {
    text-align: right;
  }
}
</style>
