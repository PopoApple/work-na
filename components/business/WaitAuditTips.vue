<template>
  <div class="WaitAuditTips">
    <div class="img bg-img"></div>
    <div class="em">企业信息填写成功！</div>
    <div>信息审核将在1-2个工作日内完成</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.WaitAuditTips {
  margin: 80px 0;
  text-align: center;
  font-weight: bold;
  font-size: $fontSizeXL;
  line-height: 40PX;
  .em {
    color: $colorGreen;
  }
  .img {
    width: 183px;
    height: 121px;
    display: block;
    margin: 0 auto 60px;
    background-image: url('~static/img/commit-success.png');
    background-color: transparent;
  }
}
</style>