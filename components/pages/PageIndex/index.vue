<template>
  <div class="PageIndex">
    <section class="flex-wrap">
      <IndexCarousel class="carousel" :data="data.carouselList" :height="$isMobile ? '414px' : '480px'" />
      <div class="side-box">
        <User class="user" />
        <HotNews class="hot-news" :data="data.hotNewsList" />
        <PageIndexLastestNotice class="lastest-notice" :data="data.latestNotice" />
      </div>
    </section>
    <section>
      <SectionTitle v-if="!$isMobile" btnRoute="/material">建材信息</SectionTitle>
      <div class="flex-wrap row-wrap">
        <MaterialMenu1 class="material-category" :menuList="$isMobile ? data.productTypeList.slice(0, 10) : data.productTypeList"></MaterialMenu1>
        <PageIndexMaterialList class="material-list" :data="$isMobile ? data.spreadProductList.slice(0, 6) : data.spreadProductList" />
        <PageIndexRecommendMerchant class="recommed-list" :data="$isMobile ? data.recommendMerchantList.slice(0, 6) : data.recommendMerchantList" />
      </div>
    </section>
    <section>
      <SectionTitle v-if="!$isMobile" btnRoute="/zhaocai">招采信息</SectionTitle>
      <div class="flex-wrap row-wrap">
        <PageIndexZhaocaiList class="zhaocai-list" :data="$isMobile ? data.zhaocaiList.slice(0, 3) : data.zhaocaiList.slice(0, 5)" />
        <PageIndexZhaocaiList  class="zhaocai-list" :data="data.zhaocaiList.slice(5, 10)" v-if="!$isMobile" />
      </div>
    </section>
    <section>
      <PageIndexOnePic />
    </section>
    <section>
      <SectionTitle v-if="!$isMobile" :isAlink="true" :btnRoute="conschinaCommunity">建筑社区</SectionTitle>
      <div class="flex-wrap row-wrap">
        <PageIndexShequArticle class="shequArticle-list" :data="data.shequArticleList" />
        <PageIndexShequRules class="shequRules-list" :data="$isMobile ? data.shequRulesList.slice(0, 3) : data.shequRulesList" />
        <PageIndexShequUser class="shequUser-list" :data="$isMobile ? data.shequUserList.slice(0, 5) : data.shequUserList" />
      </div>
    </section> 
  </div>
</template>

<script>
import { getHeaderMsg } from '~/api/material/materialIndex'
import { conschinaCommunity } from '~/assets/js/constants'

export default {
  props: {
    data: Object,
  },
  mounted() {
    // this.$toast.success('操作成功')
    // this.$toast.fail('操作失败')
    //  this.$alert('还没有审核通过，请耐心等待')
    //  this.$confirm('确认要删除这条数据吗？').then(() => {
    //    console.log('点击了确认')
    //  }).catch(() => {
    //    console.log('点击了取消')
    //  })
    // this.$showLoading()
    // setTimeout(this.$hideLoading, 2000)
  },

  data() {
    return {
      conschinaCommunity,
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
    }
  },
}
</script>

<style lang="scss">
.PageIndex {
  padding: 30px 10px 80px;
  .carousel {
    width: 870px;
  }
  .side-box {
    height: 480px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .material-category {
    width: 210px;
  }
  .material-list {
    width: 740px;
  }
  .recommed-list {
    width: 210px;
  }
  .zhaocai-list {
    width: 590px;
  }
  .shequArticle-list {
    width: 440px;
  }
  .shequRules-list {
    width: 440px;
  }
  .shequUser-list {
    width: 280px;
  }
}
@media screen and (max-width: 900px) {
  .PageIndex .lastest-notice {
    display: none !important;
  }
}

.RootNotMobile {
  .PageIndex {
    .material-list {
      margin: 0 20px;
    }
  }
}

/*------------------------- 移动端 -------------------------*/
.RootIsMobile {
  .PageIndex {
    padding: 0 0 80px;
    .flex-wrap {
      flex-wrap: wrap;
    }
    .side-box {
      height: auto;
    }
    .user {
      display: none;
    }
    .lastest-notice {
      display: none;
    }
    .row-wrap {
      flex-wrap: wrap;
    }
    .side-box, .carousel, .material-category, .material-list, .recommed-list, .zhaocai-list, .shequArticle-list, .shequRules-list, .shequUser-list {
      width: 750px;
    }
  }
}
</style>
