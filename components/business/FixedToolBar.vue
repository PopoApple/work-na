<template>
  <div class="FixedToolBar" :style="{ opacity: show ? 1 : 0, display: exsit ? 'block' : 'none' }">
    <div class="FixedToolBar-item FixedToolBar-feedback iconfont icon-fankui" title="留言反馈" @click="modalShow=true">
    </div>
    <div class="FixedToolBar-item FixedToolBar-totop iconfont icon-upward" title="回到顶部" @click="gotop">
    </div>
    <UserReportModal v-if="modalShow" @close="modalShow=false" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: false,
      exsit: false,
      modalShow: false,
    }
  },
  mounted() {
    this.updateStatus()
    document.addEventListener('scroll', this.updateStatus, false)
    document.addEventListener('webkitTransitionEnd', this.handleTransitionEnd, false)
  },
  methods: {
    handleTransitionEnd() {
      if (!this.show) {
        this.exsit = false
      }
    },
    updateStatus() {
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop > 400) {
        this.exsit = true
        setTimeout(() => {
          this.show = true
        })
      } else {
        this.show = false
      }
    },
    gotop() {
      const move = () => {
        let scrollTop = document.documentElement.scrollTop
        if (scrollTop > 0) {
          let to = (scrollTop - 50) || 0
          document.documentElement.scrollTop = to
          if (to > 0) {
            setTimeout(() => {
              move()
            }, 5)
          }
        }
      }
      move()
    }
  },
}
</script>

<style lang="scss">
  .FixedToolBar {
    position: fixed;
    z-index: 1;
    right: 10PX;
    bottom: 10PX;
    transition: opacity 0.5s;
  }
  .FixedToolBar-item {
    width: 36PX;
    height: 36PX;
    border-radius: $borderRadius;
    background: $bgColorGray;
    margin-top: 10PX;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: $colorGreen;
  }
  
  .RootIsMobile {
    .FixedToolBar {
      right: 20px;
      bottom: 20px;
    }
    .FixedToolBar-item {
      width: 72px;
      height: 72px;
      font-size: 24px;
      margin-top: 20px;
    }
  }
</style>
