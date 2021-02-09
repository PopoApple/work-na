<template>
  <Card title="建筑规范" class="PageIndexShequRules" :isAlink="true" :btnRoute="conschinaCommunityRulesMore">
    <ul>
      <ListItem v-for="item in data" :key="item.id" type="normal" :narrow="!$isMobile">
        <ListItemCol :width="$isMobile ? 690 : 400">
          <ListItemLine class="lineType">
            <Tag size="mini">{{ item.type }}</Tag>
          </ListItemLine>
          <ListItemLine class="lineTitle" ellipsis :lineHeight="35">
            <a :href="conschinaCommunityArticle + item.id" target="_blank">
              {{item.title}}
            </a>
          </ListItemLine>
        </ListItemCol>
      </ListItem>
    </ul>
  </Card>
</template>

<script>
import { conschinaCommunityRulesMore, conschinaCommunityArticle } from '~/assets/js/constants'

export default {
  props: {
    data: Array
  },
  data() {
    return {
      conschinaCommunityRulesMore, conschinaCommunityArticle
    }
  },
}
</script>

<style lang="scss" scoped>
.PageIndexShequRules {
  .lineTitle {
    padding-left: 30px;
  }
  .lineType {
    &:before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 1px solid $borderColor;
      top: 10px;
      left: 0;
      display: inline-block;
      margin-right: 19px;
    }
  }
}
/*------------------------- 移动端 -------------------------*/
.RootIsMobile {
  
}
</style>
