import { isPhoneNumber } from '~/utils/validate'

export default {
  data() {
    const businessTermValidator = (rule, value, callback) => {
      if (!this.form.licenseStartTime) {
        return callback(new Error('请选择开始日期'))
      }
      if (!this.businessTermChecked && !this.form.licenseEndTime) {
        return callback(new Error('请选择结束日期'))
      }
      callback()
    }
    const creditCodeValidator = (rule, value, callback) => {
      if (!/^[A-Z0-9]{18}$/.test(value)) {
        return callback(new Error('格式不合法'))
      }
      callback()
    }
    const phoneValidator = (rule, value, callback) => {
      if (!isPhoneNumber(value)) {
        return callback(new Error('不是合法的手机号'))
      }
      callback()
    }
    const codeValidator = (rule, value, callback) => {
      if (!/^[0-9]{6}$/.test(value) ) {
        return callback(new Error('格式不合法'))
      }
      callback()
    }
    return {
      fields: {
        merchantName: { key: 'merchantName', text: '企业名称', required: true },
        creditCode: { key: 'creditCode', text: '信用代码', required: true, validator: creditCodeValidator },
        legalPerson: { key: 'legalPerson', text: '法人', required: true },
        createDate: { key: 'createDate', text: '成立日期', required: true, placeholderPrefix: '请选择' },
        businessTerm: { key: 'businessTerm', text: '营业期限', required: true, placeholderPrefix: '请选择', validator: businessTermValidator },
        contractPerson: { key: 'contractPerson', text: '联系人', required: true },
        phone: { key: 'phone', text: '手机号', required: true, validator: phoneValidator },
        code: { key: 'code', text: '验证码', required: true, validator: codeValidator },
        recommendCode: { key: 'recommendCode', text: '推荐码' },
        businessPic: { key: 'businessPic', text: '营业执照', required: true, placeholderPrefix: '请上传' },
        idCardPic: { key: 'idCardPic', text: '法人身份证（正面）', required: true, placeholderPrefix: '请上传' },
        idCardPicBack: { key: 'idCardPicBack', text: '法人身份证（反面）', required: true, placeholderPrefix: '请上传' },
      },
    }
  },
  computed: {
    halfColSpan() {
      return this.$isMobile ? 24 : 12
    },
    imgW() {
      return this.$isMobile ? 335 : 290
    },
    imgH() {
      return this.$isMobile ? 219 : 190
    },
  },
}