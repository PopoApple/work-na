<template>
  <div class="PageMerchantCenterWantPublish">
    <div class="LayoutLeftMain-header">
      <TabBtn title="我要发布" styleType="line" />
    </div>
    <div class="LayoutLeftMain-body">
      <Steps :active="currentStep" align-center class="steps">
        <Step title="选择发布类型">
          <i slot="icon" class="iconimg i-selectType" :class="{active: currentStep === 1}" />
        </Step>
        <Step title="填写发布信息">
          <i slot="icon" class="iconimg i-editInfo" :class="{active: currentStep === 2}" />
        </Step>
        <Step title="等待审核">
          <i slot="icon" class="iconimg i-waitAduit" :class="{active: currentStep === 3}" />
        </Step>
        <Step title="发布完成">
          <i slot="icon" class="iconimg i-finished" :class="{active: currentStep === 4}" />
        </Step>
      </Steps>
      <PageMerchantCenterWantPublishStep1 v-if="currentStep === 1" @select="handleSelectType" />
      <PageMerchantCenterWantPublishStep2
        v-if="currentStep === 2"
        @saveSuccess="handleSaveSuccess"
        @returnBack="handelReturnBack"
        :publishType="publishType"
      />
      <PageMerchantCenterWantPublishStep3 v-if="currentStep === 3" @toPublish="handleToPublish" />
    </div>
  </div>
</template>

<script>
  import headMixin from '~/assets/js/headMixin'

  export default {
    mixins: [headMixin],
    data() {
      return {
        currentStep: 1,
        publishType: 1 // 1、 商品  2、需求  3、提供  4、招聘
      }
    },
    methods: {
      handleSelectType(e) {
        if (e === 1) {
          this.currentStep = 2
          this.publishType = e
        } else {
          this.$toast.success('敬请期待!')
        }
      },
      handleSaveSuccess() {
        this.currentStep = 3
      },
      handleToPublish() {
        this.currentStep = 1
      },
      handelReturnBack() {
        this.currentStep = 1
      }
    }
  }
</script>

<style lang="scss" scoped>
  .PageMerchantCenterWantPublish {
    .steps {
      margin: 40px 0;
    }
  }
  .RootIsMobile {
    .PageMerchantCenterWantPublish {
      .steps {
        margin: 60px 0 80px;
      }
    }
  }
</style>
