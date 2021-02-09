<template>
  <PageMaterialIndex :data="data"/>
</template>

<script>
  import asyncData from '~/components/pages/material/PageMaterialIndex/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then((data) => {
        return { data }
      })
    },
    watchQuery: true,
  }
</script>