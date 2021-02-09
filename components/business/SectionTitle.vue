<template>
  <div class="SectionTitle" :class="{'SectionTitle-small': size === 'small'}">
    <h3 class="ellipsis"><slot /></h3>
    <a v-if="isAlink" :href="btnRoute" class="ellipsis" target="_blank">{{ btnText }}<i class="el-icon-plus"></i></a>
    <nuxt-link v-else :to="btnRoute || ''" class="ellipsis">{{ btnText }}<i class="el-icon-plus"></i></nuxt-link>
  </div>
</template>

<script>

export default {
  props: {
    size: String,
    btnText: {
      type: String,
      default: '查看更多',
    },
    btnRoute: [Object, String],
    isAlink: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.SectionTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  h3 {
    margin: 0;
    color: $fontColorDark;
  }
  i {
    margin-left: 5px;
  }
}

.RootNotMobile {
  .SectionTitle {
    padding: 30px 0 20px;
    border-bottom: 1px solid #dddddd;
    h3 {
      font-size: $fontSize2XL;
    }
    span {
      font-size: $fontSize;
    }
  }
  .SectionTitle.SectionTitle-small {
    padding: 0;
    border-bottom: none;
    margin-bottom: 0;
    h3 {
      font-size: $fontSizeL;
    }
    a {
      color: $fontColorXLight;
      &:hover {
        color: $colorGreen;
      }
    }
  }
}

.RootIsMobile {
  .SectionTitle {
    margin: 0 0 30px;
    h3 {
      font-size: $fontSizeXL;
    }
    a {
      font-size: $fontSize;
      color: $fontColorXLight;
      &:active {
        color: $colorGreen;
      }
    }
  }
}
</style>
