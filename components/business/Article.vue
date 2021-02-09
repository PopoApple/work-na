<template>
  <div class="Article">
    <div class="article-main">
      <div class="article-header">
        <div class="data">
          <div class="day">{{day}}</div>
          <div class="month-year">{{monthYear}}</div>
        </div>
        <div class="title-and-other" >
          <h1 class="title ellipsis2 " v-html="title"></h1>
          <div class="info">
            <span class="info-item">
              <i class="iconimg i-time" />
              {{date}}
            </span>
            <span v-if="viewCount !== undefined" class="info-item">
              <i class="iconimg i-viewCount" />
              阅读量 {{viewCount}}
            </span>
            <!-- 以下为招采相关展示 -->
            <span v-if="source !== undefined && source" class="info-item">来源:{{source}}</span>
            <slot v-if="$isMobile" name="header-right"/>
            <span v-if="projectNumber !== undefined && projectNumber" class="info-item">项目编号:{{projectNumber}}</span>
            <span v-if="sourcePlatform !== undefined && sourcePlatform" class="info-item">来源平台:{{sourcePlatform}}</span>
            <span v-if="bidBusiness !== undefined && bidBusiness" class="info-item">业务类型:{{bidBusiness}}</span>
            <span v-if="bidBusinessType !== undefined && bidBusinessType" class="info-item">信息类型:{{bidBusinessType}}</span>
            <span v-if="trade !== undefined && trade" class="info-item">行业:{{trade}}</span>
          </div> 
        </div>
        <div class="right-box" v-if="!$isMobile">
          <slot  name="header-right" />
        </div>
      </div>
      <CcImage class="head-img" v-if="imgUrl" :src="imgUrl + WENZHANGBIAOTI" />
      <div class="article-content" v-html="rawhtml"></div>
      
      <div v-if="attachmentDtoList && attachmentDtoList.length" class="attachment">
        <table class="attachment-table">
          <thead><tr><th>附件名</th><th v-if="!$isMobile">附件大小(M)</th><th>操作</th></tr></thead>
          <tbody>
          <tr v-for="line in attachmentDtoList" :key="line.id">
            <td class="first-col"><div>{{line.fileName}}</div></td><td v-if="!$isMobile">{{line.size}}</td><td class="attachment-download"><a :href="line.attachUrl + '?response-content-type=application/octet-stream'" >下载</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="float-wrap turn-page" v-if="prev || next">
      <div class="footer-split"></div>
      <div class="turn-previous-btn">
        <nuxt-link v-if="prev" :to="`/article/${prev.id}`">
          <i class="iconfont icon-zuojiantou2" /> 上一篇： {{ prev.title }}
        </nuxt-link>
      </div>
      <div class="turn-next-btn">
          <nuxt-link v-if="next" :to="`/article/${next.id}`">
          <template v-if="$isMobile">
            <i class="iconfont icon-youjiantou"></i>
          </template>
          下一篇：
          {{ next.title }} 
          <template v-if="!$isMobile">
            <i class="iconfont icon-youjiantou"></i>
          </template>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getHtmlText } from '@/utils'
import { titleSufix } from '~/static/js/routeInfo'
import { WENZHANGBIAOTI } from '~/assets/js/constants'

export default {
  head() {
    let meta = [{ hid: 'keywords', name: 'keywords', content: '广新纳，建材信息，招采信息，我需要服务，我提供服务，建筑社区，找工作' }]
    let desc = getHtmlText(this.rawhtml) 
    if (desc) {
      meta.push({ hid: 'description', name: 'description', content: desc.slice(0, 90) })
    }
    return {
      title: this.title + titleSufix,
      meta,
    }
  },
  props: {
    date: String,
    title: String,
    viewCount: Number,
    projectNumber: String,
    source: String,
    sourcePlatform: String,
    bidBusinessType: String,
    bidBusiness: String,
    trade: String,
    attachmentDtoList: Array,
    rawhtml: String,
    prev: Object,
    next: Object,
    imgUrl: String,
  },
  computed: {
    day() {
      return this.date.slice(8, 10)
    },
    monthYear() {
      return this.date.slice(0,7)
    },
    WENZHANGBIAOTI() {
      return WENZHANGBIAOTI
    },
  },
}
</script>

<style lang="scss">
.Article {
  .article-header {
    border-bottom: 1px solid $borderColor;
    padding-bottom: 30px;
    display: flex;
    .data {
      flex-shrink:0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 76PX;
      height: 76PX;
      margin-right: 20px;
      color: $colorWhite;
      background-color: #00A85F;
      border-radius: $borderRadius;
      .day {
        font-size: $fontSize4XL;
      }
      .month-year {
        margin-top: 6px;
        font-size: $fontSize;
      }
    }
    .title-and-other {
      .title {
        margin: 0;
        font-size: 28PX;
        font-weight: bold;
        line-height: 48PX;
        color: $fontColor;
      }
    }
    .right-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      margin-left: auto;
    }
  }
  .info {
    color: $fontColorXLight;
    line-height: 26PX;
    .info-item {
      display: inline-block;
      vertical-align: middle;
    }
    .info-item + .info-item {
      margin-left: 20px;
    }
  }
  .i-time {
    background-image: url('~static/img/icon/time.png');
    width: 14PX;
    height: 14PX;
    top: 2PX;
  }

  .i-viewCount {
    background-image: url('~static/img/icon/view-gray.png');
    width: 15PX;
    height: 12PX;
    top: 1PX;
  }

  .head-img {
    margin: 50px 0 20px;
    .el-image__inner {
      display: block;
      width: auto;
      height: auto;
      max-width: 100%;
      margin: 0 auto;
    }
  }
  .article-content {
    overflow: hidden;
    word-wrap: break-word;
    img {
      max-width: 100%;
    }
    line-height: initial;
  }
  .attachment {
    padding: 20px 0 ;
    color: $fontColor;
    border-top: 1px dashed $borderColorGray;
  }
  .attachment-table {
    border-collapse: collapse;
    table-layout:fixed;
    .first-col {
      word-break: break-all;
      div {
        min-width: 400px;
      }
    }
    .attachment-download {
      width: 60px;
      color: $colorGreen;
      text-align: center;
    }
  }
  table, td, th {
    border:1px solid $borderColor;
    padding: 0px 20px;
  }
  .footer-split {
    height: 8px;
    background: $bgColorGray;
    margin: 40px 0;
  }
}

.RootNotMobile {
  .Article {
    margin-top: 34px;
    .article-content {
      width: 100%;
      padding-bottom: 30px;
    }
    .turn-page {
      padding: 49px 0;
      .turn-previous-btn, .turn-next-btn, .iconfont {
        font-size: $fontSizeL;
        color: $fontColorLight;
        cursor: pointer;
        &:hover span, &:hover .iconfont {
          color: $colorGreen;
        }
      }
      .turn-previous-btn, .turn-next-btn {
        max-width: 600px;
      }
      .turn-previous-btn {
        float: left;
      }
      .turn-next-btn {
        float: right;
      }
    }
  }
}

.RootIsMobile {
  .Article {
    padding: 40px 30px 30px 30px;
    background-color: $colorWhite;
    .article-header {
      display: block;
      .data {
        float: left;
        width: 75PX;
        height: 75PX;
        .day {
          font-size: $fontSize4XL;
        }
        .month-year {
          margin-top: 6px;
          font-size: $fontSize;
        }
      }
      .title-and-other {
        .title {
          font-size: $fontSizeXL;
          line-height: 26PX;
        }
      }
    }
    .article-content {
      width: 100%;
      color: $fontColorDark;
    }
    .turn-page {
      .turn-previous-btn, .turn-next-btn, .iconfont {
        color: $fontColorXLight;
        margin-top: 20px;
        &:hover {
          color: $colorGreen;
        }
      }
    }
  }
}
</style>
