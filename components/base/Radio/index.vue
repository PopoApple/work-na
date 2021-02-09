<script>
  import { Radio } from 'element-ui'
  const comp = Radio
  export default comp
</script>

<style lang="scss">
.RootIsMobile {
  .el-radio__inner {
    width: 28px;
    height: 28px;
  }
  .el-radio__inner::after {
    width: 8px;
    height: 8px;
  }
}
</style>