<template>
  <div class="searchHotel">
    <div class="price">
      <p>
        <span>价格</span>
        <span>0-{{searchData.price_lt}}</span>
      </p>
      <el-slider
        v-model="searchData.price_lt"
        :step="10"
        :min="0"
        :max="4000"
        @change="handleChange"
      ></el-slider>
    </div>
    <div class="levels">
      <p>住宿等级</p>
      <el-select style="border:none" v-model="searchData.hotellevel_in" multiple placeholder="不限" collapse-tags @change="handleChange">
        <el-option
          v-for="item in options.levels"
          :key="item.level"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="types">
      <p>住宿类型</p>
      <el-select v-model="searchData.hoteltype_in" multiple placeholder="不限" collapse-tags @change="handleChange">
        <el-option
          v-for="item in options.types"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          >
        </el-option>
      </el-select>
    </div>
    <div class="assets">
      <p>酒店设施</p>
      <el-select v-model="searchData.hotelasset_in" multiple placeholder="不限" collapse-tags @change="handleChange">
        <el-option
          v-for="item in options.assets"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="brands">
      <p>酒店品牌</p>
      <el-select v-model="searchData.hotelbrand_in" multiple placeholder="不限" collapse-tags @change="handleChange">
        <el-option
          v-for="item in options.brands"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price:0,
      options:{},
      searchData:{
        hotellevel_in:[],
        hoteltype_in:[],
        hotelbrand_in:[],
        hotelasset_in:[],
        price_lt:0
      }
    };
  },
  methods: {
    handleChange(val) {
      // 搜索条件改变时触发
      // console.log(this)
      // let obj = {...this.searchData}
      // this.$store.commit('hotelSearchOptions/hotelInfo',obj)
      // console.log(this.searchData)
      this.$emit('handleHotelInfo',this.searchData)
      console.log(this.searchData)
    }
  },
  mounted(){
    this.$axios.get('/hotels/options')
    .then(res=>{
      this.options = res.data.data
      console.log(this.options)
    })
    // this.searchData = {...this.$store.state.hotelSearchOptions.searchOptions.hotelInfo}
    console.log(this.searchData)
  }
};
</script>

<style lang="less" scoped>
.searchHotel {
  margin: 10px 0;
  border: 1px solid rgb(221, 221, 221);
  padding: 8px 0;
  display: flex;
  > div {
    flex: 1;
    padding: 5px 20px;
    border-right: 1px solid rgb(221, 221, 221);
  }
  > :last-child {
    border: none;
  }
  .price {
    flex: 1.2;
  }
  /deep/input {
    border: none;
    padding-left: 0;
  }
}
</style>
