<template>
  <PageJobIndex :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/job/PageJobIndex/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then((data) => {
        return { data }
      })
    },
    watchQuery: true,
  }
</script>