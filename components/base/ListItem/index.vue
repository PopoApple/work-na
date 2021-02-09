<template>
  <li class="ListItem" :class="{['ListItem-' + styleType]: true, 'ListItem-fieldsView': isFieldsView, 'ListItem-narrow': narrow, 'ListItem-showActiveStyle': showActiveStyle}" >
    <div class="ListItem-main" :style="lineHeight ? { lineHeight: pxtorem(lineHeight) } : null">
      <div class="ListItem-content">
        <slot />
        <ListItemCol v-if="btnsPosition === 'right' && $slots['btns']" textAlign="right">
          <span>
            <slot name="btns" />
          </span>
        </ListItemCol>
        <div v-if="$slots['infoTop']" class="ListItem-infoTop">
          <slot name="infoTop" />
        </div>
        <div v-if="$slots['infoBottom']" class="ListItem-infoBottom">
          <slot name="infoBottom" />
        </div>
        <nuxt-link v-if="!!route" :to="route" class="ListItem-link" />
      </div>
      <div v-if="btnsPosition === 'bottom' && $slots['btns']" class="ListItem-btns">
        <slot name="btns" />
      </div>
    </div>
    <div v-if="btnsPosition === 'split'" class="ListItem-rightBtns">
      <slot name="btns" />
    </div>
  </li>
</template>

<script>
import { pxtorem } from '~/utils'

export default {
  name: 'ListItem',
  props: {
    type: String,  // 样式类型：'normal', 'card','border'
    btnsPosition: {  // 按钮位置：'right', 'bottom', 'split'
      type: String,
      default: 'right',
    }, 
    lineHeight: Number,  // 行高
    isFieldsView: Boolean,  // 展示样式为字段形式
    narrow: Boolean,  // 上下窄间隙
    route: [Object, String],  // 路由，如果传入了，则点击列表内容区域跳转页面
    showActiveStyle: Boolean,  //  显示激活状态的样式
  },
  computed: {
    styleType() {
      if (!this.type && !this.$isMobile) {
        return 'border'
      }
      return this.type || 'normal'
    }
  },
  methods: {
    pxtorem,
  },
}
</script>

<style lang="scss">
/*---- 公共样式 -----*/
.ListItem {
  display: flex;
  .el-button.Button30 {
    min-width: 80px;
  }
}
.ListItem-main {
  flex: 1;
}
.ListItem-rightBtns {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .el-button.Button30 + .el-button.Button30 {
    margin-left: 0;
  }
}
.ListItem-content {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.ListItem-btns {
  text-align: right;
}
.ListItem-infoTop {
  position: absolute;
}
.ListItem-infoBottom {
  position: absolute;
}
.ListItem-link {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  cursor: pointer;
}

.RootNotMobile {
  .ListItem-btns {
    padding: 20px 0 0;
  }
  .ListItem-infoTop {
    right: 0;
    top: 0;
  }
  .ListItem-infoBottom {
    right: 0;
    bottom: 0;
  }
}

.RootIsMobile {
  .ListItem-btns {
    padding: 30px 0 40px;
  }
  .ListItem-infoTop {
    right: 0;
    top: 0;
  }
  .ListItem-infoBottom {
    right: 0;
    bottom: 0;
  }
}
/*---- 普通样式 -----*/
.ListItem.ListItem-normal {
  .ListItem-main {
    padding: 15px 0;
  }
}
.ListItem.ListItem-normal.ListItem-narrow {
  .ListItem-main {
    padding: 10px 0;
  }
}

.RootNotMobile {

  .ListItem.ListItem-normal.ListItem-showActiveStyle {
    &:hover {
      .ListItem-main {
        box-shadow: $shadow;
      }
    }
  }

}

.RootIsMobile {

  .ListItem.ListItem-normal.ListItem-showActiveStyle {
    &:active {
      .ListItem-main {
        background: $bgColorGrayLight;
      }
    }
  }

}

/*---- 卡片样式 -----*/
.ListItem.ListItem-card {
  .ListItem-main {
    padding: 0;
    border: 1px solid $borderColor;
    border-radius: $borderRadius;
    .ListItem-btns {
      border-top: 1px solid $borderColor;
    }
  }
}
.ListItem.ListItem-card + .ListItem.ListItem-card {
  margin-top: 20px;
}
.ListItem.ListItem-cardListItem-narrow + .ListItem.ListItem-card.ListItem-narrow {
  margin-top: 14px;
}

.RootNotMobile {

  .ListItem.ListItem-showActiveStyle {
    &.ListItem-card:hover {
      .ListItem-main {
        border-color: $colorGreen;
      }
    }
  }

  .ListItem.ListItem-card {
    .ListItem-content {
      padding: 14px;
    }
    .ListItem-btns {
      padding: 14px;
    }
    .ListItem-infoTop {
      right: 14px;
      top: 14px;
    }
    .ListItem-infoBottom {
      right: 14px;
      bottom: 14px;
    }
  }

}

.RootIsMobile {
  .ListItem.ListItem-card {
    .ListItem-content {
      padding: 20px;
    }
    .ListItem-btns {
      padding: 20px;
    }
    .ListItem-infoTop {
      right: 20px;
      top: 20px;
    }
    .ListItem-infoBottom {
      right: 20px;
      bottom: 20px;
    }
  }

  .ListItem.ListItem-showActiveStyle {
    &.ListItem-card:active {
      .ListItem-main {
        border-color: $colorGreen;
      }
    }
  }
  
  .ListItem.ListItem-fieldsView {
    .ListItem-content {
      flex-direction: column;
    }
  }
}

/*---- 分割线列表样式 -----*/
.ListItem.ListItem-border {
  .ListItem-main {
    padding: 20px 0;
    border-bottom: 1px solid $borderColorLight;
  }
}
.ListItem.ListItem-border.ListItem-narrow {
  .ListItem-main {
    padding: 14px 0;
  }
}
.RootNotMobile {

  .ListItem.ListItem-border.ListItem-showActiveStyle {
    &:hover {
      .ListItem-main {
        box-shadow: $shadow;
        position: relative;
        border-bottom: none;
        top: -1px;
        left: -1px;
        background: #fff;
        margin: 0 1px 1px 0;
      }
    }
  }

}

.RootIsMobile {

  .ListItem.ListItem-border.ListItem-showActiveStyle {
    &:active {
      .ListItem-main {
        background: $bgColorGrayLight;
      }
    }
  }

}
</style>


