<template>
  <PageGoodsDetail :productIntro="productIntro" :productParam="productParam" />
</template>
<script>
  export default {
    props: {
      productIntro: String,
      productParam: String
    }
  }
</script>