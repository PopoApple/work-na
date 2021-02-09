<template>
  <div class="Empty" :class="{ 'Empty-centerMiddle': centerMiddle }" :style="style">
    <div class="icon iconfont icon-kong1"></div>
    <div class="text">{{waringText}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      centerMiddle: Boolean, //水平垂直居中，父容器需要设position:relative，且需要有高度
      marginTop: {
        type: Number,
        default: 100
      },
      waringText: {
        type: String,
        default: '暂无数据'
      }
    },
    computed: {
      style() {
        if (!this.centerMiddle) {
          return { marginTop: this.$pxtorem(this.marginTop) }
        }
        return null
      }
    }
  }
</script>

<style lang="scss" scoped>
.Empty {
  text-align: center;
  .icon.iconfont {
    font-size: 80px;
    margin: 0 auto 30px;
    color: $fontColor2XLight;
  }
  .text {
    text-align: center;
    font-size: $fontSizeL;
    color: $fontColor2XLight;
  }
}


.Empty.Empty-centerMiddle {
  position: absolute;
  top: 50%;
  margin-top: -41px;
  left: 50%;
  margin-left: -40px;
}

.RootIsMobile {
  .Empty {
    .icon.iconfont {
      margin-bottom: 50px;
    }
  }

  .Empty.Empty-centerMiddle {
    margin-top: -100px;
    margin-left: -80px;
  }

}
</style>
