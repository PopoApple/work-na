<template>
    <div>
      <div class="card" v-loading="loading" element-loading-background="transparent" :style="{width: pxtorem(width), height: pxtorem(height)}" @click="$isMobile && showActions ? handlePreview() : null">
        <!-- <template v-if="!!src"> -->
          <nuxt-link v-if="route" :to="route">
            <!-- <img :src="src" /> -->
            <CcImage :src="src" :width="ccImgWidth"  :height="ccImgHeight" />
          </nuxt-link>
          <!-- <img v-else :src="src" /> -->
          <CcImage v-else :src="src" :width="ccImgWidth"  :height="ccImgHeight" />
          <span class="actions" v-if="!$isMobile && showActions">
            <span class="preview" @click="handlePreview">
              <i class="el-icon-zoom-in"></i>
            </span> 
            <span v-if="showDelete" class="delete" @click="handleDeleteFile()">
              <i class="el-icon-delete"></i>
            </span>
          </span>
          <Dialog v-if="dialogVisible" :simple="true" @close="handleClose" append-to-body>
            <img width="100%" :src="src" alt="">
            <div v-if="showDelete && $isMobile" class="fixedDeleteBtn">
              <i class="el-icon-delete" @click="handleDeleteFile()"></i>
            </div>
          </Dialog>
        <!-- </template> -->
      </div>
      <div>
        <slot name="bottom" />
      </div>
    </div>
</template>

<script>
import { pxtorem } from '~/utils'

export default {
  name: 'ImgView',
  props: {
    src: String,
    showActions: {
      type: Boolean,
      default: true,
    },
    showDelete: Boolean,
    width: {
      type: String,
      default: '300px',
    },
    height: {
      type: String,
      default: '200px',
    },
    loading: Boolean,
    route: Object,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    ccImgWidth() {
      return this.width && this.width.slice(-2) === 'px' ? parseInt(this.width.slice(0, -2)) : null
    },
    ccImgHeight() {
      return this.height && this.height.slice(-2) === 'px' ? parseInt(this.height.slice(0, -2)) : null
    },
  },
  methods: {
    pxtorem,
    handleDeleteFile() {
      this.$emit('delete')
    },
    handlePreview() {
      // if (this.$isMobile) {
      //   this.$emit('preview')
      // } else {
        this.dialogVisible = true
      //}
    },
    handleClose() {
      this.dialogVisible = false
    }
  },
}
</script>

<style lang="scss" scoped>
 .card {
    position: relative;
    overflow: hidden;
    border-radius: $borderRadius;
    background-color: $bgColorGray;
    box-sizing: border-box;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
    // img {
    //   width: 100%;
    //   height: 100%;
    //   display: block;
    // }
 }
 .actions {
   position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s;
    span {
      cursor: pointer;
    }
    span + span {
      margin-left: 15px;
    }
 }
 .actions:after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }
 .actions:hover {
    opacity: 1;
  }
  .fixedDeleteBtn {
    position: fixed;
    z-index: 2002;
    top: 0;
    height: 120px;
    line-height: 120px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 28px;
    color: #fff;
  }
</style>


