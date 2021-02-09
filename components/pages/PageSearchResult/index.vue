<template>
  <div class="PageSearchResult">
    <div class="bar">
      <TabBtn :dict="typeDict" :isFull="true" :styleType="$isMobile ? 'line' : ''" :size="$isMobile ? 'small' : ''" :value="type" @input="handleTypeChange" />
    </div>
    <ul class="list" :class="{'list-type-1': type === 1}" v-if="data.list.length > 0">
      <template v-for="item in data.list">
        <PageSearchResultListItem1 v-if="type === 1 || (!type && item.type === 1)" :key="item.id" :data="item" :isAll="!type" />
        <PageSearchResultListItem5 v-if="type === 5 || (!type && item.type === 5)" :key="item.id" :data="item" :isAll="!type" />
        <PageSearchResultListItem8 v-if="type === 8 || (!type && item.type === 8)" :key="item.id" :data="item" :isAll="!type" />
      </template>
    </ul>
    <Empty v-else centerMiddle />
    <div v-if="!$isMobile" class="pagination">
      <Pagination v-if="totalPage > 1" :total="data.total" align="right"/>
    </div>
    <div class="loadMore" v-if="$isMobile && totalPage > 1" >
      <ScrollBottomLoadMore :totalpage="data.total" :loading="mListLoading" :transparentBg="true" @update="handleScrollBottomLoadMore" />
    </div>
  </div>
</template>

<script>
import { apiMockList } from './mock'
import { apiSearch } from '~/api/indexPage'
import headMixin from '~/assets/js/headMixin'

export default {
  mixins: [headMixin],
  props: {
    data: Object,
  },
  data() {
    return {
      //商品：1  需求：2  提供：3  职位：4  招采：5  新闻资讯：6  建筑社区：8
      typeDict: [
        { value: 0, label: '全部' },
        { value: 1, label: '建材' },
        { value: 5, label: '招采' },
        { value: 8, label: '社区' },
        // { value: '4', label: '需求' },
        // { value: '5', label: '提供' },
        // { value: '6', label: '工作' },
      ],
      mListPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      mListLoading: false,
    }
  },
  computed: {
    type() {
      return parseInt(this.$route.query['type'] || this.typeDict[0].value)
    },
    totalPage() {
      return this.$getTotalPage(this.data.total)
    },
  },
  methods: {
    handleTypeChange(e) {
      this.$router.push({ name: this.$route.name, query: { type: e || undefined, keyword: this.$route.query.keyword } })
    },
    handleScrollBottomLoadMore() {
      if (this.mListLoading || this.mListPage >= this.totalPage) {
        return
      } 
      this.mListLoading = true
      let page = this.mListPage + 1
      apiSearch(this.$axiosClient, { type: this.$route.query.type, keyword: this.$route.query.keyword, page }).then(res => {
        this.mListLoading = false
        if (res.code === 200) {
          this.data.list = [...this.data.list, ...res.data.list]
          this.mListPage = this.mListPage + 1
        } else {
          this.$toast.fail('数据加载失败')
        }
      }).catch(e => {
        this.mListLoading = false
        this.$toast.fail('数据加载失败')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.PageSearchResult {
  flex: 1;
  padding: 0 0 0 20px;
  .list {
    margin-top: 20px;
  }
  .pagination {
    padding: 30px 20px 30px 0;
  }
}

.RootNotMobile {
  .PageSearchResult {
    .bar {
      box-shadow: $shadowLight;
      padding: 6px 60px;
    }
    .list.list-type-1 {
      border: 1px solid $borderColorLight;
      border-radius: $borderRadius;
      border-bottom: 0;
    }
  }
}

.RootIsMobile {
  .PageSearchResult {
    background: #fff;
    padding: 20px 30px 40px;
    .loadMore {
      margin-top: 30px;
    }
  }
}
</style>
