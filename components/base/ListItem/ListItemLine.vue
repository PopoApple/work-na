<template>
  <div class="ListItemLine" :class="{ ellipsis }" :style="style">
    <slot />
  </div>
</template>

<script>
import { pxtorem } from '~/utils'
import styleVars from '~/assets/style/vars.scss'

export default {
  name: "ListItemLine",
  props: {
    width: Number,
    ellipsis: {
      type: Boolean,
      default: true,
    },
    textAlign: String,
    fontSize: String,
    lineHeight: Number,
    color: String,
    bold: Boolean,
  },
  computed: {
    style() {
      let style = {}
      if (this.width) {
        style['width'] = pxtorem(this.width)
      }
      if (this.textAlign) {
        style['textAlign'] = this.textAlign
      }
      if (this.fontSize) {
        style['fontSize'] = styleVars[this.fontSize]
      }
      if (this.lineHeight) {
        style['lineHeight'] = this.lineHeight + 'PX'
      }
      if (this.color) {
        style['color'] = styleVars[this.color]
      }
      if (this.bold) {
        style['fontWeight'] = 'bold'
      }
      return style
    },
  },
  methods: {
    pxtorem
  },
}
</script>

<style lang="scss">
</style>


