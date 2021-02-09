<template>
  <div style="text-align: left;">
    <div>我的意向承接</div>
    <SearchList :search-bar-fields="[]" :list="list">
      <template v-slot:item="scope"> 
        <div class="float-wrap">
          <div class="left" style="width: 886px;">
            {{scope.row.name}}
          </div>
          <div class="right" style="width: 100px;">
            按钮
          </div>
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
        { id: '1', name: '意向承接数据1' },
        { id: '2', name: '意向承接数据2' },
      ],
    }
  }
}
</script>

<style scoped>
</style>
