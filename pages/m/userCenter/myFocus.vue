<template>
  <PageUserCenterMyFocus :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/userCenter/PageUserCenterMyFocus/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then((data) => {
        return { data }
      })
    },
    watchQuery: true,
  }
</script>
