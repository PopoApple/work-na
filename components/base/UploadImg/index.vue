<template>
  <div>
    <div class="UploadImg" :style="cardStyle">
      <el-upload class="UploadImg-btn" v-if="!value && !loading"  action="xxx" :http-request="handleUpload" :show-file-list="false" :before-upload="beforeUpload" >
        <UploadImgBtn :width="width" :height="height" :placeholder="placeholder"  />
      </el-upload>
      <ImgView v-if="value || loading" :loading="loading" :src="value" :showDelete="true" :width="width + 'px'" :height="height + 'px'" @delete="handleDelete" />
    </div>
    <div v-if="showTips" slot="tip" class="tip">只能上传图片，且文件大小不超过5M</div>
  </div>
</template>

<script>
import { Upload } from 'element-ui'
import { pxtorem } from '~/utils'
import emitter from '~/assets/js/emitterMixin'

export default {
  name: 'UploadImg',
  mixins: [emitter],
  components: {
    ElUpload: Upload,
  },
  props: {
    value: String,
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 200
    },
    placeholder: String,
    loading: Boolean,
    showTips: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    cardStyle() {
      return { 
        width: pxtorem(this.width), 
        height: pxtorem(this.height), 
      }
    },
  },
  watch: {
    value(val) {
      this.dispatch('ElFormItem', 'el.form.change', [val])
    },
  },
  methods: {
    pxtorem,
    handleDelete() {
      this.$emit('input', null)
    },
    beforeUpload(file) {
      let flag = true
      let isImage = file.type.indexOf('image') >= 0
      if (!isImage) {
        flag = false
        this.$message.error('只能上传图片')
      }
      let isSizeOk = file.size <= 1024 * 1024 * 5
      if (!isSizeOk) {
        flag = false
        this.$message.error('文件大小不能超过5M')
      }
      return flag
    },
    handleUpload(params) {
      this.$emit('upload', params)
    }
  },
}
</script>

<style lang="scss" scoped>
.UploadImg {
  position: relative;
  .UploadImg-btn {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
.tip {
  font-size: 12px;
  color: $fontColorXLight;
  margin-top: 2px;
  line-height: 24px;
}
</style>


