<template>
  <div class="wrap">
    <div class="head float-wrap">
      <div class="tag left">
        <Tag effect="dark" size="mini">最新公告</Tag>
      </div>
      <!-- <div class="more right">
        <nuxt-link class="a-green" to="/">更多<i class="el-icon-plus a-icon-right" /></nuxt-link>
      </div> -->
    </div>
    <div class="content float-wrap">
      <div class="title left ellipsis">
        <nuxt-link :to="{name: 'article-id', params: {id: data.id}}">
          {{data.title}}
        </nuxt-link>
      </div>
      <div class="time right">
        {{data.time}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: Object,
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  border-top: 1px solid $borderColor;
  padding: 13px 0 0;
  line-height: 26px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  max-width: 210px;
}
.time {
  color: $fontColorXLight;
}
</style>
