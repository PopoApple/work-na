<template>  
    <ListItem :class="{'checked': allow }" @click.native="triggerChecked(allow)">
      <ListItemCol :width="$isMobile ? 140 : 80" class="list-left">
        <div class="opening-time">
          <div class="month-day">{{monthAndDay}}</div>
          <div class="year">{{year}}</div>
        </div>
      </ListItemCol>
      <ListItemCol>
        <ListItemLine :width="$isMobile ? 500 : 600">
            <nuxt-link v-if="data.status === 2":to="'/zhaocai/' + data.id"> {{data.bidTitle}}</nuxt-link>
            <span v-else> {{data.bidTitle}}</span>
        </ListItemLine>
        <ListItemLine>  
          <div class="biding-msg">
            <div><span>省份：</span> {{data.region}}</div>
            <div v-if="!$isMobile" class="source-platform ellipsis"><span>来源平台：</span> {{data.sourcePlatform}}</div>
            <div v-if="!$isMobile"><span>信息类型：</span> {{data.bidBusinessType}}</div>
            <div v-if="!$isMobile"><span>行业：</span> {{data.trade}}</div>
            <div v-if="$isMobile && data.status === 2" class="info-type">{{data.bidBusiness}}</div>
            <div v-if="$isMobile && data.status !== 2" class="info-type-remove">已下架</div>
          </div>
        </ListItemLine>
      </ListItemCol>
      <ListItemCol  v-if="!$isMobile" :width="100">
        <div v-if="data.status === 2" class="info-type">{{data.bidBusiness}}</div>
        <div v-if="data.status !== 2" class="info-type-remove">已下架</div>
      </ListItemCol>
      <!-- 右下角删除标识 -->
      <div class="delete-mark iconfont icon-xuanzhongjiaobiao" :style="{ display: checked }"></div>
    </ListItem>
</template>

<script>
import { IsDate } from '~/utils'

export default {
  name:'tabForZhaoCai',
  props: {
    data: Object,
    allow: Boolean
  },
  data() {
    return {
      checked: 'none',
    }
  },
  computed: {
    monthAndDay() {
      let temp = this.data.publishTime || '1970-01-01'
      return IsDate(temp) ? temp.slice(5, 10) : '01-01'
    },
    year() {
      let temp = this.data.publishTime || '1970-01-01'
      return IsDate(temp) ? temp.slice(0, 4) : '1970'
    }
  },
  methods: {
    // 删除勾选提示
    triggerChecked(isAllowed) {
      if (isAllowed) {
        this.checked = this.checked === 'none' ? 'block' : 'none'
        let state = { id: this.data.id, delete: this.checked === "block"}
        this.$emit('delectchecked', state )
      }
    }
  },
  watch: {
    // 取消编辑是清空勾选
    allow(val) {
      if(val === false) { this.checked = 'none' }
    }
  }
}
</script>

<style lang="scss" scoped>

// 选择删除时样式
  .ListItem {
    border: 1px solid transparent;
  }
  .checked {
    overflow: hidden;
    // 添加文字不可被选中
    -moz-user-select:none;		/* 火狐 */
    -webkit-user-select:none;	/* 谷歌 */
    -ms-user-select:none;		/* IE */
    user-select:none;
    &:hover {
      border-radius: $borderRadius;
      border: 1px solid $colorGreen;
    }
    .delete-mark {
      position: absolute;
      bottom: -18px;
      right: 0;
      font-size: 26px;
      color: $colorGreen;
      z-index: 20;
    }
  }

.RootNotMobile {
  .list-left {
    position: relative;
    width: 86px;
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      width: 1px;
      height: 40px;
      background-color: $fontColorXLight;
    }
    .opening-time {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 50px;
      text-align: center;
      .month-day {
        font-size: $fontSizeXL;
        color: $fontColor;
      }
      .year {
        font-size: $fontSize;
        color: $fontColorLight;
      }
    }
  }
  
  
    .biding-msg{
      display: flex;
      font-size: $fontSize;
      color: $colorGreen;
      div {
        margin-right: 20px;
        span {
          color: $fontColorLight;
        }
      }
      .source-platform {
        max-width: 300px;
      }
    }
  
    .info-type {
      width: 90px;
      height: 32px;
      text-align: center;
      color: $colorGreen;
      font-weight: bold;
      line-height: 32px;
      background-color: $bgColorGray;
      border-radius: $borderRadius;
    }
    .info-type-remove {
      width: 90px;
      height: 32px;
      text-align: center;
      color: $fontColorXLight;
      font-weight: bold;
      line-height: 32px;
      background-color: $bgColorGray;
      border-radius: $borderRadius;
    }
}

.RootIsMobile {
  .list-left {
    position: relative;
    // width: 100px;
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      width: 2px;
      height: 60px;
      background-color:   $borderColorLight;
    }
    .opening-time {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: center;
      .month-day {
        font-size: $fontSizeXL;
        color: $fontColor;
      }
      .year {
        // margin-top: 12px;
        font-size: $fontSize;
        color: $fontColorLight;
      }
    }
  }

  .biding-msg {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    font-size: $fontSize;
    color: $fontColorXLight;
    .info-type {
      padding: 0 10px;
      color: $colorGreen;
      font-weight: bold;
      background-color: $bgColorGray;
      border-radius: $borderRadius;
    }
    .info-type {
      padding: 0 10px;
      color: $fontColorXLight;
      font-weight: bold;
      background-color: $bgColorGray;
      border-radius: $borderRadius;
    }
  }
}
</style>