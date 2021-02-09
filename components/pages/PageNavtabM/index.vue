<template>
  <div class="tab-content">
    <div class="top">全部分类</div>
    <van-sidebar v-model="activeKey" class="left" >
      <van-sidebar-item v-for="item in data.tabList" :title="item.name" :key="item.name"/>
    </van-sidebar>
    <div class="mian">
      <div v-for="panel in expandList" :key="panel.id" class="expand-list">
        <h5><nuxt-link :to="'/material/goods?productTypeId=' + panel.id">{{panel.productTypeName}}</nuxt-link></h5>
        <van-grid :column-num="3" :gutter="10" :border="false">
          <van-grid-item v-for="item in panel.children" :key="item.id"  :text="item.productTypeName" :to="'/material/goods?productTypeId=' + item.id"/>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, SidebarItem, Grid, GridItem } from 'vant';

export default {
  components: {
    VanSidebar: Sidebar,
    VanSidebarItem: SidebarItem,
    VanGrid: Grid,
    VanGridItem: GridItem
  },
  props: {
    data: Object
  },
  data() {
    return {
      activeKey: 0,
      tabList: [
        // {id:1, name: '建筑材料' },
        // {id:2, name: '常用建材' },
        // {id:3, name: '钢铝材料' },
        // {id:4, name: '装修材料' },
        // {id:5, name: '五金、涂料' },
        // {id:6, name: '家具家电' },
        // {id:7, name: '家具家纺' },
        // {id:8, name: '机械、安防' },
        // {id:9, name: '电气、防水' },
        // {id:10, name: '楼梯、电梯' },
        // {id:11, name: '其他' }
      ],
      // expandList: [
      //   {id:100, name: '砖头', list: [{id: 101, name:'红砖'},{id: 102, name:'百砖'}, {id: 104, name:'3砖'}, {id: 103, name:'5百砖'},{id: 106, name:'6百砖'}] }
      // ]
    }
  },
  computed: {
    expandList() {
      return this.data.tabList[this.activeKey].expand
    }
  }
}
</script>

<style lang="scss" >

  .tab-content {
    // 暂时留着，稳定运行之后可以删除，之前因为没有滚动效果，但是现在好像去掉也可以。
    // overflow: hidden;
    // position: absolute;
    // top: 0;
    // bottom: 0;
    .top {
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 18PX;
    }
  }
  .van-sidebar {
    overflow-y: auto;
    overflow-x: hidden;
    width: 23vw;
    height: calc(100vh - 82px);
    .van-sidebar-item {
      height: 120px;
      text-align: center;
      .van-sidebar-item__text {
        line-height: 80px;
        font-size: 14PX;
      }
    }
    .van-sidebar-item--select {
      &:before {
        height: 48px;
        background-color: $colorGreen;
      }
      .van-sidebar-item__text {
        color: $colorGreen;
      }
    }
  }

  .mian {
    float: left;
    overflow:auto;
    width: 77vw;
    height: calc(100vh - 82px);
    background-color: $colorWhite;
    h5 {
      height: 50px;
      margin: 10px 30px 5px;
      line-height: 50px;
      font-size: $fontSize;
      font-weight: bold;
      a {
        display: inline-block;
        &::after {
          content: '';
          display: block;
          width: 120%;
          height: 2px;
          background-color: $colorGreen;
        }
      }
    }
    .van-grid {
      height: 100%;
      .van-grid-item {
        margin: 0 !important;
      }
      .van-grid-item__text {
        white-space: nowrap;
      }
    }
  }
</style>