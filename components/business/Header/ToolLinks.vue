<template>
  <div class="ToolLinks">
    <ul class="ul">
      <li v-for="link in links" :key="link.id">
        <nuxt-link :key="link.url" :to="link.url">
          <i :class="link.icon" />
          {{ link.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
const links = [
  { id: "8", name: "浏览记录", icon: 'iconimg i-view_records', url: "/records" },
  { id: "9", name: "我的收藏", icon: 'iconimg i-my_collections', url: "/userCenter/myCollection" },
  { id: "10", name: "我的关注", icon: 'iconimg i-my_focus', url: "/userCenter/myFocus" },
]
export default {
  data() {
    return {
      links
    }
  },
}
</script>

<style lang="scss" scoped>
.ToolLinks {
  .ul {
    overflow: hidden;
  }
  li {
    float: left;
    padding: 0 20px 0 20px;
  }
  li + li {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 1px;
      background: $borderColor;
      height: 14px;
      top: 13px;
      left: 0;
    }
  }
  i {
    margin-right: 4px;
  }
}
</style>
