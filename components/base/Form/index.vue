<script>
  import { Form } from 'element-ui'
  const comp = Form
  export default comp
</script>

<style lang="scss">
.Form-view {
  .el-form-item__label {
    font-weight: normal;
    color: $fontColorXLight;
    font-size: $fontSizeL;
    &::after {
      content: '：',
    }
  }
  .el-form-item__content {
    color: $fontColorDark;
    font-size: $fontSizeL;
  }
  .el-form-item--mini.el-form-item {
    margin-bottom: 0;
    .el-form-item__label, .el-form-item__content {
      font-size: $fontSize;
    }
  }
}

.Form-view.Form-view-medium {
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item__label {
    font-size: $fontSize;
  }
  .el-form-item__content {
    font-size: $fontSize;
  }
}

.RootNotMobile {
  .el-form {
    margin-bottom: -24px;
  }
  .Form-view {
    font-weight: bold;
  }
}

.RootIsMobile {
  .el-form {
    margin-bottom: -36px;
  }
  .Form-view {
    .el-form-item__label {
      font-size: $fontSize;
    }
    .el-form-item__content {
      font-size: $fontSize;
    }
  }
}
</style>
