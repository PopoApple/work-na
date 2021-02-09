<template>
  <Card class="MaterialMenu" title="建材信息" :showTitle="$isMobile" :type="$isMobile ? null : 'well'" btnRoute="/navtab" contentNoPadding>
    <div class="menu-container" @mouseleave="hiddenFloatBox">
      <ul>
        <li v-for="item in menuList" :key="item.id" @mouseover="showFloatBox(item)" :class=" !isDisplay ? '' :isActive === item.id ? 'li-active' : 'li-not-active'">
          <nuxt-link :to="'/material/goods/?productTypeId=' + item.id" class="menu-item">
            <img class="menu-icon menu-icon-img" :src="item.icon + FENLEI " v-if="!!item.icon" />
            <i :class="['menu-icon', 'iconfont', 'icon-other']" v-else></i>
            <span>{{item.name}}</span><i class="el-icon-arrow-right hide-xs"></i>
          </nuxt-link>
        </li>
      </ul>
      <div :class="{'material-float': true, 'is-display': isDisplay }" :key="refresh">
        <div v-for="panel in expandList" :key="panel.id" class="meterial-panel">
          <h5><nuxt-link :to="'/material/goods/?productTypeId=' + panel.id" :key="panel.id">{{panel.productTypeName}}</nuxt-link></h5>
          <p><nuxt-link v-for=" item in panel.children" :key="item.id" :to="'/material/goods/?productTypeId=' + item.id" >{{item.productTypeName}}</nuxt-link></p>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { FENLEI } from '~/assets/js/constants'
export default {
  name:'MaterialMenu1',
  props: {
    title: String,
    menuList: Array,
  },
  data() {
    return {
      // 控制导航栏展开
      isDisplay: false,
      // 用来存放选中li的右侧扩展栏的数据
      expandList: [],
      // 被选中的li的id，
      isActive: 0,
      // 为拓展栏添加key，避免外层div复用。使用原因：当拓展栏内容比较多，就会出现滚动条，但是切换li使得内容发生变换，滚动条不会回到顶部。
      refresh: 0
    }
  },
  computed: {
    FENLEI() {
      return FENLEI
    }
  },
  methods: {
    hiddenFloatBox() {
      this.isDisplay = false
      this.isActive = 0
    },
    showFloatBox(item) {
      if(!this.$isMobile) {
        this.isDisplay = true
        this.isActive = item.id
        this.expandList =  item.expand
      }
    }
  },
  watch: {
    expandList: {
      handler() {
        ++this.refresh
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.RootNotMobile {
  .MaterialMenu {
    height: 100%;
    /deep/ .Card-content {
      height: 100%;
    }
  }
  .menu-container {
    // height: 100%;
    height:462px;
    position: relative;
    border-radius: $borderRadius;
    background: $bgColorGray;
    padding-bottom: 10px;
  }
  ul {
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none; // 谷歌隐藏滚动条
    }
    scrollbar-width: none; // 火狐滚动条
    li {
      position: relative;
      height: 40px;
      border: 1px solid transparent;
      border-radius: $borderRadiusS 0 0 $borderRadiusS;
      line-height: 42px;
      font-weight: 500;
      .el-icon-arrow-right {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        font-weight: bold;
      }
      .menu-icon {
        margin: 0 10px;
      }
      .menu-icon-img {
        display: inline-block;
        width: 18px;
        height: 18px;
        position: relative;
        top: 4px;
      }
    }
  }
  .material-float {
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 210px;
    z-index: 22;
    display: none;
    width: 650px;
    height: 448px;
    padding: 10px 12px 0 18px;
    border: 1px solid rgba($color: $colorGreen, $alpha: 0.3);
    border-left: none;
    border-radius: 0 $borderRadiusS $borderRadiusS 0;
    background-color: $bgColorGray;
    &:hover {
      display: block;
    }
    h5 {
      margin: 20px 0 0;
      height: 34px;
      line-height: 34px;
      font-size: $fontSizeL;
      font-weight: bold;
      color: $fontColor;
    }
    p {
      margin: 0;
      a {
        display: inline-block;
        margin-right: 10px;
        line-height: 24px;
      }
    }
  }
  // 控制导航栏内容是否展开
  .is-display {
    display: block;
  }
  // 选中li的的状态
  .li-active {
    border-top: 1px solid rgba($color: $colorGreen, $alpha: 0.3);
    border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-bottom: 1px solid rgba($color: $colorGreen, $alpha: 0.3);
    border-left: 1px solid rgba($color: $colorGreen, $alpha: 0.3);
    background-color: rgba(255, 255, 255, 0.1);
    color: $colorGreen;
    // transition: border 1s;
    .iconfont {
      color: $colorGreen;
    }
  }
  // 没有li的状态
  .li-not-active {
     border-right: 1px solid rgba($color: $colorGreen, $alpha: 0.3);
  }
}

.RootIsMobile {
  .menu-container {
    padding: 0;
    background: $colorWhite;
    overflow: hidden;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      // flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 20%;
      height: 50%;
      margin-top: 30px;
      color: $fontColorXLight;
      .menu-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .menu-icon {
          font-size: 18PX;
        }
        .menu-icon-img {
          width: 36px;
          height: 36px;
          margin: 8px 0;
        }
        span {
          line-height: 60px;
        }
      }
    }
  }
  .material-float {
    display: none;
  }
}
</style>
