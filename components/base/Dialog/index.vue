<template>
  <el-dialog
    :title="title"
    :visible="true"
    :close-on-click-modal="false"
    :append-to-body="appendToBody"
    @close="$emit('close')"
    :custom-class="customClass"
    :top="top || '15vh'"
  >
    <!-- <div class="content"> -->
      <!-- <spinner-loading v-if="loading"/> -->
      <slot />
      <div v-if="!simple" slot="footer" class="Dialog-footer">
        <slot name="footer-content" />
        <template v-if="!$slots['footer-content']">
          <Button v-if="showConfirmBtn" type="primary" size="medium" @click="$emit('confirm')">{{confirmBtnText}}</Button>
          <Button v-if="showCancelBtn" size="medium" @click="$emit('close')">{{cancelBtnText}}</Button>
        </template>
      </div>
    <!-- </div> -->
  </el-dialog>
</template>

<script>
  //import SpinnerLoading from '@/components/SpinnerLoading'
import { Dialog } from "element-ui"

  export default {
    name: 'Dialog',
    props: {
      title: {
        type: String,
      },
      size: {
        type: String,
        default: 'middle',
      },
      top: String,
      // width: {
      //   type: String,
      //   default: '568px',
      // },
      showConfirmBtn: {
        type: Boolean,
        default: true,
      },
      confirmBtnText: {
        type: String,
        default: '确认'
      },
      showCancelBtn: {
        type: Boolean,
        default: true,
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      appendToBody: {
        type: Boolean,
        default: false,
      },
      //loading: Boolean,
      simple: Boolean,
    },
    components: {
      //SpinnerLoading,
      ElDialog: Dialog,
    },
    computed: {
      customClass() {
        let cls = ['Dialog']
        if (!this.$isMobile) {
          cls.push(`Dialog-${this.size}`)
        }
        if (!this.simple) {
          cls.push(`Dialog-normal`)
        }
        return cls.join(' ')
      }
    },
  }
</script>

<style lang="scss">
/* .content {
  position: relative;
} */
.Dialog {
  .el-dialog__headerbtn {
    font-size: 20px;
  }
}
.Dialog.Dialog-normal {
  &.el-dialog {
    border-radius: 6px;
    width: 600px;
  }
  .el-dialog__header {
    height: 75px;
    border-bottom: 1px solid $borderColorLight;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .el-dialog__title {
    line-height: 75px;
    font-size: 20px;
    color: $fontColor;
    font-weight: bold;
  }
  .el-dialog__headerbtn {
    top: 25px;
    right: 20px;
  }
  .el-dialog__body {
    padding: 35px 50px 35px 30px;
    color: $fontColor;
    font-size: $fontSize;
  }
  .el-dialog__footer {
    padding: 38px 20px;
    padding-top: 0;
    text-align: center;
    box-sizing: border-box;
    .el-button {
      min-width: 160px;
      // padding: 0;
      // height: 36px;
      // line-height: 36px;
    }
    .el-button + .el-button {
      margin-left: 60px;
    }
  }
  
  &.Dialog-small {
    &.el-dialog {
      width: 400px;
    }
    .el-dialog__header {
      height: 60px;
    }
    .el-dialog__title {
      line-height: 60px;
    }
    .el-dialog__headerbtn {
      top: 20px;
    }
    // .el-dialog__body {
    //   padding: 30px 20px;
    //   color: $fontColor;
    //   font-size: $fontSize;
    // }
    .el-dialog__footer {
      padding: 25px 20px;
      padding-top: 0;
      // .el-button {
      //   min-width: 160px;
      //   padding: 0;
      //   height: 36px;
      //   line-height: 36px;
      // }
      .el-button + .el-button {
        margin-left: 20px;
      }
    }
  }
}

.RootIsMobile .Dialog {
  &.el-dialog {
    width: 710px;
  }
  .el-dialog__header {
    height: 100px;
    padding: 0 30px;
  }
  .el-dialog__title {
    line-height: 100px;
  }
  .el-dialog__headerbtn {
    right: 10px;
    font-size: 24px;
  }
  .el-dialog__body {
    padding: 70px 20px 35px 10px;
  }
  .el-dialog__footer {
    padding: 40px 30px;
    padding-top: 0;
    .el-button {
      min-width: 260px;
      // padding: 0;
      // height: 72px;
      // line-height: 72px;
    }
    .el-button + .el-button {
      margin-left: 48px;
    }
  }
}

</style>


