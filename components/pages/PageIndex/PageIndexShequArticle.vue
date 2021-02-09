<template>
  <Card title="社区文章" class="PageIndexShequArticle" :isAlink="true" :btnRoute="conschinaCommunityArticleMore">
    <ul>
      <ListItem v-for="item in data" :key="item.id" type="normal">
        <ListItemCol :width="$isMobile ? 204 : 120">
          <a :href="conschinaCommunityArticle + item.id" target="_blank">
            <CcImage :src="item.imgSrc ? item.imgSrc + imgSufix : ''" :width="imgSize" :height="imgSize" />
          </a>
        </ListItemCol>
        <ListItemCol :width="$isMobile ? 480 : 285" :ellipsis="false">
          <ListItemLine :ellipsis="false" class="ellipsis2" :lineHeight="$isMobile ? 22 : null">
            <a :href="conschinaCommunityArticle + item.id" target="_blank">
              {{item.title}}
            </a>
          </ListItemLine>
          <ListItemLine color="colorGreen" v-if="item.author || item.type">
            {{item.author}} <span v-if="item.author && item.type">|</span> {{item.type}}
          </ListItemLine>
          <ListItemLine color="fontColorLight">
            <div class="infoLine ellipsis">
              <span class="time infoLineitem">
                {{item.time}}
              </span>
              <span class="commendCount infoLineitem">
                <i class="iconimg i-commentCount" />
                {{item.commendCount}}
              </span>
              <span class="viewCount infoLineitem">
                <i class="iconimg i-viewCount" />
                {{item.viewCount}}
              </span>
            </div>
          </ListItemLine>
        </ListItemCol>
      </ListItem>
    </ul>
  </Card>
</template>

<script>
import { conschinaCommunityArticleMore, conschinaCommunityArticle, SHEQU100 } from '~/assets/js/constants'

export default {
  props: {
    data: Array
  },
  data() {
    return {
      conschinaCommunityArticleMore, conschinaCommunityArticle
    }
  },
  computed: {
    imgSize() {
      return this.$isMobile ? 174 : 100
    },
    imgSufix() {
      return SHEQU100
    },
  },
}
</script>

<style lang="scss" scoped>
.PageIndexShequArticle {
  .i-commentCount {
    background-image: url('~static/img/icon/commend-gray.png');
    width: 13PX;
    height: 12PX;
    top: 2PX;
  }
  .i-viewCount {
    background-image: url('~static/img/icon/view-gray.png');
    width: 15PX;
    height: 11PX;
    top: 1PX;
  }
  .infoLineitem {
    width: 60px;
    display: inline-block;
  }
  .infoLineitem.time {
    width: 100px;
  }
}
/*------------------------- 移动端 -------------------------*/
.RootIsMobile {
  .PageIndexShequArticle {
    .infoLineitem {
      width: 100px;
    }
    .infoLineitem.time {
      width: 160px;
    }
  }
}
</style>
