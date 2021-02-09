<template>
  <PageIndex :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/PageIndex/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then((data) => {
        return { data }
      })
    },
  }
</script>