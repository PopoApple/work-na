<template>
  <div class="DatePickerM" :class="{'DatePickerM-pop-show': valueDatePickerPopup}">
    <div class="field-wrap">
      <div class="field-mask" @click="onSelectClick"></div>
      <i class="el-icon-date"></i>
      <Input v-model="valueLabel" :placeholder="placeholder"></Input>
    </div>
    <van-popup v-model="valueDatePickerPopup" round position="bottom">
      <van-datetime-picker
        type="date"
        :value="val"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="valueDatePickerPopup = false"
        @confirm="onDatePickerPopupConfirm"
      >
        <div slot="title" @click="handleClear">
          清除
        </div>
      </van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
import { Popup, DatetimePicker  } from 'vant'
const formatDate = obj => {
  let year = obj.getFullYear()
  let month = obj.getMonth()
  let date = obj.getDate()
  month = month + 1
  month = month < 10 ? '0' + month : month
  date = date < 10 ? '0' + date : date
  return `${year}-${month}-${date}`
}

export default {
  components: {
    VanPopup: Popup,
    VanDatetimePicker: DatetimePicker,
  },
  props: {
    options: Array,
    props: Object,
    value: String | Number,
    placeholder: String,
  },
  computed: {
    valueKey() {
      return this.props && this.props.value ? this.props.value : 'value'
    },
    labelKey() {
      return this.props && this.props.label ? this.props.label : 'label'
    },
  },
  data() {
    return {
      valueDatePickerPopup: false,
      valueLabel: '',
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2050, 11, 31),
    }
  },
  computed: {
    val() {
      let d = new Date()
      if (this.value) {
        let arry = this.value.split('-')
        d.setFullYear(arry[0])
        d.setMonth(parseInt(String(arry[1])) - 1)
        d.setDate(parseInt(String(arry[2])))
      }
      return d
    }
  },
  // 当传入初始值的yyyy-mm-dd时，出现valueLabel为''状况,故使用created进行赋值
  created() {
    this.valueLabel = this.value
  },
  watch: {
    value(val) {
      if (val) {
        this.valueLabel = val
      } else {
        this.valueLabel = ''
      }
    },
  },
  methods: {
    onDatePickerPopupConfirm(val) {
      this.$emit('input', formatDate(val))
      this.valueDatePickerPopup = false
    },
    onSelectClick() {
      this.valueDatePickerPopup = true
    },
    handleClear() {
      this.$emit('input', null)
      this.valueDatePickerPopup = false
    }
  },
}
</script>

<style lang="scss" scoped>
.DatePickerM {
  .field-wrap {
    position: relative;
    i {
      position: absolute;
      right: 15px;
      top: 22px;
      z-index: 1;
      color: $fontColorXLight;
    }
  }
  .field-mask {
    position: absolute; left: 0; top: 0; right: 0; bottom: 0; cursor: pointer; z-index: 1;
  }
}
</style>