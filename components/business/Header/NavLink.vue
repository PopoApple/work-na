<template>
  <span class="NavLink" :class="{ 'NavLink-active': isActive }">
    <a v-if="link.isALink" :key="link.url" :href="link.url" target="_blank">
      <i v-if="$isMobile" :class="link.icon" />
      {{ link.name }}
    </a>
    <nuxt-link v-else :key="link.url" :to="link.url">
      <i v-if="$isMobile" :class="link.icon" />
      {{ link.name }}
    </nuxt-link>
  </span>
</template>

<script>
export default {
  props: {
    link: Object,
    isActive: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.NavLink {
  font-size: $fontSizeL;
  i {
    margin-right: 4px;
  }
  &.NavLink-active {
    a {
      color: $colorGreen;
      font-weight: bold;
    }
  }
}

/*---------------以下是移动端---------------*/
.RootIsMobile { 
  .NavLink {
    a {
      padding: 20px 48px 20px 110px;
      display: block;
      border-radius: 10px;
      position: relative;
      i {
        margin-right: 8px;
        position: absolute;
        top: 26px;
        left: 48px;
      }
    }
    &.NavLink-active a {
      font-weight: bold;
      color: #fff;
      background: $colorGreen;
    }
    
    .i-home {
      background-image: url('~static/img/m/menu/home.png');
      width: 18PX;
      height: 18PX;
    }
    .i-jiancai {
      background-image: url('~static/img/m/menu/jiancai.png');
      width: 18PX;
      height: 18PX;
    }
    .i-zhaocai {
      background-image: url('~static/img/m/menu/zhaocai.png');
      width: 18PX;
      height: 18PX;
    }
    .i-xuyao {
      background-image: url('~static/img/m/menu/xuyao.png');
      width: 16PX;
      height: 20PX;
      left: 50px !important;
      top: 24px !important;
    }
    .i-tigong {
      background-image: url('~static/img/m/menu/tigong.png');
      width: 18PX;
      height: 18PX;
    }
    .i-gongzuo {
      background-image: url('~static/img/m/menu/gongzuo.png');
      width: 18PX;
      height: 18PX;
    }
    .i-shequ {
      background-image: url('~static/img/m/menu/shequ.png');
      width: 18PX;
      height: 18PX;
    }
    
    &.NavLink-active {
      .i-home {
        background-image: url('~static/img/m/menu/home_a.png');
      }
      .i-jiancai {
        background-image: url('~static/img/m/menu/jiancai_a.png');
      }
      .i-zhaocai {
        background-image: url('~static/img/m/menu/zhaocai_a.png');
      }
      .i-xuyao {
        background-image: url('~static/img/m/menu/xuyao_a.png');
      }
      .i-tigong {
        background-image: url('~static/img/m/menu/tigong_a.png');
      }
      .i-gongzuo {
        background-image: url('~static/img/m/menu/gongzuo_a.png');
      }
      .i-shequ {
        background-image: url('~static/img/m/menu/shequ_a.png');
      }
    }

  }
}
</style>
