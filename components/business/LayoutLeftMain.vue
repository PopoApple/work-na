<template>
  <div class="LayoutLeftMain">
    <div class="LayoutLeftMain-left LayoutLeftMain-card">
      <slot name="left" />
    </div>
    <div class="LayoutLeftMain-right LayoutLeftMain-card">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
  .LayoutLeftMain {
    padding: 10px;
    margin-bottom: 87px;
    display: flex;
  }
  .LayoutLeftMain-card {
    box-sizing: border-box;
  }
  .LayoutLeftMain-left {
    width: 220px;
  }
  .LayoutLeftMain-right {
    width: 960px;
    margin-left: 20px;
  }
  .LayoutLeftMain-header {  // 页面头部容器，可放置页面标题、标签按钮
    padding: 0 20px;
  }
  .LayoutLeftMain-body {  // 页面主体内容容器，包含状态栏、列表/表单、分页器/提交按钮
    padding: 0 20px;
  }
  .LayoutLeftMain-statusBar {  // 页面状态栏容器，放置主体内容顶部的切换按钮
    padding: 20px 0;
  }
  .LayoutLeftMain-pagination {  // 分页器容器
    padding: 30px 0;
  }
  .LayoutLeftMain-sectionTitle {  // 内容区块标题
    color: $fontColorDark;
    font-size: $fontSizeL;
    font-weight: bold;
    margin: 25px 0 25px;
  }
  .LayoutLeftMain-btnFooter {  // 提交按钮
    padding: 50px 0;
    text-align: center;
    .el-button {
      height: 48px;
      line-height: 48px;
      min-width: 420px;
      padding: 0;
      font-size: $fontSizeXL;
      border-radius: $borderRadius;
    }
  }
  .LayoutLeftMain-padding-bottom {  // 底部留白，页面底部没有分页器或者提交按钮时，需要加一个留白
    padding-bottom: 50px;
  }

  .RootNotMobile {
    .LayoutLeftMain-card {
      box-shadow: $shadow;
    }
    .LayoutLeftMain-splitLine {  // 分割线
      height: 8px;
      background: $bgColorGrayLight;
      margin-left: -30px;
      margin-right: -30px;
    }
  }

  .RootIsMobile {
    .LayoutLeftMain {
      margin-bottom: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0;
    }
    .LayoutLeftMain-card {
      background: #fff;
    }
    .LayoutLeftMain-left {
      width: 750px;
      padding: 0 0 40px;
    }
    .LayoutLeftMain-right {
      flex: 1;
      width: 750px;
      margin-top: 20px;
      margin-left: 0;
    }
    .LayoutLeftMain-header {
      padding: 0 30px;
    }
    .LayoutLeftMain-body {
      padding: 0 30px;
    }
    .LayoutLeftMain-statusBar {
      padding: 0;
    }
    .LayoutLeftMain-splitLine { 
      height: 20px;
      background: $bgColorGray;
      margin-left: -30px;
      margin-right: -30px;
    }
    .LayoutLeftMain-loadMore {
      
    }
    .LayoutLeftMain-sectionTitle {
       margin: 40px 0 40px;
    }
    .LayoutLeftMain-btnFooter {
      padding: 100px 0;
      .el-button {
        height: 72px;
        line-height: 72px;
        min-width: 420px;
        font-size: $fontSize;
      }
    }
    .LayoutLeftMain-padding-bottom {
      padding-bottom: 100px;
    }
  }
</style>
