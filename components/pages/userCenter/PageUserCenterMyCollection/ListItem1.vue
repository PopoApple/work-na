<template>
  <ListItem :class="{'checked': allow }" @click.native="triggerChecked(allow)">
    <ListItemCol :width="$isMobile ? 220 : 140">
      <div class="img">
        <nuxt-link v-if="data.status === 2" :to="'/material/goods/goodsDetail/' + data.id">
          <CcImage :src='imgSrc + SP147X100'></CcImage>
        </nuxt-link>
      </div>
    </ListItemCol>
    <ListItemCol :width="$isMobile ? null : 500">
      <ListItemLine :fontSize="$isMobile ? null : 'fontSizeL'" color="fontColorDark" :bold="!$isMobile" :ellipsis="false">
        <nuxt-link v-if="data.status === 2" :to="'/material/goods/goodsDetail/' + data.id">
          <span class="ellipsis title">{{data.productName}}</span>
        </nuxt-link>
        <span v-else class="ellipsis title">{{data.productName}}</span>
        <Tag size="mini" v-if="data.region" class="region-tag ellipsis">{{data.region}}</Tag>
      </ListItemLine>
      <ListItemLine :fontSize="$isMobile ? null : 'fontSizeOdd'" :color="$isMobile ? 'fontColorLight' : 'fontColorDark'" >
        {{data.productTypeName}}
      </ListItemLine>
      <ListItemLine :width="$isMobile ? 300 : 440" color="fontColorXLight">
        {{data.productSimpleIntro}}
      </ListItemLine>
    </ListItemCol>
    <ListItemCol v-if="!$isMobile" :width="$isMobile ? 220 : 250" fontSize="fontSize3XL" color="colorGreen" bold>
      <span v-if="data.status === 2">{{formatPrice(data.unitPrice)}}</span>
      <span v-else>商品已下架</span>
    </ListItemCol>
    <!-- <template v-if="$isMobile" slot="infoTop">
      <a href="javascript:;" class="a-red el-icon-delete deleteBtn"></a>
    </template> -->
    <template v-if="$isMobile" slot="infoBottom">
      <span class="price">
        <span v-if="data.status === 2">{{formatPrice(data.unitPrice)}}</span>
        <span v-else>商品已下架</span>
      </span>
    </template>
    <!-- <template v-if="!$isMobile" slot="btns">
      <a href="javascript:;" class="a-red el-icon-delete deleteBtn"></a>
    </template> -->
    <!-- 右下角删除标识 -->
    <div class="delete-mark iconfont icon-xuanzhongjiaobiao" :style="{ display: checked }"></div>
  </ListItem>
</template>

<script>
  import { formatPrice } from '~/utils'
import { SP147X100 } from '~/assets/js/constants'
  export default {
    props: {
      data: Object,
      allow: Boolean
    },
    data() {
      return {
        checked: 'none'
      }
    },
    computed: {
      imgSrc() {
        let temp = this.data.attachUrls && this.data.attachUrls[0] || ''
        return temp
      },
      SP147X100() {
        return SP147X100
      }
    },
    methods: {
      formatPrice,
      triggerChecked(isAllowed) {
        if (isAllowed) {
          this.checked = this.checked === 'none' ? 'block' : 'none'
          let state = { id: this.data.id, delete: this.checked === "block"}
          this.$emit('delectchecked', state )
        }
      }
    },
    watch: {
      allow(val) {
        if(val === false) { this.checked = 'none' }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .img {
    display: block;
    // background: #ddd;
    width: 120px;
    height: 80px;
  }
  .title {
    display: inline-block;
    max-width: 400px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .deleteBtn {
    font-size: 22PX;
  }
  .region-tag {
    max-width: 190px;
    vertical-align: middle;
  }

  // 选择删除时样式
  .ListItem {
    border: 1px solid transparent;
  }
  .checked {
    overflow: hidden;
    // 添加文字不可被选中
    -moz-user-select:none;		/* 火狐 */
    -webkit-user-select:none;	/* 谷歌 */
    -ms-user-select:none;		/* IE */
    user-select:none;
    &:hover {
      border-radius: $borderRadius;
      border: 1px solid $colorGreen;
    }
    .delete-mark {
      position: absolute;
      bottom: -16px;
      right: 0;
      font-size: 26px;
      color: $colorGreen;
      z-index: 20;
    }
  }

  .RootIsMobile {
    .img {
      width: 200px;
      height: 150px;
    }
    .title {
      max-width: 240px;
    }
    .price {
      color: $colorGreen;
    }
    .deleteBtn {
      font-size: $fontSizeL;
      position: relative;
      top: 2px;
    }
  }
</style>
