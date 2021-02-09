<template>
  <div>
    <ImgList
      :value="value"
      :showDelete="true"
      :width="width"
      :height="height"
      @change="triggerChange"
    >
      <div class="btn-wrap">
        <el-upload
          ref="upload"
          action="xxx"
          :http-request="uploadFiles"
          :file-list="value || []"
          :auto-upload="true"
          :before-upload="beforeFilesUpload"
          :show-file-list="false"
          :limit="limit"
          :on-change="handleFilesChange"
          :on-exceed="handelExceed"
        >
          <UploadImgBtn :width="width" :height="height" :placeholder="placeholder" />
        </el-upload>
      </div>
    </ImgList>
    <div slot="tip" class="tip">只能上传图片，且文件大小不超过5M</div>
  </div>
</template>

<script>
  import { Upload } from 'element-ui'
  import { pxtorem } from '~/utils'
  import emitter from '~/assets/js/emitterMixin'

  export default {
    name: 'UploadImgList',
    mixins: [emitter],
    components: {
      ElUpload: Upload
    },
    props: {
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      tips: String,
      showUrl: {
        type: Boolean,
        default: true
      },
      width: {
        type: Number,
        default: 148
      },
      height: {
        type: Number,
        default: 148
      },
      placeholder: String,
      limit: {
        type: Number,
        default: 0
      }
    },
    computed: {
      cardStyle() {
        return {
          width: pxtorem(this.width),
          height: pxtorem(this.height)
        }
      }
    },
    watch: {
      value(val) {
        this.dispatch('ElFormItem', 'el.form.change', [val])
      }
    },
    data() {
      return {
        files: {}
      }
    },
    methods: {
      pxtorem,
      beforeFilesUpload(file) {
        let isImage = file.type.indexOf('image') >= 0
        if (!isImage) {
          this.$message.error('只能上传图片')
          return false
        }
        let isSizeOk = file.size <= 1024 * 1024 * 5
        if (!isSizeOk) {
          this.$message.error('文件大小不能超过5M')
          return false
        }
        this.files[file.uid] = file
        this.$set(this.files, file.uid, file)
        return true
      },
      uploadFiles(params) {
        this.$emit('upload', params)
      },
      triggerChange(fileList, rowId) {
        this.$emit('input', fileList.length > 0 ? fileList : null, rowId)
      },
      handleFilesChange(file, fileList) {
        this.triggerChange(fileList)
      },
      handelExceed() {
        this.$toast.fail('超过文件最大限制个数!')
      }
    }
  }
</script>

<style lang="scss" scoped>
.btn-wrap {
  float: left;
  margin: 0 20px 20px 0;
}
.tip {
  font-size: 12px;
    color: $fontColorXLight;
    margin-top: -10px;
}
</style>


