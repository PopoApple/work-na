<template>
  <PageMerchantCenterCa :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/merchantCenter/PageMerchantCenterCa/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then((data) => {
        return { data }
      })
    },
    watchQuery: true,
  }
</script>