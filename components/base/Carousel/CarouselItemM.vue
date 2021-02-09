<template>
  <van-swipe-item>
    <slot />
  </van-swipe-item>
</template>

<script>
import { SwipeItem } from 'vant'

export default {
  components: {
    VanSwipeItem: SwipeItem,
  },
}
</script>

