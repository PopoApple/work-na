<template>
  <ListItem type="card">
    <ListItemCol :width="$isMobile?500:720">
      <ListItemLine bold>
        <Tag size="mini" v-if="tag">{{tag}}</Tag>&nbsp;
        <nuxt-link :to="sourceTo">{{data.title}}</nuxt-link>
      </ListItemLine>
      <ListItemLine>
        <nuxt-link
          class="history-content"
          v-if="data.merchantFlag"
          :to="{
                  name: 'material-merchant-merchantDetail-id',
                  params: { id: data.authorId },
                }"
        >{{ data.author }}</nuxt-link>
        <span v-else class="history-content">{{data.author}}</span>
      </ListItemLine>
      <ListItemLine v-if="$isMobile" class="history-time">{{data.browseTime}}</ListItemLine>
    </ListItemCol>
    <ListItemCol>
      <ListItemLine v-if="$isMobile"></ListItemLine>
      <ListItemLine v-if="!$isMobile" class="history-time">{{data.browseTime}}</ListItemLine>
      <ListItemLine>
        <nuxt-link class="read-detail" :to="sourceTo">查看详情</nuxt-link>
        <Button type="text" icon="el-icon-delete" circle @click="$emit('delete', data.id)"></Button>
      </ListItemLine>
    </ListItemCol>
  </ListItem>
</template>

<script>
  import { validatenull } from '@/utils/validate'
  export default {
    props: {
      data: Object
    },
    computed: {
      // 类型 1商品 2需求 3提供 4职位 5招采 6新闻资讯
      tag() {
        if (!validatenull(this.data.browseType)) {
          let tags = ''
          switch (this.data.browseType) {
            case 1:
              tags = '商品'
              break
            case 2:
              tags = '需求'
              break
            case 3:
              tags = '提供'
              break
            case 4:
              tags = '职位'
              break
            case 5:
              tags = '招采'
              break
            case 6:
              tags = '新闻'
              break
          }
          return tags
        } else {
          return ''
        }
      },
      sourceTo() {
        let to = {}
        if (!validatenull(this.data.browseType)) {
          to.params = { id: this.data.sourceId }
          switch (this.data.browseType) {
            case 1:
              to.name = 'material-goods-goodsDetail-id'
              break
            case 2:
              to.name = ''
              break
            case 3:
              to.name = ''
              break
            case 4:
              to.name = ''
              break
            case 5:
              to.name = 'zhaocai-id'
              break
            case 6:
              to.name = 'article-id'
              break
            case 7:
              to.name = 'material-merchant-merchantDetail-id'
              break
          }
          return to
        } else {
          return to
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.read-detail{
    display: inline-block;
    width: 97px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    box-shadow: $shadow;
    color: $colorGreen !important;
    background-color: $bgColorGray;
    border-radius: $borderRadiusS;
    &:hover {
      color: $colorWhite !important;
      background-color: $colorGreen;
    }
  }

.RootNotMobile {
  .history-content, .history-time {
    color: $fontColorXLight;
  }
  
}


.RootIsMobile {
  .records-list {
    display: block;
    margin: 20px 30px;
    font-size: $fontSizeS;
  }
  img {
    display: block;
    background: #ddd;
    width: 200px;
    height: 150px;
    border-radius: $borderRadius;
  }
  .history-content, .history-time {
    color: $fontColorXLight;
  }
  // 此处布局需要优化
  .ListItemCol {
    justify-content: space-between;
  }
}
</style>
