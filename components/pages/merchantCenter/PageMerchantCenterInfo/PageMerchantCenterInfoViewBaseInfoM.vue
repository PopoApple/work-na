<template>
  <div class="PageMerchantCenterInfoViewBaseInfoM">
    <div class="float-wrap">
      <div class="left">
        <CcImage
          class="logo bg-img"
          :width="248"
          :height="152"
          :src="data.logoUrl?data.logoUrl+QIYELOGO180X110:''"
          :alt="data.merchantName"
        ></CcImage>
      </div>
      <div class="left info-wrap">
        <div class="info-header">
          <div class="name">{{data.merchantName}}</div>
          <Tag class="industryType" size="small">{{data.typeName}}</Tag>
        </div>
      </div>
    </div>
    <div class="form-wrap">
      <Form size="mini" class="Form-view" label-position="right" label-width="90px">
        <FormItem
          class="form-item"
          label="主营产品"
        >{{data.mainProductIntro?data.mainProductIntro:'暂无'}}</FormItem>
        <!-- <FormItem class="form-item" label="地址">{{data.addrInfo?data.addrInfo:'暂无'}}</FormItem> -->
        <FormItem class="form-item" label="联系人">{{data.contactName?data.contactName:'暂无'}}</FormItem>
        <FormItem class="form-item" label="联系方式">{{data.contactPhone?data.contactPhone:'暂无'}}</FormItem>
        <FormItem class="form-item" label="企业等级">
          <i
            v-if="data.merchantLevel === 'A'"
            class="iconimg i-A-round levelicon"
            :title="title"
            @click="iconClick"
          />
          <i
            v-else-if="data.merchantLevel === 'B'"
            class="iconimg i-B-round levelicon"
            :title="title"
            @click="iconClick"
          />
          <i
            v-else-if="data.merchantLevel === 'D'"
            class="iconimg i-D-round levelicon"
            :title="title"
            @click="iconClick"
          />
          <i v-else class="iconimg i-C-round levelicon" :title="title" @click="iconClick" />
        </FormItem>
        <!-- <FormItem class="form-item" label="公司简介">{{data.merchantIntro?data.merchantIntro:'暂无'}}</FormItem> -->
        <!-- <FormItem class="form-item" label="公司网址">
          <a class="a-green">{{data.websiteAddr?data.websiteAddr:'暂无'}}</a>
        </FormItem>-->
      </Form>
    </div>
  </div>
</template>

<script>
  import { QIYELOGO180X110 } from '~/assets/js/constants'
  export default {
    name: 'PageMerchantCenterInfoViewBaseInfo',
    props: {
      data: Object
    },
    data() {
      return {
        QIYELOGO180X110,
        title: '商家等级分为A、B、C、D四级。\n等级A代表优质商家，B代表靠谱商家，C代表普通商家。'
      }
    },
    methods: {
      iconClick() {
        this.$toast.success(
          '商家等级分为A、B、C、D四级。等级A代表优质商家，B代表靠谱商家，C代表普通商家。'
        )
      }
    }
  }
</script>

<style lang="scss">
  .PageMerchantCenterInfoViewBaseInfoM {
    .logo {
      width: 248px;
      height: 152px;
    }
    .info-wrap {
      margin-left: 30px;
      width: 400px;
    }
    .name {
      color: $fontColorDark;
      font-size: $fontSizeXL;
      font-weight: bold;
      margin: 18px 0 6px;
    }
    .form-wrap {
      margin-top: 30px;
    }
    .Form-view .el-form-item--mini.el-form-item{
      margin-bottom: 10px;
    }
    
  }
</style>


