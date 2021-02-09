<template>
  <div class="DropdownBtn" :class="{'DropdownBtnM-pop-show': valueSelectPopup}">
    <Button :class="btnClass" :size="size" :type="type" :plain="plain" @click="onSelectClick"><slot /><i class="el-icon-arrow-down el-icon--right"></i></Button>
    <van-popup v-model="valueSelectPopup" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="0"
        @cancel="valueSelectPopup = false"
        @confirm="onSelectPopupConfirm"
      >
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Picker  } from 'vant'

export default {
  components: {
    VanPopup: Popup,
    VanPicker: Picker,
  },
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
  },
  computed: {
    columns() {
      return this.dict.map(d => d.label)
    },
  },
  data() {
    return {
      valueSelectPopup: false,
      valueLabel: '',
    }
  },
  methods: {
    onSelectPopupConfirm(value, index) {
      this.$emit('command', this.dict[index].value, this.dict[index])
      this.valueSelectPopup = false
    },
    onSelectClick() {
      if (this.dict.length === 0) {
        return
      }
      this.valueSelectPopup = true
    },
  },
}
</script>

<style lang="scss" scoped>
.DropdownBtn {
  display: inline-block;
}
</style>