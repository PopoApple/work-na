<template>
  <ListItem type="card" :btnsPosition="$isMobile ? 'bottom' : 'split'">
    <ListItemCol fontSize="fontSizeOdd">
      <ListItemLine bold :width="$isMobile ? 500 : 440">{{data.title}}</ListItemLine>
      <ListItemLine :width="$isMobile ? 644 : 640">{{data.content}}</ListItemLine>
    </ListItemCol>
    <template slot="infoTop">
      <Status :dict="statusDict" :value="data.status" textAlign="right" />
    </template>
    <template slot="btns">
      <Button class="Button30" @click="$emit('view', data.originType,data.originId)">查看</Button>
      <Button
        class="Button30"
        v-if="data&&data.status&&data.status === 2"
        @click="$emit('close', data.id)"
      >关闭</Button>
    </template>
  </ListItem>
</template>

<script>
  export default {
    props: {
      data: Object,
      statusDict: Array
    }
  }
</script>

<style lang="scss" scoped>
</style>
