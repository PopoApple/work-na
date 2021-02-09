<template>
  <div class="SearchInput" :class="{'SearchInput-mini': type === 'mini', 'SearchInput-gray': type === 'mini', 'SearchInput-green': type !== 'mini'}">
    <Input :value="value" placeholder="请输入内容" :prefix-icon="hasBtn ? null : 'el-icon-search'" :size="type === 'mini' ? 'small' : null" @input="e => $emit('input', e)" @keydown.enter.native="handleEnter">
      <Button v-if="hasBtn" slot="append" :icon="type === 'mini' ? 'el-icon-search' : null" @click="handleBtnClick">{{type === 'mini' ? null : '搜索'}}</Button>
    </Input>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    value: String,
    hasBtn: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleBtnClick() {
      this.$emit('search')
    },
    handleEnter() {
      this.$emit('search')
    },
  }
}
</script>

<style lang="scss">
  .SearchInput {
    .el-input-group--append .el-input__inner {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    } 
    .el-input-group__append {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    .el-input-group__append button.el-button {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: #fff;
    }
    &.SearchInput-green {
      .el-input-group--append .el-input__inner {
        border-color: $colorGreen;
      } 
      .el-input-group__append {
        border-color: $colorGreen;
        background-color: $colorGreen;
      }
    }
    &.SearchInput-mini {
      .el-input-group__append {
        width: 25px;
        padding: 7px;
      }
    }
    &.SearchInput-gray {
      .el-input-group__append {
        background-color: #fff;
      }
      .el-icon-search {
        color: $fontColorLight;
      }
      .el-input__inner:focus {
        border-color: $borderColor;
      }
    }
  }

  .RootIsMobile {
    .SearchInput {
      .el-input--prefix .el-input__inner {
        height: 60px;
        line-height: 60px;
        border-radius: 30px;
        border-color: $colorGreen;
        padding-left: 49px;
      }
      .el-input__prefix {
        left: 16px;
      }
      .el-input__icon {
        line-height: 60px;
      }
    }
  }
</style>
