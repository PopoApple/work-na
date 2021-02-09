<template>
  <PageMerchantDetailId :data="data" />
</template>
<script>
  import asyncData from '~/components/pages/merchantDetail/PageMerchantDetailId/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then(data => {
        return data
      })
    }
    // ,
    // watchQuery: true
  }
</script>