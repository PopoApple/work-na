<template>
  <Card class="PageIndexZhaocaiList" title="招采信息" :showTitle="$isMobile" :type="$isMobile ? null : 'simple'" btnRoute="/zhaocai">
    <ul>
      <ListItem v-for="item in data" :key="item.id" :type="$isMobile ? null : 'card'" :btnsPosition="$isMobile ? 'right' : 'right'" :route="{ name: 'zhaocai-id', params: { id: item.id } }"> 
        <ListItemCol :width="110" v-if="!$isMobile" class="time-col">
          <ListItemLine  bold fontSize="fontSize2XL">
            {{`${item.month}.${item.date}`}}
          </ListItemLine>
          <ListItemLine color="fontColorLight" :lineHeight="22">
            {{item.year}}
          </ListItemLine>
        </ListItemCol>
        <ListItemCol :width="$isMobile ? 500 : 300">
          <ListItemLine bold ellipsis>
            {{item.title}}
          </ListItemLine>
          <ListItemLine ellipsis color="fontColorLight">
            <span>地区：{{item.area}}</span>
            <span v-if="$isMobile" class="time">{{ item.time }}</span>
          </ListItemLine>
        </ListItemCol>
        <ListItemCol :width="$isMobile ? 160 : 100">
          <div class="tag-wrap">
            <Tag v-if="!!item.tag" type="primary" :size="$isMobile ? 'small' : null" :effect="$isMobile ? 'dark' : null">{{item.tag}}</Tag>
          </div>
        </ListItemCol>
      </ListItem>
    </ul>
  </Card>
</template>

<script>

export default {
  props: {
    data: Array
  },
}
</script>

<style lang="scss" scoped>
.PageIndexZhaocaiList {
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
    text-align: center;
    .el-tag {
      width: 90px;
    }
  }
}
/*------------------------- 移动端 -------------------------*/
.RootIsMobile {
  .time {
    display:inline-block;
    margin-left: 40px;
  }
  .tag-wrap {
    text-align: center;
    .el-tag {
      width: auto;
    }
  }
}
</style>
