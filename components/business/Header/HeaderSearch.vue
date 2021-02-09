<template>
  <SearchInput v-model="value" :hasBtn="!$isMobile" @search="handleSearch" />
</template>

<script>
const isSearchPage = path => {
  return path === '/searchResult' || path === '/m/searchResult' || path === '/searchResult/' || path === '/m/searchResult/'
}

export default {
  data() {
    return {
      value: isSearchPage(this.$route.path) ? this.$route.query['keyword'] : null,
    }
  },
  methods: {
    handleSearch(e) {
      this.$router.push({ name: 'searchResult', query: { keyword: this.value || undefined, type: isSearchPage(this.$route.path) && this.$route.query.type ? this.$route.query.type : undefined } })
    }
  },
}
</script>
