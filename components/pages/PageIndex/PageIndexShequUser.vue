<template>
  <Card title="社区用户排行榜" class="PageIndexShequUser" :isAlink="true" :btnRoute="conschinaCommunityUserMore">
    <ul>
      <ListItem v-for="(item, i) in data" :key="item.id" type="normal">
        <ListItemCol :width="$isMobile ? 70 : 30" :fontSize="$isMobile ? 'fontSize2XL' : null" :color="i <= 2 ? null : 'fontColorXLight'" bold :style="i <= 2 ? { color: getNoColor(i) } : null">
          {{ item.no }}
        </ListItemCol>
        <ListItemCol :width="$isMobile ? 127 : 62">
          <a :href="conschinaCommunityUser + item.title" target="_blank">
            <div class="bg-img img" :style="{backgroundImage: `url(${item.imgSrc || nologinImg}${item.imgSrc && item.imgSrc.indexOf('x-oss-process') >= 0 ? '' : imgSufix})`}"></div>
          </a>
        </ListItemCol>
        <ListItemCol :width="$isMobile ? 340 : 100">
          <ListItemLine ellipsis>
            <a :href="conschinaCommunityUser + item.title" target="_blank">
              {{item.title}}
            </a>
          </ListItemLine>
        </ListItemCol>
        <ListItemCol :width="$isMobile ? 100 : 50" textAlign="right">
          {{ item.viewCount }}
        </ListItemCol>
      </ListItem>
    </ul>
  </Card>
</template>

<script>
import styleVars from '~/assets/style/vars.scss'
import { conschinaCommunityUser, conschinaCommunityUserMore, defaultUser01, defaultUser02, SHEQUTOU42 } from '~/assets/js/constants'

export default {
  props: {
    data: Array
  },
  data() {
    return {
      conschinaCommunityUser, conschinaCommunityUserMore
    }
  },
  computed: {
    nologinImg() {
      return this.$isMobile ? defaultUser02 : defaultUser01
    },
    imgSufix() {
      return SHEQUTOU42
    },
  },
  methods: {
    getNoColor(i) {
      if (i === 0) {
        return styleVars.colorRed
      } else if (i === 1) {
        return styleVars.colorOrange
      } else if (i === 2) {
        return styleVars.colorYellow
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.PageIndexShequUser {
  .img {
    display: block;
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
}
/*------------------------- 移动端 -------------------------*/
.RootIsMobile {
  .img {
    display: block;
    width: 97px;
    height: 97px;
  }
}
</style>
