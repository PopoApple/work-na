<template>
  <div class="PageMerchantCenterInfoView LayoutLeftMain-padding-bottom">
    <PageMerchantCenterInfoViewBaseInfoM :data="data" v-if="$isMobile" />
    <PageMerchantCenterInfoViewBaseInfo :data="data" v-else />
    <div class="LayoutLeftMain-sectionTitle">企业标识</div>
    <div>
      <i
        v-if="data.merchantAuthFlag"
        :class="`iconimg i-shangjiarenzheng ${$isMobile ? 'small' : ''}`"
        :title="titleShangjiarenzheng"
        @click="signClick(1)"
      />
      <i
        v-else
        :class="`iconimg i-shangjiarenzheng-gray ${$isMobile ? 'small' : ''}`"
        :title="titleShangjiarenzheng"
        @click="signClick(1)"
      />
      <i
        v-if="data.popularShopFlag"
        :class="`iconimg i-renqishangpu ${$isMobile ? 'small' : ''}`"
        :title="titleRenqishangpu"
        @click="signClick(2)"
      />
      <i
        v-else
        :class="`iconimg i-renqishangpu-gray ${$isMobile ? 'small' : ''}`"
        :title="titleRenqishangpu"
        @click="signClick(2)"
      />
      <i
        v-if="data.realFlag"
        :class="`iconimg i-shidirenzheng ${$isMobile ? 'small' : ''}`"
        :title="titleShidirenzheng"
        @click="signClick(3)"
      />
      <i
        v-else
        :class="`iconimg i-shidirenzheng-gray ${$isMobile ? 'small' : ''}`"
        :title="titleShidirenzheng"
        @click="signClick(3)"
      />
    </div>

    <div class="LayoutLeftMain-sectionTitle">企业地址</div>
    <div>{{data.region?data.region:''}}</div>
    <div>{{data.addrInfo?data.addrInfo:'暂无'}}</div>
    <div class="LayoutLeftMain-sectionTitle">企业网址</div>
    <div class="merchantIntro">
      <a class="a-green" v-if="data.websiteAddr">{{data.websiteAddr}}</a>
      <span v-else>暂无</span>
    </div>
    <div class="LayoutLeftMain-sectionTitle">企业介绍</div>
    <span class="merchantIntro">{{data.merchantIntro?data.merchantIntro:'暂无'}}</span>
    <div class="LayoutLeftMain-sectionTitle">办公环境</div>
    <ImgList :value="officeImgList" :width="imgW" :height="imgH" />
    <div class="LayoutLeftMain-sectionTitle">公司宣传图</div>
    <ImgList :value="companyImgList" :width="imgW" :height="imgH" />
  </div>
</template>

<script>
  import { pxtorem } from '~/utils'
  import { QIYEHUANJING290X180, QIYEXC290X180 } from '~/assets/js/constants'

  export default {
    name: 'PageMerchantCenterInfoView',
    props: {
      data: Object
    },
    computed: {
      labelWidth() {
        return pxtorem(this.$isMobile ? 180 : 100)
      },
      imgW() {
        return this.$isMobile ? 335 : 290
      },
      imgH() {
        return this.$isMobile ? 208 : 180
      },
      officeImgList() {
        let imgList = this.data.officeAttachmentDtoList
          ? this.data.officeAttachmentDtoList.map(v => {
              return {
                name: v.fileName,
                url: v.attachUrl ? v.attachUrl + QIYEHUANJING290X180 : ''
              }
            })
          : []
        return imgList
      },
      companyImgList() {
        let imgList = this.data.companyAttachmentDtoList
          ? this.data.companyAttachmentDtoList.map(v => {
              return {
                name: v.fileName,
                url: v.attachUrl ? v.attachUrl + QIYEXC290X180 : ''
              }
            })
          : []
        return imgList
      }
    },
    data() {
      return {
        QIYEHUANJING290X180,
        QIYEXC290X180,
        titleShangjiarenzheng: '营业执照等相关企业信息通过审核认证的商家。',
        titleRenqishangpu: '商品服务受欢迎程度较高的商家。',
        titleShidirenzheng: '生产经营状况通过了实地走访认证的商家。'
      }
    },
    methods: {
      signClick(val) {
        if (val === 1) {
          this.$toast.success(this.titleShangjiarenzheng)
        } else if (val === 2) {
          this.$toast.success(this.titleRenqishangpu)
        } else {
          this.$toast.success(this.titleShidirenzheng)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
 .merchantIntro{
   display: inline-block;
   max-width: 800px;
   word-break:break-all;
 }
 .RootIsMobile {
   .merchantIntro{
    max-width: 99%;
  }
 }
</style>
      


