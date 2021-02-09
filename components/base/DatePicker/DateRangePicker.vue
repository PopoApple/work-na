<template>
  <div class="flex-wrap">
    <div class="flex-item">
      <DatePicker :value="valueStart" :placeholder="startPlaceholder" :size="size" :clearable="clearable" @input="handleInputStart" />
    </div>
    <div style="margin: 0 5px"> - </div>
    <div class="flex-item">
      <DatePicker :value="valueEnd" :placeholder="endPlaceholder" :size="size" :clearable="clearable" @input="handleInputEnd" />
    </div>
  </div>
</template>

<script>
import emitter from '~/assets/js/emitterMixin'

export default {
  mixins: [emitter],
  props: {
    value: Array,
    size: String,
    clearable: Boolean,
    startPlaceholder: String,
    endPlaceholder: String,
  },
  computed: {
    valueStart() {
      return this.value ? (this.value[0] || null) : null
    },
    valueEnd() {
      return this.value ? (this.value[1] || null) : null
    },
  },
  methods: {
    handleInputStart(e) {
      this.handleInput(e || null, this.valueEnd)
    },
    handleInputEnd(e) {
      this.handleInput(this.valueStart, e || null)
    },
    handleInput(start, end) {
      let val = !start && !end ? null : [start, end]
      this.$emit('input', val)
      this.dispatch('ElFormItem', 'el.form.change', val)
    }
  },
}
</script>

