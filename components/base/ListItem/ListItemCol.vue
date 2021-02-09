<template>
  <div class="ListItemCol" :class="{ ellipsis: !isField && ellipsis !== false, 'ListItemCol-field': isField }" :style="isField && $isMobile ? null : style">
    <slot v-if="!isField" />
    <template v-if="isField">
      <div class="ListItemCol-field-label">{{ label }}</div>
      <div class="ListItemCol-field-content" :class="{ ellipsis: ellipsis !== false }" :style="!$isMobile ? null : style">
        <slot />
      </div>
    </template>
  </div>
</template>

<script>
import { pxtorem } from '~/utils'
import styleVars from '~/assets/style/vars.scss'

export default {
  name: "ListItemCol",
  props: {
    width: Number,  // 宽度
    label: String,  // 字段名（列表为isFieldsView时使用）
    ellipsis: {   // 内容超出显示省略号
      type: Boolean,
      default: undefined,
    },
    textAlign: String,  // 对齐方式
    fontSize: String, // 字体大小，需传入sass变量中的值，如'fontSizeXL'
    lineHeight: Number,  // 行高
    color: String,  // 文字颜色，需传入sass变量中的值，如'colorGreen'
    bold: Boolean,  // 文字加粗
  },
  computed: {
    isField() {
      return !!this.label
    },
    style() {
      let style = {}
      if (this.width) {
        style['width'] = pxtorem(this.width)
      } else {
        style['flex'] = 1
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
.ListItemCol {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ListItemCol-field-label {
  color: $fontColorLight;
}

.RootNotMobile {
  .ListItemCol-field-content {
    margin-top: 4px;
  }
}

.RootIsMobile {
  .ListItemCol.ListItemCol-field {
    flex-direction: row;
    justify-content: space-between;
  }
  .ListItemCol-field-content {
    text-align: right;
  }
}
</style>


