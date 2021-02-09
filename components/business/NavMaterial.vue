<template>
  <nav :class="{'nav-index': isIndex}">
    <ul class="nav-ul">
      <li
        v-for="link in links"
        :key="link.slug"
        :class="{'link-choose': link.href === path || '/m' + link.href === path || link.href + '/' === path || '/m' + link.href+'/' === path }"
      >
        <nuxt-link class="nav-a" :key="link.href" :to="link.href">{{ link.name }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    computed: {
      isIndex() {
        let path = this.$nuxt.$route.path
        // 从手机端切换到pc端，该样式会失效，即使刷新也无法解决，只有从其他页面切回来才有显示该样式
        return this.$nuxt.$route.path === '/material/'
      },
      path() {
        return this.$nuxt.$route.path
      }
    },
    data() {
      return {
        links: [
          { slug: '1', name: '建材首页', href: '/material' },
          { slug: '2', name: '商品供应', href: '/material/goods' },
          { slug: '3', name: '全部商家', href: '/material/merchant' }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
nav {
  height: 40px;
  line-height: 38px;
  // padding-bottom: 2px;
  // margin-top: 15px;
}
.nav-index {
  position: absolute;
  top: -10px;
  left: 220px;
}
.link-choose {
  border-bottom: 2PX $colorGreen solid;
}
.link-choose a{
  color: $colorGreen;
}
.nav-a{
  font-size: $fontSizeL;
  font-weight: bold;
}
.nav-ul {
  overflow: hidden;
}

.nav-ul li {
  float: left;
  margin: 0 30px;
}
.RootIsMobile {
  nav {
    // background-color: $colorWhite;
    height: 80px;
    line-height: 80px;
  }
  .nav-ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: $colorWhite;
  }
  .nav-a{
    font-size: $fontSize;
    font-weight: 400;
  }
}
</style>
