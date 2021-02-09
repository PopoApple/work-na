<template>
  <van-swipe :autoplay="3000"  indicator-color="white">
    <slot />
  </van-swipe>
</template>

<script>
import { Swipe } from 'vant'

export default {
  props: {
    height: String,
  },
  components: {
    VanSwipe: Swipe,
  },
}
</script>

<style lang="scss">
.van-swipe__indicator:not(:last-child) {
  margin-right: 27px;
}
</style>

