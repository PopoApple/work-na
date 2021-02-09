<template>
  <div class="PageUserCenterMyCollection" :class="{ 'LayoutLeftMain-padding-bottom': totalPage <= 1 }">
    <div class="LayoutLeftMain-header">
      <TabBtn title="我的收藏" styleType="line" />
    </div>
    <div class="LayoutLeftMain-body">
      <div class="LayoutLeftMain-statusBar">
        <TabBtn :dict="typeDict" :value="type" @input="handleTypeChange" />
        <div class="batched-delete" >
          <Button v-if="!allow" @click="allowedDelete" type="primary" icon="el-icon-edit" size="mini"></Button>
          <Button v-if="allow"  @click="deleteCollecion" type="danger" icon="el-icon-delete" size="mini"></Button>
          <Button v-if="allow" @click="allowedDelete" type="info" icon="el-icon-circle-close" size="mini"></Button>
        </div>
      </div>
      <ul v-if="data.list.length > 0">
        <component :is="listItemComp" v-for="item in data.list" :key="item.id" :data="item" :allow="allow" @delectchecked="handleDeleteArray($event)" />
      </ul>
      <div class="empty" v-else>
        <Empty centerMiddle waringText="暂无数据!" />
      </div>
      <div v-if="!$isMobile && totalPage > 1" class="LayoutLeftMain-pagination">
      <!-- <div class="LayoutLeftMain-pagination"> -->
        <Pagination :total="data.total" align="right"/>
      </div>
      <div class="LayoutLeftMain-loadMore" v-if="$isMobile && totalPage > 1" >
        <ScrollBottomLoadMore class="loadMore" :totalpage="totalPage" :loading="mListLoading" :transparentBg="true" @update="handleScrollBottomLoadMore" />
      </div>
    </div>
  </div>
</template>

<script>
import styles from '~/assets/style/vars.scss'
import { getCollectionList, postDeleteArray } from '~/api/userCenter/collection'
import { apiMockList } from './mock'
import { getTotalPage } from '~/utils'
import ListItem1 from './ListItem1'
import ListItem2 from './ListItem2'
import ListItem4 from './ListItem4'
import ListItem5 from './ListItem5'
import headMixin from '~/assets/js/headMixin'

export default {
  mixins: [headMixin],
  props: {
    data: Object,
  },
  data() {
    return {
      typeDict: [
        { value: '1', label: '商品' },
        { value: '2', label: '需求' },
        { value: '3', label: '供应' },
        { value: '4', label: '职位' },
        { value: '5', label: '招采' },
      ],
      mListPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      mListLoading: false,
      allow: false,
      // 选中的需要删除的数组，{id， delete: false/ture }
      deleteArray: []
    }
  },
  computed: {
    listItemComp() {
      switch(this.type) {
        case '1': {
          return ListItem1
        }
        case '2':
        case '3': {
          return ListItem2
        }
        case '4': {
          return ListItem4
        }
        case '5': {
          return ListItem5
        }
      }
    },
    type() {
      return this.$route.query['type'] || this.typeDict[0].value
    },
    totalPage() {
      return getTotalPage(this.data.total)
    },
  },
  methods: {
    refreshList() {
      // 重置时也要清空该数组
      this.deleteArray =[]
      let query = this.$route.query
        // 删除回到第一页，如果在第一页就需要重新获取获取数据
      if (query.page && query.page !== '1') {
        this.$router.push({ name: this.$route.name, query: { ...query, page: undefined } })
        this.$hideLoading()
        return
      } else {
         getCollectionList( this.$axiosClient, this.type , this.mListPage ).then( res => {
          if (res.code === 200) {
            this.data.list = res.data.records
            this.data.total = res.data.total
          }
        })
      }
    },
    handleTypeChange(e) {
      this.deleteArray = []
      this.allow = false
      this.$router.push({ name: this.$route.name, query: { type: e } })
    },
    // 手机端无限下拉
    handleScrollBottomLoadMore() {
      if (this.mListLoading || this.mListPage >= this.totalPage) {
          return
        }
      this.mListLoading = true
      let page = this.mListPage + 1
      getCollectionList(this.$axiosClient, this.type , page)
        .then(
          res => {
            this.mListLoading = false
            if (res.code === 200) {
              this.data.list = [...this.data.list, ...res.data.records]
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
    // 是否允许删除，切换按钮
    allowedDelete() {
      this.allow = this.allow === true ? false : true
    },
    // 生成需要删除的数组
    handleDeleteArray(state) {
      for ( let i = 0; i < this.deleteArray.length; i++ ) {
        if ( this.deleteArray[i].id === state.id ) {
          this.deleteArray[i].delete = state.delete
          return 
        }
      }
      this.deleteArray.push(state)
    },
    // 发送删除收藏的请求
    deleteCollecion() {
      this.$confirm('确认要取消收藏吗？').then(() => {
        let arr = this.deleteArray.filter(arr => arr.delete === true).map(current => current.id)
        postDeleteArray(this.$axiosClient, arr).then(res => {
          if(res.code === 200) {
            this.refreshList()
            this.allow = false
            this.$toast.success('取消收藏成功！')
          }
        })
      }).catch((e) => {
        // console.log(e)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .empty {
    position:relative;
    height: 400px;
  }
  .LayoutLeftMain-statusBar {
    position: relative;
  }
  .batched-delete {
    position: absolute;
    top: 20px;
    right: 20px;
    line-height: 32px;
    cursor: pointer;
     // 添加文字不可被选中
    -moz-user-select:none;		/* 火狐 */
    -webkit-user-select:none;	/* 谷歌 */
    -ms-user-select:none;		/* IE */
    user-select:none;
  }
</style>