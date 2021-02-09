<template>
  <div class="PageEditPublishGoods">
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
              @input="handleRemove"
              placeholder="点击上传商品图片"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="LayoutLeftMain-btnFooter">
      <Button type="primary" @click="handleSave">提交编辑</Button>
    </div>
  </div>
</template>

<script>
  import { pxtorem, randomLenNum, trim } from '~/utils'
  import { apiAddAttachment } from '~/api/attachment'
  import { apiGetAllProductType } from '~/api/merchantCenter/wantPublish'
  import { apiUpdateProduct } from '~/api/merchantCenter/myPublish'
  import { apiEditProductInfo } from '~/api/goodsDetail'
  import { validatenull, checkPrice, validatorPhone, stringTrim } from '@/utils/validate'

  //设置表单的默认值
  const defaultFormData = {
    productName: '',
    productTypeId: '',
    unitPrice: 0,
    unitName: '',
    contactName: '',
    contactPhone: '',
    regionCode: '',
    productSimpleIntro: '',
    productParam: '',
    productIntro: '',
    productIntroAttachmentList: [],
    isDiscussion: 1
  }
  export default {
    name: 'PageEditPublishGoods',
    props: {
      editDataId: {
        type: String,
        default: ''
      }
    },
    created() {
      if (!validatenull(this.editDataId)) {
        apiGetAllProductType(this.$axiosClient).then(res => {
          this.typeDict = res
        })
      } else {
        this.$toast.fail('信息获取失败，请重试!')
      }
    },
    mounted() {
      if (!validatenull(this.editDataId)) {
        let params = {
          id: this.editDataId
        }
        apiEditProductInfo(this.$axiosClient, params).then(
          res => {
            if (res.code === 200) {
              //初始化表单数据
              if (!validatenull(res.data)) {
                this.form.productName = res.data.productName
                this.form.productTypeId = res.data.productTypeId
                this.form.unitPrice = res.data.unitPrice > 0 ? res.data.unitPrice : null
                this.form.isDiscussion = res.data.unitPrice > 0 ? 1 : 2
                this.form.unitName = res.data.unitName
                this.form.contactName = res.data.contactName
                this.form.contactPhone = res.data.contactPhone
                this.form.regionCode = res.data.regionCode
                this.form.productSimpleIntro = res.data.productSimpleIntro
                this.form.productParam = res.data.productParam
                this.form.productIntro = res.data.productIntro
                this.attachmentList = [...res.data.attachmentDtoList]
                this.form.productIntroAttachmentList = res.data.attachmentDtoList
                  ? res.data.attachmentDtoList.map(v => {
                      return {
                        ...v,
                        loading: false,
                        name: v.fileName,
                        url: v.attachUrl,
                        success: true
                      }
                    })
                  : []
              }
            } else {
              this.$toast.fail('信息获取失败，请重试!')
            }
          },
          e => {
            this.$toast.fail(e.message || '信息获取失败，请重试!')
          }
        )
      } else {
        this.$toast.fail('信息获取失败，请重试!')
      }
    },
    computed: {
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
        attachmentList: [],
        deleteAttachMentList: [],
        randomStr: '',
        typeDict: [],
        form: JSON.parse(JSON.stringify(defaultFormData)),
        logoLoading: false,
        rules: {
          productName: [
            { required: true, message: '请输入商品名称', trigger: 'change' },
            { min: 3, max: 20, message: '产品名称最多20字符', trigger: 'blur' }
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
          ]
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
      handleRemove(newfileList, deleteId) {
        let newList = this.attachmentList.filter(d => {
          if (d.id === deleteId) {
            d.deleteFlag = true
            return d
          }
        })
        this.deleteAttachMentList.push(...newList)
      },
      handleSave() {
        this.$confirm('确认要修改商品信息吗？')
          .then(() => {
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
                  ids.deleteFlag = false
                  attachmentList.push(ids)
                })
                attachmentList.push(...this.deleteAttachMentList)

                let params = {
                  id: this.editDataId,
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
                apiUpdateProduct(this.$axiosClient, params).then(
                  res => {
                    this.$hideLoading()
                    if (res.code === 200) {
                      this.$toast.success('操作成功')
                      this.$emit('saveSuccess')
                    } else {
                      this.$toast.fail(res.msg || '操作失败!')
                    }
                  },
                  e => {
                    this.$hideLoading()
                    this.$toast.fail(e.message || '操作失败!')
                  }
                )
              }
            })
          })
          .catch(() => {})
      },
      returnBack() {
        this.$emit('returnBack')
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
  .PageEditPublishGoods {
    .publish-goods-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      margin-top: 10px;
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
    .PageEditPublishGoods {
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
