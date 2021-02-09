<template>
  <div class="PageMerchantCenterWantPublishStep1 LayoutLeftMain-padding-bottom">
    <div class="col-box">
      <div class="choose-box" @click="$emit('select', 1)">
        <i slot="icon" :class="`iconimg i-fabushangpin ${$isMobile ? 'small' : ''}`" />
        <div class="choose-box-info">
          <div class="choose-box-title">
            <span class="title border1">发布商品信息</span>
            <span>查看详情→</span>
          </div>
          <span class="info">详细的商品信息描述，商品优势介绍，配以宣传文案图片，能让您的商品得到更多用户的青睐</span>
        </div>
      </div>
      <div class="choose-box" @click="$emit('select', 2)">
        <i slot="icon" :class="`iconimg i-fabuxuqiu ${$isMobile ? 'small' : ''}`" />
        <div class="choose-box-info">
          <div class="choose-box-title">
            <span class="title border2">发布需求信息</span>
            <span>查看详情→</span>
          </div>
          <span class="info">敬请期待~</span>
        </div>
      </div>
    </div>
    <div class="col-box">
      <div class="choose-box" @click="$emit('select', 3)">
        <i slot="icon" :class="`iconimg i-fabutigong ${$isMobile ? 'small' : ''}`" />
        <div class="choose-box-info">
          <div class="choose-box-title">
            <span class="title border3">发布提供信息</span>
            <span>查看详情→</span>
          </div>
          <span class="info">敬请期待~</span>
        </div>
      </div>
      <div class="choose-box" @click="$emit('select', 4)">
        <i slot="icon" :class="`iconimg i-fabuzhaopin ${$isMobile ? 'small' : ''}`" />
        <div class="choose-box-info">
          <div class="choose-box-title">
            <span class="title border4">发布招聘信息</span>
            <span>查看详情→</span>
          </div>
          <span class="info">敬请期待~</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageMerchantCenterWantPublishStep1'
  }
</script>

<style lang="scss" scoped>
  .PageMerchantCenterWantPublishStep1 {
    display: flex;
    flex-direction: column;
    .col-box{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .choose-box{
      width: 440px;
      height: 125px;
      box-shadow:$shadow;
      border-radius: $borderRadius;
      margin: 20px 20px 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .choose-box:hover{
      transform: scale(1.05);
      -webkit-transform: scale(1.05);
      -moz-transform: scale(1.05);
      -ms-transform: scale(1.05);
      -o-transform: scale(1.05);
    }
    .choose-box-info{
      width: 316px;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .info{
      color: $fontColorXLight;
    }
    .choose-box-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: $fontColorXLight;
      font-size: $fontSizeS;
      margin-bottom: 15px;
    }
    .title{
      font-size: $fontSizeXL;
      color: $fontColorDark;
      font-weight: bold;
 
    }
    .border1{
      border-bottom: 2px solid transparent ;
      border-color: rgba(0, 168, 95, 0.1);
    }
    .border2{
      border-bottom: 2px solid transparent ;
      border-color: rgba(232, 125, 21, 0.1);
    }
    .border3{
      border-bottom: 2px solid transparent ;
      border-color: rgba(241, 18, 107, 0.1);
    }
    .border4{
      border-bottom: 2px solid transparent ;
      border-color: rgba(21, 145, 232, 0.1);
    }

  }
  .RootIsMobile {
    .PageMerchantCenterWantPublishStep1 {
      .col-box{
        flex-direction: column;
      }
      .choose-box{
        width: 750px;
        height: 187px;
      }
      .choose-box-info{
        width: 563px;
        height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .title{
        font-size: $fontSize;
      }
      .info{
        font-size: $fontSizeS;
      }
    }
  }
</style>
