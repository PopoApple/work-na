<template>
  <div
    class="TabBtn"
    :class="{'TabBtn-line': styleType === 'line', 'TabBtn-small': size === 'small', 'TabBtn-full': isFull}"
  >
    <div v-if="title" class="TabBtn-item active" style="cursor: default">{{title}}</div>
    <div
      v-else
      class="TabBtn-item TabBtn-btn"
      v-for="item in dict"
      :key="item.value"
      :class="{active: item.value === value}"
      @click="handleClick(item.value)"
    >{{item.label}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      dict: {
        type: Array,
        default: () => {
          return []
        }
      },
      value: String | Number,
      styleType: String,
      isFull: Boolean,
      size: String
    },
    methods: {
      handleClick(e) {
        this.$emit('input', e)
      }
    }
  }
</script>

<style lang="scss">
  .TabBtn {
    overflow: hidden;
    box-sizing: border-box;
    .TabBtn-item {
      float: left;
      height: 32px;
      line-height: 32px;
      padding: 0 23px;
      cursor: pointer;
      border-radius: $borderRadius;
      font-size: $fontSizeL;
      color: $fontColorXLight;
      &.active {
        color: #fff;
        background: $colorGreen;
      }
      margin-right: 15px;
    }
  }
  
  .TabBtn.TabBtn-line {
    height: 50px;
    padding: 0;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 1px;
      background: $borderColor;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .TabBtn-item {
      height: 50px;
      line-height: 52px;
      padding: 0 0;
      font-size: $fontSizeL;
      color: $fontColor;
      border-bottom: 3px solid transparent;
      box-sizing: border-box;
      border-radius: 0;
      position: relative;
      z-index: 1;
      &.active {
        color: $fontColorDark;
        background: transparent;
        font-size: $fontSizeXL;
        border-color: $colorGreen;
        font-weight: bold;
      }
      margin-right: 70px;
    }
  }

  .TabBtn.TabBtn-full {
    display: flex;
    justify-content: space-between;
    .TabBtn-item {
      padding: 0 29px;
      margin-right: 0;
    }
  }

  .RootIsMobile {
    .TabBtn {
      // height: 88px;
      padding: 20px 0;
      .TabBtn-item {
        height: 46px;
        line-height: 46px;
        //padding: 0 16px;
        padding: 0 12px;
        cursor: pointer;
        font-size: $fontSize;
        //margin-right: 10px;
        margin-right: 8px;
      }
    }
    .TabBtn.TabBtn-line {
      height: 90px;
      padding: 0;
      &::before {
        height: 2px;
      }
      .TabBtn-item {
        height: 90px;
        line-height: 96px;
        padding: 0 0;
        font-size: $fontSizeL;
        color: $fontColor;
        border-width: 4px;
        margin-right: 60px;
      }
    }

    .TabBtn.TabBtn-line.TabBtn-small {
      height: 70px;
      .TabBtn-item {
        height: 70px;
        line-height: 70px;
        font-size: $fontSize;
        &.active {
          color: $colorGreen;
          font-size: $fontSize;
          font-weight: normal;
        }
      }
    }
    .TabBtn.TabBtn-full.TabBtn-small {
      display: flex;
      justify-content: space-between;
      .TabBtn-item {
        padding: 0 12px;
        margin-right: 0;
      }
    }
  }
</style>
