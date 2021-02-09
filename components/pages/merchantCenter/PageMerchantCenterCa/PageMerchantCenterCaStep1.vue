<template>
  <div class="PageMerchantCenterCaStep1">
    <Button v-if="isReEdit" class="cancelBtn" type="primary" plain icon="el-icon-back" round @click="$emit('cancel')">返回</Button>
    <Form :label-width="labelWidth" :model="form" :rules="rules" ref="form" size="medium">
      <div class="LayoutLeftMain-sectionTitle">企业信息</div>
      <Row class="Row-form-col-2">
        <Col :span="halfColSpan">
          <FormItem :label="fields.merchantName.text" :prop="fields.merchantName.key">
            <Input v-model="form[fields.merchantName.key]" :placeholder="getPlaceholder(fields.merchantName)" :maxlength="25" />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem :label="fields.creditCode.text" :prop="fields.creditCode.key">
            <Input v-model="form[fields.creditCode.key]" :placeholder="getPlaceholder(fields.creditCode)" />
          </FormItem>
        </Col>
        <Col :span="halfColSpan" style="clear: both">
          <FormItem :label="fields.legalPerson.text" :prop="fields.legalPerson.key">
            <Input v-model="form[fields.legalPerson.key]" :placeholder="getPlaceholder(fields.legalPerson)" />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem :label="fields.createDate.text" :prop="fields.legalPerson.key">
            <DatePicker v-model="form[fields.createDate.key]" :placeholder="getPlaceholder(fields.createDate)" clearable />
          </FormItem>
        </Col>
        <Col :span="halfColSpan" style="clear: both; position: relative">
          <FormItem :label="fields.businessTerm.text" :prop="fields.businessTerm.key">
            <div class="flex-wrap">
              <div class="flex-item">
                <DatePicker v-model="form.licenseStartTime" placeholder="开始日期" clearable />
              </div>
              <template v-if="!businessTermChecked">
                <div style="margin: 0 5px"> - </div>
                <div class="flex-item">
                  <DatePicker v-model="form.licenseEndTime" placeholder="结束日期" clearable />
                </div>
              </template>
            </div>
            <Checkbox v-model="businessTermChecked" class="checkboxBusinessTerm">长期有效</Checkbox>
          </FormItem>
        </Col>
        <!-- <Col :span="halfColSpan">
          <Checkbox v-model="businessTermChecked" class="checkboxBusinessTerm">长期有效</Checkbox>
        </Col> -->
      </Row>
      <div class="LayoutLeftMain-sectionTitle">联系方式</div>
      <Row class="Row-form-col-2">
        <Col :span="halfColSpan">
          <FormItem :label="fields.phone.text" :prop="fields.phone.key">
            <Input v-model="form[fields.phone.key]" :placeholder="getPlaceholder(fields.phone)" />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem :label="fields.contractPerson.text" :prop="fields.contractPerson.key">
            <Input v-model="form[fields.contractPerson.key]" :placeholder="getPlaceholder(fields.contractPerson)" />
          </FormItem>
        </Col>
        <Col :span="halfColSpan" style="clear: both" class="codeCol">
          <FormItem :label="fields.code.text" :prop="fields.code.key">
            <Input v-model="form[fields.code.key]" :placeholder="getPlaceholder(fields.code)" />
            <Button type="primary" plain @click="handleGetCode" class="codeBtn" :disabled="!!timer" >{{ !!timer ? getCodeCounterText : getCodeBtnText }}</Button>
          </FormItem>
        </Col>
      </Row>
      <div class="LayoutLeftMain-sectionTitle">推荐人</div>
      <Row class="Row-form-col-2">
        <Col :span="halfColSpan">
          <FormItem :label="fields.recommendCode.text" :prop="fields.recommendCode.key">
            <Input v-model="form[fields.recommendCode.key]" :placeholder="getPlaceholder(fields.recommendCode)" :disabled="isReEdit" />
          </FormItem>
        </Col>
      </Row>
      <div class="LayoutLeftMain-sectionTitle">证件信息</div>
      <div class="tips">上传图片大小请不要超过5M</div>
      <div class="uploadImgRow">
        <FormItem :label="fields.businessPic.text" :prop="fields.businessPic.key">
          <UploadImg v-model="form[fields.businessPic.key]" :placeholder="getPlaceholder(fields.businessPic)" :showTips="false" :width="imgW" :height="imgH" :loading="picLoading[fields.businessPic.key]" @upload="file => handleUploadPic(fields.businessPic.key, file)" />
        </FormItem>
        <!-- <FormItem :label="fields.idCardPic.text" :prop="fields.idCardPic.key">
          <UploadImg v-model="form[fields.idCardPic.key]" :placeholder="getPlaceholder(fields.idCardPic)" :showTips="false" :width="imgW" :height="imgH" :loading="picLoading[fields.idCardPic.key]" @upload="file => handleUploadPic(fields.idCardPic.key, file)" />
        </FormItem>
        <FormItem :label="fields.idCardPicBack.text" :prop="fields.idCardPicBack.key">
          <UploadImg v-model="form[fields.idCardPicBack.key]" :placeholder="getPlaceholder(fields.idCardPicBack)" :showTips="false" :width="imgW" :height="imgH" :loading="picLoading[fields.idCardPicBack.key]" @upload="file => handleUploadPic(fields.idCardPicBack.key, file)" />
        </FormItem> -->
      </div>
      <div class="checked-col">
        <FormItem prop="checked">
          <span style="color: red">*</span>
          <Checkbox v-model="form.checked" class="checkbox">我已阅读并同意</Checkbox><span class="a-green" @click="dialogVisible = true">《用户协议》</span>
        </FormItem>
      </div>
    </Form>
    <div class="LayoutLeftMain-btnFooter">
      <Button type="primary" @click="handleSave">提交</Button>
    </div>
    <Dialog
      v-if="dialogVisible" 
      title="服务协议及隐私声明"
      top="10vh"
      :showCancelBtn="false"
      @close="dialogVisible = false"
      @confirm="dialogVisible = false"
    >
      <UserAgreement />
    </Dialog>
  </div>
</template>

<script>
  import { pxtorem } from '~/utils'
  import { dictMock } from './dicts'
  import { apiMockUploadImg, apiMockEdit } from './mock'
  import formMixin from './formMixin'
  import { apiAdd, apiEdit } from '~/api/merchantCenter/ca'
  import { apiUpload } from '~/api/common'
  import { randomLenNum, trim } from '~/utils'
  import { apiSendSms } from '~/api/auth'
  import { errorTips } from '~/api/config'


const checkedValidator = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请阅读并同意《用户协议》'))
  }
  callback()
}

export default {
  mixins: [formMixin],
    name: 'PageMerchantCenterCaStep1',
    props: {
      data: Object,
      isReEdit: Boolean,
    },
    computed: {
      rules() {
        let rules = {
          checked: [{ trigger: 'change', validator: checkedValidator }]
        }
        for (let key in this.fields) {
          let field = this.fields[key]
          rules[key] = []
          if (field.required) {
            rules[key].push({ required: true, message: this.getPlaceholder(field), trigger: 'change' })
          }
          if (field.validator) {
            rules[key].push({ validator: field.validator, trigger: 'change' })
          } 
        }
        return rules
      },
      labelWidth() {
        return pxtorem(this.$isMobile ? 160 : 100)
      },
    },
    data() {
      return {
        dictMock,
        form: { businessTerm: true, checked: false },
        picLoading: {},
        businessTermChecked: false,
        dialogVisible: false,
        getCodeBtnText: '发送验证码',
        getCodeCounterText: null,
        timer: null,
      }
    },
    created() {
      if (this.data) {
        this.form = {
          businessTerm: true,
          checked: false,
          merchantName: this.data.merchantName,
          creditCode: this.data.creditCode,
          legalPerson: this.data.legalPerson,
          createDate: this.data.createDate,
          licenseStartTime: this.data.licenseStartTime,
          licenseEndTime: this.data.licenseEndTime === '0' ? null : this.data.licenseEndTime,
          contractPerson: this.data.contractPerson,
          phone: this.data.phone,
          code: this.data.code,
          recommendCode: this.data.recommendCode,
          businessPic: this.data.businessPic,
          // idCardPic: this.data.idCardPic,
          // idCardPicBack: this.data.idCardPicBack,
        }
        if (this.data.licenseEndTime === '0') {
          this.businessTermChecked = true
        }
      }
    },
    methods: {
      handleGetCode() {
        this.$refs['form'].validateField('phone', e => {
          if (e) {
            this.$toast.fail('请正确输入手机号后发送验证码')
            return
          }
          
          this.getCodeBtnText = '重新发送'
          if (!this.timer) {
            this.sendSms()
            let time = 60
            this.getCodeCounterText = time + ' 秒'
            this.timer = setInterval(() => {
              time--
              this.getCodeCounterText = time + ' 秒'
              if (time === 0) {
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }

        })
      },
      sendSms() {
        apiSendSms(this.$axiosClient, { mobile: this.form.phone }).then(res => {
          if (res.code === 200) {
            this.$toast.success('发送成功')
          } else {
            this.$toast.fail(errorTips[res.code] || '发送失败，请稍后再试')
          }
        }).catch(e => {
          this.$toast.fail('发送失败，请稍后再试')
          clearInterval(this.timer)
          this.timer = null
        })
      },
      handleUploadPic(fieldKey, { file }) {
        this.$showLoading('图片上传中...')
        //this.$set(this.picLoading, fieldKey, true)
        apiUpload(this.$axiosClient, file).then(res => {
          this.$hideLoading()
          //this.picLoading[fieldKey] = false
          if (res.code === 200) {
            this.$set(this.form, fieldKey, res.data.attachUrl)
          }
        }, e => {
          this.$hideLoading()
          //this.picLoading[fieldKey] = false
        })
      },
      getPlaceholder(field) {
        return (field.placeholderPrefix || '请输入') + field.text
      },
      handleSave() {
        this.$refs['form'].validate(valid => {
          // console.log('校验结果：', valid, '表单数据：', this.form)
          if (valid) {
            // if (!this.checked) {
            //   this.$toast.fail('请阅读并同意《用户协议》')
            //   return
            // }
            const { merchantName, creditCode, legalPerson, createDate, licenseStartTime, licenseEndTime, contractPerson, phone, code, recommendCode, businessPic, idCardPic, idCardPicBack } = this.form
            let params = {
              merchantName, 
              creditCode, 
              legalPerson, 
              registerDate: createDate, 
              licenseStartTime,
              licenseEndTime: this.businessTermChecked ? '0' : licenseEndTime, 
              contactName:　contractPerson, 
              contactPhone: phone, 
              licenseUrl: businessPic, 
              // legalPersonCardAUrl: idCardPic, 
              // legalPersonCardBUrl: idCardPicBack, 
              validateCode: code,
            }
            if (!this.isReEdit) {
              params = {
                ...params,
                recommendCode, 
              }
            }
            let api = apiAdd
            if (this.data) {
              api = apiEdit
              params = {
                ...params,
                id: this.data.id
              }
            }
            this.$showLoading()
            api(this.$axiosClient, params).then(res => {
                this.$hideLoading()
                if (res.code === 200) {
                  this.$toast.success('操作成功')
                  this.$emit('saveSuccess')
                } else {
                  this.$toast.fail(res.msg || '操作失败')
                }
              }, e => {
                this.$hideLoading()
              }
            )
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .PageMerchantCenterCaStep1 {
    .cancelBtn {
      margin: 40px 0 5px 0;
    }
    .codeCol {
      .el-form-item--medium .el-form-item__content {
        display: flex;
      }
      .codeBtn {
        margin-left: 15px;
        height: 36px;
        display: inline-block;
        cursor: pointer;
      }
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
        }
        .el-form-item__content {
          margin-left: 0 !important;
        }
        .el-form-item__error {
          padding-top: 36px;
          width: 100%;
          text-align: center;
        }
      }
    }
    .tips {
      color: $fontColorXLight;
      margin: -20px 0 10px;
    }
    .checked-col {
      .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
  
  .RootNotMobile {
    .PageMerchantCenterCaStep1 {
      .checkboxBusinessTerm {
        position: absolute;
        top: 0;
        right: -95PX;
      }
    }
  }

  .RootIsMobile {
    .PageMerchantCenterCaStep1 {
      .cancelBtn {
        margin: 60px 0 10px 0;
      }
      .uploadImgRow {
        .el-form-item {
          padding-bottom: 80px;
          .el-form-item__error {
            padding-top: 72px;
          }
        }
      }
      .codeCol {
        .codeBtn {
          height: 72px;
        }
      }
      .checkboxBusinessTerm {
        position: relative;
        top: 8px;
      }
    }
  }
</style>
