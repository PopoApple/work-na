<template>
  <PageUserCenterMyMessage :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/userCenter/PageUserCenterMyMessage/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then(data => {
        return { data }
      })
    },
    watchQuery: true
  }
</script>