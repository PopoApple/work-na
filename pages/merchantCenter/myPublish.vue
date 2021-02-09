<template>
  <PageMerchantCenterMyPublish :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/merchantCenter/PageMerchantCenterMyPublish/asyncData'

  export default {
    middleware: 'merchantAuth',
    asyncData(ctx) {
      return asyncData(ctx).then(data => {
        return { data }
      })
    },
    watchQuery: true
  }
</script>