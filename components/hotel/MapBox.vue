<template>
  <div class="city">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      // 5  js 加载完毕了！！！
      var map = new AMap.Map("container", {
        // 地图的缩放倍数
        zoom: 12,
        // 要显示的经纬度[经度，纬度]
        center: [116.39, 39.9]
      });
      // 6 .创建一个 点标记
      var marker = new AMap.Marker({
        position: [116.39, 39.9] //位置
      });
      map.add(marker); //添加到地图
    };

    // 1 定义 高度地图 js 路径
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=9222c2448e360235eddd73326dc97b24&callback=onLoad";
    // 2 手动创建了一个script标签
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    // 3 定义 script标签的 引入地址
    jsapi.src = url;
    // 4 把script标签 放入到 html标签的 head标签的中
    document.head.appendChild(jsapi);
  }
};
</script>

<style>
.city {
  width: 100%;
}
#container {
  width: 420px;
  height: 260px;
}
</style>