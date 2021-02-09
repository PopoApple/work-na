<template>
  <Dialog
    confirmBtnText="提交"
    title="投诉/建议"
    :top="$isMobile ? '2vh' : null"
    :append-to-body="true"
    @close="$emit('close')"
    @confirm="handleSave"
  >
    <div class="UserReportModalContent">
      <Form :label-width="labelWidth" :model="form" :rules="rules" ref="form" size="medium">
        <FormItem label="类型" prop="suggestType">
          <RadioGroup v-model="form.suggestType">
            <Radio v-for="item in dictMock" :key="item.value" :label="item.value">{{ item.label }}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="留言" prop="suggestContent">
          <Input v-model="form.suggestContent" type="textarea" :rows="3" />
        </FormItem>
        <FormItem label="手机" prop="contactPhone">
          <Input v-model="form.contactPhone" />
        </FormItem>
      </Form>
    </div>
  </Dialog>
</template>

<script>
  import { pxtorem } from '~/utils'
  import { checkNumber } from '@/utils/validate'
  import { apiAddSuggest } from '~/api/userReport'

  //设置表单的默认值
  const defaultFormData = {
    suggestType: 1
  }
  export default {
    name: 'UserReportModal',
    computed: {
      labelWidth() {
        return pxtorem(this.$isMobile ? 120 : 90)
      }
    },
    data() {
      return {
        //业务字典
        dictMock: [
          { value: 1, label: '建议' },
          { value: 0, label: '投诉' }
        ],
        form: JSON.parse(JSON.stringify(defaultFormData)),
        //设置表单字段的校验规则
        rules: {
          suggestContent: [{ required: true, message: '请输入', trigger: 'change' }],
          contactPhone: [{ validator: checkNumber, trigger: 'change' }]
        }
        // loading: false,
      }
    },
    created() {},
    methods: {
      /**
       * 保存数据，先进行校验，通过了才保存
       */
      handleSave() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            const { suggestType, suggestContent, contactPhone } = this.form
            let params = {
              suggestType: suggestType,
              suggestContent: suggestContent,
              contactPhone: contactPhone
            }
            this.$confirm(`确认要提交吗？`)
              .then(() => {
                this.$showLoading()
                apiAddSuggest(this.$axiosClient, params).then(
                  res => {
                    this.$hideLoading()
                    if (res.code === 200) {
                      this.$toast.success('感谢您的建议!')
                      this.$emit('saveSuccess')
                      this.$emit('close')
                    } else {
                      this.$toast.fail(res.msg || '提交异常,请稍后再试!')
                    }
                  },
                  e => {
                    this.$hideLoading()
                    this.$toast.fail(e.message || '提交异常,请稍后再试!')
                  }
                )
              })
              .catch(() => {})
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.UserReportModalContent {
  .contactPhone-btn {
    width: 140px;
    margin-left: 20px;
  }
}
.RootIsMobile .UserReportModalContent {
  .contactPhone-btn {
    width: 200px;
  }
}
</style>


