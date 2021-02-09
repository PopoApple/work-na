<template>
  <div class="UploadImgBtn" :style="cardStyle">
    <div class="btn-inner">
      <i :style="{'font-size': pxtorem(50)}" class="el-icon-circle-plus-outline"></i>
      <div class="placeholder">{{placeholder}}</div>
    </div>
  </div>
</template>

<script>
import { pxtorem } from '~/utils'

export default {
  name: 'UploadImgBtn',
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 200
    },
    placeholder: String,
  },
  computed: {
    cardStyle() {
      return { 
        width: pxtorem(this.width), 
        height: pxtorem(this.height), 
      }
    },
  },
  methods: {
    pxtorem,
  },
}
</script>

<style lang="scss" scoped>
.UploadImgBtn {
  border-radius: $borderRadius;
  background-color: $bgColorGray;
  cursor: pointer;
  &:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
  .btn-inner {
    margin-top: 5px;
    display: inline-block;
    vertical-align: middle;
    i {
      color: $fontColorXLight;
    }
    .placeholder {
      color: $fontColorXLight;
    }
  }
}
.RootIsMobile {
  .UploadImgBtn {
    .btn-inner {
      margin-top: 0;
      .placeholder {
        font-size: $fontSizeS;
        line-height: 20px;
      }
    }
  }
}
</style>


