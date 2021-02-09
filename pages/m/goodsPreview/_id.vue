<template>
  <PageGoodsPreviewId :data="data" />
</template>
<script>
  import asyncData from '~/components/pages/goodsPreview/PageGoodsPreviewId/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then(data => {
        return data
      })
    }
  }
</script>