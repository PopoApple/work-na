<template>
  <div class="PageUserCenterMyFocus">
    <div class="LayoutLeftMain-header">
      <TabBtn title="我的关注" styleType="line" />
    </div>
    <div class="LayoutLeftMain-body">
      <div class="left-box">
        <div class="left-header float-wrap">
          <div class="left left-title ellipsis">我关注的商户</div>
          <div class="right icon">
            <i class="el-icon-circle-plus" @click="handleAddGroup" />
            <!-- <i class="el-icon-remove" @click="handleRemove" /> -->
          </div>
        </div>
        <div class="left-content">
          <ul>
            <li class="group float-wrap" v-for="item in data.groups" :key="item.id" :class="{active: activeGroup === item.id}" @click="handleChangeGroup(item.id)">
              <div class="left group-name ellipsis">{{item.followGroupName}}</div>
              <div class="right icon" v-if="item.isDefault !== 1">
                <Dropdown placement="bottom" @command="e => handleCommand(e, item.id)" size="small">
                  <i class="iconimg i-more" />
                  <DropdownMenu slot="dropdown">
                    <DropdownItem class="editBtn" command="edit">编辑</DropdownItem>
                    <DropdownItem class="deleteBtn" command="delete">删除</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-box" :class="{ 'LayoutLeftMain-padding-bottom': totalPage <= 1 }">
        <div class="right-header float-wrap">
          <div class="left list-name ellipsis">{{activeGroupName}}</div>
          <div class="right">
            <Checkbox v-if="data.total > 0" :value="allChecked" class="checkbox" @change="handleCheckAll">全选</Checkbox>
            <DropdownBtn v-if="groupsDict && groupsDict.length > 0 && data.total > 0" :dict="groupsDict" placement="bottom" btnClass="Button30" size="small" type="primary" plain @command="handleBatchMove">
              批量移动到
            </DropdownBtn>
            <Button v-if="data.total > 0" class="Button30 batchCancelBtn" size="small" type="danger" plain @click="handleCancelFocus(null)">批量取消</Button>
          </div>
        </div>
        <div class="right-content">
          <ul v-if="data.list.length > 0">
            <PageUserCenterMyFocusListItem class="group" v-for="item in data.list" :key="item.id" :data="item" :groupsDict="groupsDict" :checked="checked[item.id]" @move="(groupId, group) => handleMove(item.id, groupId, group)" @cancelFocus="handleCancelFocus" @check="handleCheck" />
          </ul>
          <Empty v-else centerMiddle />
          <div v-if="!$isMobile && totalPage > 1" class="LayoutLeftMain-pagination">
            <Pagination :total="data.total" align="right"/>
          </div>
          <div class="LayoutLeftMain-loadMore" v-if="$isMobile && totalPage > 1" >
            <ScrollBottomLoadMore :totalpage="data.total" :loading="mListLoading" :transparentBg="true" @update="handleScrollBottomLoadMore" />
          </div>
        </div>
      </div>
    </div>
    <PageUserCenterMyFocusEditModal v-if="editModalShow" :data="editGroup" @close="editModalShow=false" @saveSuccess="refreshGroup" :groups="data.groups.filter(d => !editGroup || d.id !== editGroup.id)" />
  </div>
</template>

<script>
import styles from '~/assets/style/vars.scss'
import { apiMockList, apiMockGroupList, apiMockEdit } from './mock'
import { getTotalPage } from '~/utils'
import { apiList, apiGroupList, apiDeleteGroup, apiCancelFoucsBatch, apiMoveBatch } from '~/api/userCenter/myFocus'
import headMixin from '~/assets/js/headMixin'

export default {
  mixins: [headMixin],
  props: {
    data: Object,
  },
  // created() {
  //   apiList(this.$axiosClient, { followGroupId: '798604430087598080' })
  // },
  data() {
    return {
      mListPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      mListLoading: false,
      editModalShow: false,
      tagClosable: false,
      checked: {},
      editGroup: null,
    }
  },
  computed: {
    allChecked() {
      return this.data.list.length > 0 && !this.data.list.some(d => !this.checked[d.id])
    },
    activeGroup() {
      return  this.$route.query['groupId'] || this.data.groups[0].id
    },
    activeGroupName() {
      let opt = this.data.groups.find(d => d.id === this.activeGroup)
      return opt ? opt.followGroupName : ''
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
    },
    groupsDict() {
      return this.data.groups.filter(d => d.id !== this.activeGroup).map(d => {
        return {
          value: d.id,
          label: d.followGroupName,
        }
      })
    },
  },
  methods: {
    handleCheckAll(checked) {
      this.data.list.forEach(d => {
        this.$set(this.checked, d.id, checked)
      })
    },
    handleCheck(id, checked) {
      this.$set(this.checked, id, checked)
    },
    handleCancelFocus(id) {
      if (!id && this.checkedIds.length === 0) {
        this.$alert('还没有选中记录')
        return
      }
      let tips = '确认要取消关注吗？'
      if (!id) {
        tips = `确认要取消关注这${this.checkedIds.length}条记录吗？`
      }
      this.$confirm(tips).then(() => {
        this.$showLoading()
        let ids = id ? [id] : this.checkedIds
        apiCancelFoucsBatch(this.$axiosClient, ids).then(res => {
            if (res.code === 200) {
              this.$toast.success('操作成功')
              this.refreshList()
            } else {
              this.$hideLoading()
              this.$toast.fail('操作失败')
            }
          },
          e => {
            this.$hideLoading()
            this.$toast.fail('操作失败')
          }
        )
     }).catch((e) => {
      //  console.log(123, e)
      error(e)
     })
    },
    handleBatchMove(groupId) {
      if (this.checkedIds.length === 0) {
        this.$alert('还没有选中记录')
        return
      }
      this.$confirm(`确认要移动这${this.checkedIds.length}条记录吗？`).then(() => {
        this.handleMove(this.checkedIds, groupId)
     }).catch(() => {
     })
    },
    handleMove(id, groupId) {
      this.$showLoading()
      let ids = typeof id === 'string' ? [id] : id
      let params = ids.map(d => {
        return { id: d, followGroupId: groupId }
      })
      apiMoveBatch(this.$axiosClient, params).then(res => {
          if (res.code === 200) {
            this.$toast.success('操作成功')
            this.refreshList()
          } else {
            this.$hideLoading()
            this.$toast.fail('操作失败')
          }
        },
        e => {
          this.$hideLoading()
          this.$toast.fail('操作失败')
        }
      )
    },
    handleChangeGroup(id) {
      this.$router.push({ name: this.$route.name, query: { groupId: id } })
      this.mListPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
    },
    handleAddGroup() {
      this.editModalShow = true
      this.editGroup = null
    },
    handleCommand(type, id) {
      if (type === 'edit') {
        this.editModalShow = true
        this.editGroup = this.data.groups.find(d => d.id === id)
      } else if (type === 'delete') {
        this.handleDeleteGroup(id)
      }
    },
    handleDeleteGroup(id) {
      this.$confirm('确认要删除该分组吗？').then(() => {
        this.$showLoading()
        apiDeleteGroup(this.$axiosClient, id).then(res => {
            if (res.code === 200) {
              this.$toast.success('操作成功')
              this.$hideLoading()
              this.data.groups = this.data.groups.filter(d => d.id !== id)
              if (id === this.activeGroup) {
                if (this.data.groups.length > 0) {
                  this.handleChangeGroup(this.data.groups[0].id)
                } else {
                  this.data.list = []
                  this.data.total = 0
                }
              }
            } else {
              this.$hideLoading()
              this.$toast.fail(res.msg || '操作失败')
            }
          },
          e => {
            this.$hideLoading()
            this.$toast.fail('操作失败')
          }
        )
     }).catch(() => {
     })
    },
    handleRemove() {
      this.tagClosable = true
    },
    refreshGroup() {
      apiGroupList(this.$axiosClient).then(res => {
        this.$hideLoading()
        if (res.code === 200) {
          this.data.groups = res.data.records
        } else {
          this.$toast.fail('数据加载失败')
        }
      }).catch(e => {
        this.$hideLoading()
        this.$toast.fail('数据加载失败')
      })
    },
    refreshList() {
      if (this.$isMobile) {
        this.mListPage = 1
      } else {
        let query = this.$route.query
        if (query.page && query.page !== '1') {
          this.$router.push({ name: this.$route.name, query: { ...query, page: undefined } })
          this.$hideLoading()
          return
        }
      }
      apiList(this.$axiosClient, { followGroupId: this.activeGroup }).then(res => {
        this.$hideLoading()
        if (res.code === 200) {
          this.data.list = res.data.records.map(d => {
            return {
              ...d,
              id: d.followId,
            }
          })
          this.data.total = res.data.total
          this.checked = {}
        } else {
          this.$toast.fail('数据加载失败')
        }
      }).catch(e => {
        this.$hideLoading()
        this.$toast.fail('数据加载失败')
      })
    },
    handleScrollBottomLoadMore() {
      if (this.mListLoading || this.mListPage >= this.totalPage) {
        return
      } 
      this.mListLoading = true
      let page = this.mListPage + 1
      apiList(this.$axiosClient, { followGroupId: this.activeGroup, page }).then(res => {
        this.mListLoading = false
        if (res.code === 200) {
          this.data.list = [...this.data.list, ...res.data.records.map(d => {
            return {
              ...d,
              id: d.followId,
            }
          })]
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

<style lang="scss">
.PageUserCenterMyFocus {
  height: 100%;
  display: flex;
  flex-direction: column;
  .LayoutLeftMain-body {
    flex: 1;
    display: flex;
    .left-box {
      width: 147PX;
      font-size: $fontSizeOdd;
      color: $fontColorDark;
      box-sizing: border-box;
      font-weight: bold;
      padding-right: 10px;
    }
    .right-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-left: 1px solid $borderColor;
      padding-left: 20px;
    }
    .left-header {
      height: 54px;
      line-height: 54px;
      .left-title {
        width: 118px;
      }
      i {
        color: $colorGreen;
        font-size: 18PX;
        cursor: pointer;
      }
      i.el-icon-remove {
        color: $colorRed;
        margin-left: 5px;
      }
    }
    .left-content {
      li {
        display: block;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        &:hover {
          color: $colorGreen;
        }
        &.active {
          color: $colorGreen;
        }
      }
      .group-name {
        width: 118px;
      }
    }
    .right-header {
      height: 54px;
      line-height: 54px;
      .list-name {
        font-weight: bold;
        max-width: 400px;
      }
      .checkbox {
        margin-right: 15px;
      }
      .batchCancelBtn {
        margin-left: 17px;
      }
    }
    .right-content {
      position: relative;
      flex: 1;
    }
  }
}

.RootNotMobile {
  .PageUserCenterMyFocus {
    .i-more {
      background-image: url('~static/img/pc/more.png');
      width: 15PX;
      height: 15PX;
      background-position: 6PX 0;
      background-size: 3PX 100%;
      top: 2PX;
      cursor: pointer;
      &:hover {
        background-image: url('~static/img/pc/more_a.png');
      }
    }
    .el-dropdown {
      line-height: 28px;
    }
  }
}

.RootIsMobile {
  .PageUserCenterMyFocus {
    padding-bottom: 60px;
    .LayoutLeftMain-body {
      flex-wrap: wrap;
    }
    .left-box {
      width: 750px;
      position: relative;
    }
    .left-header {
      position: absolute;
      right: 0;
      top: 24px;
      i {
        font-size: 18PX;
      }
    }
    .left-title {
      display: none;
    }
    .left-content {
      ul {
        overflow: hidden;
        padding: 0 40px 20px 0;
        li {
          float: left;    
          border-radius: $borderRadius;
          padding: 0 14px;
          margin-right: 10px;
          margin-top: 20px;
          box-sizing: border-box;
          border: 1px solid $borderColorLight;
          height: 60px;
          line-height: 60px;
          border-radius: $borderRadius;
          font-size: $fontSize;
          font-weight: normal;
          &:hover {
            color: initial;
          }
          &.active {
            color: #fff;
            background: $colorGreen;
            border-color: $colorGreen;
          }
          .group-name {
            width: auto;
            max-width: 160px;
          }
        }
      }
    }
    .right-box {
      width: 690px;
      padding: 0;
      border-left: none;
    }
    .right-header {
      position: absolute;
      right: 30px;
      top: 0;
      height: 108px;
      line-height: 108px;
    }
    .right-content {
      min-height: 400px;
    }
    .list-name {
      display: none;
    }
  }
}
</style>
