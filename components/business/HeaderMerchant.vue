<template>
  <div class="float-wrap header-box">
    <div class="hd">
      <CcImage
        v-if="!$isMobile"
        class="logo"
        :src="merchantLogo?merchantLogo+QIYELOGO180X110:''"
        :width="130"
        :height="72"
        :alt="merchantName"
        fit="cover"
        :title="merchantName"
      ></CcImage>
      <div class="container">
        <div class="outer">
          <div class="outer-title">
            <CcImage
              v-if="$isMobile"
              class="moblie-logo"
              :src="merchantLogo?merchantLogo+QIYELOGO180X110:''"
              :width="168"
              :height="85"
              :alt="merchantName"
              :title="merchantName"
              fit="cover"
            ></CcImage>
            <nuxt-link
              v-if="merchantId"
              class="info"
              :title="merchantName"
              :to="{
            name: 'material-merchant-merchantDetail-id',
            params: { id: merchantId},
           }"
            >{{ merchantName}}</nuxt-link>
            <span v-else class="info">{{ merchantName}}</span>
          </div>
          <div v-if="!$isMobile">
            <i
              v-if="merchantAuthFlag"
              class="iconimg i-shangjiarenzheng"
              :title="titleShangjiarenzheng"
            />
            <i v-if="popularShopFlag" class="iconimg i-renqishangpu" :title="titleRenqishangpu" />
            <i v-if="realFlag" class="iconimg i-shidirenzheng" :title="titleShidirenzheng" />
          </div>
        </div>
        <div v-if="!$isMobile" class="product ellipsis">
          <span class="summary">{{merchantLevel?'商家等级:':''}}</span>
          &nbsp;&nbsp;&nbsp;
          <i
            v-if="merchantLevel === 'A'"
            class="iconimg i-A-round levelicon"
            :title="title"
            @click="iconClick"
          />
          <i
            v-else-if="merchantLevel === 'B'"
            class="iconimg i-B-round levelicon"
            :title="title"
            @click="iconClick"
          />
          <i
            v-else-if="merchantLevel === 'D'"
            class="iconimg i-D-round levelicon"
            :title="title"
            @click="iconClick"
          />
          <i v-else class="iconimg i-C-round levelicon" :title="title" @click="iconClick" />&nbsp;&nbsp;&nbsp;
          <span
            class="summary"
          >{{merchantMainProduct?'主营商品:':''}}&nbsp;&nbsp;&nbsp;{{merchantMainProduct}}</span>
        </div>

        <div v-else class="product">
          <span class="summary">
            {{merchantLevel?'商家等级:':''}}
            &nbsp;&nbsp;&nbsp;
            <i
              v-if="merchantLevel === 'A'"
              class="iconimg i-A-round small"
              :title="title"
              @click="iconClick"
            />
            <i
              v-else-if="merchantLevel === 'B'"
              class="iconimg i-B-round small"
              :title="title"
              @click="iconClick"
            />
            <i
              v-else-if="merchantLevel === 'D'"
              class="iconimg i-D-round small"
              :title="title"
              @click="iconClick"
            />
            <i v-else class="iconimg i-C-round small" :title="title" @click="iconClick" />&nbsp;&nbsp;&nbsp;
          </span>
          <div
            class="summary ellipsis2"
          >{{merchantMainProduct?'主营商品:':''}}&nbsp;&nbsp;&nbsp;{{merchantMainProduct}}</div>
        </div>

        <div v-if="$isMobile">
          <i v-if="merchantAuthFlag" class="iconimg i-shangjiarenzheng small" />
          <i v-if="popularShopFlag" class="iconimg i-renqishangpu small" />
          <i v-if="realFlag" class="iconimg i-shidirenzheng small" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { QIYELOGO180X110 } from '~/assets/js/constants'
  export default {
    props: {
      merchantName: String,
      merchantLogo: {
        type: String,
        default: ''
      },
      merchantMainProduct: String,
      merchantId: String,
      merchantAuthFlag: {
        type: Number,
        default: 0
      },
      popularShopFlag: {
        type: Number,
        default: 0
      },
      realFlag: {
        type: Number,
        default: 0
      },
      merchantLevel: {
        type: String,
        default: 'C'
      }
    },
    data() {
      return {
        QIYELOGO180X110,
        title: '商家等级分为A、B、C、D四级。\n等级A代表优质商家，B代表靠谱商家，C代表普通商家。',
        titleShangjiarenzheng: '营业执照等相关企业信息通过审核认证的商家。',
        titleRenqishangpu: '商品服务受欢迎程度较高的商家。',
        titleShidirenzheng: '生产经营状况通过了实地走访认证的商家。'
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
<style lang="scss" scoped>
.levelicon{
  cursor: pointer;
  min-width: 26PX;
}
.header-box {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 10px;
  box-shadow:$shadow;
  background-color: #ffffff;
  width: 1200px;
  height: 124px;
  overflow: hidden;
  border-radius: $borderRadiusS;
}
.hd {
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 35px;
  margin-left: 34px;
}
.logo {
  position: relative;
  margin-top: 1px;
  margin-right: 39px;
}


.container {
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  margin-right: 29px;
}


.outer {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: right;
  flex-direction: row;
}

.info {
  display: inline-block;
  margin-right: 34px;
  max-width: 650px;
  // height: 25px;
  font-size: $fontSize4XL;
  // line-height: 25px;
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  letter-spacing: 0px;
  white-space: nowrap;
  color: $fontColor;
  font-weight: bold;
}
.icon{
  width: 91px;
  height: 28px;
}

.product{
  margin-top: 15px;
  max-width: 950px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.summary {
  font-size: $fontSize;
  text-decoration: none;
  letter-spacing: 0px;
  color: $fontColorLight;
}
.RootIsMobile {
  .header-box {
    width: 100%;
    height: 360px;
    margin-left: 0px;
  }
  .container {
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  .outer{
    width: 100%;
  }
  .moblie-logo {
    width: 24%;
  }
  .outer-title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .info{
    max-width: 74%;
    width: 74%;
    height: 45px;
    font-size: $fontSizeXL;
    line-height: 45px;
    text-align: center;
    margin-left: 10px;
  }
  .hd{
    width: 97%;
    height: 97%;
    margin-bottom: 10px;
  }
  .product{
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
  .summary {
    max-width:  95%;
    font-size: $fontSize;
    word-break: break-all;
  }
}
</style>
