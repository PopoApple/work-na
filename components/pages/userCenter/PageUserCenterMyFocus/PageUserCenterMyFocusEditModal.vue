<template>
  <Dialog size="small" confirmBtnText="提交" :title="!!data ? '编辑分组' : '新增分组'" :top="$isMobile ? '20vh' : null" @close="$emit('close')" @confirm="handleSave" >
    <div class="PageUserCenterMyFocusAddModal">
      <Form :label-width="labelWidth" :model="form" :rules="rules" ref="form" size="medium">
        <FormItem label="名称" prop="name">
          <Input v-model="form.name" placeholder="请输入名称" :maxlength="16" />
        </FormItem>
      </Form>
    </div>
  </Dialog>
</template>

<script>
import { pxtorem } from '~/utils'
import { apiMockEdit } from './mock'
import { apiAddGroup, apiEditGroup } from '~/api/userCenter/myFocus'

export default {
  name: 'PageUserCenterMyFocusAddModal',
  props: {
    groups: Array,
    data: Object,
  },
  computed: {
    labelWidth() {
      return pxtorem(this.$isMobile ? 120 : 80)
    }
  },
  data () {
    const validator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入名称'))
      }
      if (this.groups.find(d => d.followGroupName === value)) {
        return callback(new Error('该名称已被使用'))
      }
      callback()
    }
    return {
      form: {},
      rules: {
        name: [
          // { required: true, message: '请输入名称', trigger: 'change' },
          { validator, trigger: 'change' },
        ]
      },
    }
  },
  created() {
    if (this.data) {
      this.form = { name: this.data.followGroupName }
    }
  },
  methods: {
    handleSave() {
      this.$refs['form'].validate(valid => {
        // console.log('校验结果：', valid, '表单数据：', this.form)
        if (valid) {
          const { name } = this.form
          let params = {
            followGroupName: name,
          }
          let api = apiAddGroup
          if (this.data) {
            params = {
              ...params,
              id: this.data.id,
            }
            api = apiEditGroup
          }
          this.$showLoading()
          api(this.$axiosClient, params).then(
            res => {
              if (res.code === 200) {
                this.$toast.success('操作成功')
                this.$emit('close')
                this.$emit('saveSuccess')
              } else {
                this.$hideLoading()
                this.$toast.fail('操作失败')
              }
            },
            e => {
              this.$hideLoading()
              this.$toast.fail('操作失败')
            }
          )
        }
      })
    },
  }
}
</script>


