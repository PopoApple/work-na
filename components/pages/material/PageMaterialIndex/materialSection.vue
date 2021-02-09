<template>
  <div class="meterial-section">
    <SectionTitle :btnRoute="'/material/goods?productTypeId=' + id">{{meterialSection}}</SectionTitle>
    <div class="bottom">
      <div class="side-nav">
        <div class="side-nav-floors">
          <div
            v-for="panel in navList"
            :key="panel.id"
            class="side-nav-floor"
            :class="isActive === '' ? '' : isActive === panel.id ? 'is-active': 'not-active'"
            @mouseenter="isActive = panel.id"
            @mouseleave="isActive = ''"
          >
            <div class="floor-title">
              {{panel.name}}
              <i class="el-icon-arrow-right"></i>
            </div>
            <ul class="floor-list">
              <li v-for="item in panel.list" :key="item.id">
                <nuxt-link :to="'/material/goods/?productTypeId=' + item.id">{{item.name}}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="side-nav-more">
          <nuxt-link :to="'/material/goods?productTypeId=' + id">显示全部信息</nuxt-link>
        </div>
      </div>
      <div class="show-bar">
        <div class="show-bar-item" v-for="item in list" :key="item.id">
          <nuxt-link :to="'/material/goods/goodsDetail/' + item.id ">
            <CcImage :src="item[url][0] ? item[url][0] + SP180X180 : ''" alt="图片展示无法加载" :width="178" :height="178" class="img"></CcImage>
            <p>{{item[name]}}</p>
            <p class="ellipsis">{{ formatPrice(item[price])}}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SP180X180 } from '~/assets/js/constants'
import { formatPrice } from '~/utils'
  export default {
    props: {
      id: String,
      meterialSection: String,
      navList: Array,
      list: Array
    },
    data() {
      return {
        // 导航栏别名，防止键名变更，使用方括号运算符的方式读取键值, 通过别名来代替

        // 商品展示区别名，防止键名变更，使用方括号运算符的方式读取键值, 通过别名来代替
        url: 'attachUrls',
        name: 'productName',
        price: 'unitPrice',
        isActive: ''
      }
    },
    computed: {
      SP180X180() {
        return SP180X180
      }
    },
    methods: {
      formatPrice,
    }
  }
</script>

<style lang="scss" scoped>

.is-active {
  height: 320px !important;
  .floor-list {
    overflow-y: auto;
    height: 280px !important;
    &::-webkit-scrollbar{
      display: none;
    }
  }
}

.not-active {
  height: 45px !important;
}

.RootNotMobile{
  .meterial-section {
    width: 100%;
    height: 100%;
    .bottom {
      display: flex;
      .side-nav {
        position: relative;
        width: 210px;
        height: 500px;
        margin-right: 20px;
        background-color: $bgColorGray;
        .side-nav-floors {
          height: calc(100% - 45px);
          .side-nav-floor {
            overflow: hidden;
            position: relative;
            height: 110px;
            padding: 0 20px;
            transition: all 0.5s;
            &:after {
              content: '';
              position: absolute;
              bottom: 0;
              display: block;
              width: 170px;
              height: 1px;
              margin: 0 auto;
              background-color: #dddddd;
            }
            .floor-title {
              position: relative;
              font-size: $fontSizeL;
              font-weight: bold;
              color: $fontColor;
              line-height: 40px;
              .el-icon-arrow-right {
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
              }
            }
            .floor-list {
              overflow: hidden;
              display: flex;
              align-items: center;
              align-content: flex-start;
              flex-wrap: wrap;
              height: 60px;
              font-size: $fontSize;
              line-height: 30px;
              color: $fontColorXLight;
              li {
                margin: 0 4px;
              }
            }
          }
        }
        .side-nav-more {
          overflow: hidden;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          height: 45px;
          color: $fontColor;
          line-height: 45px;
          text-align: center;
        }
      }
      .show-bar {
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        width: 970px;
        height: 500px;
        .show-bar-item {
          width: 20%;
          height: 50%;
          .img {
            margin: 0 auto;
          }
          p {
            width: 100%;
            margin: 0;
            text-align: center;
            line-height: 16px;
          }
          p:nth-child(2) {
            width: 135px;
            height: 32px;
            line-height: 17px;
            overflow: hidden;
            margin: 8px auto;
          }
          p:last-child {
            width: 135px;
            margin: 0 auto;
            color: $colorGreen;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>