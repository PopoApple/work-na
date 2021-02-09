<template>
  <nav class="Nav">
    <ul class="ul">
      <li v-for="link in links" :key="link.url">
        <Dropdown placement="bottom" v-if="!$isMobile && link.children && link.children.length > 0">
          <NavLink :link="link" :isActive="currentUrl === link.url" />
          <DropdownMenu slot="dropdown">
            <nuxt-link v-for="child in link.children" :key="child.url" :to="child.url" class="childLink">
              <DropdownItem >
                {{ child.name }}
              </DropdownItem>
            </nuxt-link>
          </DropdownMenu>
        </Dropdown>
        <NavLink v-else :link="link" :isActive="currentUrl === link.url" />
      </li>
    </ul>
  </nav>
</template>

<script>
import { conschinaCommunity } from '~/assets/js/constants'

const links = [
  { name: '首页', url: '/', icon: 'iconimg i-home' },
  { name: '建材信息', url: '/material/', icon: 'iconimg i-jiancai', children: [
    { name: '商品供应', url: '/material/goods/' },
    { name: '全部商家', url: '/material/merchant/' },
  ] },
  { name: '招采信息', url: '/zhaocai/', icon: 'iconimg i-zhaocai' },
  // { name: '我需要', url: '/need/', icon: 'iconimg i-xuyao' },
  // { name: '我提供', url: '/provide/', icon: 'iconimg i-tigong' },
  { name: '建筑社区', url: conschinaCommunity, isALink: true, icon: 'iconimg i-shequ' },
  // { name: '找工作', url: '/job/', icon: 'iconimg i-gongzuo' },
]
export default {
  data() {
    return {
       links
    }
  },
  computed: {
    currentUrl() {
      let path = this.$route.path
      path = path.replace(/^\/m\//, '/')
      let firstPath = path.split('/')[1]
      firstPath = firstPath ? '/' + firstPath + '/' : '/'
      let link = this.links.find(d => {
        return d.url === firstPath
      })
      return link ? link.url : null
    },
  },
}
</script>

<style lang="scss" scoped>
.Nav {
  .ul {
    overflow: hidden;
  }
  .ul {
    li {
      float: left;
      padding-right: 70px;
    }
    i {
      margin-right: 4px;
    }
  }
  .childLink {
    display: block;
  }
}

/*---------------以下是移动端---------------*/
.RootIsMobile { 
  .Nav {
    .ul li {
      float: none;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
