<template>
  <div class="PageMerchantCenterInfoEdit">
    <Form :label-width="labelWidth" :model="form" :rules="rules" ref="form" size="medium">
      <Row class="Row-form-col-2">
        <Col :span="halfColSpan">
          <FormItem label="企业名称" prop="merchantName">
            <!-- <Input v-model="form.merchantName" placeholder="请输入企业名称" /> -->
            <span>{{form.merchantName}}</span>
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem label="主营产品" prop="mainProductIntro">
            <Input v-model="form.mainProductIntro" placeholder="请输入主营产品" />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem label="行业类别" prop="productTypeId">
            <Cascader
              v-model="form.productTypeId"
              :options="typeDict"
              :props="{ value: 'id', label: 'productTypeName',emitPath:false,checkStrictly:true,}"
              :initializeValue="form.productTypeName"
              clearable
              filterable
              placeholder="请选择行业类别"
            />
          </FormItem>
        </Col>
        <Col :span="halfColSpan">
          <FormItem label="所属地区" prop="regionCode">
            <Cascader
              v-model="form.regionCode"
              :options="chinatree"
              :props="{ value: 'code', label: 'name' ,emitPath:false }"
              clearable
              placeholder="请选择所属地区"
              :initializeValue="form.region"
            />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="详细地址" prop="addrInfo">
            <Input v-model="form.addrInfo" type="textarea" placeholder="请输入详细地址" />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="公司网址" prop="websiteAddr">
            <Input v-model="form.websiteAddr" type="textarea" placeholder="请输入公司网址" />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="企业介绍" prop="merchantIntro">
            <Input v-model="form.merchantIntro" type="textarea" :rows="5" placeholder="请输入企业介绍" />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="企业Logo" prop="logoUrl">
            <UploadImg
              v-model="form.logoUrl"
              :width="imgW"
              :height="imgH"
              :loading="logoLoading"
              @upload="handleUploadLogo"
              placeholder="点击上传企业Logo"
            />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="办公环境" prop="officeAttachmentDtoList">
            <UploadImgList
              v-model="form.officeAttachmentDtoList"
              :width="imgW"
              :height="imgH"
              :limit="12"
              @upload="e => handleUploadImgList('officeAttachmentDtoList', e)"
              @input="handleRemoveOffice"
              placeholder="点击上传办公环境"
            />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem label="公司宣传图" prop="companyAttachmentDtoList">
            <UploadImgList
              v-model="form.companyAttachmentDtoList"
              :width="imgW"
              :height="imgH"
              :limit="6"
              @upload="e => handleUploadImgList('companyAttachmentDtoList', e)"
              @input="handleRemoveCompany"
              placeholder="点击上传公司宣传图"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="LayoutLeftMain-btnFooter">
      <Button type="primary" @click="handleSave">提交</Button>
    </div>
  </div>
</template>

<script>
  import { pxtorem } from '~/utils'
  import { apiGetAllProductType } from '~/api/merchantCenter/wantPublish'
  import { apiAddAttachment } from '~/api/attachment'
  import { apiUpdateMerchantInfo } from '~/api/merchantCenter/info'
  import { validatenull, validatorPhone, stringTrim } from '@/utils/validate'
  export default {
    name: 'PageMerchantCenterInfoEdit',
    props: {
      data: Object
    },
    computed: {
      labelWidth() {
        return pxtorem(this.$isMobile ? 190 : 100)
      },
      halfColSpan() {
        return this.$isMobile ? 24 : 12
      },
      imgW() {
        return this.$isMobile ? 240 : 253
      },
      imgH() {
        return this.$isMobile ? 156 : 166
      },
      chinatree() {
        return this.$store.state.data.chinaTree
      }
    },
    data() {
      return {
        officeAttachmentList: [],
        deleteOfficeAttachMentList: [],
        companyAttachmentList: [],
        deleteCompanyAttachMentList: [],
        typeDict: [],
        form: {},
        logoLoading: false,
        rules: {
          // merchantName: [
          //   { required: true, message: '请输入企业名称', trigger: 'change' },
          //   { max: 25, message: '企业名称最多25字符', trigger: 'blur' }
          // ],
          mainProductIntro: [
            { required: true, message: '请输入主营产品', trigger: 'change' },
            { max: 40, message: '主营产品最多40字符', trigger: 'blur' }
          ],
          addrInfo: [{ max: 50, message: '详细地址最多50字符', trigger: 'blur' }],
          websiteAddr: [{ max: 50, message: '网址最多50字符', trigger: 'blur' }],
          productTypeId: [{ required: true, message: '请选择行业类别', trigger: 'change' }],
          regionCode: [{ required: true, message: '请选择所属地区', trigger: 'change' }],
          merchantIntro: [
            { required: true, message: '请输入企业介绍', trigger: 'change' },
            { max: 1000, message: '企业介绍最多1000字符', trigger: 'blur' }
          ],
          logoUrl: [{ required: true, message: '请上传企业Logo', trigger: 'change' }],
          officeAttachmentDtoList: [{ required: true, message: '请上传办公环境', trigger: 'change' }],
          companyAttachmentDtoList: [
            { required: true, message: '请上传公司宣传图', trigger: 'change' }
          ]
        }
      }
    },
    created() {
      this.$showLoading()
      apiGetAllProductType(this.$axiosClient).then(res => {
        this.typeDict = res
      })
    },
    mounted() {
      if (this.data) {
        this.data.officeAttachmentDtoList
          ? (this.officeAttachmentList = [...this.data.officeAttachmentDtoList])
          : null
        this.data.companyAttachmentDtoList
          ? (this.companyAttachmentList = [...this.data.companyAttachmentDtoList])
          : null
        this.form = {
          region: this.data.region,
          productTypeName: this.data.productTypeName,
          merchantName: this.data.merchantName,
          productTypeId: this.data.productTypeId,
          mainProductIntro: this.data.mainProductIntro,
          regionCode: this.data.regionCode,
          addrInfo: this.data.addrInfo,
          websiteAddr: this.data.websiteAddr,
          merchantIntro: this.data.merchantIntro,
          logoUrl: this.data.logoUrl,
          officeAttachmentDtoList: this.data.officeAttachmentDtoList
            ? this.data.officeAttachmentDtoList.map(v => {
                return {
                  ...v,
                  loading: false,
                  name: v.fileName,
                  url: v.attachUrl,
                  success: true
                }
              })
            : [],
          companyAttachmentDtoList: this.data.companyAttachmentDtoList
            ? this.data.companyAttachmentDtoList.map(v => {
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
      this.$hideLoading()
    },
    methods: {
      handleUploadLogo({ file }) {
        this.logoLoading = true
        apiAddAttachment(this.$axiosClient, file).then(
          res => {
            this.logoLoading = false
            if (res.code === 200) {
              this.form.logoUrl = res.data.attachUrl
            }
          },
          e => {
            this.logoLoading = false
          }
        )
      },
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
      handleRemoveOffice(newfileList, deleteId) {
        let newList = this.officeAttachmentList.filter(d => {
          if (d.id === deleteId) {
            d.deleteFlag = true
            return d
          }
        })
        this.deleteOfficeAttachMentList.push(...newList)
      },
      handleRemoveCompany(newfileList, deleteId) {
        let newList = this.companyAttachmentList.filter(d => {
          if (d.id === deleteId) {
            d.deleteFlag = true
            return d
          }
        })
        this.deleteCompanyAttachMentList.push(...newList)
      },
      handleSave() {
        this.$confirm('确认要修改企业信息吗？')
          .then(() => {
            this.$refs['form'].validate(valid => {
              if (valid) {
                const {
                  mainProductIntro,
                  productTypeId,
                  regionCode,
                  addrInfo,
                  websiteAddr,
                  merchantIntro,
                  logoUrl,
                  officeAttachmentDtoList,
                  companyAttachmentDtoList
                } = this.form
                let officeAttachmentList = []
                officeAttachmentDtoList.map(item => {
                  let ids = {}
                  ids.id = item.id
                  ids.deleteFlag = false
                  officeAttachmentList.push(ids)
                })

                let companyAttachmentList = []
                companyAttachmentDtoList.map(item => {
                  let ids = {}
                  ids.id = item.id
                  ids.deleteFlag = false
                  companyAttachmentList.push(ids)
                })
                officeAttachmentList.push(...this.deleteOfficeAttachMentList)
                companyAttachmentList.push(...this.deleteCompanyAttachMentList)
                let params = {
                  id: this.data.id,
                  mainProductIntro: stringTrim(mainProductIntro),
                  productTypeId: productTypeId,
                  regionCode: regionCode,
                  addrInfo: stringTrim(addrInfo),
                  websiteAddr: stringTrim(websiteAddr),
                  merchantIntro: stringTrim(merchantIntro),
                  logoUrl: logoUrl,
                  officeAttachmentDtoList: officeAttachmentList,
                  companyAttachmentDtoList: companyAttachmentList
                }
                this.$showLoading()
                apiUpdateMerchantInfo(this.$axiosClient, params).then(
                  res => {
                    this.$hideLoading()
                    if (res.code === 200) {
                      this.$toast.success('操作成功,请等待审核')
                      this.$router.push('/merchantCenter')
                    } else {
                      this.$toast.fail(res.msg || '修改失败')
                    }
                  },
                  e => {
                    this.$hideLoading()
                    this.$toast.fail(e.message || '修改失败')
                  }
                )
              }
            })
          })
          .catch(() => {})
      }
    }
  }
</script>


