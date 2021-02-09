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
              <nuxt-link
                class="comment-name"
                v-if="data.merchantFlag"
                :to="{
                  name: 'material-merchant-merchantDetail-id',
                  params: { id: data.userId },
                }"
              >{{ data.commentUserName }}</nuxt-link>
              <span v-else class="comment-name">{{data.commentUserName}}</span>

              <span class="title-constant">{{data.messageType === 1?'评论':'回复'}}了你:</span>
              <span class="ellipsis title">{{data.commentContent}}</span>
            </template>
            <div class="content-div">
              <span class="content">{{data.commentContent}}</span>
              <div class="content-title ellipsis">
                <nuxt-link
                  v-if="data.originType === 1"
                  :to="{
                    name: 'material-goods-goodsDetail-id',
                    params: { id: data.originId},
                  }"
                >{{ data.title }}</nuxt-link>
              </div>
            </div>
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
    color: $fontColorXLight;
  }
  .content{
    margin-left: 10px;
    font-weight: 500;
    white-space: normal;
  }
  .title-constant{
    margin: 0 10px;
    color: $fontColorXLight;
    font-size:$fontSize;
  }
  .content-div{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .content-title{
    margin-top: 10px;
    padding: 10px;
    width: 640px;
    border-radius: $borderRadius;
    background-color: $bgColorGrayLight;
  }
  .comment-name{
    font-weight: bold;
    font-size: $fontSizeL;
  }
  .RootIsMobile {
    /deep/.el-collapse{
      border-bottom:0px;
    }
    .content-title{
      width: 600px;
    }
    .title{
      width: 370px;
    }
  }
</style>
