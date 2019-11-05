<template>
  <div class="Thehoteldetails">
    <el-breadcrumb class="breadcrumbs">
  <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
  <el-breadcrumb-item>南京酒店</el-breadcrumb-item>
  <el-breadcrumb-item>好来阁酒店</el-breadcrumb-item>
</el-breadcrumb>
  <div class="hotel-thehead">
     <h2>好来阁商务宾馆</h2>
     <span>
       <i class="iconfont iconhuangguan"></i>
       <i class="iconfont iconhuangguan"></i>
       <i class="iconfont iconhuangguan"></i>
       <i class="iconfont iconhuangguan"></i>
       <i class="iconfont iconhuangguan"></i>
     </span>
  </div>
  <span><i class="el-icon-location"></i>高淳县淳溪镇镇兴路118号(高淳县委党校对面)</span>
  <el-row class="hotel-img">
  <el-col :span="16">
    <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt="" class="img-left">
  </el-col>
  <el-col :span="8"><div class="img-right">
    <a href="javascript:void(0)">
      <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt="">
    </a>
    <a href="javascript:void(0)">
      <img src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg" alt="">
    </a>
    <a href="javascript:void(0)">
      <img src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg" alt="">
    </a>
    <a href="javascript:void(0)">
      <img src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg" alt="">
    </a>
    <a href="javascript:void(0)">
      <img src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg" alt="">
    </a>
    <a href="javascript:void(0)">
      <img src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg" alt="">
    </a>
  </div></el-col>
  </el-row>
  <div class="thepricelist">
    <!-- 价格信息
      <el-table
        :data="hotel.products"
        style="width;: 100%"
        class="info-row"
      >
        <el-table-column prop="name" label="价格来源"/>
        <el-table-column label="低价房型" prop="bestType" />
        <el-table-column label="最低价格/每晚" width="160">
          <template>
            <span class="height-light larger">
              ￥8899
            </span>起
            <span>
              <i class="el-icon-arrow-right height-light" />
            </span>
          </template>
        </el-table-column>
      </el-table> -->
     <div class="list-tint">
       <div>价格来源</div>
       <div>低价房型</div>
       <div>最低价格/每晚</div>
     </div>
     <a href="https://hotels.ctrip.com/hotel/694679.html" class="list-tint">
       <div class="jiage">携程</div>
       <div class="jiage">高级大床房A</div>
       <div class="jiage"><span>$83</span>起<i class="el-icon-arrow-right"></i></div>
     </a>
     <a href="https://hotels.ctrip.com/hotel/694679.html" class="list-tint">
       <div class="jiage">艺龙</div>
       <div class="jiage">高级大床房A</div>
       <div class="jiage"><span>$8993</span>起<i class="el-icon-arrow-right"></i></div>
     </a>
     <a href="https://hotels.ctrip.com/hotel/694679.html" class="list-tint">
       <div class="jiage">hosadi</div>
       <div class="jiage">高级大床房A</div>
       <div class="jiage"><span>$9983</span>起<i class="el-icon-arrow-right"></i></div>
     </a>
  </div>
  <el-row :gutter="20">
  <el-col :span="16"><div id="container"></div></el-col>
  <el-col :span="8" class="ditu-list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="风景" name="first">风景</el-tab-pane>
    <el-tab-pane label="交通" name="second">交通</el-tab-pane>
  </el-tabs></el-col>
</el-row>
   <el-table
      :data="tableData"
      style="width: 100%"
      class="list-details"
      >
      <el-table-column
        prop="date"
        label="基本信息"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="入住时间: 14:00之后"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="离店时间: 12:00之前">
      </el-table-column> <el-table-column
        prop="address"
        label="2010年开业/2015年装修">
      </el-table-column>
       <el-table-column
        prop="address"
        label="酒店规模: 148间客房">
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  mounted () {
      window.onLoad = function() {
      // 5  js 加载完毕了！！！
      var map = new AMap.Map("container");
    };

    // 1 定义 高度地图 js 路径
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=b329f3568c3769213b6cc011593bf89d&callback=onLoad";
    // 2 手动创建了一个script标签
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    // 3 定义 script标签的 引入地址
    jsapi.src = url;
    // 4 把script标签 放入到 html标签的 head标签的中
    document.head.appendChild(jsapi);
  }
}
</script>

<style lang="less" scoped>
   a{
     text-decoration: none;
   }
.Thehoteldetails{
  width: 1000px;
  margin: 0 auto;
  .breadcrumbs{
    padding: 20px 0;
  }
  .hotel-thehead{
    display: flex;
    > h2{
      font-weight: normal;
      margin-right: 10px;
    }
    > span{
      margin-top: 8px;
      color: orange;
    }
  }
  span{
    font-size: 14px;
  }
  .hotel-img{
    margin: 30px 0 40px 0;
    display: flex;
    .img-left{
      width: 640px;
      height: 360px;
    }
    .img-right{
      img{
      width: 190px;
      width: 153px;
      margin: 5px 10px 10px 0;
      }
    }
  }
  .thepricelist{
    .list-tint{
      padding: 10px 5px;
      display: flex;
      border-bottom: 1px solid #ccc;
      .jiage{
        color: #666;
        font-weight: normal;
        > span{
          color: orange;
          margin-right: 5px;
        }
        > i{
          margin-left: 7px;
          color: orange;
        }
      }
     > div{
       flex: 1;
       font-weight: 600;
       color: #999;
     }
    }
  }
  #container {
  width: 650px;
  height: 400px;
  margin: 40px 0;
}
.ditu-list{
  margin-top: 40px;
}
.list-details{
  font-weight: normal;
}
}
</style>
