<template>
  <div class="PagePublishGoods">
    <div class="publish-goods-title">
      <Button type="primary" plain icon="el-icon-back" round @click="returnBack">返回</Button>
    </div>
    <Form :label-width="labelWidth" :model="form" :rules="rules" ref="form" size="medium">
      <Row class="Row-form-col-2">
        <Col :span="halfColSpan">
          <FormItem label="商品名称" prop="productName">
            <Input v-model="form.productName" placeholder="请输入商品名称" />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem label="商品类别" prop="productTypeId">
            <Cascader
              v-model="form.productTypeId"
              :options="typeDict"
              :props="{ value: 'id', label: 'productTypeName',emitPath:false}"
              clearable
              filterable
              placeholder="请选择商品类别"
            />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem label="单价" prop="unitPrice">
            <Input
              v-model="form.unitPrice"
              placeholder="请输入单价"
              :disabled="form.isDiscussion === 2?true:false"
              ref="unitPrice"
            />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem label="价格面议" prop="isDiscussion">
            <RadioGroup v-model="form.isDiscussion" @change="handleDiscussionChange">
              <Radio :label="1">否</Radio>
              <Radio :label="2">是</Radio>
            </RadioGroup>
            <span class="warning">(选择"是"后价格将调整为面议)</span>
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem label="单位" prop="unitName">
            <Input
              v-model="form.unitName"
              placeholder="单价对应单位"
              :disabled="form.isDiscussion === 2?true:false"
              ref="unitName"
            />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem label="联系人" prop="contactName">
            <Input v-model="form.contactName" placeholder="请输入联系人" />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem label="联系方式" prop="contactPhone">
            <Input v-model="form.contactPhone" placeholder="请输入联系方式" />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem label="所属地区" prop="regionCode">
            <Cascader
              v-model="form.regionCode"
              :options="chinatree"
              :props="{ value: 'code', label: 'name',emitPath:false }"
              clearable
              placeholder="请选择所属地区"
            />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="产品简介" prop="productSimpleIntro">
            <Input
              v-model="form.productSimpleIntro"
              type="textarea"
              placeholder="请输入产品简介"
              :rows="3"
            />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="产品参数" prop="productParam">
            <Input v-model="form.productParam" type="textarea" placeholder="请输入产品参数" :rows="3" />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="产品介绍" prop="productIntro">
            <rich-text-editor v-model="form.productIntro" placeholder="请输入产品介绍" />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="商品展示图" prop="productIntroAttachmentList">
            <UploadImgList
              v-model="form.productIntroAttachmentList"
              :width="imgW"
              :height="imgH"
              :limit="6"
              @upload="e => handleUploadImgList('productIntroAttachmentList', e)"
              placeholder="点击上传商品图片"
            />
          </FormItem>
        </Col>
        <Col :span="$isMobile ? 18 : 12">
          <FormItem label="验证码" prop="validateCode">
            <Input v-model="form.validateCode" placeholder="请输入验证码" />
          </FormItem>
        </Col>
        <Col :span="$isMobile ? 6 : 12" class="code-img-col">
          <img :src="`${codeImgSrc}`" @click="refreshRandomStr" />
        </Col>
      </Row>
    </Form>
    <div class="LayoutLeftMain-btnFooter">
      <Button type="primary" @click="handleSave">提交</Button>
    </div>
  </div>
</template>

<script>
  import { pxtorem, randomLenNum, trim } from '~/utils'
  import { apiAddAttachment } from '~/api/attachment'
  import { apiAddProduct, apiGetAllProductType } from '~/api/merchantCenter/wantPublish'
  import { validatenull, checkPrice, validatorPhone, stringTrim } from '@/utils/validate'
  import { apiHost } from '~/api/config'

  export default {
    name: 'PagePublishGoods',
    props: {
      data: Object
    },
    created() {
      this.refreshRandomStr()
      apiGetAllProductType(this.$axiosClient).then(res => {
        this.typeDict = res
      })
    },
    computed: {
      codeImgSrc() {
        const prefix = !process.env.NUXT_ENV_MODE && process.client ?  '' : apiHost
        return `${prefix}/api/conschina/v1/code/${this.randomStr}`
      },
      labelWidth() {
        return pxtorem(this.$isMobile ? 160 : 100)
      },
      halfColSpan() {
        return this.$isMobile ? 24 : 12
      },
      imgW() {
        return this.$isMobile ? 244 : 253
      },
      imgH() {
        return this.$isMobile ? 160 : 166
      },
      chinatree() {
        return this.$store.state.data.chinaTree
      }
    },
    data() {
      return {
        randomStr: '',
        typeDict: [],
        form: {
          isDiscussion: 1,
          productName: '',
          unitPrice: '',
          unitName: '',
          contactName: '',
          contactPhone: '',
          productSimpleIntro: '',
          productParam: '',
          validateCode: ''
        },
        logoLoading: false,
        rules: {
          productName: [
            { required: true, message: '请输入商品名称', trigger: 'change' },
            { min: 2, message: '产品名称最少2字符', trigger: 'blur' },
            { max: 20, message: '产品名称最多20字符', trigger: 'blur' }
          ],
          productTypeId: [{ required: true, message: '请选择商品类别', trigger: 'change' }],
          unitPrice: [{ validator: checkPrice, trigger: 'change' }],
          unitName: [{ max: 10, message: '单位最多10字符', trigger: 'blur' }],
          isDiscussion: [{ required: true, message: '必须选择是否面议', trigger: 'change' }],
          contactName: [
            { required: true, message: '请输入联系人', trigger: 'change' },
            { max: 20, message: '联系人最多20字符', trigger: 'blur' }
          ],
          contactPhone: [
            { required: true, message: '请输入联系方式', trigger: 'change' },
            { validator: validatorPhone, trigger: 'change' }
          ],
          regionCode: [{ required: true, message: '请选择所属地区', trigger: 'change' }],
          productParam: [
            { required: true, message: '请输入产品参数', trigger: 'change' },
            { max: 500, message: '产品参数最多500字符', trigger: 'blur' }
          ],
          productSimpleIntro: [
            { required: true, message: '请输入产品简介', trigger: 'change' },
            { max: 120, message: '产品简介最多120字符', trigger: 'blur' }
          ],
          productIntro: [{ required: true, message: '请输入产品介绍', trigger: 'change' }],
          productIntroAttachmentList: [
            { required: true, message: '请上传至少一张商品图片', trigger: 'change' }
          ],
          validateCode: [{ required: true, message: '请输入验证码', trigger: 'change' }]
        }
      }
    },
    methods: {
      handleUploadImgList(field, { file }) {
        const update = (uid, updateFields) => {
          this.form[field] = this.form[field].map(d =>
            d.uid === uid ? { ...d, ...updateFields } : d
          )
        }
        let uid = file.uid
        update(uid, { loading: true })
        this.$showLoading('图片上传中...')
        apiAddAttachment(this.$axiosClient, file).then(
          res => {
            this.$hideLoading()
            if (res.code === 200) {
              update(uid, { success: true, url: res.data.attachUrl, id: res.data.id, loading: false })
            } else {
              update(uid, { error: '上传失败', loading: false })
            }
          },
          e => {
            this.$hideLoading()
            update(uid, { error: '上传失败', loading: false })
          }
        )
      },
      handleSave() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            let {
              productName,
              productTypeId,
              unitPrice,
              unitName,
              contactName,
              contactPhone,
              regionCode,
              productSimpleIntro,
              productParam,
              productIntro,
              productIntroAttachmentList,
              validateCode,
              isDiscussion
            } = this.form
            if (isDiscussion === 2) {
              //若选择价格面议为是，单价置为-1，单位置为空
              unitPrice = -1
              unitName = ''
            } else {
              //若选择价格面议为否，校验单价与单位
              if (validatenull(unitPrice)) {
                this.$refs.unitPrice.focus()
                this.$toast.fail('请填写单价!')
                return false
              } else if (unitPrice <= 0) {
                this.$refs.unitPrice.focus()
                this.$toast.fail('请正确填写单价!')
                return false
              }
              if (validatenull(unitName)) {
                this.$refs.unitName.focus()
                this.$toast.fail('请填写单位!')
                return false
              }
            }
            let attachmentList = []
            productIntroAttachmentList.map(item => {
              let ids = {}
              ids.id = item.id
              ids.flieName = item.name
              ids.size = item.size
              attachmentList.push(ids)
            })

            let params = {
              random: this.randomStr,
              validateCode: validateCode,
              productName: stringTrim(productName),
              productTypeId: productTypeId,
              unitPrice: unitPrice,
              unitName: stringTrim(unitName),
              contactName: stringTrim(contactName),
              contactPhone: stringTrim(contactPhone),
              regionCode: regionCode,
              productSimpleIntro: stringTrim(productSimpleIntro),
              productParam: productParam,
              productIntro: productIntro,
              productIntroAttachmentList: attachmentList
            }
            this.$showLoading()
            apiAddProduct(this.$axiosClient, params).then(
              res => {
                this.$hideLoading()
                if (res.code === 200) {
                  this.$toast.success('操作成功')
                  this.$emit('saveSuccess')
                } else {
                  this.$toast.fail(res.msg || '操作失败')
                }
              },
              e => {
                this.$hideLoading()
                this.$toast.fail(e.message || '操作失败!')
              }
            )
          }
        })
      },
      returnBack() {
        this.$emit('returnBack')
      },
      refreshRandomStr() {
        this.randomStr = randomLenNum(4, true)
      },
      handleDiscussionChange(e) {
        //清空单价与单位
        this.form.unitPrice = null
        this.form.unitName = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .PagePublishGoods {
    .publish-goods-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      >span{
        font-size: $fontSizeL;
        color: $colorGreen;
        font-weight: bold;
      }
    }
    .code-img-col {
      img {
        width: 86px;
        height: 36px;
        position: relative;
        left: -50px;
        cursor: pointer;
      }
    }
    .warning{
      color: $colorRed;
      font-size: $fontSizeS;
    }
   
  }
  .RootIsMobile {
    .PagePublishGoods {
      .code-img-col {
        img {
          width: 172px;
          height: 72px;
          left: -60px;
        }
      }
    }
  }
</style>
