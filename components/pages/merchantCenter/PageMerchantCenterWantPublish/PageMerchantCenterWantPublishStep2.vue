<template>
  <div class="PageMerchantCenterWantPublishStep2">
    <PageMerchantCenterPublishGoods
      v-if="publishType ===1"
      @saveSuccess="saveSuccess"
      @returnBack="returnBack"
    />
  </div>
</template>

<script>
  import { pxtorem } from '~/utils'

  export default {
    name: 'PageMerchantCenterWantPublishStep2',
    props: {
      publishType: Number
    },
    computed: {},
    data() {
      return {}
    },
    created() {
      // if (this.data) {
      //   this.form = {
      //     name: this.data.name
      //   }
      // }
    },
    methods: {
      saveSuccess() {
        this.$emit('saveSuccess')
      },
      returnBack() {
        this.$emit('returnBack')
      }
    }
  }
</script>

