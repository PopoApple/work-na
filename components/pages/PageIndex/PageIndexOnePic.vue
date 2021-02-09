<template>
  <nuxt-link to="aPicture" class="PageIndexOnePic bg-img">
    一张图带你看懂广新纳
  </nuxt-link>
</template>

<script>

export default {
  props: {
    data: Object,
  },
}
</script>
<style lang="scss" scoped>
a.PageIndexOnePic {
  margin: 50px 0 20px 0;
  display: block;
  height: 130px;
  line-height: 130px;
  background-image: url('~static/img/one-pic.png');
  font-size: 28px;
  text-align: center;
  color: #fff;
  &:hover {
    color: #fff;
  }
}

.RootIsMobile {
  a.PageIndexOnePic {
    margin: 20px 0 0 0;
    height: 254px;
    line-height: 254px;
    font-size: 18px;
    background-position-x: -200px;
    background-size: 1050px 254px;
  }
}
</style>
