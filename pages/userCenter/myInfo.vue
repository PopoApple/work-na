<template>
  <PageUserCenterMyInfo :data="data"/>
</template>

<script>
  import asyncData from '~/components/pages/userCenter/PageUserCenterMyInfo/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then(data => {
        return { data }
      })
    },
    watchQuery: true
  }
</script>