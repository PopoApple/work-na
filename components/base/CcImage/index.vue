<template>
  <component
    :is="comp"
    :src="src"
    :fit="fit"
    :alt="alt"
    :width="width"
    :height="height"
    :round="round"
    :defaultIconSizeLevel="defaultIconSizeLevel"
  />
</template>

<script>
  // import ImageM from '~/components/base/CcImage/ImageM'
  import ImagePc from '~/components/base/CcImage/ImagePc'
  /**
   * 图片可以设定
   * fit: fill / contain / cover / none / scale-down 默认fill
   * alt:替代文本
   * src:路径
   * width: 默认100  px计
   * height: 默认100  px计
   * round: 是否圆形 默认false
   */
  export default {
    props: {
      src: String,
      fit: {
        type: String,
        default: 'fill'
      },
      alt: String,
      width: {
        type: Number | String,
        default: '100%'
      },
      height: {
        type: Number | String,
        default: '100%'
      },
      round: {
        type: Boolean,
        default: false
      },
      sizeLevel: {  // xs, s, m, l
        type: String,
      },
    },
    computed: {
      comp() {
        //return this.$isMobile ? ImageM : ImagePc
        return ImagePc
      },
      defaultIconSizeLevel() {
        let level = this.sizeLevel
        if (!level && this.width && this.height && typeof this.width === 'number' && typeof this.height === 'number') {
          let w = this.width
          let h = this.height
          if (this.$isMobile) {
            w = w / 2
            h = h / 2
          }
          let min = Math.min(w, h)
          if (min < 50) {
            level = 'xs'
          } else if (min < 80) {
            level = 's'
          } else if (min > 200) {
            level = 'l'
          } else {
            level = 'm'
          }
        }
        return level
      },
    }
  }
</script>

