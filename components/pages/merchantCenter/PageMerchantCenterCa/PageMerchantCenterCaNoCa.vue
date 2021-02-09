<template>
  <div class="PageMerchantCenterCaNoCa LayoutLeftMain-padding-bottom">
    <div class="content">
      您还未完成商户认证，点击
      <span class="em">【申请认证】</span>
      开始填写信息!
    </div>
    <div class="footer">
      <Button type="primary" @click="$emit('toCa')">申请认证</Button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.PageMerchantCenterCaNoCa {
  .content {
    margin: 80px 0 60px;
    text-align: center;
    font-weight: bold;
    font-size: $fontSizeXL;
    line-height: 36PX;
    .em {
      color: $colorGreen;
    }
  }
  .footer {
    text-align: center;
  }
}

.RootIsMobile {
  .PageMerchantCenterCaNoCa {
    .content {
      font-size: $fontSize;
      line-height: 26PX;
      color: $fontColorXLight;
      font-weight: normal;
    }
  }
}
</style>