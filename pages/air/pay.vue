<template>
  <div class="pay">
    <div class="pay_view">
      <div class="pay_price">
        总金额: <span>￥199999</span>
      </div>
      <div class="pay_content">
        <div class="pay_title">微信支付</div>
        <div class="pay_main">
          <div class="pay_code">
            <!-- 支付的图片 -->
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay_img">
            <img
              src="http://157.122.54.189:9093/images/wx-sweep2.jpg"
              alt=""
              srcset=""
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.pay {
  height: 690px;
  background-color: #f5f5f5;
}
.pay_view {
  width: 1000px;
  margin: 0 auto;
}
.pay_price {
  padding: 20px 0;
  font-size: 25px;
  text-align: right;
  span {
    font-size: 28px;
    color: red;
  }
}
.pay_content {
  background-color: #fff;
  height: 580px;
  border-top: 4px solid orange;

  .pay_title {
    padding: 20px;
    font-size: 35px;
  }
  .pay_main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 111px;
    .pay_code {
      border: 1px solid #ccc;
      width: 228px;
      height: 310px;
      padding: 10px;
      text-align: center;
    }
    .pay_img {
    }
  }
}
</style>