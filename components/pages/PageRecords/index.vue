<template>
  <div class="box">
    <ul class="records-list" v-if="data.list.length > 0">
      <RecordsList
        v-for="(item,index) in data.list"
        :key="index"
        :data="item"
        @delete="handleDelete"
      />
    </ul>
    <div class="empty" v-else>
      <Empty centerMiddle waringText="暂无记录!" />
    </div>
    <div class="pagin" v-if="!$isMobile && totalPage >= 1">
      <Pagination :total="data.total" />
    </div>
    <ScrollBottomLoadMore
      v-if="$isMobile && totalPage > 1"
      :totalpage="data.total"
      :loading="mListLoading"
      :transparentBg="true"
      @update="handleScrollBottomLoadMore"
    />
  </div>
</template>

<script>
  import { apiMyBrowseRecordList, apiDeleteBrowseRecord } from '~/api/record'
  import { validatenull } from '@/utils/validate'
  import { getTotalPage } from '~/utils'
  import headMixin from '~/assets/js/headMixin'

  export default {
    mixins: [headMixin],
    props: {
      data: Object
    },
    data() {
      return {
        mListPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        mListLoading: false
      }
    },
    computed: {
      totalPage() {
        return getTotalPage(this.data.total)
      }
    },
    methods: {
      //删除浏览记录
      handleDelete(id) {
        this.$confirm(`确认要删除这条消息吗？`)
          .then(() => {
            let params = {
              id: id
            }
            this.$showLoading()
            apiDeleteBrowseRecord(this.$axiosClient, params).then(
              res => {
                this.$hideLoading()
                if (res.code === 200) {
                  this.$toast.success('删除成功!')
                  this.handleRefreshList()
                } else {
                  this.$toast.fail(res.msg || '删除失败!')
                }
              },
              e => {
                this.$hideLoading()
                this.$toast.fail(e.message || '删除失败!')
              }
            )
          })
          .catch(() => {})
      },
      handleRefreshList() {
        if (!this.$isMobile && this.$route.query.page > 1) {
          this.$router.push({
            name: this.$route.name,
            query: { ...this.$route.query, page: 1 }
          })
        } else {
          let page = 1
          apiMyBrowseRecordList(this.$axiosClient, { ...this.$route.query, page }).then(
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
      handleScrollBottomLoadMore() {
        if (this.mListLoading || this.mListPage >= this.totalPage) {
          return
        }
        this.mListLoading = true
        let page = this.mListPage + 1
        apiMyBrowseRecordList(this.$axiosClient, { ...this.$route.query, page })
          .then(res => {
            this.mListLoading = false
            if (res.code === 200) {
              this.data.list = [...this.data.list, ...res.data.records]
              this.mListPage = this.mListPage + 1
            }
          })
          .catch(e => {
            this.mListLoading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 110px;
  margin-bottom: 20px;
  box-shadow:$shadow;
  background-color: #ffffff;
  width: 1000px;
  border-radius: $borderRadiusS;
}
.pagin{
  margin-bottom: 10px;
}
.empty{
 position:relative;
 height: 400px;
}
.RootNotMobile {
  .records-list {
    width: 900px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .img {
    display: block;
    background: #ddd;
    width: 160px;
    height: 95px;
    border-radius: $borderRadiusS;
  }
  .history-content, .history-time {
    color: $fontColorXLight;
  }
  .read-detail{
    display: block;
    width: 97px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: $colorGreen;
    background-color: $bgColorGray;
    border-radius: $borderRadiusS;
    &:hover {
      color: $colorWhite;
      background-color: $colorGreen;
    }
  }
}


.RootIsMobile {
  .box {
    width: 100%;
    height: auto;
    margin-left: 0px;
    align-items: center;
  }
  .records-list {
    margin: 20px 0;
    font-size: $fontSizeS;
  }
  img {
    display: block;
    background: #ddd;
    width: 200px;
    height: 150px;
    border-radius: $borderRadius;
  }
  .history-content, .history-time {
    color: $fontColorXLight;
  }
  // 此处布局需要优化
  .ListItemCol {
    justify-content: space-between;
  }
}
</style>
