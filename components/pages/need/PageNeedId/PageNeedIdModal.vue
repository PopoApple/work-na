<template>
  <Dialog confirmBtnText="提交" title="请填写信息后可获取需求人联系方式" :top="$isMobile ? '2vh' : null" @close="$emit('close')" @confirm="handleSave" >
    <div class="PageNeedIdModalContent">
      <Form :label-width="labelWidth" :model="form" :rules="rules" ref="form" size="medium">
        <FormItem label="姓名" prop="name">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="电话" prop="phone">
          <div style="display: flex">
            <Input :value="form.phone" />
            <Button type="primary" plain @click="modal2Show = true" class="phone-btn" >获取验证码</Button>
          </div>
        </FormItem>
        <FormItem label="验证码" prop="code">
          <Input v-model="form.code" />
        </FormItem>
        <FormItem label="留言" prop="message">
          <Input v-model="form.message" type="textarea" :rows="3" />
        </FormItem>
        <FormItem label="添加图片" prop="fieldImgList">
          <UploadImgList v-model="form.fieldImgList" @upload="handleImgListUpload" />
        </FormItem>
        <FormItem label="是否公开" prop="isPublic">
          <RadioGroup v-model="form.isPublic">
            <Radio v-for="item in dictMock" :key="item.value" :label="item.value">{{ item.label }}</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>
  </Dialog>
</template>

<script>
import { pxtorem } from '~/utils'
import { dictMock } from './dicts'
import { apiMockUploadImg } from './mock'

//设置表单的默认值
const defaultFormData = {
  name: '',
  isPublic: 1,
  fieldImgList: null,
}
export default {
  name: 'ModalContent',
  // props: {
  //   data: Object,
  // },
  computed: {
    labelWidth() {
      return pxtorem(this.$isMobile ? 120 : 90)
    }
  },
  data () {
    return {
      dictMock,
      form: JSON.parse(JSON.stringify(defaultFormData)),
      //设置表单字段的校验规则
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'change' },
          // { validator: checkInt, trigger: 'change' }
        ]
      },
      // loading: false,
    }
  },
  created() {
    //如果传入了data，说明是编辑操作，先初始化表单数据
    // if (this.data) {
    //   this.form.inputField1 = this.data.detailField
    //   this.form.inputField2 = this.data.detailField
    //   this.form.inputField3 = this.data.detailField
    //   this.form.inputField4 = this.data.detailField
    //   this.form.inputField5 = this.data.detailField
    //   this.form.inputFieldDate = this.data.detailFieldDate
    // }
  },
  methods: {
    
    /**
     * 更新图片列表
     * @uid: Number 文件的唯一标识
     * @updateFields: Object 需要更新的字段
     */
    updateImgList(uid, updateFields) {
      this.form.fieldImgList = this.form.fieldImgList.map(d => d.uid === uid ? { ...d, ...updateFields } : d)
    },
    /**
     * 处理上传图片列表，上传多文件时会多次调用，上传完成时更新文件列表的数据，包含成功失败状态，请求返回的图片的url
     * @file: File 当前上传的文件
     */
    handleImgListUpload({ file }) {
      //this.loading = true
      let uid = file.uid
      apiMockUploadImg(file).then(res => {
        //this.loading = false
       if (res.data.code === 0) {
        this.updateImgList(uid, { success: true, url: res.data.url })
       } else {
        this.updateImgList(uid, { error: '上传失败' })
       }
      }, e => {
        //this.loading = false
        this.updateImgList(uid, { error: '上传失败' })
      })
    },
    /**
     * 保存数据，先进行校验，通过了才保存
     */
    handleSave() {
      
      this.$emit('close')
      this.$emit('saveSuccess')
      this.$refs['form'].validate((valid) => {
        // console.log('校验结果：', valid, '表单数据：', JSON.stringify(this.form))
        // if (valid) {
        //   const { inputField1, inputField2, inputFieldDate, inputField3, inputField4, inputField5 } = this.form
        //   let params = {
        //     inputField1,
        //     inputField2,
        //     inputFieldDate,
        //     inputField3,
        //     inputField4,
        //     inputField5,
        //   }
        //   let api = apiMockAdd
        //   //如果传入了数据，说明是编辑操作，调用编辑接口，参数还需要传入唯一标识
        //   if (this.data) {
        //     api = apiMockEdit
        //     params = {
        //       ...params,
        //       id: this.data.id,
        //     }
        //   }
        //   this.loading = true
        //   api(params).then(res => {
        //     this.loading = false
        //     if (res.data.code === 0) {
        //       notifySuccess(this, '操作成功')
        //       this.$emit('close')
        //       this.$emit('refresh')
        //     }
        //   }, e => {
        //     this.loading = false
        //   })
        // }
      })
    },
  }
}
</script>

<style lang="scss">
.PageNeedIdModalContent {
  .phone-btn {
    width: 140px;
    margin-left: 20px;
  }
}
.RootIsMobile .PageNeedIdModalContent {
  .phone-btn {
    width: 200px;
  }
}
</style>


