<script>
  import { Checkbox } from 'element-ui'
  const comp = Checkbox
  export default comp
</script>

<style lang="scss">
// .RootIsMobile {
//   .el-input--medium .el-input__inner {
//     height: 72px;
//     line-height: 72px;
//   }
// }
</style>

<style lang="scss">
.RootNotMobile, .RootIsMobile {
  .el-checkbox__label {
    font-size: $fontSize;
  }
  .el-checkbox__inner {
    width: 14PX;
    height: 14PX;
    border-radius: $borderRadiusXS;
  }
  .el-checkbox__inner::after {
    top: 1PX;
    width: 3PX;
    height: 7PX;
    left: 4PX;
  }
}

.RootIsMobile {
  .el-checkbox__inner {
    border-radius: $borderRadiusS;
  }
  .el-checkbox__inner::after {
    top: 0;
    width: 5PX;
    height: 8PX;
    left: 3PX;
  }
}
</style>