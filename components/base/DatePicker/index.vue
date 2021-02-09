<template>
  <component :is="comp" :options="options" :props="props" :value="value" :placeholder="placeholder" :size="size" :clearable="clearable" :type="type" :start-placeholder="startPlaceholder" :end-placeholder="endPlaceholder" style="width: 100%" value-format="yyyy-MM-dd" @input="handleInput" @change="handleChange" />
</template>

<script>
import DatePickerM from '~/components/base/DatePicker/DatePickerM'
import DatePickerPc from '~/components/base/DatePicker/DatePickerPc'

export default {
  props: {
    options: Array,
    props: Object,
    value: String | Number,
    placeholder: String,
    size: String,
    clearable: Boolean,
    type: String,
    startPlaceholder: String,
    endPlaceholder: String,
  },
  computed: {
    comp() {
      return this.$isMobile ? DatePickerM : DatePickerPc
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e)
    },
    handleChange(e) {
      this.$emit('change', e)
    }
  },
}
</script>

