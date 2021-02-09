<script>
  import { Step } from 'element-ui'
  const comp = Step
  export default comp
</script>

<style lang="scss">
.RootNotMobile, .RootIsMobile {
  .el-step__icon {
    width: 56PX;
    height: 56PX;
  }
  .el-step.is-horizontal .el-step__line {
    top: 25PX;
  }
  .el-step__icon.is-text {
    border: none;
  }
  .el-step__line-inner {
    height: 5px;
    background: #00A64A;
  }
  .el-step.is-horizontal .el-step__line {
    height: 5px;
    background-color: $bgColorGrayLight;
  }
  .el-step__title.is-finish {
    color: $fontColor;
  }
  .el-step__title.is-process {
    color: $fontColorXLight;
    font-weight: normal;
  }
}

.RootNotMobile {
  .el-step__title {
    font-size: $fontSize;
  }
}

.RootIsMobile {
  .el-step__title {
    font-size: $fontSizeS;
  }
}
</style>
