<script>
  import { Badge } from 'element-ui'
  const comp = Badge
  export default comp
</script>

<style lang="scss" scoped>
.el-badge__content.is-dot {
  height: 5PX;
  width: 5PX;
}
.RootIsMobile {
  .el-badge__content {
    height: 24px;
    line-height: 24px;
    border-radius: 12px;
    &.el-badge__content.is-dot {
      height: 5PX;
    }
  }
}
</style>