<template>
  <el-image
    :style="{width:widthRem,height: heightRem,'border-radius':radius}"
    :src="src"
    :alt="alt"
    :fit="fit"
    class="ImagePc"
    :class="{ [`ImagePc-${this.defaultIconSizeLevel}`]: true }"
  >
    <div slot="error" class="image-slot">
      <i class="el-icon-picture-outline icon"></i>
      <div class="text">暂无图片</div>
    </div>
  </el-image>
</template>

<script>
  import { Image } from 'element-ui'
  import { pxtorem } from '~/utils'
  import { validatenull } from '@/utils/validate'
  export default {
    components: {
      ElImage: Image
    },
    props: {
      src: String,
      fit: String,
      alt: String,
      width: Number | String,
      height: Number | String,
      round: Boolean,
      defaultIconSizeLevel: String,
    },
    computed: {
      heightRem() {
        if (
          !validatenull(this.height) &&
          typeof this.height === 'string' &&
          this.height.indexOf('%') > -1
        ) {
          return this.height
        }
        return pxtorem(this.height)
      },
      widthRem() {
        if (
          !validatenull(this.width) &&
          typeof this.width === 'string' &&
          this.width.indexOf('%') > -1
        ) {
          return this.width
        }
        return pxtorem(this.width)
      },
      radius() {
        return this.round ? '50%' : pxtorem(6)
      }
    }
  }
</script>

<style lang="scss">
.ImagePc {
  &.el-image {
    display: block;
  }
  .icon {
    color: $fontColor2XLight;
  }
  .text {
    text-align: center;
    color: $fontColor2XLight;
  }
  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $bgColorGrayLight;
  }
}

.ImagePc.ImagePc-l {
  .icon {
    font-size: 36PX;
    line-height: 40PX;
  }
  .text {
    font-size: $fontSize2XL;
    line-height: 40PX;
  }
}

.ImagePc.ImagePc-m {
  .icon {
    font-size: 0.37333rem;
    line-height: 0.48rem;
  }
  .text {
    font-size: $fontSize;
    line-height: 24PX;
  }
}

.ImagePc.ImagePc-s {
  .icon {
    font-size: 0.29333rem;
    line-height: 0.4rem;
  }
  .text {
    font-size: $fontSizeS;
    line-height: 18PX;
  }
}

.ImagePc.ImagePc-xs {
  .icon {
    font-size: 0.29333rem;
    line-height: 0.4rem;
  }
  .text {
    display: none;
  }
}

@media screen and (max-width: 1000px) {

  .RootNotMobile {
    .ImagePc.ImagePc-s {
      .text {
        display: none;
      }
    }
  }

}


.RootIsMobile {

  .ImagePc.ImagePc-m {
    .icon {
      font-size: 0.74667rem;
      line-height: 1rem;
    }
  }

  .ImagePc.ImagePc-s {
    .icon {
      font-size: 0.58667rem;
      line-height: 0.7rem;
    }
  }

  .ImagePc.ImagePc-xs {
    .icon {
      font-size: 0.58667rem;
      line-height: 0.7rem;
    }
  }

}
</style>
