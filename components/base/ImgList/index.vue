<template>
  <div class="ImgList" :class="{ 'ImgList-normal': !spaceBetween, 'ImgList-spaceBetween': spaceBetween }">
    <div class="img-item" v-for="(item, i) in list" :key="item.uid">
      <ImgView
        :loading="item.loading"
        :src="item.url"
        :route="item.route"
        :showActions="showActions"
        :showDelete="showDelete"
        :width="width + 'px'"
        :height="height + 'px'"
        @preview="handlePreview(item, i)"
        @delete="handleDelete(item)"
      >
        <template slot="bottom">
          <slot name="item-bottom" :data="item" />
        </template>
      </ImgView>
    </div>
    <slot />
    <!-- <van-image-preview v-if="list && list.length > 0" v-model="previewShow" :images="list.map(d => d.url)" :closeable="true" :start-position="startPosition" class-name="ImgList-image-preview" @change="handlePreviewChange" ref="imagePreview">
      <template v-slot:index>{{previewIndex + 1}} / {{list.length}}</template>
      <template slot="cover">
        <i class="el-icon-delete" @click="handleDelete(list[previewIndex], previewIndex)" />
      </template>
    </van-image-preview>-->
  </div>
</template>

<script>
  import { uuid } from '~/utils'
  //import { ImagePreview } from 'vant'

  export default {
    name: 'ImgList',
    // components: {
    //   VanImagePreview: ImagePreview.Component,
    // },
    props: {
      value: {
        type: Array,
        default: () => {
          return []
        }
      },
      showActions: {
        type: Boolean,
        default: true
      },
      showDelete: {
        type: Boolean
      },
      width: {
        type: Number,
        default: 148
      },
      height: {
        type: Number,
        default: 148
      },
      spaceBetween: Boolean,
    },
    computed: {
      list() {
        if (!this.value) {
          return null
        }
        return this.value.map(d => {
          if (typeof d === 'string') {
            return { uid: uuid(8, 10), url: d }
          }
          return d
        })
      }
    },
    // data() {
    //   return {
    //     previewShow: false,
    //     previewIndex: 0,
    //     startPosition: 0,
    //   }
    // },
    methods: {
      // handlePreview(item, i) {
      //   this.previewShow = true
      //   this.startPosition = i
      // },
      // handlePreviewChange(index) {
      //   this.previewIndex = index
      // },
      handleDelete(row, i) {
        let newFileList = this.list.filter(d => d.uid !== row.uid)
        this.$emit('change', newFileList, row.id)
        // if (this.$isMobile) {
        //   let len = newFileList.length
        //   if (len === 0) {
        //     this.previewShow = false
        //   } else {
        //     this.previewIndex = (i === 0 ? 0 : i - 1)
        //     this.startPosition = this.previewIndex
        //     this.$refs['imagePreview'].swipeTo(this.previewIndex)
        //   }
        // }
      }
    }
  }
</script>

<style lang="scss" scoped>
.ImgList {
  display: flex;
  flex-wrap: wrap;
  .van-image-preview__cover {
    top: auto;
    bottom: 20px;
    width: 100%;
    i {
      color: #fff;
      font-size: 28px;
      display: block;
      margin: 0 auto;
      width: 96px;
      height: 96px;
      text-align: center;
      line-height: 96px;
    }
  }
}

.ImgList.ImgList-normal {
  margin-right: -20px;
  .img-item {
    margin: 0 20px 20px 0;
  }
}

.ImgList.ImgList-spaceBetween {
  justify-content: space-between;
  .img-item {
    margin: 0 0 20px 0;
  }
}

 
</style>


