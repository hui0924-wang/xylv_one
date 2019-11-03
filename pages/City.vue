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
};
</script>

<style>
.city{
  width: 1000px;
  margin: 0 auto;
}
#container {
  width: 1000px;
  height: 600px;
}
</style>