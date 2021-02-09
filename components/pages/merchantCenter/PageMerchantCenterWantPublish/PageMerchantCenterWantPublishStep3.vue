<template>
  <div class="PageMerchantCenterWantPublishStep3">
    <div class="warn">
      <i class="iconfont icon-riqi"></i>&nbsp;
      <span>请等待审核~</span>
    </div>
    <div class="LayoutLeftMain-btnFooter">
      <Button type="primary" @click="$emit('toPublish')">继续发布</Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageMerchantCenterWantPublishStep3'
  }
</script>

<style lang="scss" scoped>
  .PageMerchantCenterWantPublishStep3 {
    .warn{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .warn span{
      font-size: $fontSizeXL;
      font-weight: bold;;
    }
  }
  .RootIsMobile {
    .PageMerchantCenterWantPublishStep3 {
    }
  }
</style>