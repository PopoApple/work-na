<template>
  <ListItem type="card" btnsPosition="bottom">
    <ListItemCol :width="$isMobile ? 220 : 140">
      <nuxt-link
        :to="{
            name: data.status === 2?'material-goods-goodsDetail-id':'goodsPreview-id',
            params: { id: data.id},
          }"
      >
        <CcImage
          class="img"
          :width="$isMobile ? 200 : 120"
          :height="$isMobile ? 150 : 80"
          :src="data.attachUrls?data.attachUrls[0]+SP147X100:''"
          :alt="data.productName"
        ></CcImage>
      </nuxt-link>
    </ListItemCol>
    <ListItemCol>
      <ListItemLine fontSize="fontSizeL" bold :width="$isMobile ? 280 : 650">
        <nuxt-link
          :to="{
            name: data.status === 2?'material-goods-goodsDetail-id':'goodsPreview-id',
            params: { id: data.id},
          }"
        >{{data.productName}}</nuxt-link>
      </ListItemLine>
      <ListItemLine
        fontSize="fontSizeOdd"
        color="colorGreen"
        bold
        :width="280"
      >{{formatPrice(data.unitPrice)}}{{data.unitName?'/'+data.unitName:''}}</ListItemLine>
      <ListItemLine :width="240" color="fontColorXLight">{{data.createTime}}</ListItemLine>
    </ListItemCol>
    <template slot="infoTop">
      <Status :dict="statusDict" :value="data.status" textAlign="right" fontSize="fontSizeOdd" />
    </template>
    <template slot="btns">
      <Button class="Button30" type="primary" plain @click="$emit('view', data.id,data.status)">查看</Button>
      <Button
        class="Button30"
        type="info"
        plain
        v-if="data&&data.status&&(data.status === 3||data.status === 4||data.status === 5)"
        @click="$emit('updateGoods', data.id)"
      >编辑</Button>
      <Button
        class="Button30"
        type="success"
        plain
        v-if="data&&data.status&&(data.status === 3||data.status === 4||data.status === 5)"
        @click="$emit('rePublish', data.id)"
      >重新发布</Button>
      <Button
        class="Button30"
        type="warning"
        plain
        v-if="data&&data.status&&data.status === 2"
        @click="$emit('OffShelves', data.id)"
      >下架</Button>
      <Button
        class="Button30"
        type="danger"
        plain
        v-if="data&&data.status&&(data.status === 3||data.status === 4||data.status === 5)"
        @click="$emit('delete', data.id)"
      >删除</Button>
    </template>
  </ListItem>
</template>

<script>
  import { formatPrice } from '~/utils'
  import { SP147X100 } from '~/assets/js/constants'

  export default {
    props: {
      data: Object,
      statusDict: Array
    },
    data() {
      return {
        SP147X100
      }
    },
    methods: {
      formatPrice
    }
  }
</script>

<style lang="scss" scoped>
  .img {
    display: block;
  }
  .detailBtn {
    position: relative;
    right: -10px;
  }
</style>
