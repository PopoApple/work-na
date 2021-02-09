<template>
<div class="HotNews">
  <!-- PC端 -->
  <div class="hot-new-list" v-if="!$isMobile">
    <ul>
      <li v-for="(item, i) in data" :key="item.id">
        <div class="info">
          <span class="no">{{i+1}}</span>
          <span class="type">{{item.type}}</span>
          <span class="split">|</span>
          <time>{{item.time}}</time>
        </div>
        <nuxt-link v-if="!item.linkUrl" :to="{name: 'article-id', params: {id: item.id}}">
          {{item.title}}
        </nuxt-link>
        <a v-else :href="item.linkUrl" target="_blank" >{{item.title}}</a>
      </li>
    </ul>
  </div>
  <!-- 移动端 -->
  <van-notice-bar v-if="$isMobile" :scrollable="false" mode="link" background="#FFFFFF" color="#707070">
    <template v-slot:left-icon>
       <div class="new-left-words"><span class="green-word">热点</span><span>咨讯</span></div>
    </template>
    <van-swipe
      vertical
      class="notice-swipe"
      :autoplay="3000"
      :show-indicators="false"
    >
      <van-swipe-item v-for="(item, i) in data" :key="item.id">
        <nuxt-link v-if="!item.linkUrl" :to="{name: 'article-id', params: {id: item.id}}">
          {{item.title}}
        </nuxt-link>
        <a v-else :href="item.linkUrl" target="_blank" >{{item.title}}</a>
      </van-swipe-item>
    </van-swipe>
  </van-notice-bar>
</div>
</template>

<script>
import { NoticeBar, Swipe, SwipeItem  } from 'vant'

export default {
  components: {
    VanNoticeBar: NoticeBar,
    VanSwipe: Swipe,
    VanSwipeItem: SwipeItem 
  },
  props: {
    data: Array,
  },
}
</script>
<style lang="scss" scoped>
.RootNotMobile {
  .HotNews {
    li {
      padding: 0 0 0 30px;
      position: relative;
      line-height: 18px;
      .no {
        position: absolute;
        // left: 0;
        left: 10px;
        top: 0px;
      }
      .info {
        color: $fontColorXLight;
      }
      .split {
        position: relative;
        top: -1px;
        margin: 0 2px;
      }
      a {
        margin-top: 7px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 258px;
        display: inline-block;
      }
    }
    li + li {
      margin-top: 12px;
    }
  }
}

@media screen and (max-width: 900px) {
  .RootNotMobile .HotNews li {
    line-height: 18PX;
  }
}



.RootIsMobile {
  .van-notice-bar{
    height: 85px;
    .new-left-words {
      margin-right: 20px;
      font-size: 18PX;
      font-weight: bold;
      color: $fontColorDark;
      .green-word {
        color: $colorGreen;
      }
    }
    .notice-swipe {
     height: 85px;
     line-height: 85px;
      a {
        overflow: hidden;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 60vw;
        font-size: 14PX;
        color: $borderColorGray;
      }
    }
  }
}
</style>
