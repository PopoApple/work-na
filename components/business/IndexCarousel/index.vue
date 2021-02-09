<template>
  <component :is="carouselComp" :height="heightRem" :autoplay="false">
    <component :is="carouselItemComp" v-for="item in data" :key="item.id">
      <nuxt-link  v-if="!item.linkUrl" class="IndexCarousel-link" :to="{name: 'article-id', params: {id: item.id}}" >
        <div class="IndexCarousel-content bg-img" :style="{height: heightRem, 'background-image': `url(${item.imgSrc + HOMETITLE})`}">
          <div class="IndexCarousel-text">
            <div class="IndexCarousel-title ellipsis" :style="{ maxWidth: titleWidthRem }">
              {{ item.title }}
            </div>
            <div class="IndexCarousel-info">
              <span class="IndexCarousel-type">{{ item.type }}</span>
              <span class="IndexCarousel-split">|</span>
              <span class="IndexCarousel-time">{{ item.time }}</span>
            </div>
          </div>
          <div class="IndexCarousel-text-bg">
          </div>
        </div>
      </nuxt-link>
      <a  v-else class="IndexCarousel-link" :href="item.linkUrl" target="_blank">
            <div class="IndexCarousel-content bg-img" :style="{height: heightRem, 'background-image': `url(${item.imgSrc})`}">
          <div class="IndexCarousel-text">
            <div class="IndexCarousel-title ellipsis" :style="{ maxWidth: titleWidthRem }">
              {{ item.title }}
            </div>
            <div class="IndexCarousel-info">
              <span class="IndexCarousel-type">{{ item.type }}</span>
              <span class="IndexCarousel-split">|</span>
              <span class="IndexCarousel-time">{{ item.time }}</span>
            </div>
          </div>
          <div class="IndexCarousel-text-bg">
          </div>
        </div>
      </a>
    </component>
  </component>
</template>


<script>
import CarouselM from '~/components/base/Carousel/CarouselM'
import CarouselItemM from '~/components/base/Carousel/CarouselItemM'
import CarouselPc from '~/components/base/Carousel/CarouselPc'
import CarouselItemPc from '~/components/base/Carousel/CarouselItemPc'
import { pxtorem } from '~/utils'
import { HOMETITLE} from '~/assets/js/constants'

export default {
  props: {
    data: Array,
    height: String,
    titleWidth: {
      type: Number,
      default: 640,
    },
  },
  computed: {
    carouselComp() {
      return this.$isMobile ? CarouselM : CarouselPc
    },
    carouselItemComp() {
      return this.$isMobile ? CarouselItemM : CarouselItemPc
    },
    heightRem() {
      return pxtorem(this.height)
    },
    titleWidthRem() {
      return pxtorem(this.titleWidth)
    },
    HOMETITLE() {
      return HOMETITLE
    }
  },
}
</script>

<style lang="scss">
.IndexCarousel-link {
  display: block;
}
.IndexCarousel-content {
  height: 100%;
  position: relative;
  border-radius: $borderRadius;
  // img {
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  // }
}
.IndexCarousel-text {
  position: absolute;
  bottom: 15px;
  left: 40px;
  color: #fff;
  padding-left: 20PX;
  z-index: 1;
  &::before {
    background: #fff;
    height: 52PX;
    width: 4PX;
    position: absolute;
    left: 0;
    top: 4PX;
    content: '';
  }
  .IndexCarousel-title {
    font-size: 30px;
    font-weight: bold;
    line-height: 36PX;
  }
  .IndexCarousel-info {
    opacity: 0.7;
  }
  .IndexCarousel-split {
    display: inline-block;
    margin: 0 5px;
  }
}

.IndexCarousel-text-bg {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 98PX;
  background: rgba(0, 0, 0, 0.5);
  border-radius: $borderRadius;
}

.RootIsMobile {
  .IndexCarousel-text {
    bottom: 18px;
    padding-left: 20PX;
    line-height: 18PX;
    &::before {
      height: 41PX;
      width: 2PX;
      top: 3PX;
    }
    .IndexCarousel-title {
      font-size: 20px;
      font-weight: normal;
      line-height: 24PX;
    }
    .IndexCarousel-info {
      opacity: 0.7;
      margin-top: 8px;
    }
  }

  .IndexCarousel-text-bg {
    height: 64PX;
  }

  .van-swipe__indicators {
    position: absolute;
    bottom: 0.32rem;
    left: auto;
    display: flex;
    transform: none;
    right: 20px;
  }

}
</style>
