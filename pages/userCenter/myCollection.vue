<template>
  <PageUserCenterMyCollection :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/userCenter/PageUserCenterMyCollection/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then((data) => {
        return { data }
      })
    },
    watchQuery: true,
  }
</script>