<template>
  <div class="box PageJobIndex">
    <div>
      <SearchArea :fields="searchAreaFields" :styleType="2" />
    </div>
    <div class="float-wrap list">
      <div class="left" style="width: 1000px">
        <div>
          <ul class="list-item-wrap">
            <PageJobIndexListItem v-for="item in data.list" :key="item.id" :data="item" />
          </ul>
          <div class="pagination">
            <Pagination :total="data.total" />
          </div>
        </div>
      </div>
      <aside class="right recomend-wrap">
        推荐职位列表
      </aside>
    </div>
  </div>
</template>

<script>
  import { positionDict, salaryDict, welfareDict, areaDict } from './dicts'
  import { apiMockList } from './mock'
  import headMixin from '~/assets/js/headMixin'

  export default {
    mixins: [headMixin],
    props: {
      data: Object,
    },
    computed: {
      searchAreaFields() {
        return [
          { id: 'position', label: '职位分类', dict: positionDict, iconClass: 'iconfont icon-zhiwei' },
          { id: 'salary', label: '薪资水平', dict: salaryDict, type: 'priceRange', iconClass: 'iconfont icon-qiwangxinzi' },
          { id: 'welfare', label: '福利待遇', dict: welfareDict, iconClass: 'iconfont icon-fuli', multiple: true },
          { id: 'area', label: '地区筛选', dict: areaDict, type: 'areaCascader', iconClass: 'iconimg i-diqu' },
        ]
      },
    },
  }
</script>

<style lang="scss">
.PageJobIndex {
  padding-bottom: 87px;
  .shadow-card {
    box-shadow: $shadow;
  }
  .list {
    margin-top: 30px;
  }
  .pagination {
    padding: 30px 0;
    text-align: center;
  }
  .list-item-wrap {
    border: 1px solid $borderColor;
  }
  .recomend-wrap {
    width: 185px; 
    margin-left: 10px; 
    height: 300px;
    border: 1px solid $borderColor;
    box-sizing: border-box;
  }
}
</style>
