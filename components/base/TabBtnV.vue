<template>
  <ul class="TabBtnV" :class="{'TabBtnV-col-4': cols === 4}">
    <li v-for="link in links" :key="link.path" :class="{ active: isActive(link) }">
      <nuxt-link :key="link.path" :to="link.path">
        <Badge is-dot :hidden="!link.dot" class="TabBtnV-badge">
          <i
            :class="`iconimg ${$isMobile ? '' : 'small'} ${link.icon} ${
              isActive(link) ? 'active' : ''
            }`"
          />
          <span>
              {{ link.name }}
          </span>
          <i class="icon-right el-icon-arrow-right" />
        </Badge>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      links: Array,
      cols: {
        type: Number,
        default: 3,
      }
    },
    methods: {
      isActive(link) {
        let activeLink = this.links.find(d => this.$route.path.indexOf(d.path) >= 0)
        if (activeLink) {
          if (activeLink.path === link.path) {
            return true
          }
        } else if (link.isIndex) {
          return true
        }
        return false
      },
    },
  }
</script>

<style lang="scss">
  .TabBtnV {
    li a {
      display: inline-block;
      box-sizing: border-box;
      position: relative;
      font-size: $fontSizeOdd;
      width: 100%;
      height: 54px;
      line-height: 54px;
      cursor: pointer;
      .iconimg {
        margin-right: 17px;
      }
      .icon-right {
        position: absolute;
        right: 20px;
        top: 20px;
      }
    }
    li.active a {
      color: $colorGreen;
      .icon-right {
        color: $colorGreen;
      }
    }
  }

  .TabBtnV-badge {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0 30px 0 21px;
    .el-badge__content.is-fixed {
      top: 17px;
      right: 85px;
    }
  }

  .RootNotMobile {
    .TabBtnV {
      li a {
        &:hover {
          background: $bgColorGray;
          color: $fontColor;
        }
      }
      li.active a {
        background: $bgColorGreen;
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 4px;
          bottom: 9px;
          background: $colorGreen;
        }
      }
    }
  }

  .RootIsMobile {
    .TabBtnV {
      li {
        float: left;
        width: 250px;
        margin-top: 40px;
        text-align: center;
        a {
          height: 100px;
          color: $fontColorXLight;
          &.nuxt-link-active {
            color: $colorGreen;
          }
        }
      }
      li.active a {
        color: $colorGreen;
      }
      a i {
        display: block;
        margin: 0 auto;
        margin-bottom: 10px;
        transform: scale(0.75);
      }
      .icon-right {
        display: none;
      }
    }

    .TabBtnV.TabBtnV-col-4 {
      li {
        width: 187px;
        a {
          font-size: $fontSize;
        }
      }
    }

  }
</style>
