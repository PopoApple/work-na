<template>
  <van-popup :value="value" @input="$emit('input')" :position="position" :duration="duration">
    <slot />
  </van-popup>
</template>

<script>
import { Popup } from 'vant'
export default {
  props: {
    value: Boolean,
    position: String,
    duration: Number,
  },
  components: {
    VanPopup: Popup,
  },
};
</script>
