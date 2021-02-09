<template>
  <component :is="comp" :btnClass="btnClass" :dict="dict" :plain="plain" :placement="placement" :size="size" :type="type" @command="handleCommand">
    <slot/>
  </component>
</template>

<script>
import DropdownBtnM from './DropdownBtnM'
import DropdownBtnPc from './DropdownBtnPc'

export default {
  props: {
    dict: {
      type: Array,
      default: () => {
        return []
      }
    },
    size: String,
    type: String,
    btnClass: String,
    plain: Boolean,
    placement: {
      type: String,
      default: 'bottom',
    },
  },
  computed: {
    comp() {
      return this.$isMobile ? DropdownBtnM : DropdownBtnPc
    },
  },
  methods: {
    handleCommand(id, item) {
      this.$emit('command', id, item)
    },
  },
}
</script>

