<template>
  <div class="PageMerchantCenterCaStep3">
    <div class="statusTips">
      <template v-if="status === 2">
        <!-- <div class="em">恭喜您已通过审核完成商户认证！</div> -->
        <div>认证信息<span class="em">生效中</span></div>
      </template>
      <template v-else>
        <div class="emError">很抱歉，您的商户认证{{ status === 3 ? '未通过' : '已驳回' }}</div>
        <div>请重新填写信息后发起认证!</div>
      </template>
    </div>
    <div class="form">
      <Form class="Form-view Form-view-medium">
        <div class="LayoutLeftMain-sectionTitle">企业信息</div>
        <Row class="Row-form-col-2">
          <Col :span="halfColSpan">
            <FormItem :label="fields.merchantName.text" :label-width="labelWidth">
              {{ dataText[fields.merchantName.key] }}
            </FormItem>
          </Col>
          <Col :span="halfColSpan">
            <FormItem :label="fields.creditCode.text" :label-width="labelWidth">
              {{ dataText[fields.creditCode.key] }}
            </FormItem>
          </Col>
          <Col :span="halfColSpan">
            <FormItem :label="fields.legalPerson.text" :label-width="labelWidth">
              {{ dataText[fields.legalPerson.key] }}
            </FormItem>
          </Col>
          <Col :span="halfColSpan">
            <FormItem :label="fields.createDate.text" :label-width="labelWidth">
              {{ dataText[fields.createDate.key] }}
            </FormItem>
          </Col>
          <Col :span="halfColSpan">
            <FormItem :label="fields.businessTerm.text" :label-width="labelWidth">
              {{ dataText[fields.businessTerm.key] }}
            </FormItem>
          </Col>
        </Row>
        <div class="LayoutLeftMain-sectionTitle">联系方式</div>
        <Row class="Row-form-col-2">
          <Col :span="halfColSpan">
            <FormItem :label="fields.contractPerson.text">
              {{ dataText[fields.contractPerson.key] }}
            </FormItem>
          </Col>
          <Col :span="halfColSpan">
            <FormItem :label="fields.phone.text">
              {{ dataText[fields.phone.key] }}
            </FormItem>
          </Col>
        </Row>
        <div class="LayoutLeftMain-sectionTitle">推荐人</div>
        <Row class="Row-form-col-2">
          <Col :span="halfColSpan">
            <FormItem :label="fields.recommendCode.text">
              {{ dataText[fields.recommendCode.key] }}
            </FormItem>
          </Col>
        </Row>
        <div class="LayoutLeftMain-sectionTitle">证件信息</div>
        <div class="uploadImgRow">
          <FormItem :label="fields.businessPic.text">
            <ImgView :src="dataText[fields.businessPic.key]" :width="String(imgW)" :height="String(imgH)" />
          </FormItem>
          <!-- <FormItem :label="fields.idCardPic.text">
            <ImgView :src="dataText[fields.idCardPic.key]" :width="String(imgW)" :height="String(imgH)" />
          </FormItem>
          <FormItem :label="fields.idCardPicBack.text">
            <ImgView :src="dataText[fields.idCardPicBack.key]" :width="String(imgW)" :height="String(imgH)" />
          </FormItem> -->
        </div>
      </Form>
    </div>
    <div class="LayoutLeftMain-btnFooter">
      <Button type="primary" @click="$emit('redoCa')">重新认证信息</Button>
    </div>
  </div>
</template>

<script>
import formMixin from './formMixin'

export default {
  mixins: [formMixin],
  props: {
    status: Number,
    data: Object,
  },
  computed: {
    labelWidth() {
      return this.$pxtorem(this.$isMobile ? 180 : null)
    },
    dataText() {
      return {
        ...this.data,
        businessTerm: `${this.data.licenseStartTime} 至 ${this.data.licenseEndTime === '0' ? '长期' : this.data.licenseEndTime}`
      }
    }
  },
}
</script>

<style lang="scss">
.PageMerchantCenterCaStep3 {
  .statusTips {
    margin: 60px 0;
    text-align: center;
    font-weight: bold;
    font-size: $fontSizeXL;
    line-height: 40PX;
    .em {
      color: $colorGreen;
    }
    .emError {
      color: $colorRed;
    }
  }
  .form {
    margin-bottom: 20px;
  }
  .Row-form-col-2.el-row {
    margin: 0;
  }
  .uploadImgRow {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .el-form-item {
      position: relative;
      padding-bottom: 40px;
      .el-form-item__label {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        width: auto !important;
        color: $fontColorDark;
        font-weight: bold;
        &:after {
          content: none;
        }
      }
      .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
}
</style>