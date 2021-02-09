export default {
  head() {
    let routeMeta = this.$route.meta
    let meta = []
    if (routeMeta.keywords) {
      meta.push({ hid: 'keywords', name: 'keywords', content: routeMeta.keywords })
    }
    if (routeMeta.description) {
      meta.push({ hid: 'description', name: 'description', content: routeMeta.description })
    }
    return {
      title: routeMeta.seoTitle,
      meta,
    }
  },
}