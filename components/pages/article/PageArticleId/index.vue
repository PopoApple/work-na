<template>
  <Article :date="data.createTime.slice(0, 10)" :title="data.noticeTitle" :viewCount="data.viewCount" :rawhtml="data.noticeContent" :imgUrl="data.titleImageUrl" :prev="data.previousDto" :next="data.nextDto" />
</template>

<script>
export default {
  props: {
    data: Object,
  }
}
</script>