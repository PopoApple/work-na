<template>
  <div class="PageUserCenterMyComment" :class="{ 'LayoutLeftMain-padding-bottom': totalPage <= 1 }">
    <div class="LayoutLeftMain-header">
      <TabBtn :dict="typeDict" styleType="line" :value="type" @input="handleTypeChange" />
    </div>
    <div class="LayoutLeftMain-body">
      <div class="LayoutLeftMain-statusBar statusBar">
        <TabBtn :dict="statusDict" :value="status" @input="handleStatusChange" />
        <div v-if="!$isMobile">
          <Checkbox :value="allChecked" class="checkbox" @change="handleCheckAll">全选</Checkbox>
          <Button
            class="Button30 batchCancelBtn"
            size="small"
            type="danger"
            plain
            @click="handleBatchDelete"
          >批量删除</Button>
          <Button
            class="Button30 batchCancelBtn"
            size="small"
            type="primary"
            plain
            @click="handleReadAll"
          >一键已读</Button>
        </div>
      </div>
      <ul class="right-content" v-if="type === 2&&data.list.length > 0">
        <PageUserCenterMyMessageListItemCM
          v-for="(item,index) in data.list"
          :key="index"
          :data="item"
          :statusDict="statusDict"
          :checked="checked[item.id]"
          :dataIndex="index"
          @check="handleCheck"
          @view="handleView"
          @delete="handleDelete"
        />
      </ul>
      <ul class="right-content" v-else-if="type === 1&&data.list.length > 0">
        <PageUserCenterMyMessageListItemOP
          v-for="(item,index) in data.list"
          :key="index"
          :data="item"
          :statusDict="statusDict"
          :checked="checked[item.id]"
          :dataIndex="index"
          @check="handleCheck"
          @view="handleView"
          @delete="handleDelete"
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
  import {
    apiMyOpMessageList,
    apiMarkOpMessageRead,
    apiDeleteOpMessage,
    apiBatchDeleteOpMessage,
    apiMyCMMessageList,
    apiMarkCMMessageRead,
    apiDeleteCMMessage,
    apiBatchDeleteCMMessage,
    apiMarkAllReadOpMessage,
    apiMarkAllReadCMMessage
  } from '~/api/userCenter/message'
  import { getTotalPage } from '~/utils'
  import PageUserCenterMyMessageListItemOP from './PageUserCenterMyMessageListItemOP'
  import PageUserCenterMyMessageListItemCM from './PageUserCenterMyMessageListItemCM'
  import headMixin from '~/assets/js/headMixin'
  export default {
    mixins: [headMixin],
    props: {
      data: Object
    },
    components: {
      PageUserCenterMyMessageListItemOP: PageUserCenterMyMessageListItemOP,
      PageUserCenterMyMessageListItemCM: PageUserCenterMyMessageListItemCM
    },
    created() {},
    data() {
      return {
        typeDict: [
          { value: 1, label: '系统消息' },
          { value: 2, label: '评论消息' }
        ],
        statusDict: [
          { value: 0, label: '全部' },
          { value: 1, label: '未读', color: styles.colorRed },
          { value: 2, label: '已读', color: styles.colorGreen }
        ],
        mListPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        mListLoading: false,
        checked: {}
      }
    },
    computed: {
      allChecked() {
        return this.data.list.length > 0 && !this.data.list.some(d => !this.checked[d.id])
      },
      type() {
        return this.$route.query['type']
          ? parseInt(this.$route.query['type'])
          : this.typeDict[0].value
      },
      status() {
        return parseInt(this.$route.query['status']) || this.statusDict[0].value
      },
      totalPage() {
        return getTotalPage(this.data.total)
      },
      checkedIds() {
        let ids = []
        for (let key in this.checked) {
          if (this.checked[key]) {
            ids.push(key)
          }
        }
        return ids
      }
    },
    methods: {
      handleCheckAll(checked) {
        this.data.list.forEach(d => {
          this.$set(this.checked, d.id, checked)
        })
      },
      handleTypeChange(e) {
        this.checkedIds.forEach(d => {
          this.$set(this.checked, d, false)
        })
        // this.checked = Object.assign({}, {})
        this.$router.push({ name: this.$route.name, query: { type: e } })
      },
      handleStatusChange(e) {
        this.checkedIds.forEach(d => {
          this.$set(this.checked, d, false)
        })
        // this.checked = Object.assign({}, {})
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
        if (this.type === 2) {
          apiMyCMMessageList(this.$axiosClient, { ...this.$route.query, page })
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
        } else {
          apiMyOpMessageList(this.$axiosClient, { ...this.$route.query, page })
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
      },
      handleCheck(id, checked) {
        this.$set(this.checked, id, checked)
      },
      handleBatchDelete() {
        if (this.checkedIds.length === 0) {
          this.$alert('还没有选中记录')
          return
        }
        this.$confirm(`确认要删除这${this.checkedIds.length}条记录吗？`)
          .then(() => {
            this.$showLoading()
            let params = [...this.checkedIds]
            if (this.type === 2) {
              // 删除评论消息
              apiBatchDeleteCMMessage(this.$axiosClient, params).then(
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
            } else {
              //删除系统消息
              apiBatchDeleteOpMessage(this.$axiosClient, params).then(
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
            }
          })
          .catch(() => {})
      },
      //已读消息
      handleView(id, status, key) {
        if (status === 1) {
          let params = {
            id: id
          }
          this.$showLoading()
          if (this.type === 2) {
            //已读评论消息
            apiMarkCMMessageRead(this.$axiosClient, params).then(
              res => {
                this.$hideLoading()
                if (res.code === 200) {
                  this.data.list[key].status = 2
                } else {
                  this.$toast.fail(res.msg || '已读消息出现异常~')
                }
              },
              e => {
                this.$hideLoading()
                this.$toast.fail(e.message || '已读消息出现异常~')
              }
            )
          } else {
            //已读系统消息
            apiMarkOpMessageRead(this.$axiosClient, params).then(
              res => {
                this.$hideLoading()
                if (res.code === 200) {
                  this.data.list[key].status = 2
                } else {
                  this.$toast.fail(res.msg || '已读消息出现异常~')
                }
              },
              e => {
                this.$hideLoading()
                this.$toast.fail(e.message || '已读消息出现异常~')
              }
            )
          }
        }
      },
      //删除消息
      handleDelete(id) {
        this.$confirm(`确认要删除这条消息吗？`)
          .then(() => {
            let params = {
              id: id
            }
            this.$showLoading()
            if (this.type === 2) {
              apiDeleteCMMessage(this.$axiosClient, params).then(
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
            } else {
              apiDeleteOpMessage(this.$axiosClient, params).then(
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
            }
          })
          .catch(() => {})
      },
      handleReadAll() {
        this.$confirm(`已读全部消息吗？`)
          .then(() => {
            this.$showLoading()
            if (this.type === 2) {
              //已读评论消息
              apiMarkAllReadCMMessage(this.$axiosClient).then(
                res => {
                  this.$hideLoading()
                  if (res.code === 200) {
                    this.$toast.success('操作成功!')
                    this.handleRefreshList()
                  } else {
                    this.$toast.fail(res.msg || '已读消息出现异常~')
                  }
                },
                e => {
                  this.$hideLoading()
                  this.$toast.fail(e.message || '已读消息出现异常~')
                }
              )
            } else {
              //已读系统消息
              apiMarkAllReadOpMessage(this.$axiosClient).then(
                res => {
                  this.$hideLoading()
                  if (res.code === 200) {
                    this.$toast.success('操作成功!')
                    this.handleRefreshList()
                  } else {
                    this.$toast.fail(res.msg || '已读消息出现异常~')
                  }
                },
                e => {
                  this.$hideLoading()
                  this.$toast.fail(e.message || '已读消息出现异常~')
                }
              )
            }
          })
          .catch(() => {})
      },
      //刷新数据
      handleRefreshList() {
        if (!this.$isMobile && this.$route.query.page > 1) {
          this.$router.push({
            name: this.$route.name,
            query: { ...this.$route.query, page: 1 }
          })
        } else {
          let page = 1
          if (this.type === 2) {
            apiMyCMMessageList(this.$axiosClient, { ...this.$route.query, page })
              .then(res => {
                if (res.code === 200) {
                  this.data.list = [...res.data.records]
                  this.mListPage = 1
                }
              })
              .catch(e => {})
          } else {
            apiMyOpMessageList(this.$axiosClient, { ...this.$route.query, page })
              .then(res => {
                if (res.code === 200) {
                  this.data.list = [...res.data.records]
                  this.mListPage = 1
                }
              })
              .catch(e => {})
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .statusBar{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .batchCancelBtn {
    margin-left: 17px;
  }
  .right-content {
    min-height: 400px;
  }
  .empty{
    position:relative;
    height: 400px;
  }
</style>
