<template>
  <div class="Thehoteldetails">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumbs">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{hotelList.real_city}}酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{hotelList.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部地址 -->
    <div class="hotel-thehead">
      <h2>{{hotelList.name}}</h2>
      <span>
        <i class="iconfont iconhuangguan"></i>
        <i class="iconfont iconhuangguan"></i>
        <i class="iconfont iconhuangguan"></i>
        <i class="iconfont iconhuangguan"></i>
        <i class="iconfont iconhuangguan"></i>
      </span>
    </div>
    <span>
      <i class="el-icon-location"></i>
      {{hotelList.address}}
    </span>
    <!-- 图片 -->
    <el-row class="hotel-img">
      <el-col :span="16">
        <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt class="img-left" />
      </el-col>
      <el-col :span="8">
        <div class="img-right">
          <a href="javascript:void(0)">
            <img src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg" alt />
          </a>
          <a href="javascript:void(0)">
            <img src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg" alt />
          </a>
          <a href="javascript:void(0)">
            <img src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg" alt />
          </a>
          <a href="javascript:void(0)">
            <img src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg" alt />
          </a>
          <a href="javascript:void(0)">
            <img src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg" alt />
          </a>
          <a href="javascript:void(0)">
            <img src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg" alt />
          </a>
        </div>
      </el-col>
    </el-row>
    <!-- 酒店价格信息 -->
    <div class="thepricelist">
      <div class="list-tint">
        <div>价格来源</div>
        <div>低价房型</div>
        <div>最低价格/每晚</div>
      </div>
      <a
        href="https://hotels.ctrip.com/hotel/694679.html"
        class="list-tint"
        v-for="(item,index) in hotelList.products"
        :key="index"
      >
        <div class="jiage">{{item.name}}</div>
        <div class="jiage">{{item.bestType}}</div>
        <div class="jiage">
          <span>${{item.price}}</span>起
          <i class="el-icon-arrow-right"></i>
        </div>
      </a>
    </div>
    <el-row :gutter="20">
      <el-col :span="16">
        <!-- 地图 -->
        <div id="container" v-show="showName==='风景'"></div>
        <div id="container2" v-show="showName==='交通'"></div>
        <!-- <div id="container2" v-show="showName==='交通'"></div> -->
        <!-- <div id="container2"></div> -->
      </el-col>
      <el-col :span="8" class="ditu-list">
        <!-- <el-tabs v-model="activeName" @tab-click="isShow=!isShow"> -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <div id="panel"></div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <div id="traffic"></div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-table style="width: 100%" class="list-details">
      <el-table-column prop="date" label="基本信息" width="180"></el-table-column>
      <el-table-column prop="name" label="入住时间: 14:00之后" width="180"></el-table-column>
      <el-table-column prop="address" label="离店时间: 12:00之前"></el-table-column>
      <el-table-column prop="address" :label="`${hotelList.creation_time}/2015年装修`"></el-table-column>
      <el-table-column prop="address" label="酒店规模: 148间客房"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotelId: "",
      hotelList: {},
      activeName: "first",
      showName: "风景"
    };
  },
  mounted() {
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

    window.onLoad = () => {
      // 5  js 加载完毕了！！！
      var mapa = new AMap.Map("container", {
        resizeEnable: true
      });
      var mapb = new AMap.Map("container2", {
        resizeEnable: true
      });

      AMap.service("AMap.PlaceSearch", () => {
        //构造地点查询类
        let data = [];
        var placeSearch1 = new AMap.PlaceSearch({
          type: "风景名胜", // 兴趣点类别
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.hotelList.real_city, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: mapa, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });

        var placeSearch2 = new AMap.PlaceSearch({
          type: "交通设施服务", // 兴趣点类别
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.hotelList.real_city, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: mapb, // 展现结果的地图实例
          panel: "traffic", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        let { latitude, longitude } = this.hotelList.location;
        console.log(latitude, longitude);
        var cpoint = [longitude, latitude]; //中心点坐标
        placeSearch1.searchNearBy("", cpoint, 4000, function(status, result) {
          console.log(result);
          // data = result.poiList.pois;
        });
        placeSearch2.searchNearBy("", cpoint, 2000, function(status, result) {
          console.log(result);
          // data = result.poiList.pois;
        });
      });
    };

    // 获取详情
    // console.log(this.$route.params.id);
    this.hotelId = this.$route.params.id;
    this.$axios.get("/hotels", { params: { id: this.hotelId } }).then(res => {
      console.log(res);
      this.hotelList = res.data.data[0];
    });
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.showName = tab.label;
      console.log(this.showName);
    }
  }
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.Thehoteldetails {
  width: 1000px;
  margin: 0 auto;
  .breadcrumbs {
    padding: 20px 0;
  }
  .hotel-thehead {
    display: flex;
    > h2 {
      font-weight: normal;
      margin-right: 10px;
    }
    > span {
      margin-top: 8px;
      color: orange;
    }
  }
  span {
    font-size: 14px;
  }
  .hotel-img {
    margin: 30px 0 40px 0;
    display: flex;
    .img-left {
      width: 640px;
      height: 360px;
    }
    .img-right {
      img {
        width: 190px;
        width: 153px;
        margin: 5px 10px 10px 0;
      }
    }
  }
  .thepricelist {
    .list-tint {
      padding: 10px 5px;
      display: flex;
      border-bottom: 1px solid #ccc;
      .jiage {
        color: #666;
        font-weight: normal;
        > span {
          color: orange;
          margin-right: 5px;
        }
        > i {
          margin-left: 7px;
          color: orange;
        }
      }
      > div {
        flex: 1;
        font-weight: 600;
        color: #999;
      }
    }
  }
  #container,
  #container2 {
    width: 650px;
    height: 400px;
    margin: 40px 0;
  }
  .ditu-list {
    margin-top: 40px;
    #panel,
    #traffic {
      background-color: white;
      // max-height: 90%;
      overflow-y: auto;
      width: 280px;
      border-bottom: solid 1px silver;
      height: 350px;
      overflow: auto;
    }
  }
  .list-details {
    font-weight: normal;
  }
}
</style>
