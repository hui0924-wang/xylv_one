<template>
  <div class="container">
    <!-- <HotelSearch @getCity="getCityData" /> -->
    <!-- 我改动的 -->
    <HotelSearch @getCity="getCityData" @othersData="handleOthersData" />
    <el-row type="flex" :gutter="10" class="hotel-option-row">
      <el-col :span="14">
        <HotelOptions :scenicsList="scenicsList" @getScenic="getScenic" :scenic="scenic" />
      </el-col>
      <el-col :span="10">
        <MapBox :value="hotelDate.data" />
      </el-col>
    </el-row>
    <searchHotel @handleHotelInfo="handleHotelInfo" />
    <hotelList :hotelDate="hotelDate" @handlePage="handlePage" />
  </div>
</template>

<script>
import searchHotel from "@/components/hotel/searchHotel";
import HotelOptions from "@/components/hotel/HotelOptions";
import MapBox from "@/components/hotel/MapBox";
import hotelList from "@/components/hotel/hotelList.vue";
import HotelSearch from "@/components/hotel/HotelSearch.vue";
export default {
  data() {
    return {
      hotelDate: {},
      hotelInfo: {},
      pageInfo: 0,
      scenicsList: [],
      currentCityId: "",
      othersData: {},
      scenic: 0,
      axiosStr: "",
      // 存放所有筛选的数据
      allSearchInfo: {}
    };
  },
  components: {
    HotelSearch,
    MapBox,
    searchHotel,
    hotelList,
    HotelOptions
  },
  mounted() {
    // console.log(this.$store.state)
    this.allSearchInfo = this.$route.query;
    // console.log(this._data)
    this.handleAxiosStr();
    // console.log(this.axiosStr)
    // this.$axios.get('/hotels',{params:this.$route.query})
    // .then(res=>{
    //   this.hotelDate = res.data
    // })
  },
  methods: {
    init(str) {
      if (!str) {
        str = "";
      }
      this.$axios.get(`/hotels?${str}`).then(res => {
        this.hotelDate = res.data;
        console.log(this.hotelDate);
      });
      let newStr = str.replace(/[_]in/g, "");
      this.$router.push(`/hotel?${newStr}`);
    },
    // 处理酒店的基础信息
    handleHotelInfo(val) {
      this.hotelInfo = val;
      this.handleAxiosStr();
    },
    // 处理上下页
    handlePage(val) {
      let page = `&_start=${(val - 1) * 10}`;
      this.axiosStr = this.handleAxiosStr() + page;
    },
    // 当前选择城市
    getCityData(value) {
      this.currentCityId = value.id;
      this.scenicsList = value.scenics;
      this.handleAxiosStr();
    },
    // 处理日期等参数
    handleOthersData(val) {
      this.othersData = val;
      this.handleAxiosStr();
    },
    // 拼接参数
    handleAxiosStr() {
      let str = "";
      // 处理酒店等级
      let hotellevel_in = "";
      if (this.hotelInfo.hotellevel_in) {
        if (this.hotelInfo.hotellevel_in.length > 1) {
          this.hotelInfo.hotellevel_in.forEach(v => {
            hotellevel_in += "&hotellevel_in=" + v;
          });
        } else if (this.hotelInfo.hotellevel_in.length === 1) {
          hotellevel_in += "&hotellevel_in=" + this.hotelInfo.hotellevel_in[0];
        }
      }

      // 处理酒店类型
      let hoteltype_in = "";
      if (this.hotelInfo.hoteltype_in) {
        if (this.hotelInfo.hoteltype_in.length > 1) {
          this.hotelInfo.hoteltype_in.forEach(v => {
            hoteltype_in += "&hoteltype_in=" + v;
          });
        } else if (this.hotelInfo.hoteltype_in.length === 1) {
          hoteltype_in += "&hoteltype_in=" + this.hotelInfo.hoteltype_in[0];
        }
      }

      // 处理酒店品牌
      let hotelbrand_in = "";
      if (this.hotelInfo.hotelbrand_in) {
        if (this.hotelInfo.hotelbrand_in.length > 1) {
          this.hotelInfo.hotelbrand_in.forEach(v => {
            hotelbrand_in += "&hotelbrand_in=" + v;
          });
        } else if (this.hotelInfo.hotelbrand_in.length === 1) {
          hotelbrand_in += "&hotelbrand_in=" + this.hotelInfo.hotelbrand_in[0];
        }
      }

      // 处理酒店设施
      let hotelasset_in = "";
      if (this.hotelInfo.hotelasset_in) {
        if (this.hotelInfo.hotelasset_in.length > 1) {
          this.hotelInfo.hotelasset_in.forEach(v => {
            hotelasset_in += "&hotelasset_in=" + v;
          });
        } else if (this.hotelInfo.hotelasset_in.length === 1) {
          hotelasset_in += "&hotelasset_in=" + this.hotelInfo.hotelasset_in[0];
        }
      }

      // 处理价格
      let price_lt = "";
      if (this.hotelInfo.price_lt) {
        price_lt = `&price_lt=${this.hotelInfo.price}`;
      }

      str +=
        hotellevel_in + hoteltype_in + hotelbrand_in + hotelasset_in + price_lt;
      // 处理城市id
      str += `&city=${this.currentCityId}`;
      // 处理入住人数等信息
      for (let key in this.othersData) {
        if (this.othersData[key]) {
          str += `&${key}=${this.othersData[key]}`;
        }
      }
      // 拼接景点id
      // if (this.scenic) {
      //   str += `&scenic=${this.scenic}`;
      // }
      this.axiosStr = str;
      return str;
    },
    // 景点id
    getScenic(val) {
      this.scenic = val;
      this.handleAxiosStr();
      this.init(this.axiosStr);
    }
  },
  watch: {
    axiosStr() {
      // console.log(this.axiosStr);
      this.init(this.axiosStr);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
</style>