<template>
  <div class="PullUpLoadMore" :class="{'PullUpLoadMore-transparentBg' : transparentBg}">
    <template v-if="loading">
      <span>数据加载中</span>
      <i class="el-icon-loading"></i>
    </template>
    <ul class="PullUpLoadMore-hiddenPager-wrap">
      <li v-for="item in pages" :key="item">
        <nuxt-link :to="getPageRoute(item)">
          {{ item }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      totalpage: {
        type: Number,
        required: true,
      }, 
      loading: {
        type: Boolean,
      },
      offset: {
        type: Number,
        default: 0,
      },
      transparentBg: Boolean,
    },
    computed: {
      pages() {
        let pages = []
        let page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
        for (let i = 1; i <= this.totalpage; i++) {
          if (i !== page) {
            pages.push(i)
          }
        }
        return pages
      }
    },
    data() {
      return {
        totalOffset: 0,
      }
    },
    mounted() {
      let footer = document.querySelector('footer')
      if (footer) {
        this.totalOffset = this.offset + footer.clientHeight
      } 
      window.addEventListener('scroll', this.disposeScroll) 
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.disposeScroll) 
    },
    methods: {
      getPageRoute(page) {
        return { ...this.$route, query: { ...this.$route.query, page } }
      },
      disposeScroll() {
        let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0 // 获取滚动条垂直的位置
        if (top + document.body.clientHeight + this.totalOffset + 1 >= document.body.scrollHeight) { //如果滚动条的位置加上窗口的高度大于可见的窗口可见的高度，那么也就是滚动条到低了
          this.$emit('update') 
        }
      },
    },
  }
</script>

<style lang="scss">
.PullUpLoadMore {
  color: $fontColorXLight;
  text-align: center;
  line-height: 80px;
  background: $bgColorGray;
  .PullUpLoadMore-hiddenPager-wrap {
    display: none;
  }
}
.PullUpLoadMore.PullUpLoadMore-transparentBg {
  background: transparent;
}
</style>
