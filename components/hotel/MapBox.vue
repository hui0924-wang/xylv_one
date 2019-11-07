<template>
  <div class="map_box">
    <div id="container"></div>
    <div class="loading" v-if="!loaded" />
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      loaded: false
    };
  },

  mounted() {
    window.onLoad = () => {
      const map = new AMap.Map("container", {
        // center: [118.9213, 31.75649]
      });
      this.map = map;
      this.addMarks();
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=9222c2448e360235eddd73326dc97b24&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    addMarks() {
      // console.log(this.value);
      if (typeof AMap !== "object" || !this.value) {
        return;
      }
      const map = this.map;
      // 点标记数组
      const markers = this.value.map((hotelData, i) => {
        const {
          name,
          address,
          location: { latitude, longitude }
        } = hotelData;
        const position = new AMap.LngLat(longitude, latitude);
        // 创建多个点标记
        const marker = new AMap.Marker({
          position,
          title: name,
          content: `<span class="marker">${i + 1}</span>`,
          text: address,
          topWhenClick: true
        });
        // 信息窗体
        const infoWindow = new AMap.InfoWindow({
          content: `<span style="font-size: 12px;color: #333">${name}</span>`,
          offset: new AMap.Pixel(0, -32)
        });
        function showInfoWin() {
          //  打开信息窗体
          infoWindow.open(map, position);
        }
        function closeInfoWin() {
          //  关闭信息窗体
          infoWindow.close();
        }
        marker.on("mouseover", showInfoWin);
        marker.on("mouseout", closeInfoWin);
        return marker;
      });
      map.clearMap();
      map.add(markers); //添加到地图
      map.setFitView();
    }
  },
  watch: {
    // 常规方式
    value: {
      handler(newV, oldV) {
        this.loaded = !!this.value;
        // console.log(newV, oldV);
        if (this.map) {
          if (!this.value) {
            this.map.clearMap();
          } else {
            this.addMarks();
          }
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.map_box {
  width: 100%;
  position: relative;
}
#container {
  width: 420px;
  height: 260px;
}
/deep/ .marker {
  display: inline-block;
  width: 22px;
  height: 36px;
  background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png);
  background-size: 22px 36px;
  text-align: center;
  line-height: 24px;
  color: #fff;
}
.loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: rgba(0, 0, 0, 0.5)
    url("http://157.122.54.189:9093/images/loading.gif") center center no-repeat;
}
</style>