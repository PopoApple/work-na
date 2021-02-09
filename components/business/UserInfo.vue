<template>
  <span class="UserInfo">
    <span class="userHead bg-img" :style="{ 'background-image': `url(${avatar || nologinImg}${imgSufix})`, width: sizeRem, height: sizeRem }" @click="$router.push(link)" />
    <span v-if="showText" class="text" :style="{  marginLeft: headMarginRight }">
      <span v-if="hello" class="hello">Hi，{{timeText}}好~</span>
      <template v-if="$store.state.auth">
        <div class="ellipsis userName" :style="nameStyle" @click="$router.push(link)">{{ name }}</div>
      </template>
      <template v-else-if="$isMobile">
        <span class="a-green clickLogin" @click="$router.push('/login')">点击登录</span>
      </template>
      <template v-else>
        <div class="mainText ellipsis">你还未登录，请先登录</div>
      </template>
    </span>
  </span>
</template>

<script>
import { defaultUser01, defaultUser02 } from '~/assets/js/constants'
import { pxtorem } from '~/utils'
import styleVars from '~/assets/style/vars.scss'
import { TOU90 } from '~/assets/js/constants'
  
export default {
  props: {
    size: {
      type: Number,
      default: 60,
    },
    hello: Boolean,
    nameFontSize: {
      type: String,
      default: 'fontSizeL',
    },
    nameColor: {
      type: String,
    },
    nameBold: {
      type: Boolean,
    },
    nameWidth: {
      type: Number,
      default: 163,
    },
    showText: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    imgSufix() {
      return TOU90
    },
    nologinImg() {
      let size = this.$isMobile ? this.size * 2 : this.size
      return size > 60 ? defaultUser02 : defaultUser01
    },
    isMerchant() {
      return this.$store.state.userInfo.type === 2 && this.$store.state.userInfo.isAuth === 3
    },
    name() {
      return this.isMerchant ? this.$store.state.userInfo.merchantName : this.$store.state.userInfo.userName
    },
    link() {
      return this.isMerchant ? '/merchantCenter/myPublish' : '/userCenter/myInfo'
    },
    avatar() {
      return this.isMerchant ? this.$store.state.userInfo.logo : this.$store.state.userInfo.avatar
    },
    sizeRem() {
      return pxtorem(this.size)
    },
    headMarginRight() {
      return pxtorem(this.size / 3.5)
    },
    nameStyle() {
      return {
        fontSize: styleVars[this.nameFontSize],
        color: styleVars[this.nameColor],
        fontWeight: this.nameBold ? 'bold' : 'normal',
        maxWidth: pxtorem(this.nameWidth),
      }
    },
    timeText() {
      let text = ''
      let date = new Date()
      let hour = date.getHours()
      let minute = date.getMinutes()
      if (hour < 12) {
        text = '上午'
      } else if (hour < 18) {
        text = '下午'
      } else {
        text = '晚上'
      }
      return text
    },
  },
}
</script>

<style lang="scss">
.UserInfo {
  display: flex;
  .userHead.bg-img {
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 26px;
    flex: 1;
  }
  .hello {
    font-size: $fontSizeOddS;
    color: $fontColorLight;
    margin-bottom: 5px;
  }
  .mainText {
    font-size: $fontSize;
    color: $fontColor;
    font-weight: bold;
    width: 163px;
  }
  .userName {
    cursor: pointer;
  }
}
/*---------------以下是移动端---------------*/
.RootIsMobile { 
  .UserInfo {
    .clickLogin {
      font-weight: bold;
      font-size: $fontSizeXL;
    }
    .text {
      line-height: 54px;
    }
  }
}
</style>
