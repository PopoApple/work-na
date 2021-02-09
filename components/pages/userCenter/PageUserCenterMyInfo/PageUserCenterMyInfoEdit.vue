<template>
  <Form :label-width="labelWidth" ref="form" size="medium" class="info-form" :rules="rules" :model="form">

    <FormItem label="昵称:" class="info-name" prop="name">
      <Input v-model="form.name" placeholder="请输入您的昵称" />
      <Button class="Button30" @click="checkBtn">验证昵称</Button>
    </FormItem>

    <FormItem label="电话:" prop="phone">
      <Input v-model="form.phone" placeholder="请输入您的电话" :disabled="true" />
    </FormItem>

    <FormItem label="出生日期:" prop="born">
      <DatePicker v-model="form.born" placeholder="请选择您的生日" ></DatePicker>
    </FormItem>

    <FormItem label="性别:" prop="sex"  >
      <Radio v-model="form.sex" :label= 0 >男</Radio>
      <Radio v-model="form.sex" :label= 1 >女</Radio>
    </FormItem>

  </Form>
</template>

<script>
import { pxtorem } from '~/utils'
import { validatorPhone } from '~/utils/validate'
export default {
  model: {
    prop: 'form',
    event: 'change'
  },
  props: {
    form: Object
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入您的昵称', trigger: 'change' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入您的电话号码', trigger: 'change'},
          // 由于会拿到176****6560的数据，所以注释
          // { validator: validatorPhone, trigger: 'change' }
        ],
        born: [
          { required: true, message: '请输入您的生日', trigger: 'change'}
        ],
        sex: [
          { required: true, message: '请选择你的性别', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    labelWidth() {
      return pxtorem(this.$isMobile ? 180 : 100)
    }
  },
  methods: {
    checkBtn() {
      this.$emit('name-check')
    }
  }
}
</script>

<style lang="scss" scoped>
.RootNotMobile {
  .el-input {
    width: 50% !important;
  }
  .info-name {
    & :nth-child(2) {
      margin-left: 20px;
    }
  }
}
.RootIsMobile {
  .el-input {
    width: 100%;
  }
}
</style>