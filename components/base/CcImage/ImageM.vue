<template>
  <van-image :style="style" :src="src" :alt="alt" :fit="fit" :round="round">
    <template v-slot:loading>
      <van-loading type="spinner" size="20" />
    </template>
  </van-image>
</template>

<script>
  import { Image as VanImage, Loading as VanLoading } from 'vant'
  import { pxtorem } from '~/utils'
  import { validatenull } from '@/utils/validate'
  export default {
    components: {
      VanImage: VanImage,
      VanLoading: VanLoading
    },
    props: {
      src: String,
      fit: String,
      alt: String,
      width: Number | String,
      height: Number | String,
      round: Boolean
    },
    computed: {
      style() {
        let width = '100%'
        if (
          !validatenull(this.width) &&
          typeof this.width === 'string' &&
          this.width.indexOf('%') > -1
        ) {
          width = this.width
        } else {
          width = pxtorem(this.width)
        }
        let height = '100%'
        if (
          !validatenull(this.height) &&
          typeof this.height === 'string' &&
          this.height.indexOf('%') > -1
        ) {
          height = this.height
        } else {
          height = pxtorem(this.height)
        }
        let style = { width: width, height: height }
        if (!this.round) {
          style = {
            ...style,
            'border-radius': '6PX'
          }
        }
        return style
      }
    },
    methods: {}
  }
</script>
