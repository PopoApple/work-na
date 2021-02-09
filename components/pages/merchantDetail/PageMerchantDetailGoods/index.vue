<template>
  <div>
    <div class="box-1-title">
      <nuxt-link
        class="box-1-link"
        key="/material/merchant/merchantDetail/:id?/main"
        :to="{
            name: 'material-merchant-merchantDetail-id-main',
            params:{id:id}
          }"
      >商家详情</nuxt-link>
      <div class="box-1-link-choose">商品</div>
      <!-- <nuxt-link
        class="box-1-link"
        key="/merchantDetail/_id/job"
        :to="{
            name: 'material-merchant-merchantDetail-id-job',
            params:{id:id}
          }"
      >职位</nuxt-link>
      <nuxt-link
        class="box-1-link"
        key="/merchantDetail/_id/provides"
        :to="{
            name: 'material-merchant-merchantDetail-id-provides',
            params:{id:id}
          }"
      >服务</nuxt-link>-->
    </div>
    <div class="box-condition">
      <span>类别</span>
      <div class="sort-select">
        <Select
          :value="_typeValue"
          :dict="typeDict"
          @change="handleTypeChange"
          @input="handleTypeChange"
          clearable
        />
      </div>
      <SortButton :value="_unitPriceValue" @input="handlePriceSortChange" class="sort-condition">价格</SortButton>
      <SortButton
        v-if="!$isMobile"
        :value="_sortBtnTimeValue"
        @input="handleTimeSortChange"
        class="sort-condition"
      >上架时间</SortButton>
    </div>
    <div class="box-1-info">
      <ul class="list-item-wrap" v-if="data.list.length > 0">
        <template v-if="$isMobile">
          <MaterialGoodsListItemM v-for="(item,index) in data.list" :key="index" :data="item" />
        </template>
        <template v-else>
          <MaterialGoodsListItem v-for="(item,index)  in data.list" :key="index" :data="item" />
        </template>
      </ul>
      <div class="empty" v-else>
        <Empty centerMiddle waringText="暂无数据!" />
      </div>
      <div v-if="!$isMobile" class="pagination">
        <Pagination :total="data.totalElements" :circleBtn="true" />
      </div>
      <ScrollBottomLoadMore
        v-if="$isMobile && data.totalElements > 1"
        :totalpage="data.totalPages"
        :loading="mListLoading"
        @update="handleScrollBottomLoadMore"
      />
    </div>
  </div>
</template>

<script>
  import { apiProductTypeListExist } from '~/api/merchantDetail'
  import { validatenull } from '@/utils/validate'
  import { apiMockList } from './mock'
  import { apiProductListPage } from '~/api/merchantDetail'
  export default {
    props: {
      data: Object
    },
    created() {
      apiProductTypeListExist(this.$axiosClient, this.id).then(res => {
        if (!validatenull(res) && !validatenull(res.data)) {
          let typeDict = []
          res.data.map(item => {
            if (!validatenull(item)) {
              let dict = {}
              dict.value = item.id
              dict.label = item.productTypeName
              typeDict.push(dict)
            }
          })
          this.typeDict = typeDict
        }
      })
    },
    mounted() {},
    data() {
      return {
        typeDict: [],
        mListLoading: false,
        mListPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1
      }
    },
    computed: {
      id() {
        return this.$nuxt.$route.params.id
      },
      _unitPriceValue() {
        return this.$route.query['unitPrice'] || null
      },
      _sortBtnTimeValue() {
        return this.$route.query['createTime'] || null
      },
      _typeValue() {
        return this.$route.query['productTypeId'] || null
      }
    },
    methods: {
      handleTimeSortChange(val) {
        this.$router.push({
          ...this.$route,
          query: { ...this.$route.query, createTime: val || undefined, page: 1 }
        })
      },
      handlePriceSortChange(val) {
        this.$router.push({
          ...this.$route,
          query: { ...this.$route.query, unitPrice: val || undefined, page: 1 }
        })
      },
      handleTypeChange(val) {
        this.$router.push({
          ...this.$route,
          query: { ...this.$route.query, productTypeId: val || undefined, page: 1 }
        })
      },

      handleScrollBottomLoadMore() {
        if (this.mListLoading || this.mListPage >= this.data.totalPages) {
          return
        }
        this.mListLoading = true
        let page = this.mListPage + 1
        apiProductListPage(
          this.$axiosClient,
          { ...this.$route.query, page },
          { ...this.$route.params }
        )
          .then(
            res => {
              this.mListLoading = false
              if (res.code === 200) {
                this.data.list = [...this.data.list, ...res.data.list]
                this.mListPage = page
              }
            },
            e => {
              this.mListLoading = false
            }
          )
          .catch(e => {
            this.mListLoading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
.empty{
  position:relative;
  height: 400px;
  width: 100%;
}
.list-item-wrap {
  padding: 0 10px;
}
.pagination {
  padding: 30px 0;
}
.box-1-title{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  width: 1200px;
  margin-bottom: 5px;
  min-height: 32px; 
  box-shadow:$shadow;
}
.box-condition{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  width: 1200px;
  margin-bottom: 5px;
  min-height: 60px; 
  box-shadow:$shadow;
}
.box-condition span{
  margin-left: 60px;
}
.sort-condition{
  margin-left: 50px;
}
.sort-select{
  width: 200px;
  margin-left: 10px;
}
.box-1-link-choose{
  width: 132px;
  height:32px;
  background: $colorGreen;
  color: $colorWhite !important;
  text-align: center;
  box-shadow: $shadow;
  border-radius: $borderRadiusS;
  line-height: 32px;
  margin:10px 0 10px 20px;
}
.box-1-link{
  width: 132px;
  height:32px;
  text-align: center;
  line-height: 32px;
  margin:10px 0 10px 20px;
}
.box-1-info{
  margin: 30px;
}
.merchant-intro{
  margin-top: 20px;
}
.RootIsMobile {
  .box-1-title{
    padding: 0px;
    height: 106px;
    width: 100%;
    margin-bottom: 20px;
    min-height: 106px; 
    border-bottom: 1px $borderColorLight solid;
  }
  .box-1-link-choose{
    width: 150px;
    height:50px;
    margin-left: 20px;
    line-height: 50px;
  }
  .box-1-link{
    width: 150px;
    height:50px;
    margin-left: 20px;
    line-height: 50px;
  }
  .box-condition{
    width: 100%;
  }
  .box-1-info{
    width: 100%;
    margin: 0px;
  }
  .box-condition{
    min-height: none; 
    height:100px;
  }
  .box-condition span{
    margin-left: 35px;
  }
}
</style>
