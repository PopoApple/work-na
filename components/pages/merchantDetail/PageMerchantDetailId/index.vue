<template>
  <div class="mod">
    <!-- 头部 -->
    <HeaderMerchant
      :merchantId="data?data.id||'':''"
      :merchantName="data?data.merchantName||'':''"
      :merchantLogo="data?data.logoUrl||'':''"
      :merchantMainProduct="data?data.mainProductIntro||'':''"
      :merchantAuthFlag="data?data.merchantAuthFlag||0:0"
      :popularShopFlag="data?data.popularShopFlag||0:0"
      :realFlag="data?data.realFlag||0:0"
      :merchantLevel="data?data.merchantLevel||'C':'C'"
    />
    <div class="normal_div" v-if="!validatenull(imagesList)">
      <div class="box">
        <div class="main">
          <span class="main-title-span-1">我们的环境</span>
          <div class="mcarousel">
            <el-carousel v-if="!$isMobile" indicator-position="outside" arrow="never" :interval="0">
              <el-carousel-item v-for="(item,i) in imagesList" :key="i" class="el-item">
                <div v-for="(img,index) in item" :key="index" class="item-image">
                  <CcImage
                    :src="img.attachUrl?img.attachUrl+QIYEHUANJING280X220:''"
                    :width="$isMobile?335:280"
                    :height="$isMobile?202:220"
                    :alt="data?data.merchantName||'':''"
                  ></CcImage>
                  <span>{{img.fileName}}</span>
                </div>
              </el-carousel-item>
            </el-carousel>
            <van-swipe class="mobile-carousel" v-else :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item,i) in imagesList" :key="i" class="el-item">
                <div v-for="(img,index) in item" :key="index" class="item-image">
                  <CcImage
                    :src="img.attachUrl?img.attachUrl+QIYEHUANJING280X220:''"
                    :width="$isMobile?335:280"
                    :height="$isMobile?202:220"
                    :alt="data?data.merchantName||'':''"
                  ></CcImage>
                  <span class="ellipsis">{{img.fileName}}</span>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </div>
    </div>
    <div class="normal2_div">
      <div class="box">
        <div class="main">
          <div class="main-title">
            <span class="main-title-span">我们的信息</span>
            <div v-if="!$isMobile" class="outer-1">
              <div class="group-1">
                <Button
                  type="text"
                  icon="iconfont icon-yanjing"
                  circle
                >{{tranNumber(data?data.viewCount||0:0,0)}}</Button>
              </div>
              <div class="group-2">
                <Button
                  type="text"
                  class="button_1"
                  v-if="isFollow"
                  icon="iconfont icon-yiguanzhu"
                  @click="handleCancelFollow"
                >已关注</Button>
                <Button type="text" v-else icon="iconfont icon-guanzhu" @click="handleFollow">关注</Button>
              </div>
            </div>
          </div>

          <div class="logo-info">
            <CcImage
              :src="data?data.logoUrl+TOU90||'':''"
              :width="81"
              :height="81"
              round
              :alt="data?data.merchantName||'':''"
            ></CcImage>
            <div class="name-info">
              <span class="merchant-name ellipsis">{{data?data.merchantName||'':''}}</span>
              <div v-if="!$isMobile" class="contract-info">
                <div class="con-info-div">
                  <span class="contract-man-title">联系人:</span>
                  <span class="merchant-info ellipsis">{{data?data.contactName||'':''}}</span>
                </div>
                <div>|</div>
                <div class="con-address-div">
                  <div class="address-title">地址:</div>
                  <span class="merchant-address ellipsis">{{data?data.addrInfo||'':''}}</span>
                  <i style="margin-left:10px" class="iconfont icon-zuobiao theme-color"></i>
                </div>
              </div>
            </div>
          </div>
          <el-collapse class="collapse-info" value="1">
            <el-collapse-item name="1">
              <div class="collapse-info-main">
                <div class="collapse-info-row">
                  <div v-if="$isMobile" class="collapse-info-item">
                    <span class="info-title">联系人:</span>
                    <span class="collapse-item-info ellipsis2">{{data?data.contactName||'':''}}</span>
                  </div>
                  <div v-if="$isMobile" class="collapse-info-item-address">
                    <span class="info-title">地址:</span>
                    <span class="collapse-item-info-address ellipsis2">{{data?data.addrInfo||'':''}}</span>
                  </div>
                  <div class="collapse-info-item">
                    <span class="info-title">法人代表:</span>
                    <span class="collapse-item-info ellipsis2">{{data?data.legalPerson||'':''}}</span>
                  </div>
                  <div class="collapse-info-item">
                    <span class="info-title">注册资本:</span>
                    <span class="collapse-item-info ellipsis2">{{data?data.registerCapital||'':''}}</span>
                  </div>
                  <div class="collapse-info-item">
                    <span class="info-title">成立时间:</span>
                    <span class="collapse-item-info ellipsis2">{{data?data.registerDate||'':''}}</span>
                  </div>
                </div>
                <div class="collapse-info-row">
                  <div class="collapse-info-item">
                    <span class="info-title">行业类型:</span>
                    <span class="collapse-item-info ellipsis2">{{data?data.typeName||'':''}}</span>
                  </div>
                  <div class="collapse-info-item">
                    <span class="info-title">联系方式:</span>
                    <span class="collapse-item-info ellipsis2">{{data?data.contactPhone||'':''}}</span>
                  </div>
                </div>
                <div class="collapse-info-row">
                  <div class="collapse-info-item-address">
                    <span class="info-title">注册地址:</span>
                    <span class="collapse-item-info-address ellipsis2">{{data?data.addrInfo||'':''}}</span>
                  </div>
                </div>
                <div
                  class="collapse-info-row"
                  v-if="!validatenull(data)&&!validatenull(data.websiteAddr)"
                >
                  <div class="collapse-info-item-address">
                    <span class="info-title">官网地址:</span>
                    <span
                      class="collapse-item-info-address ellipsis2"
                    >{{data?data.websiteAddr||'':''}}</span>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div v-if="$isMobile" class="outer-1">
          <div class="group-1">
            <i class="iconfont icon-yanjing icon_6"></i>
            <span class="num">{{tranNumber(data?data.viewCount||0:0,0)}}</span>
          </div>
          <div class="group-2" v-if="isFollow" @click="handleCancelFollow">
            <i class="iconfont icon-yiguanzhu icon_7"></i>
            <span class="num_1">已关注</span>
          </div>
          <div class="group-2" v-else @click="handleFollow">
            <i class="iconfont icon-guanzhu icon_6"></i>
            <span class="num_1">关注</span>
          </div>
        </div>
      </div>
    </div>
    <div class="normal3_div">
      <div class="box_1">
        <!-- keep-alive -->
        <nuxt-child
          :merchantIntro="data?data.merchantIntro||'':''"
          :companyAttachmentDtoList="data?data.companyAttachmentDtoList||[]:[]"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vant'
  import { validatenull } from '@/utils/validate'
  import { chunk, formatPrice, tranNumber } from '@/utils'
  import { Carousel, CarouselItem, Collapse, CollapseItem } from 'element-ui'
  import { apiAddFollow, apiCancelFollow } from '~/api/merchantDetail'
  import { titleSufix } from '~/static/js/routeInfo'
  import { QIYEHUANJING280X220, QIYEXC720X600, TOU90 } from '~/assets/js/constants'
  export default {
    head() {
      let meta = [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.data.merchantName + '，广新纳，建材信息，我提供服务，找工作'
        }
      ]
      if (this.data.merchantIntro) {
        meta.push({
          hid: 'description',
          name: 'description',
          content: this.data.merchantIntro.slice(0, 100)
        })
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
      VanSwipe: Swipe,
      ElCarousel: Carousel,
      ElCarouselItem: CarouselItem,
      ElCollapse: Collapse,
      ElCollapseItem: CollapseItem
    },
    data() {
      return {
        TOU90,
        QIYEXC720X600,
        QIYEHUANJING280X220,
        isFollow: this.data ? (this.data.isFollow ? true : false) : false
      }
    },
    computed: {
      id() {
        return this.$nuxt.$route.params.id
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
        let fourthPic = []
        if (!validatenull(this.data) && !validatenull(this.data.officeAttachmentDtoList)) {
          fourthPic = chunk(this.data.officeAttachmentDtoList, 4)
        }
        return fourthPic
      }
    },
    methods: {
      formatPrice,
      tranNumber,
      validatenull,
      handleFollow() {
        //暂时默认存入默认分组
        let params = {
          merchantId: this.id
          // followGroupId
        }
        this.$showLoading()
        apiAddFollow(this.$axiosClient, params).then(
          res => {
            this.$hideLoading()
            if (res.code === 200) {
              this.$toast.success('关注成功!')
              this.isFollow = true
            } else {
              this.$toast.fail(res.msg || '关注失败!')
            }
          },
          e => {
            this.$hideLoading()
            this.$toast.fail(e.message || '关注失败!')
          }
        )
      },
      handleCancelFollow() {
        this.$confirm(`确认要取消关注吗？`)
          .then(() => {
            let params = {
              id: this.id
            }
            this.$showLoading()
            apiCancelFollow(this.$axiosClient, params).then(
              res => {
                this.$hideLoading()
                if (res.code === 200) {
                  this.$toast.success('取消成功!')
                  this.isFollow = false
                } else {
                  this.$toast.fail(res.msg || '取消失败!')
                }
              },
              e => {
                this.$hideLoading()
                this.$toast.fail(e.message || '取消失败!')
              }
            )
          })
          .catch(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
// 修改button文字间距
.el-button  /deep/ span{
  margin-left: 5px;
}
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
  overflow: hidden;
  border-radius: $borderRadiusS;
  min-height: 468px;
}

.main {
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin: 0 20px;
  width: 1150px;
}

.main-title{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.main-title-span{
  font-size: $fontSize3XL;
  color: $fontColor;
}
.main-title-span-1{
  font-size: $fontSize3XL;
  color: $fontColor;
  margin-top: 25px;
  margin-bottom: 10px;
}
.mcarousel{
  width: 100%;
}

.item-image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  span{
    margin-top: 20px;
    color: $fontColorXLight;
  }
}

.el-item{
  display: flex;
  justify-content: center;
  align-items: center;
}

.normal2_div {
  background-color: #ffffff;
  width: 1220px;
  margin-top: 8px;
}


.logo-info{
  margin-top: 26px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.name-info{
  margin-left: 26px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  height: 71px;
  // width: 80%;
  width: 1000px;
}

.merchant-name{
  font-size: $fontSize2XL;
  font-weight: bold;
  max-width: 880px;
  min-height: 50%;
}
.contract-info {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50%;
}
.contract-info span{
  font-size: $fontSizeL;
  // font-weight: bold;
}
.merchant-address{
  max-width: 90%;
  display: inline-block;
}
.con-info-div{
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.con-address-div{
  width: 660px;
  display: flex;
  align-items: center;
  // justify-content: flex-end;
  justify-content: flex-start;
  margin-left: 20px;
}

.address-title{
  max-width: 11%;
  margin-right: 10px;
  color: $fontColorXLight;
  font-size: $fontSizeL;
}

.contract-man-title{
  min-width: 31%;
  margin-right: 10px;
  color: $fontColorXLight;
  font-size: $fontSizeL;
}

.outer-1 {
  height: 71px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.group-1 {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.group-2 {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.collapse-info{
  width: 100%;
}

// 修改折叠样式
.el-collapse{
  border-top: 0px;
}
.el-collapse /deep/ .el-collapse-item__header{
  height: 10px;
  border-bottom:0px;
}
.collapse-info-row{
  margin: 29px 0 0 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: $fontSizeL;
}
.collapse-info-item-address{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.collapse-info-item{
  width: 32%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.info-title{
  color: $fontColorXLight;
  display: inline-block;
  margin-right: 10px;
}
.collapse-item-info{
  max-width: 70%;
  // display: inline-block;
}
.collapse-item-info-address{
  max-width: 90%;
  word-break: break-all;
  // display: inline-block;
}


.icon_6 {
  margin-right: 10px;
  color: $fontColorXLight;
}

.num {
  max-width: 60px;
  height: 16px;
  margin-right: 10px;
  overflow: hidden;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  color: $fontColorXLight;
  font-size: $fontSizeL;
}


.icon_7 {
  margin-right: 10px;
  color: $colorYellow;
}

.num_1 {
  max-width: 60px;
  height: 15px;
  overflow: hidden;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  line-height: 16px;
  letter-spacing: 0px;
  white-space: nowrap;
  color: $fontColorXLight;
  font-size: $fontSizeL;
}

.button_1{
  color: $fontColorLight;
}

.normal3_div{
  display: flex;
  width: 1220px;
  margin-top:8px;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 71px;
}

.box_1 {
  margin-left: 10px;
  box-shadow:$shadow;
  background-color: #ffffff;
  width: 1200px;
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

.RootIsMobile {
  .item-image {
    margin-right: 10px;
    margin-left: 10px;
    span{
      width:335px;
    }
  }
  .el-item{
    flex-wrap: wrap;
    width: 100%;
    height: 540px;
  }
  .mcarousel{
    width: 100%;
    height: auto;
  }
  .mobile-carousel{
    width: 100%;
    height: 590px;
  }
  .normal_div{
    width: 100%;
    margin-top: 20px;
  }
  .normal2_div{
    width: 100%;
    margin-top: 20px;
  }
  .normal3_div{
    width: 100%;
    margin-top: 20px;
    flex-direction: column;
  }
  .box {
    width: 100%;
    height: auto;
    margin-left: 0px;
    align-items: center;
    justify-content: center;
  }
  .box_1 {
    margin-left: 0px;
    width: 100%;
  }
  .main{
    flex-direction: column;
    width: 95%;
    height:auto;
    justify-content: center;
    margin:0;
  }
  .name-info{
    width: 80%;
  }
  .main-title-span{
    font-size: $fontSizeL;
    font-weight: bold;
    margin-top: 25px;
    margin-bottom: 10px;
  }
  .main-title-span-1{
    font-size: $fontSizeL;
    font-weight: bold;
  }
  .logo-info{
    justify-content: flex-start;
  }
  .outer-1 {
    width: 100%;
    align-self: auto;
    margin-top: 40px;
    margin-right: 0px;
    height: 70px;
  }
  .group-1 {
    height: 70px;
    width: 100%;
    background-color: $colorYellow;
    justify-content: center;
  }
  .group-2 {
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
  .merchant-name{
    font-size: $fontSize;
    font-weight: bold;
    max-width: 100%;
    min-height: 50%;
  }
  .collapse-info-row{
    flex-direction: column;
    width: 98%;
  }
  .collapse-info-item-address{
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    font-size: $fontSize;
    margin-top:20px;
  }
  .collapse-info-item{
    width: 100%;
    justify-content: space-between;
    font-size: $fontSize;
    margin-top:20px;
  }
  .info-title{
    margin-right: 0px;
  }
  .collapse-item-info{
    margin-right: 10px;
    max-width: 60%;
  }
  .collapse-item-info-address{
    max-width: 100%;
  }
  /deep/.el-collapse{
    border-bottom:0px;
  }
}
</style>
