<template>
  <div class="zoom">
    <div class="pic-box">
      <pic-zoom :url="pImgSrc+SP587X319" :scale="3"></pic-zoom>
    </div>
    <div class="box">
      <el-carousel height="58px" indicator-position="none" arrow="always" :interval="0">
        <el-carousel-item v-for="(item,i) in imagesList" :key="i" class="img-box">
          <div
            v-for="(img,index) in item.imgUrl"
            :key="index"
            @mouseover="getIndex(img.url)"
            class="img-url"
          >
            <!-- <img :src="img.url" /> -->
            <CcImage :src="img.url+SP180X180" class="img-item" :width="48" :height="48"></CcImage>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
  import { Carousel, CarouselItem } from 'element-ui'
  import { SP180X180, SP587X319 } from '~/assets/js/constants'
  import PicZoom from './PicZoom'
  export default {
    name: 'Carousel',
    components: {
      PicZoom,
      ElCarousel: Carousel,
      ElCarouselItem: CarouselItem
    },
    data() {
      return {
        SP180X180,
        SP587X319,
        pImgSrc: ''
      }
    },
    props: {
      imgSrc: {
        type: String,
        default: ''
      },
      imagesList: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    methods: {
      getIndex(imgSrc) {
        this.pImgSrc = imgSrc
      }
    },
    watch: {
      imgSrc: {
        handler(aImgSrc, pImgSrc) {
          this.pImgSrc = aImgSrc
        },
        immediate: true
      }
    }
  }
</script>
<style lang="scss" scoped>
//覆盖轮播箭头样式
/deep/.el-carousel__arrow{
  color:$fontColorDark;
  background-color:transparent;
}
.zoom{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.box {
  width: 400px;
  height: 60px;
  overflow: hidden;
  margin-top: 10px;
  ul {
    position: absolute;
    width: 2000px;

    li {
      display: inline-block;
      list-style: none;
      width: 90px;
      height: 90px;
      background-color: white;
      margin-top: 15px;
      border: 1px solid #eee;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
      }
    }
  }
}
.pic-box {
  position:relative;
  width: 587px;
  height: 319px;
  border: 1px solid #eee;
  border-radius: $borderRadius;
}
/deep/ .mouse-cover-canvas {
  top: 200px !important;
  margin-top: 200px;
}

.img-url {
  display: inline-block;
  border-radius: $borderRadius;
  margin-right: 10px;
  &:nth-child(1) {
    margin-left: 10px;
  }
}
.img-url :hover{
  border-style:solid;
  border-width:1px;
  border-color:$borderColorInput;
}
.img-item {
  width: 48px;
  height: 48px;
  border-radius: $borderRadius;
  border: 1px solid $borderColorInput;
}
// .img-item :hover{
//   width: 48px;
//   height: 48px;
//   border-radius: $borderRadius;
//   border: 1px solid #eee;
// }
.img-box{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
