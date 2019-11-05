<template>
  <div class="container">
    <!-- <HotelSearch @getCity="getCityData" /> -->
    <!-- 我改动的 -->
    <HotelSearch @getCity="getCityData" />
    <HotelOptions :scenicsList="scenicsList" />
    <searchHotel @handleHotelInfo="handleHotelInfo"/>
    <hotelList :hotelDate="hotelDate" @handlePage="handlePage"/>
  </div>
</template>

<script>
import searchHotel from "@/components/hotel/searchHotel";
import HotelOptions from "@/components/hotel/HotelOptions";
import hotelList from "@/components/hotel/hotelList.vue";
import HotelSearch from "@/components/hotel/HotelSearch.vue";
export default {
  data(){
    return {
      hotelDate:{},
      hotelInfo:{},
      pageInfo:0,
      scenicsList: [],
      // 存放所有筛选的数据
      allSearchInfo:{

      }
    }
  },
  components: {
    HotelSearch,
    searchHotel,
    hotelList,
    HotelOptions
  },
  mounted(){
    // console.log(this.$store.state)
    this.allSearchInfo = this.$route.query
    // console.log(this.allSearchInfo)
    // this.$axios.get('/hotels',{params:this.$route.query})
    // .then(res=>{
    //   this.hotelDate = res.data
    // })
    // console.log(this.allSearchInfo)
    let str = this.handleHotelInfo(this.allSearchInfo)
    console.log(str)
    this.init(str)
  },
  methods:{
    init(str){
      if(!str){
        str = ''
      }
      this.$axios.get(`/hotels?${str}`)
      .then(res=>{
        this.hotelDate = res.data
      })
    },
    handleHotelInfo(val){
      this.hotelInfo = val

      // 处理酒店等级
      let hotellevel_in = ''
      if(val.hotellevel_in){
        if(val.hotellevel_in.length>1){
          val.hotellevel_in.forEach(v => {
            hotellevel_in += '&hotellevel_in=' + v
          });
        }else 
        if(val.hotellevel_in.length===1){
          hotellevel_in += '&hotellevel_in=' + val.hotellevel_in[0]
        }
      }

      
      // 处理酒店类型
      let hoteltype_in = ''
      if(val.hoteltype_in){
        if(val.hoteltype_in.length>1){
          val.hoteltype_in.forEach(v => {
            hoteltype_in += '&hoteltype_in=' + v
          });
        }else 
        if(val.hoteltype_in.length===1){
          hoteltype_in += '&hoteltype_in=' + val.hoteltype_in[0]
        }
      }

      // 处理酒店品牌
      let hotelbrand_in = ''
      if(val.hotelbrand_in){
        if(val.hotelbrand_in.length>1){
          val.hotelbrand_in.forEach(v => {
            hotelbrand_in += '&hotelbrand_in=' + v
          });
        }else 
        if(val.hotelbrand_in.length===1){
          hotelbrand_in += '&hotelbrand_in=' + val.hotelbrand_in[0]
        }
      }

      // 处理酒店设施
      let hotelasset_in = ''
      if(val.hotelasset_in){
        if(val.hotelasset_in.length>1){
          val.hotelasset_in.forEach(v => {
            hotelasset_in += '&hotelasset_in=' + v
          });
        }else 
        if(val.hotelasset_in.length===1){
          hotelasset_in += '&hotelasset_in=' + val.hotelasset_in[0]
        }
      }

      // 处理价格
      let price_lt = ''
      if(val.price_lt){
        price_lt = `&price_lt=${val.price}`
      }

      let str = hotellevel_in+hoteltype_in+hotelbrand_in+hotelasset_in+price_lt
      console.log(str)
      // this.$route.fullPath += str

      // 跳转存参数
      this.$router.push(`/hotel?${str}`)
      // console.log(this.$route.query)


      // 把字符串转化为对象-未完成
      // if(str){
      //   let tempArr = str.split('&')
      //   tempArr.shift()
      //   console.log(tempArr)
      //   let obj = {}
      //   tempArr.forEach(v=>{
      //     let temp = v.split('=')
      //     console.log(temp)
          // console.log(temp[0])          //   obj.temp[0] = temp[1]
          // 如果已存在，变为数组形式
          // if(obj.length!==0){
          //   for(let key in obj){
          //     console.log(key)
          //     if(key==temp[0]){
          //       let value = obj[key]
          //       delete obj[key]
          //       obj[key] = []
          //       obj[key].push(value)
          //       obj[key].push(temp[1])
          //     }else{
                // obj.temp[0]=temp[1]
          //     }
          //   }
          // }
          
      //   })
      //   console.log(obj)
      // }
      console.log(str)
      // 页面初始化
      this.init(str)
      return str
    },
    handlePage(val){
      let obj = this.hotelInfo
      let str = this.handleHotelInfo(obj)
      str += `&_start=${(val-1)*10}`
      this.init(str)
    },
    // 当前选择城市
    getCityData(value) {
      // console.log(value);
      this.scenicsList = value.scenics;
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
</style>