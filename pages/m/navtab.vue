<template>
  <PageNavtabM :data="data"/>
</template>
<script>
  import asyncData from '~/components/pages/PageNavtabM/asyncData'
  export default {
    layout:'simple',
    asyncData(ctx) {
        return asyncData(ctx).then(data => {
          return { data }
        })
      },
    watchQuery: true
  }
</script>