<template>
  <div class="PageMerchantCenterCa">
    <div class="LayoutLeftMain-header">
      <TabBtn title="商户认证" styleType="line" />
    </div>
    <div class="LayoutLeftMain-body">
      <template v-if="currentStep" >
        <Steps :active="currentStep" align-center class="steps">
          <Step title="填写认证信息">
            <i slot="icon" class="iconimg i-editInfo" :class="{active: currentStep === 1}" />
          </Step>
          <Step title="等待信息审核">
            <i slot="icon" class="iconimg i-waitAduit" :class="{active: currentStep === 2}" />
          </Step>
          <Step title="完成商户认证">
            <i slot="icon" class="iconimg i-failed" v-if="currentStep === 3 && (data.status === 3 || data.status === 4)" />
            <i slot="icon" class="iconimg i-finished" :class="{active: currentStep === 3}" v-else />
          </Step>
        </Steps>
        <div class="LayoutLeftMain-splitLine"></div>
      </template>
      <PageMerchantCenterCaNoCa v-if="currentStep === 0" @toCa="currentStep = 1" />
      <PageMerchantCenterCaStep1 v-if="currentStep === 1" :isReEdit="isReEdit" @saveSuccess="currentStep = 2" :data="!data.isAuth ? null : data.data" @cancel="currentStep = 3" />
      <WaitAuditTips v-if="currentStep === 2" />
      <PageMerchantCenterCaStep3 v-if="currentStep === 3" :status="data.status" :data="data.data" @redoCa="handleRedoCa" />
    </div>
  </div>
</template>

<script>
import { apiCheck, apiDetail } from '~/api/merchantCenter/ca'
import headMixin from '~/assets/js/headMixin'

  export default {
    mixins: [headMixin],
    props: {
      data: Object,
    },
    data() {
      return {
        currentStep: 0,
        isReEdit: false,
      }
    },
    //status 审核状态 1未审核 2已通过 3未通过 4驳回
    created() {
      if (this.data.isAuth) {
        if (this.data.status === 1) {
          this.currentStep = 2
        } else {
          this.currentStep = 3
        }
      } else {
        this.currentStep = 0
      }
    },
    methods: {
      handleRedoCa() {
        this.currentStep = 1
        this.isReEdit = true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .PageMerchantCenterCa {
    .steps {
      margin: 40px 0;
    }
  }
  .RootIsMobile {
    .PageMerchantCenterCa {
      .steps {
        margin: 60px 0 80px;
      }
    }
  }
</style>
