<template>
  <div class="SelectM" :class="{'SelectM-pop-show': valueSelectPopup}">
    <div class="field-wrap">
      <div class="field-mask" @click="onSelectClick"></div>
      <i class="el-icon-arrow-down"></i>
      <Input v-model="valueLabel" :placeholder="placeholder"></Input>
    </div>
    <van-popup v-model="valueSelectPopup" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="defaultIndex"
        @cancel="valueSelectPopup = false"
        @confirm="onSelectPopupConfirm"
      >
        <div slot="title" @click="handleClear">清除</div>
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
  import { Popup, Picker } from 'vant'
  import { validatenull } from '@/utils/validate'
  export default {
    components: {
      VanPopup: Popup,
      VanPicker: Picker
    },
    props: {
      dict: Array,
      value: String | Number,
      placeholder: String
    },
    computed: {
      columns() {
        return this.dict.map(d => d.label)
      }
    },
    data() {
      return {
        valueSelectPopup: false,
        valueLabel: '',
        defaultIndex: 0
      }
    },
    watch: {
      dict: {
        //防止dict异步获取
        handler(val) {
          this.changeLabelValue()
        },
        immediate: true
      },
      value: {
        handler(val) {
          if (val && this.dict) {
            let idx = this.dict.findIndex(d => d.value === val)
            idx = idx >= 0 ? idx : 0
            this.valueLabel = this.dict[idx] ? this.dict[idx].label : ''
            this.defaultIndex = idx
          } else {
            this.valueLabel = ''
            this.defaultIndex = 0
          }
        },
        immediate: true
      }
    },
    methods: {
      onSelectPopupConfirm(value, index) {
        this.$emit('input', this.dict[index].value)
        this.valueSelectPopup = false
      },
      onSelectClick() {
        this.valueSelectPopup = true
      },
      handleClear() {
        this.$emit('input', null)
        this.valueSelectPopup = false
      },
      changeLabelValue() {
        //定义初始值
        if (!this.valueLabel && this.value && !validatenull(this.dict)) {
          let idx = this.dict.findIndex(d => d.value === this.value)
          idx = idx >= 0 ? idx : 0
          this.valueLabel = this.dict[idx] ? this.dict[idx].label : ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.SelectM {
  .field-wrap {
    position: relative;
    i {
      position: absolute;
      right: 10px;
      top: 20px;
      z-index: 1;
      color: $fontColorXLight;
      transition: transform 0.3s;
    }
  }
  &.SelectM-pop-show {
    .field-wrap i {
      transform: rotate(180deg);
    }
  }
  .field-mask {
    position: absolute; left: 0; top: 0; right: 0; bottom: 0; cursor: pointer; z-index: 1;
  }
}
</style>