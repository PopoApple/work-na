<template>
  <li class="PageJobIndexListItem float-wrap">
    <nuxt-link
      :to="{
        name: 'material-goods-goodsDetail-id',
        params: { id: data.id },
      }"
    >{{ data.name }}</nuxt-link>
  </li>
</template>

<script>
  import { formatPrice } from '~/utils'

  export default {
    props: {
      data: Object
    },
    methods: {
      formatPrice
    }
  }
</script>

<style lang="scss">
.PageJobIndexListItem {
  box-sizing: border-box;
  padding: 30px 20px;
}
.PageJobIndexListItem + .PageJobIndexListItem {
  border-top: 1px dashed $borderColor;
}
</style>
