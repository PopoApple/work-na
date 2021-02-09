<template>
  <ul @click="onPagerClick" class="el-pager">
    <li :class="{ active: currentPage === 1, disabled }" v-if="pageCount > 0" class="number">
      <template v-if="currentPage === 1">1</template>
      <nuxt-link v-else :to="getPageRoute(1)">1</nuxt-link>
    </li>
    <li
      class="el-icon more btn-quickprev"
      :class="[quickprevIconClass, { disabled }]"
      v-if="showPrevMore"
      @mouseenter="onMouseenter('left')"
      @mouseleave="quickprevIconClass = 'el-icon-more'"
    ></li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="{ active: currentPage === pager, disabled }"
      class="number"
    >
      <template v-if="currentPage === pager">{{ pager }}</template>
      <nuxt-link v-else :to="getPageRoute(pager)">{{ pager }}</nuxt-link>
    </li>
    <li
      class="el-icon more btn-quicknext"
      :class="[quicknextIconClass, { disabled }]"
      v-if="showNextMore"
      @mouseenter="onMouseenter('right')"
      @mouseleave="quicknextIconClass = 'el-icon-more'"
    ></li>
    <li
      :class="{ active: currentPage === pageCount, disabled }"
      class="number"
      v-if="pageCount > 1"
    >
      <template v-if="currentPage === pageCount">{{ pageCount }}</template>
      <nuxt-link v-else :to="getPageRoute(pageCount)">{{ pageCount }}</nuxt-link>
    </li>
    <template>
      <li class="Pagination-hiddenPager" v-for="item in hiddenPagers" :key="item">
        <nuxt-link :to="getPageRoute(item)">
          {{ item }}
        </nuxt-link>
      </li>
    </template>
  </ul>
</template>

<script type="text/babel">
  export default {
    name: 'ElPager',

    props: {
      currentPage: Number,

      pageCount: Number,

      pagerCount: Number,

      disabled: Boolean,
    },

    watch: {
      showPrevMore(val) {
        if (!val) this.quickprevIconClass = 'el-icon-more'
      },

      showNextMore(val) {
        if (!val) this.quicknextIconClass = 'el-icon-more'
      },
    },

    methods: {
      getPageRoute(page) {
        return { ...this.$route, query: { ...this.$route.query, page } }
      },
      onPagerClick(event) {
        const target = event.target
        if (target.tagName === 'UL' || this.disabled) {
          return
        }

        let newPage = Number(event.target.textContent)
        const pageCount = this.pageCount
        const currentPage = this.currentPage
        const pagerCountOffset = this.pagerCount - 2

        if (target.className.indexOf('more') !== -1) {
          if (target.className.indexOf('quickprev') !== -1) {
            newPage = currentPage - pagerCountOffset
          } else if (target.className.indexOf('quicknext') !== -1) {
            newPage = currentPage + pagerCountOffset
          }
        }

        /* istanbul ignore if */
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1
          }

          if (newPage > pageCount) {
            newPage = pageCount
          }
        }

        if (newPage !== currentPage) {
          if (target.className.indexOf('more') !== -1) {
            this.$emit('change', newPage)
          }
        }
      },

      onMouseenter(direction) {
        if (this.disabled) return
        if (direction === 'left') {
          this.quickprevIconClass = 'el-icon-d-arrow-left'
        } else {
          this.quicknextIconClass = 'el-icon-d-arrow-right'
        }
      },
    },

    computed: {
      pagers() {
        const pagerCount = this.pagerCount
        const halfPagerCount = (pagerCount - 1) / 2

        const currentPage = Number(this.currentPage)
        const pageCount = Number(this.pageCount)

        let showPrevMore = false
        let showNextMore = false

        if (pageCount > pagerCount) {
          if (currentPage > pagerCount - halfPagerCount) {
            showPrevMore = true
          }

          if (currentPage < pageCount - halfPagerCount) {
            showNextMore = true
          }
        }

        const array = []

        if (showPrevMore && !showNextMore) {
          const startPage = pageCount - (pagerCount - 2)
          for (let i = startPage; i < pageCount; i++) {
            array.push(i)
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 2; i < pagerCount; i++) {
            array.push(i)
          }
        } else if (showPrevMore && showNextMore) {
          const offset = Math.floor(pagerCount / 2) - 1
          for (let i = currentPage - offset; i <= currentPage + offset; i++) {
            array.push(i)
          }
        } else {
          for (let i = 2; i < pageCount; i++) {
            array.push(i)
          }
        }

        this.showPrevMore = showPrevMore
        this.showNextMore = showNextMore

        return array
      },
      hiddenPagers() {
        const pageCount = Number(this.pageCount)
        let pages = []
        for (let i = 1; i <= pageCount; i++) {
          if (i !== 1 && i !== pageCount && this.pagers.indexOf(i) < 0) {
            pages.push(i)
          }
        }
        return pages
      },
    },

    data() {
      return {
        current: null,
        showPrevMore: false,
        showNextMore: false,
        quicknextIconClass: 'el-icon-more',
        quickprevIconClass: 'el-icon-more',
      }
    },
  }
</script>

<style lang="scss">
.el-pager li.Pagination-hiddenPager {
  display: none;
}
</style>
