<template>
  <div class="PageUserCenterMyComment" :class="{ 'LayoutLeftMain-padding-bottom': totalPage <= 1 }">
    <div class="LayoutLeftMain-header">
      <TabBtn title="我的评论" styleType="line" />
    </div>
    <div class="LayoutLeftMain-body">
      <div class="LayoutLeftMain-statusBar">
        <TabBtn :dict="statusDict" :value="status" @input="handleStatusChange" />
      </div>
      <ul class="right-content" v-if="data.list.length > 0">
        <PageUserCenterMyCommentListItem
          v-for="item in data.list"
          :key="item.id"
          :data="item"
          :statusDict="statusDict"
          @handleRefreshList="handleRefreshList"
          @view="handleView"
          @close="handleClose"
        />
      </ul>
      <div class="empty" v-else>
        <Empty centerMiddle waringText="暂无数据!" />
      </div>
      <div v-if="!$isMobile && totalPage > 1" class="LayoutLeftMain-pagination">
        <Pagination :total="data.total" align="right" />
      </div>
      <div class="LayoutLeftMain-loadMore" v-if="$isMobile && totalPage > 1">
        <ScrollBottomLoadMore
          :totalpage="data.total"
          :loading="mListLoading"
          :transparentBg="true"
          @update="handleScrollBottomLoadMore"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import styles from '~/assets/style/vars.scss'
  import { apiMyCommentsList, apiCloseComments } from '~/api/comments'
  import { getTotalPage, loadDict } from '~/utils'
  import headMixin from '~/assets/js/headMixin'
  import { validatenull } from '@/utils/validate'
  export default {
    mixins: [headMixin],
    props: {
      data: Object
    },
    created() {
      loadDict(this.$axiosClient, 'comment_status ').then(
        res => {
          if (!validatenull(res)) {
            let dict = res.map(v => {
              let color = ''
              switch (parseInt(v.value)) {
                case 1:
                  color = styles.colorBlue
                  break
                case 2:
                  color = styles.colorGreen
                  break
                case 3:
                  color = styles.colorRed
                  break
                case 6:
                  color = styles.fontColorXLight
                  break
              }
              return {
                value: v.value ? parseInt(v.value) : null,
                label: v.label,
                color: color
              }
            })
            let dictAll = { value: '', label: '全部' }
            dict.unshift(dictAll)
            this.statusDict = dict
          }
        },
        e => {}
      )
    },
    data() {
      return {
        statusDict: [
          { value: '', label: '全部' },
          { value: 1, label: '审核中', color: styles.colorBlue },
          { value: 2, label: '已通过', color: styles.colorGreen },
          { value: 3, label: '未通过', color: styles.colorRed },
          { value: 6, label: '已关闭', color: styles.fontColorXLight }
        ],
        mListPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        mListLoading: false
      }
    },
    computed: {
      status() {
        return parseInt(this.$route.query['status']) || ''
      },
      totalPage() {
        return getTotalPage(this.data.total)
      }
    },
    methods: {
      handleStatusChange(e) {
        this.$router.push({
          name: this.$route.name,
          query: { type: this.$route.query.type, status: e }
        })
      },
      handleScrollBottomLoadMore() {
        if (this.mListLoading || this.mListPage >= this.totalPage) {
          return
        }
        this.mListLoading = true
        let page = this.mListPage + 1
        apiMyCommentsList(this.$axiosClient, { ...this.$route.query, page })
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
      handleRefreshList() {
        if (!this.$isMobile && this.$route.query.page > 1) {
          this.$router.push({
            name: this.$route.name,
            query: { ...this.$route.query, page: 1 }
          })
        } else {
          let page = 1
          apiMyCommentsList(this.$axiosClient, { ...this.$route.query, page }).then(
            res => {
              if (res.code === 200) {
                this.data.list = [...res.data.records]
                this.mListPage = 1
              }
            },
            e => {}
          )
        }
      },
      handleView(type, id) {
        // 起源类型 1商品评论 2需求评论 3提供评论 4职位
        if (type === 1) {
          this.$router.push({
            name: 'material-goods-goodsDetail-id-comments',
            params: { id: id }
          })
        }
      },
      handleClose(id) {
        this.$confirm('确认要关闭该评论吗？').then(() => {
          let params = {
            id: id
          }
          this.$showLoading()
          apiCloseComments(this.$axiosClient, params).then(
            res => {
              this.$hideLoading()
              if (res.code === 200) {
                this.$toast.success('关闭成功!')
                this.handleRefreshList()
              } else {
                this.$toast.fail(res.msg || '关闭失败!')
              }
            },
            e => {
              this.$hideLoading()
              this.$toast.fail(e.message || '关闭失败!')
            }
          )
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .right-content {
      min-height: 400px;
    }
  .empty{
      position:relative;
      height: 400px;
    }  
</style>
