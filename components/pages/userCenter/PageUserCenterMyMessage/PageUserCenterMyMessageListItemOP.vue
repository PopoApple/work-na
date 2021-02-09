<template>
  <!-- <ListItem type="card" :btnsPosition="$isMobile ? 'bottom' : 'split'"> -->
  <ListItem type="card">
    <ListItemCol v-if="!$isMobile" :width="$isMobile ? 48 : 36">
      <Checkbox
        class="checkbox"
        :value="checked?true:false"
        @change="e => $emit('check', data.id, e)"
      ></Checkbox>
    </ListItemCol>
    <ListItemCol fontSize="fontSizeL">
      <ListItemLine bold>
        <el-collapse
          :title="data.content"
          :width="$isMobile ? 644 : 640"
          @change="$emit('view', data.id,data.status,dataIndex)"
        >
          <el-collapse-item>
            <template #title>
              <Tag
                size="mini"
                v-if="data&&data.status"
                :type="data?data.status === 1?'warning':'':''"
              >{{data?data.status === 1?'未读':'已读':''}}</Tag>&nbsp;
              <span class="ellipsis title">{{data.title}}</span>
            </template>
            <span class="content">{{data.content}}</span>
          </el-collapse-item>
        </el-collapse>
      </ListItemLine>
      <ListItemLine :width="$isMobile ? 500 : 440">{{data.createTime}}</ListItemLine>
    </ListItemCol>
    <template slot="infoBottom">
      <Button type="text" icon="el-icon-delete" circle @click="$emit('delete', data.id)"></Button>
    </template>
  </ListItem>
</template>

<script>
  import { Carousel, CarouselItem, Collapse, CollapseItem } from 'element-ui'
  export default {
    props: {
      data: Object,
      statusDict: Array,
      checked: Boolean,
      dataIndex: Number
    },
    components: {
      ElCarousel: Carousel,
      ElCarouselItem: CarouselItem,
      ElCollapse: Collapse,
      ElCollapseItem: CollapseItem
    }
  }
</script>

<style lang="scss" scoped>
  // 修改折叠样式
  .el-collapse{
    border-top: 0px;
  }
  .el-collapse /deep/ .el-collapse-item__header{
    // height: 10px;
    border-bottom:0px;
  }
  /deep/.el-collapse{
    border-bottom:0px;
  }
  .title{
    width: 500px;
    font-size:$fontSize;
    font-weight: bold;
  }
  .content{
    font-weight: 500;
    white-space: normal;
  }
  .RootIsMobile {
    // .title{
    //   width: 500px;
    // }
    /deep/.el-collapse{
      border-bottom:0px;
    }
  }
</style>
