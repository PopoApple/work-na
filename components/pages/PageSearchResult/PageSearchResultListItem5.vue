<template>
  <ListItem class="PageSearchResultListItem5" :showActiveStyle="true" :type="$isMobile ? 'border' : 'card'" :btnsPosition="$isMobile ? 'right' : 'right'" :route="$isMobile ? { name: 'zhaocai-id', params: { id: data.id } } : null"> 
    <ListItemCol :width="110" v-if="!$isMobile" class="time-col">
      <ListItemLine  bold fontSize="fontSize2XL">
        {{`${data.publishTime ? data.publishTime.slice(5, 7) : null}.${data.publishTime ? data.publishTime.slice(-2) : null}`}}
      </ListItemLine>
      <ListItemLine color="fontColorLight" :lineHeight="22">
        {{data.publishTime ? data.publishTime.slice(0, 4) : null}}
      </ListItemLine>
    </ListItemCol>
    <ListItemCol :width="$isMobile ? 480 : 920">
      <ListItemLine bold ellipsis>
        <nuxt-link :to="{ name: 'zhaocai-id', params: { id: data.id } }">
          <div v-html="data.bidTitle" class="ellipsis"></div>
        </nuxt-link>
      </ListItemLine>
      <ListItemLine ellipsis color="fontColorLight">
        <span>地区：<span v-html="data.region"></span></span>
        <span v-if="$isMobile" class="time">{{ data.publishTime }}</span>
      </ListItemLine>
    </ListItemCol>
    <ListItemCol :width="$isMobile ? 180 : 140" textAlign="right">
      <div class="tag-wrap">
        <Tag v-if="!!data.bidBusinessType" type="primary" :size="$isMobile ? 'small' : null" :effect="$isMobile ? 'dark' : null"><span v-html="data.bidBusinessType"></span></Tag>
      </div>
    </ListItemCol>
  </ListItem>
</template>

<script>

export default {
  props: {
    data: Object,
    isAll: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.PageSearchResultListItem5 {
  .time-col {
    position: relative;
    &::after {
      content: '';
      width: 1px;
      position: absolute;
      right: 30px;
      top: 6px;
      bottom: 6px;
      background: $borderColor;
    }
  }
  .tag-wrap {
    text-align: right;
  }
}
/*------------------------- 移动端 -------------------------*/
.RootIsMobile {
  .time {
    display:inline-block;
    margin-left: 40px;
  }
}
</style>
