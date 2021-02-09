<script>
  import { FormItem } from 'element-ui'
  const comp = FormItem
  export default comp
</script>

<style lang="scss">
// .el-form-item {
//   margin-bottom: 20px;
// }
// .el-form-item--mini.el-form-item {
//   margin-bottom: 20px;
// }

.RootNotMobile {
  .el-form-item__label {
    font-weight: bold;
    padding: 0 20px 0 0;
  }
}

.RootIsMobile {
  .el-form-item {
    margin-bottom: 36px;
  }
  .el-form-item__error {
    padding-top: 6px;
  }
  .el-form-item__label {
    padding: 0 30px 0 0;
    color: $fontColorDark;
  }
  .el-form-item--medium .el-form-item__label {
    line-height: 72px;
  }
  .el-form-item--medium .el-form-item__content {
    line-height: 72px;
  }
  .el-form-item--mini .el-form-item__label {
    line-height: 44px;
  }
  .el-form-item--mini .el-form-item__content {
    line-height: 44px;
  }
}
</style>
