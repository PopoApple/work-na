<template>
  <ListItem class="PageSearchResultListItem8" :showActiveStyle="true" :type="isAll ? ($isMobile ? 'border' : 'card') : 'normal'" :route="$isMobile ? '/' : null" :class="{'PageSearchResultListItem8-isAll': isAll, 'PageSearchResultListItem8-notAll': !isAll}">
    <ListItemCol :width="$isMobile ? 220 : (isAll ? 180: 295)">
      <a :href="conschinaCommunityArticle + data.id" target="_blank">
        <CcImage :src="data.coverImageUrl ? data.coverImageUrl + imgSufix : ''" :width="imgW" :height="imgH" class="img" />
      </a>
    </ListItemCol>
    <ListItemCol :ellipsis="false">
      <ListItemLine :width="$isMobile ? 470 : (isAll ? 980 : 885)" :fontSize="$isMobile ? null : 'fontSizeXL'" :lineHeight="$isMobile ? null : 36" bold>
        <a :href="conschinaCommunityArticle + data.id" target="_blank">
          <div v-html="data.title" class="ellipsis"></div>
        </a>
      </ListItemLine>
      <ListItemLine :width="$isMobile ? 470 : (isAll ? 980 : 885)" color="fontColorLight" :ellipsis="false" class="line-content" :class="$isMobile || isAll ? 'ellipsis' : 'ellipsis2'">
        {{data.intro}}
      </ListItemLine>
      <ListItemLine color="fontColorLight" :lineHeight="$isMobile ? null : 36">
        <div class="infoLine ellipsis">
          <span class="commendCount infoLineitem">
            <i class="iconimg i-user" />
            {{data.createUserName}}
          </span>
          <span class="viewCount infoLineitem">
            <i class="iconimg i-viewCount" />
            {{data.readCount || 0}}
          </span>
        </div>
      </ListItemLine>
    </ListItemCol>
    <template slot="infoBottom" v-if="!$isMobile">
      <Button size="small" class="detail-btn" @click="goto(conschinaCommunityArticle + data.id)">查看详情 &gt;</Button>
    </template>
  </ListItem>
</template>

<script>
import { conschinaCommunityArticle, SEARCHSHEQU260X150 } from '~/assets/js/constants'

  export default {
    props: {
      data: Object,
      isAll: Boolean,
    },
    data() {
      return {
        conschinaCommunityArticle
      }
    },
    computed: {
      imgW() {
        return this.$isMobile ? 200 : (this.isAll ? 160 : 260)
      },
      imgH() {
        return this.$isMobile ? 150 : (this.isAll ? 95 : 150)
      },
      imgSufix() {
        return SEARCHSHEQU260X150
      },
    },
    methods: {
      goto(a) {
        window.open(a)
      },
    },
  }
</script>

<style lang="scss" scoped>
.PageSearchResultListItem8 {
  .img {
    cursor: pointer;
    display: block;
  }
  .i-user {
    background-image: url('~static/img/icon/user-stick.png');
    width: 13PX;
    height: 12PX;
    top: 1PX;
  }
  .i-viewCount {
    background-image: url('~static/img/icon/view-gray.png');
    width: 15PX;
    height: 11PX;
    top: 0;
  }
  .infoLineitem {
    display: inline-block;
    i {
      margin-right: 5px;
    }
  }
  .infoLineitem + .infoLineitem {
    margin-left: 20px;
  }

  &.PageSearchResultListItem8-notAll {
    .detail-btn {
      margin-right: 20px;
    }
  }

}

.RootNotMobile {
  .PageSearchResultListItem8 {

    &.PageSearchResultListItem8-notAll {
      .img {
        margin-left: 15px;
      }
      .line-content {
        height: 50PX;
        margin: 14px 0;
      }
    }

  }
}
</style>
