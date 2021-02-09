<template>
  <PageZhaocaiId :data="data"/>
</template>

<script>
  import asyncData from '~/components/pages/zhaocai/PageZhaocaiId/asyncData'

   export default {
    asyncData(ctx) {
      return asyncData(ctx).then((data) => {
        return { data }
      })
    },
    watchQuery: true,
  }
</script>