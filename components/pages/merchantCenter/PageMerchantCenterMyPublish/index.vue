<template>
  <div
    class="PageMerchantCenterMyPublish"
    :class="{ 'LayoutLeftMain-padding-bottom': data.totalPages <= 1 }"
  >
    <div class="LayoutLeftMain-header">
      <TabBtn :dict="typeDict" styleType="line" :value="type" @input="handleTypeChange" />
    </div>
    <div class="LayoutLeftMain-body" v-if="unEdit === 1">
      <div class="LayoutLeftMain-statusBar">
        <TabBtn :dict="statusDict" :value="status" @input="handleStatusChange" />
        <!-- <TabBtn :dict="statusDict" v-model="status1" @input="handleStatusChange" /> -->
      </div>
      <ul class="right-content" v-if="data.list.length > 0">
        <PageMerchantCenterMyPublishListItem
          v-for="item in data.list"
          :key="item.id"
          :data="item"
          :statusDict="statusDict"
          @rePublish="handleRepublish"
          @OffShelves="handleOffShelves"
          @delete="handleDelete"
          @view="handleView"
          @updateGoods="handleUpdate"
        />
      </ul>
      <div class="empty" v-else>
        <Empty centerMiddle waringText="暂无数据!" />
      </div>
      <div v-if="!$isMobile && data.totalPages > 1" class="LayoutLeftMain-pagination">
        <Pagination :total="data.total" align="right" />
      </div>
      <div class="LayoutLeftMain-loadMore" v-if="$isMobile && data.totalPages > 1">
        <ScrollBottomLoadMore
          class="loadMore"
          :totalpage="data.totalPages"
          :loading="mListLoading"
          :transparentBg="true"
          @update="handleScrollBottomLoadMore"
        />
      </div>
    </div>
    <div class="LayoutLeftMain-body" v-if="unEdit === 2">
      <PageMerchantCenterEditGoods
        :editDataId="editDataId"
        @saveSuccess="handleUpdateSuccess"
        @returnBack="handelReturnBack"
      />
    </div>
  </div>
</template>

<script>
  import styles from '~/assets/style/vars.scss'
  import {
    apiPublishListPage,
    apiOffShelves,
    apiRepublish,
    apiDeleteProduct
  } from '~/api/merchantCenter/myPublish'
  import headMixin from '~/assets/js/headMixin'
  import { loadDict } from '~/utils'
  import { validatenull } from '@/utils/validate'

  export default {
    mixins: [headMixin],
    props: {
      data: Object
    },
    created() {
      loadDict(this.$axiosClient, 'csdemand_status').then(
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
                case 4:
                  color = styles.fontColorXLight
                  break
                case 5:
                  color = styles.colorYellow
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
        typeDict: [
          { value: '1', label: '我的商品' }
          // { value: '2', label: '我的需求' },
          // { value: '3', label: '我的提供' },
          // { value: '4', label: '我的招聘' },
        ],
        statusDict: [
          //业务字典
          { value: '', label: '全部' },
          { value: 1, label: '审核中', color: styles.colorBlue },
          { value: 2, label: '已上架', color: styles.colorGreen },
          { value: 3, label: '未通过', color: styles.colorRed },
          { value: 5, label: '已下架', color: styles.colorYellow },
          { value: 4, label: '已驳回', color: styles.fontColorXLight }
        ],
        mListPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        mListLoading: false,
        unEdit: 1,
        editDataId: ''
      }
    },
    computed: {
      type() {
        return parseInt(this.$route.query['type']) || this.typeDict[0].value
      },
      status() {
        return parseInt(this.$route.query['status']) || ''
      }
    },
    methods: {
      handleTypeChange(e) {
        this.$router.push({ name: this.$route.name, query: { type: e } })
      },
      handleStatusChange(e) {
        this.$router.push({
          name: this.$route.name,
          query: { type: this.$route.query.type, status: e, page: 1 }
        })
      },
      handleScrollBottomLoadMore() {
        if (this.mListLoading || this.mListPage >= this.data.totalPages) {
          return
        }
        this.mListLoading = true
        let page = this.mListPage + 1
        apiPublishListPage(this.$axiosClient, { ...this.$route.query, page })
          .then(res => {
            this.mListLoading = false
            if (res.code === 200) {
              this.data.list = [...this.data.list, ...res.data.list]
              this.mListPage = this.mListPage + 1
            }
          })
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
          apiPublishListPage(this.$axiosClient, { ...this.$route.query, page }).then(
            res => {
              this.data.list = [...res.data.list]
              this.mListPage = 1
            },
            e => {}
          )
        }
      },
      //下架
      handleOffShelves(id) {
        this.$confirm('确认要下架该商品吗？').then(() => {
          let params = {
            id: id
          }
          this.$showLoading()
          apiOffShelves(this.$axiosClient, params).then(
            res => {
              this.$hideLoading()
              if (res.code === 200) {
                this.$toast.success('下架成功!')
                this.handleRefreshList()
              } else {
                this.$toast.fail(res.msg || '下架失败!')
              }
            },
            e => {
              this.$hideLoading()
              this.$toast.fail(e.message || '下架失败!')
            }
          )
        })
      },
      //重新发布
      handleRepublish(id) {
        this.$confirm('确认要重新发布该商品吗？').then(() => {
          let params = {
            id: id
          }
          this.$showLoading()
          apiRepublish(this.$axiosClient, params).then(
            res => {
              this.$hideLoading()
              if (res.code === 200) {
                this.$toast.success('操作成功,请等待审核!')
                this.handleRefreshList()
              } else {
                this.$toast.fail(res.msg || '重新发布失败!')
              }
            },
            e => {
              this.$hideLoading()
              this.$toast.fail(e.message || '重新发布失败!')
            }
          )
        })
      },
      //删除
      handleDelete(id) {
        this.$confirm('确认要删除该商品吗？').then(() => {
          let params = {
            id: id
          }
          this.$showLoading()
          apiDeleteProduct(this.$axiosClient, params).then(
            res => {
              this.$hideLoading()
              if (res.code === 200) {
                this.$toast.success('删除成功!')
                //刷新当前页
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
      },
      handleView(id, type) {
        if (type === 2) {
          this.$router.push({
            name: 'material-goods-goodsDetail-id',
            params: { id: id }
          })
        } else {
          this.$router.push({
            name: 'goodsPreview-id',
            params: { id: id }
          })
        }
      },
      handleUpdate(id) {
        this.unEdit = 2
        this.editDataId = id
      },
      handleUpdateSuccess() {
        this.unEdit = 1
        this.editDataId = ''
        this.handleRefreshList()
      },
      handelReturnBack() {
        this.unEdit = 1
        this.editDataId = ''
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