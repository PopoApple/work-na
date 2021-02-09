<template>
  <PageUserCenterMyComment :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/userCenter/PageUserCenterMyComment/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then(data => {
        return { data }
      })
    },
    watchQuery: true
  }
</script>