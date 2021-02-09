<template>
  <div class="PageMerchantCenterInfoViewBaseInfo">
    <div class="float-wrap">
      <div class="left">
        <!-- <div class="logo bg-img" :style="{backgroundImage: `url(${data.logoUrl})`}"></div> -->
        <CcImage
          class="logo bg-img"
          :width="180"
          :height="110"
          :src="data.logoUrl?data.logoUrl+QIYELOGO180X110:''"
          :alt="data.merchantName"
        ></CcImage>
      </div>
      <div class="left info-wrap">
        <div class="info-header">
          <span class="name">{{data.merchantName}}</span>
          <Tag class="industryType" size="small" v-if="data.typeName">{{data.typeName}}</Tag>
        </div>
        <Form size="mini" class="Form-view">
          <Row class="Row-form-col-2">
            <Col :span="12">
              <FormItem label="主营产品">{{data.mainProductIntro?data.mainProductIntro:'暂无'}}</FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="联系人">{{data.contactName?data.contactName:'暂无'}}</FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="商家等级" :title="title">
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
            </Col>
            <Col :span="12">
              <FormItem label="联系电话">{{data.contactPhone?data.contactPhone:'暂无'}}</FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <!-- <div class="website">
      <a class="a-green">{{data.websiteAddr}}</a>
    </div>-->
    <!-- <div class="introduce">公司简介：{{data.merchantIntro}}</div> -->
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
  .PageMerchantCenterInfoViewBaseInfo {
    .levelicon{
      cursor: pointer;
      min-width: 26PX;
    }
    .logo {
      width: 180px;
      height: 110px;
      border-radius: $borderRadius;
    }
    .website {
      margin-top: 15px;
    }
    .info-wrap {
      margin-left: 20px;
      width: 700px;
    }
    .info-header {
      margin: 10px 0 10px;
    }
    .name {
      color: $fontColorDark;
      font-size: $fontSizeL;
      font-weight: bold;
      vertical-align: middle;
    }
    .industryType {
      vertical-align: middle;
      margin-left: 10px;
      display: inline-block;
    }
    .introduce {
      margin: 10px 0 0 0;
    }
  }
</style>


