<template>
  <Form size="medium" class="form-wrap" :label-width="labelWidth">
    </Row>
      <Col :span="halfColSpan">
        <FormItem label="昵称:">{{ data.name }}</FormItem>
      </Col>
      <Col :span="halfColSpan">
        <FormItem label="电话:">{{ data.phone }}</FormItem>
      </Col>
      <Col :span="halfColSpan">
        <FormItem label="出生日期:">{{ data.born }}</FormItem>
      </Col>
      <Col :span="halfColSpan">
        <FormItem label="性别:">{{ data.sex ? '女' : '男'}}</FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script>
  import { pxtorem } from '~/utils'
  export default {
    props: {
      data: Object,
    },
    computed: {
      halfColSpan() {
        return this.$isMobile ? 24 : 12
      },
      labelWidth() {
        return pxtorem(this.$isMobile ? 200 : 100)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .form-wrap {
    margin-top: 30px;
  }
</style>