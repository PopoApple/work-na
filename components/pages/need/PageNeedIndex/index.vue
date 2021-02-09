<template>
  <div>
    <div v-for="item in list" :key="item.id">
      <nuxt-link :to="`/need/${item.id}`">{{item.name}}</nuxt-link>
    </div>
  </div>
</template>

<script>
import headMixin from '~/assets/js/headMixin'

export default {
  mixins: [headMixin],
  data() {
    return {
      list: [
        { id: '1', name: '需求数据1' },
        { id: '2', name: '需求数据2' },
      ],
    }
  }
}
</script>

<style scoped>
</style>
