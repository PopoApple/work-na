<template>
  <PageRecords :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/PageRecords/asyncData'

  export default {
    middleware: 'authenticated',
    asyncData(ctx) {
      return asyncData(ctx).then(data => {
        return { data }
      })
    },
    watchQuery: true
  }
</script>
