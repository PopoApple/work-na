<template>
  <div>
    <h2>文本输入框</h2>
    <Input v-model="valueInput" placeholder="请输入" />
    <h2>选择器</h2>
    <Select v-model="valueSelect" placeholder="请选择" :dict="dict" />
  </div>
</template>

<script>
export default {
  layout: 'simple',
  data() {
    return {
        valueInput: '',
        valueSelect: '',
        dict: [
            { value: '1', label: '选项一' },
            { value: '2', label: '选项二' },
            { value: '3', label: '选项三' }
        ],
        carouselData: [
          { id: '1', title: '轮播图1', imgSrc: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' },
          { id: '2', title: '轮播图2', imgSrc: '/_nuxt/static/img/temp/lunbo1.png' },
          { id: '3', title: '轮播图3', imgSrc: '/_nuxt/static/img/temp/lunbo1.png' },
        ],
    }
  },
}
</script>

<style scoped>
.carousel {
  width: 300px;
}
</style>