<template>
  <Dialog size="small" :showConfirmBtn="false" cancelBtnText="关闭" title="需求人联系方式" @close="$emit('close')" >
    <div class="PageNeedIdInfoModalContent">
      <Form :label-width="labelWidth" size="mini" class="Form-view">
        <FormItem label="姓名">
          张三
        </FormItem> 
        <FormItem label="电话">
          1889998888999
        </FormItem> 
      </Form>
    </div>
  </Dialog>
</template>

<script>
import { pxtorem } from '~/utils'

export default {
  name: 'ModalInfoContent',
  computed: {
    labelWidth() {
      return pxtorem(this.$isMobile ? 280 : 130)
    }
  },
  data () {
    return {

    }
  },

  methods: {
    
  }
}
</script>

<style lang="scss">
.PageNeedIdInfoModalContent {

}
</style>


