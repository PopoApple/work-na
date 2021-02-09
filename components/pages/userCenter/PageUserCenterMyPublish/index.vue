<template>
  <div class="PageUserCenterMyPublish">
    <div class="LayoutLeftMain-header">
      <TabBtn :dict="typeDict" styleType="line" :value="type" @input="handleTypeChange" />
    </div>
    <div class="LayoutLeftMain-body">
      <div class="LayoutLeftMain-statusBar">
        <TabBtn :dict="statusDict" :value="status" @input="handleStatusChange" />
      </div>
    </div>
  </div>
</template>

<script>
import headMixin from '~/assets/js/headMixin'

export default {
  mixins: [headMixin],
  data() {
    return {
      typeDict: [
        { value: '1', label: '我需要' },
        { value: '2', label: '我提供' },
      ],
      statusDict: [
        { value: '1', label: '全部' },
        { value: '2', label: '审核中' },
        { value: '3', label: '已通过' },
        { value: '4', label: '未通过' },
        { value: '5', label: '已撤回' },
        { value: '6', label: '已驳回' },
      ],
      list: []
    }
  },
  computed: {
    type() {
      return this.$route.query['type'] || this.typeDict[0].value
    },
    status() {
      return this.$route.query['status'] || this.statusDict[0].value
    }
  },
  methods: {
    handleTypeChange(e) {
      this.$router.push({ name: this.$route.name, query: { type: e } })
    },
    handleStatusChange(e) {
      this.$router.push({ name: this.$route.name, query: { type: this.$route.query.type, status: e } })
    },
  },
}
</script>
