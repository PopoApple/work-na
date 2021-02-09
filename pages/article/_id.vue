<template>
  <PageArticleId :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/article/PageArticleId/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then((data) => {
        return { data }
      })
    },
  }
</script>