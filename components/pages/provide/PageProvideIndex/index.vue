<template>
  <div>
    <SearchList :search-area-fields="[]" :list="list">
      <template  v-slot:item="scope"> 
        <div>
          <nuxt-link :to="`/provide/${scope.row.id}`">{{scope.row.name}}</nuxt-link>
        </div>
      </template>
    </SearchList>
  </div>
</template>

<script>
import headMixin from '~/assets/js/headMixin'

export default {
  mixins: [headMixin],
  data() {
    return {
      list: [
        { id: '1', name: '供应数据1' },
        { id: '2', name: '供应数据2' },
      ],
    }
  }
}
</script>

<style scoped>
</style>
