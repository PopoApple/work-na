<template>
  <div :style="style">
    {{ getStatusText(value) }}
  </div>
</template>

<script>
import styleVars from '~/assets/style/vars.scss'
  export default {
    props: {
      value: String | Number,
      dict: Array,
      width: Number,
      textAlign: String,
      fontSize: String,
      lineHeight: Number,
      bold: Boolean,
    },
    computed: {
      style() {
        let style = { color: this.getStatusColor(this.value) }
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
        if (this.bold) {
          style['fontWeight'] = 'bold'
        }
        return style
      },
    },
    methods: {
      getStatusColor(val) {
        let opt = this.dict.find((d) => d.value === val)
        return opt ? (styleVars[opt.color] || opt.color) : ''
      },
      getStatusText(val) {
        let opt = this.dict.find((d) => d.value === val)
        return opt ? opt.label : ''
      },
    },
  }
</script>

<style lang="scss" scoped>
</style>
