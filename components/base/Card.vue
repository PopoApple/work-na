<template>
  <div class="Card" :class="{ [`Card-${this.type}`]: true, 'Card-contentNoPadding':　contentNoPadding }">
    <div class="Card-title" v-if="showTitle">
      <SectionTitle size="small" :btnText="btnText" :isAlink="isAlink" :btnRoute="btnRoute">{{ title }}</SectionTitle>
    </div>
    <div class="Card-content">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      title: String,
      showTitle: {
        type: Boolean,
        default: true,
      },
      btnText: String,
      type: {   // 'normal'，'well', 'simple'
        type: String,
        default: 'normal',
      }, 
      contentNoPadding: {
        type: Boolean,
      },
      btnRoute: [Object, String],
      isAlink: Boolean,
    },
  }
</script>

<style lang="scss" scoped>

.RootNotMobile {
  .Card-normal, .Card-well {
    border-radius: $borderRadius;
    .Card-title {
      height: 52px;
      line-height: 52px;
      padding: 0 20px;
      border-top-left-radius: $borderRadius;
      border-top-right-radius: $borderRadius;
    }
    .Card-content {
      padding: 20px;
    }
  }
  .Card-normal {
    border: 1px solid $borderColor;
    .Card-title {
      background: $bgColorGray;
      border-bottom: 1px solid $borderColor;
    }
  }
  .Card-well {
    background: $bgColorGray;
    .Card-content {
      padding-top: 0;
    }
  }
  
  .Card.Card-contentNoPadding {
    .Card-content {
      padding: 0;
    }
  }
}

/*------------------------- 移动端 -------------------------*/
.RootIsMobile {
  .Card {
    background: #fff;
    padding: 40px 30px 30px;
    margin-top: 20px;
  }
}
</style>
