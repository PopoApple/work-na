<template>
  <div class="mod">
    <!-- 头部 -->
    <HeaderMerchant
      :merchantId="data?data.merchantId||'':''"
      :merchantName="data?data.merchantName||'':''"
      :merchantLogo="data?data.logoUrl||'':''"
      :merchantMainProduct="data?data.mainProductIntro||'':''"
      :merchantAuthFlag="data?data.merchantAuthFlag||0:0"
      :popularShopFlag="data?data.popularShopFlag||0:0"
      :realFlag="data?data.realFlag||0:0"
      :merchantLevel="data?data.merchantLevel||'C':'C'"
    />
    <div class="normal_div">
      <div class="box">
        <div class="main">
          <div class="mcarousel">
            <CarouselZoom
              v-if="!$isMobile"
              class="carousel"
              :imgSrc="imgSrc"
              :imagesList="imagesList"
            />
            <van-swipe
              class="mobile-carousel"
              v-if="$isMobile"
              :autoplay="3000"
              indicator-color="white"
            >
              <van-swipe-item v-for="(image, index) in moblieImgSrc" :key="index">
                <CcImage :src="image.imgSrc" :alt="data?data.merchantName||'':''"></CcImage>
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="block_1">
            <div class="block_2">
              <div v-if="$isMobile" class="moblie-priceWrap">
                <span class="price">{{ formatPrice(data?data.unitPrice||'面议':'面议') }}</span>
                <span
                  class="price"
                  v-if="data&&data.unitName"
                >&nbsp;&nbsp;/&nbsp;&nbsp;{{ data?data.unitName||'':'' }}</span>
              </div>
              <span class="desc">{{data?data.productName||'':''}}</span>
              <span class="simpleIntro">{{data?data.productTypeName||'':''}}</span>
              <span class="summary_1">{{data?data.productSimpleIntro||subStringIntro:''}}</span>
              <div v-if="!$isMobile" class="priceWrap">
                <span class="priceLabel">价格：</span>
                <span class="price">{{ formatPrice(data?data.unitPrice||'面议':'面议') }}</span>
                <span
                  class="price"
                  v-if="data&&data.unitName"
                >&nbsp;&nbsp;/&nbsp;&nbsp;{{ data?data.unitName||'':'' }}</span>
              </div>
              <div class="colorDiv" />
              <div class="word">
                <span>联系人：</span>
                <span class="contractAndLoca ellipsis">{{data?data.contactName||'暂无':'暂无' }}</span>
              </div>
              <div class="locationWrap">
                <span>电话：</span>
                <span class="contractAndLoca ellipsis">{{data?data.contactPhone||'暂无':'暂无' }}</span>
              </div>
              <div class="locationWrap">
                <span>地址：</span>
                <span class="contractAndLoca ellipsis">{{data?data.region||'暂无':'暂无' }}</span>
                <i
                  v-if="data&&data.region"
                  style="margin-left:10px"
                  class="iconfont icon-zuobiao theme-color"
                ></i>
              </div>
            </div>
            <div class="outer_1">
              <div class="group_1">
                <i class="iconfont icon-yanjing icon_6"></i>
                <span class="num">{{tranNumber(data?data.viewCount||0:0,0)}}</span>
              </div>
              <div class="group_2" v-if="isCollect" @click="handleCancelCollect">
                <i class="iconfont icon-shoucang1 icon_7"></i>
                <span class="num_1">已收藏</span>
              </div>
              <div class="group_2" v-else @click="handleCollect">
                <i class="iconfont icon-shoucang icon_6"></i>
                <span class="num_1">收藏</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="normal2_div">
      <div class="box_1">
        <!-- keep-alive -->
        <nuxt-child :productIntro="data.productIntro" :productParam="data.productParam" />
      </div>
      <div class="box_2">
        <div class="box_2_title">
          <span>热销产品</span>
          <nuxt-link class="box_2_title_link" to="/material/goods">查看更多 +</nuxt-link>
        </div>
        <HotGoods class="box_2_main" :data="data?data.hotProductList:[]"></HotGoods>
      </div>
    </div>
    <div class="box_3">
      <div class="box_3_title">
        <div>
          <span v-if="!$isMobile" class="box_3_span">|</span>
          <span class="box_3_span_2">其他产品</span>
        </div>

        <nuxt-link
          class="box_3_title_link"
          :to="{
            name: 'material-merchant-merchantDetail-id-goods',
            params: { id: data?data.merchantId:1 },
          }"
        >查看更多 +</nuxt-link>
      </div>
      <OtherGoods class="box_2_main" :data="data?data.otherProductList:[]"></OtherGoods>
    </div>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vant'
  import { validatenull } from '@/utils/validate'
  import { chunk, formatPrice, tranNumber, getHtmlText } from '@/utils'
  import { apiAddCollect, apiCancelCollect } from '~/api/goodsDetail'
  import { titleSufix } from '~/static/js/routeInfo'
  import { SP587X319 } from '~/assets/js/constants'
  export default {
    head() {
      let keywordsArry = [
        this.data.productName,
        this.data.productTypeName,
        this.data.merchantName,
        '广新纳'
      ]
      let meta = [{ hid: 'keywords', name: 'keywords', content: keywordsArry.join('，') }]
      let desc = this.data.productSimpleIntro
      if (!desc && this.data.productIntro) {
        desc = getHtmlText(this.data.productIntro)
      }
      if (desc) {
        meta.push({ hid: 'description', name: 'description', content: desc.slice(0, 100) })
      }
      return {
        title: this.data.merchantName + titleSufix,
        meta
      }
    },
    props: {
      data: Object
    },
    components: {
      VanSwipeItem: SwipeItem,
      VanSwipe: Swipe
    },
    data() {
      return {
        SP587X319,
        isCollect: this.data ? (this.data.isCollect ? true : false) : false
      }
    },
    computed: {
      id() {
        return this.$nuxt.$route.params.id
      },
      moblieImgSrc() {
        let array = !validatenull(this.data)
          ? this.data.attachUrls.map(v => {
              return {
                imgSrc: v ? v + SP587X319 : ''
              }
            })
          : []
        return array
      },
      imgSrc() {
        if (
          !validatenull(this.data) &&
          !validatenull(this.data.attachUrls) &&
          !validatenull(this.data.attachUrls[0])
        ) {
          return this.data.attachUrls[0]
        } else {
          return ''
        }
      },
      imagesList() {
        let main = []
        let mainPic = []
        let fifthPic = []
        if (!validatenull(this.data) && !validatenull(this.data.attachUrls)) {
          this.data.attachUrls.map((item, index) => {
            let itemUrl = { url: item }
            mainPic.push(itemUrl)
          })
          fifthPic = chunk(mainPic, 5)
          if (!validatenull(fifthPic)) {
            fifthPic.map(item => {
              let imgUrl = {}
              imgUrl.imgUrl = item
              main.push(imgUrl)
            })
          }
        }
        return main
      },
      subStringIntro() {
        if (!validatenull(this.data) && !validatenull(this.data.productIntro)) {
          return this.data.productIntro.substring(0, 120)
        } else {
          return ''
        }
      }
    },
    methods: {
      formatPrice,
      tranNumber,
      handleCollect() {
        let params = {
          sourceId: this.id,
          collectType: 1
        }
        this.$showLoading()
        apiAddCollect(this.$axiosClient, params).then(
          res => {
            this.$hideLoading()
            if (res.code === 200) {
              this.$toast.success('收藏成功!')
              this.isCollect = true
            } else {
              this.$toast.fail(res.msg || '收藏出现问题~!')
            }
          },
          e => {
            this.$hideLoading()
            this.$toast.fail(e.message || '收藏出现问题~!')
          }
        )
      },
      handleCancelCollect() {
        this.$confirm(`确认要取消收藏吗？`).then(() => {
          let params = {
            id: this.id
          }
          this.$showLoading()
          apiCancelCollect(this.$axiosClient, params).then(
            res => {
              this.$hideLoading()
              if (res.code === 200) {
                this.$toast.success('取消成功!')
                this.isCollect = false
              } else {
                this.$toast.fail(res.msg || '取消出现问题~!')
              }
            },
            e => {
              this.$hideLoading()
              this.$toast.fail(e.message || '取消出现问题~!')
            }
          )
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

.carousel {
  width: 595px;
  height: 100%;
  margin-top: 65px;
}

.normal_div {
  background-color: #ffffff;
  width: 1220px;
  margin-top:8px;
}

.box {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 10px;
  box-shadow:$shadow;
  background-color: #ffffff;
  width: 1200px;
  height: 468px;
  overflow: hidden;
  border-radius: $borderRadiusS;
}



.main {
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 41px;
  margin-left: 20px;
  width: 1174px;
  height: 320px;
}

.bannerWrap {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  border-radius: 6px;
  background-color: #00a75f;
  width: 587px;
  height: 319px;
  overflow: hidden;
}

.banner {
  width: 587px;
  height: 319px;
}

.block_1 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 320px;
  margin-right: 15px;
}
.block_2 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.desc {
  position: relative;
  max-width: 536px;
  height: 40px;
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  line-height: 40px;
  letter-spacing: 0.4px;
  white-space: nowrap;
  font-size: $fontSize2XL;
  font-weight: bold;
}

.simpleIntro {
  font-size: $fontSizeS;
  color: $fontColorLight;
  line-height: 15px;
  text-decoration: none;
  letter-spacing: 0.4px;
  white-space: nowrap;
}

.summary_1 {
  webkit-line-clamp: 2px;
  position: relative;
  margin-top: 15px;
  width: 524px;
  height: 46px;
  overflow: hidden;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  line-height: 23px;
  letter-spacing: 0.32px;
  color: $fontColorXLight;
  font-size: $fontSizeL;
  word-break: break-all;
}

.priceWrap {
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  margin-left: 1px;
  height: 18px;
}

.priceLabel {
  margin-right: 14px;
  font-size: $fontSizeL;
  line-height: 16px;
  text-decoration: none;
  letter-spacing: 0.32px;
  white-space: nowrap;
}

.price {
  font-size: $fontSize2XL;
  color: $colorGreen;
  line-height: 20px;
  text-decoration: none;
  letter-spacing: 0.4px;
  white-space: nowrap;
}

.colorDiv {
  position: relative;
  align-self: center;
  margin-top: 33px;
  border-radius: 0;
  background-color: rgba(153, 153, 153, 0.1);
  width: 546px;
  height: 1px;
  overflow: hidden;
}

.word {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  margin-left: 3px;
  max-width: 533px;
  height: 18px;
  line-height: 16px;
  letter-spacing: 0.32px;
  color: $fontColorXLight;
  font-size: $fontSizeL;
}

.locationWrap {
  display: flex;
  position: relative;
  align-items: center;
  margin-top: 24px;
  margin-left: 2px;
  height: 18px;
  font-size: $fontSizeL;
  color: $fontColorXLight;
  letter-spacing: 0.32px;
}

.contractAndLoca {
	max-width: 466px;
	display: inline-block;
}


.icon_5 {
  width: 14px;
  height: 16px;
  overflow: hidden;
}

.outer_1 {
  display: flex;
  position: relative;
  align-items: center;
  align-self: flex-end;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 34px;
  margin-right: 14px;
  height: 16px;
}

.group_1 {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 16px;
}

.icon_6 {
  margin-right: 10px;
  color: $fontColorXLight;
}

.num {
  max-width: 60px;
  height: 18px;
  margin-right: 10px;
  overflow: hidden;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  line-height: 18px;
  letter-spacing: 0px;
  white-space: nowrap;
  color: $fontColorXLight;
  font-size: $fontSizeL;
}

.group_2 {
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 18px;
  cursor: pointer;
}

.icon_7 {
  margin-right: 10px;
  color: $colorYellow;
}

.num_1 {
  max-width: 60px;
  height: 18px;
  overflow: hidden;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  line-height: 18px;
  letter-spacing: 0px;
  white-space: nowrap;
  color: $fontColorXLight;
  font-size: $fontSizeL;
}

.normal2_div{
  display: flex;
  width: 1220px;
  margin-top:8px;
  justify-content: space-between;
  align-items: flex-start;
}

.box_1 {
  margin-left: 10px;
  box-shadow:$shadow;
  background-color: #ffffff;
  width: 900px;
  min-height: 1000px;
  border-radius: $borderRadiusS;
}
.box_1_link{
  width: 132px;
  height:32px;
  background: $colorGreen;
  color: $colorWhite !important;
  margin-left: 20px;
  text-align: center;
  box-shadow: $shadow;
  border-radius: $borderRadiusS;
  line-height: 32px;
}
.box_2 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-right: 10px;
  box-shadow:$shadow;
  background-color: $colorWhite;
  width: 280px;
  overflow: hidden;
  min-height: 153px;
  max-height: 880px;
  height: auto;
  border-radius: $borderRadiusS;
}

.box_2_title{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: $bgColorGray;
  height: 32px;
  overflow: hidden;
  width: 260px;
  margin-bottom: 5px;
  min-height: 32px;
}
.box_2_title span{
  font-size: $fontSizeL;
  font-weight: bold;
  color: $fontColorDark;
}
.box_2_title_link{
  font-size: $fontSizeS;
  color: $fontColorXLight !important;
}
.box_3 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 10px;
  margin-bottom: 62px;
  box-shadow:$shadow;
  background-color: #ffffff;
  width: 900px;
  height: 357px;
  overflow: hidden;
  border-radius: $borderRadiusS;
  margin-top: 10px;
}

.box_3_title{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  overflow: hidden;
  width: 95%;
  margin-left: 20px;
  margin-top: 30px;
  margin-bottom: 5px;
  min-height: 32px;
  line-height: 32px;
}
.box_3_span{
  font-size: $fontSize4XL;
  font-weight: 1000;
  color: $colorGreen;
}
.box_3_span_2{
  font-size: $fontSizeXL;
  font-weight: 800;
  margin-left: 15px;
}
.box_3_title_link{
  font-size: $fontSizeS;
  color: $fontColorXLight !important;
}

.RootIsMobile {
  .mcarousel{
    width: 95%;
  }
  .mobile-carousel{
    width: 100%;
    height: 401px;
  }
  .normal_div{
    width: 100%;
    margin-top: 20px;
  }
  .normal2_div{
    width: 100%;
    margin-top: 20px;
    flex-direction: column;
  }
  .box {
    width: 100%;
    height: auto;
    margin-left: 0px;
    align-items: center;
  }
  .box_1 {
    margin-left: 0px;
    width: 100%;
  }
  .box_2{
    margin-right: 0px;
    width: 100%;
    min-height: 0;
    max-height: none;
    height: auto;
    margin-top: 20px;
    align-items:center
  }
  .box_3{
    width: 100%;
    margin-left: 0px;
    margin-top: 20px;
    height: auto;
  }
  .main{
    flex-direction: column;
    width: 100%;
    height:auto;
    justify-content: center;
    margin-left: 0px;
  }
  .block_1{
    width: 100%;
    margin-right: 0px;
    margin-top: 30px;
    height: auto;
    align-items: center;
  }
  .block_2{
    width: 95%;
    height: auto;
  }
  .desc {
    max-width: 95%;
    height: 42px;
    line-height: 40px;
    font-size: $fontSizeXL;
  }
  .moblie-priceWrap{
    margin: 10px 0;
    max-width: 95%;
  }
  .price{
    font-weight: 800;
    font-size: $fontSizeOddL;
    height: 42px;
    line-height: 36px;
    opacity: 1;
  }
  .simpleIntro{
    margin:15px 0;
  }
  .summary_1{
    max-width: 95%;
    margin-left: 0px;
    margin-top: 10px;
    width: 95%;
    font-weight: 400;
    font-size: $fontSize;
    height: auto;
    line-height: 36px;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .colorDiv{
    width: 95%;
    margin: 20px 0;
    background-color: $borderColorGray;
    align-self: auto;
    opacity: 0.1;
  }
  .word {
    margin-top: 0px;
    margin-left: 0px;
    max-width: 95%;
    height: 33px;
    line-height: 36px;
    color: $fontColorXLight;
    font-size: $fontSize;
  }
  .locationWrap {
    margin-top: 20px;
    margin-left: 0px;
    max-width: 95%;
    margin-right: 8px;
    line-height: 36px;
    height: 33px;
    color: $fontColorXLight;
    font-size: $fontSize;
  }
  .contractAndLoca{
    color:$fontColor;
  }
  .outer_1 {
    width: 100%;
    align-self: auto;
    margin-top: 40px;
    margin-right: 0px;
    height: 70px;
  }
  .group_1 {
    height: 70px;
    width: 100%;
    background-color: $colorYellow;
    justify-content: center;
  }
  .group_2 {
    height: 70px;
    width: 100%;
    background-color: $colorGreen;
    justify-content: center;
  }
  .num {
    max-width: 100%;
    height: 33px;
    line-height: 36px;
    margin-right: 10px;
    text-align: center;
    color: $colorWhite;
    font-size: $fontSize;
  }
  .num_1 {
    max-width: 100%;
    height: 33px;
    line-height: 36px;
    margin-right: 10px;
    text-align: center;
    color: $colorWhite;
    font-size: $fontSize;
  }
  .icon_6{
    color: $colorWhite;
  }

  .box_2_title{
    padding: 40px 30px;
    background-color: $colorWhite;
    width: 90%;
  }
  .box_2_main{
    width: 100%;
  }
  .box_3_title{
    height: 32px;
    width: 90%;
    margin: 0;
    padding: 40px 30px;
  }
  .box_3_span_2{
    font-size: $fontSizeXL;
    font-weight: bold;
    margin-left: 10px;
    color: $fontColorDark;
  }
  .box_2_title span{
    font-size: $fontSizeXL; 
  }

}
</style>
