<template>
  <div class="warp">
    <div class="float-wrap sec">
      <div class="right">
        <section class="left carousel">
          <IndexCarousel :data="data.carouselData" :height="$isMobile ? '414px' : '430px'" :titleWidth="550" />
        </section>
        <aside class="left side">
          <div class="user">
            <User />
          </div>
          <div class="hot-news ">
            <HotNews :data="data.hotNews" />
          </div>
        </aside>
      </div>
      <section class="left menu">
        <MaterialMenu1 title="建材信息" :menuList="$isMobile ? data.menuList.slice(0, 10) : data.menuList"></MaterialMenu1>
      </section>
    </div>
    <section v-for="item in data.navList" class="material-section">
      <template v-if="$isMobile"><materialSectionM :id="item.id" :meterialSection="item.name" :list="item.productList.slice(0,6)" /></template>
      <template v-else><materialSection :id="item.id" :meterialSection="item.name" :navList="item.list.slice(0,4)" :list="item.productList" /></template>
    </section>
    <div class="loadMore" v-if="totalPage > 1" >
      <ScrollBottomLoadMore class="loadMore" :totalpage="totalPage" :loading="mListLoading" :transparentBg="true" @update="handleScrollBottomLoadMore" />
    </div>
  </div>
</template>

<script>
import materialSection from './materialSection'
import materialSectionM from './materialSectionM.vue'
import { getHeaderMsg, getProductList } from '~/api/material/materialIndex'
import { getTotalPage } from '~/utils'
import headMixin from '~/assets/js/headMixin'


export default {
  mixins: [headMixin],
  components: {
    materialSection,
    materialSectionM
  },
  props: {
    data: Object,
  },
  data() {
    return { 
      // 左侧导航栏数据
      menuList: [
        // { id:1, icon: "icon-tujian", name: "建筑材料" },
        // { id:2, icon: "icon-jiancaibancai", name: "常用建材" },
        // { id:3, icon: "icon-leijinshucailiaox", name: "钢铝材料" },
        // { id:4, icon: "icon-shimudiban", name: "装修材料" },
        // { id:5, icon: "icon-wujin", name: "五金、涂料" },
        // { id:6, icon: "icon-jiaju", name: "家具电器" },
        // { id:7, icon: "icon-jiajujiafang", name: "家居家纺" },
        // { id:8, icon: "icon-machine", name: "机械、安防" },
        // { id:9, icon: "icon-dianqi", name: "电气、防水" },
        // { id:10, icon: "icon-tuxing", name: "楼梯、电梯" },
        // { id:11, icon: "icon-other", name: "其他" },
        // { id:12, icon: "icon-machine", name: "其他2" },
        // { id:13, icon: "icon-dianqi", name: "其他3" },
        // { id:14, icon: "icon-tuxing", name: "其他4" },
      ],
      mListPage: 1,
      mListLoading: false,
    }
  },
  computed: {
    totalPage() {
      return !!this.data.total ? Math.ceil(this.data.total / 5) : 0
    }
  },

  methods: {
    // 无限下拉
    handleScrollBottomLoadMore() {
    if (this.mListLoading || this.mListPage >= this.totalPage) {
        return
      }
    this.mListLoading = true
    let page = this.mListPage + 1
    getProductList(this.$axiosClient, page, 5)
      .then(
        res => {
          this.mListLoading = false
          if (res.code === 200) {
            let addList = this.handleSectionData(res)
            this.data.navList = [...this.data.navList, ...addList]
            this.mListPage = this.mListPage + 1
          }
        },
        e => {
          this.mListLoading = false
        }
      )
      .catch(e => {
        this.mListLoading = false
      })
    },
    // 处理客户到请求的数据
    handleSectionData(resB) {
      // 将resB中提取id，name，children，并将键名children改为list。
      let sectionList = resB.data.records.map((sec) => {
        let newList = sec.productTypeTreeDto.children.map((current) => {
          let childrenList = []
          // 共三层，如果没有第三层数据，第二层没有children属性，需判断
          if(current.hasOwnProperty('children')) {
            childrenList = current.children.map((current) => {
              return { id: current.id, name: current.productTypeName }
            })
          }
          return { id: current.id, name: current.productTypeName, list: childrenList }
        })
        // productList中键值对，通过组件中通过别名的方式来使用
        let productList = sec.spreadProductDtoList
        return { id: sec.productTypeTreeDto.id, name: sec.productTypeTreeDto.productTypeName, list: newList, productList: productList}
      })
      return sectionList
    }
  }
}
</script>

<style lang="scss" scoped>
// 由于该页面是通过元素的前后顺序和浮动实现，实现pc端和移动端不同的显示效果，所以对right类重新定义，覆盖全局定义
.right {
  float: right;
  text-align: left;
}
.warp {
  padding: 0 10px;
}
.sec {
  margin-top: 20px;
  // 考虑到版面和版心使用都是白色，没有层次感，考虑使用阴影,
  // box-shadow: 1px 1px 5px 0px rgba(71, 79, 84, 0.14);
}
.menu {
  width: 210px;
  height: 462px;
  background-color: $bgColorGray;
}
.carousel {
  width: 650px;
  height: 430px;
  margin: 30px 20px 0;  
}
.side {
  width: 300px;
  height: 460px;
}
.user {
  height: 150px;
}
.hot-news {
  height: 300px;
  margin-top: 10px;
  padding-top: 10px;
  // box-shadow: 1px 1px 5px 0px rgba(71, 79, 84, 1);
  background: $bgColorGray;
  border-radius: $borderRadius;
}
.material-section {
  width: 100%;
  height: 620px;
}




.RootIsMobile {
  .warp {
    padding: 0;
  }
  .menu { 
    width: 100%;
    height: 436px;
  }
  .carousel {
    width: 100vw;
    height: auto;
    margin: 30px 0 0;
  }
  .user {
    display:none;
  }
  .side {
    width: 100vw;
    height: 85px;
    margin-bottom: 30px;
  }
  .material-section {
    width: 100%;
    height: auto;
  }
}
</style>
