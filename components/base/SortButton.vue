<template>
  <div
    class="SortButton"
    :class="{'SortButton-asc': value === 'asc', 'SortButton-desc': value === 'desc'}"
    @click="handleClick"
  >
    <div class="SortButton-text">
      <slot />
    </div>
    <div class="SortButton-icon-wrap">
      <i class="el-icon-caret-top"></i>
      <i class="el-icon-caret-bottom"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: String // null, 'asc', 'desc'
    },
    methods: {
      handleClick() {
        let val = null
        if (this.value === null) {
          val = 'asc'
        } else if (this.value === 'asc') {
          val = 'desc'
        }
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="scss">
.SortButton {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  .SortButton-text {
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .SortButton-icon-wrap {
    position: relative;
    margin-left: 10px;
    display: inline-block;
    vertical-align: middle;
    height: 100%;
    i {
      position: absolute;
      width: 6px;
      height: 4px;
      left: -7px;
      color: $fontColor;
      &.el-icon-caret-top {
        position: absolute;
        top: 4px;
      }
      &.el-icon-caret-bottom {
        position: absolute;
        bottom: 17px;
      }
    }
  }
  &.SortButton-asc {
    i.el-icon-caret-top {
      color: $colorGreen;
    }
  }
  &.SortButton-desc {
    i.el-icon-caret-bottom {
      color: $colorGreen;
    }
  }
}
.RootIsMobile {
  .SortButton {
    .SortButton-icon-wrap {
      i {
        &.el-icon-caret-top {
        top: -4px;
      }
      }

    }
  }
}
</style>
