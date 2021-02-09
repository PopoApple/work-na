<template>
  <ListItem :type="isAll ? ($isMobile ? 'border' : 'card') : null" :class="{'PageSearchResultListItem1-isAll': isAll, 'PageSearchResultListItem1-notAll': !isAll}">
    <ListItemCol :width="$isMobile ? 220 : (isAll ? 180: 200)">
      <nuxt-link :to="{ name: 'material-goods-goodsDetail-id', params: { id: data.id } }">
        <CcImage :src="data.attachUrls && data.attachUrls.length > 0 ? data.attachUrls[0] + imgSufix : null" :width="imgW" :height="imgH" class="img" />
      </nuxt-link>
    </ListItemCol>
    <ListItemCol :width="$isMobile ? 470 : 720">
      <ListItemLine :fontSize="$isMobile ? null : 'fontSizeL'" color="fontColorDark" :bold="!$isMobile" :ellipsis="false">
        <span class="ellipsis title">
          <nuxt-link :to="{ name: 'material-goods-goodsDetail-id', params: { id: data.id } }">
            <span v-html="data.productName"></span>
          </nuxt-link>
        </span>
        <Tag v-if="!$isMobile && data.region" size="mini">{{data.region}}</Tag>
      </ListItemLine>
      <ListItemLine :fontSize="$isMobile ? null : 'fontSizeOdd'" :color="$isMobile ? 'fontColorLight' : 'fontColorDark'" :bold="!$isMobile" :width="$isMobile ? 470 : 720">
        <span v-html="data.productTypeName"></span>
      </ListItemLine>
      <ListItemLine :width="$isMobile ? 320 :720">
        <nuxt-link :to="{ name: 'material-merchant-merchantDetail-id', params: { id: data.merchantId } }">
          <span v-html="data.merchantName"></span>
        </nuxt-link>
      </ListItemLine>
    </ListItemCol>
    <ListItemCol v-if="!$isMobile" :width="$isMobile ? 160 : 250" fontSize="fontSize3XL" color="colorGreen" bold class="price" textAlign="right">
      <!-- {{$formatPrice(data.formatPrice)}} -->
      {{data.unitPrice === '面议' ? data.unitPrice : $formatPrice(data.unitPrice)}}
    </ListItemCol>
    <template v-if="$isMobile" slot="infoTop">
      <Tag v-if="$isMobile && data.region" size="mini" class="tag-region">{{data.region}}</Tag>
    </template>
    <template v-if="$isMobile" slot="infoBottom">
      <span class="price">
        {{$formatPrice(data.unitPrice)}}
      </span>
    </template>
  </ListItem>
</template>

<script>
  import { SEARCHSHEQU260X150 } from '~/assets/js/constants'

  export default {
    props: {
      data: Object,
      isAll: Boolean,
    },
    computed: {
      imgW() {
        return this.$isMobile ? 200 : 160
      },
      imgH() {
        return this.$isMobile ? 150 : 95
      },
      imgSufix() {
        return SEARCHSHEQU260X150
      },
    }
  }
</script>

<style lang="scss" scoped>
  .img {
    cursor: pointer;
    display: block;
  }
  .title {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
  }
  .RootNotMobile {
    .title {
      max-width: 620px;
    }

    .PageSearchResultListItem1-isAll {
      .price {
        padding-right: 20px;
      }
    }

    .PageSearchResultListItem1-notAll {
      .img {
        margin-left: 20px;
      }
      .price {
        padding-right: 30px;
      }
    }

  }

  .RootIsMobile {
    .title {
      max-width: 320px;
    }
    .price {
      color: $colorGreen;
    }
    .tag-region {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      top: 5PX;
    }
  }
</style>
