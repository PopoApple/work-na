<template>
  <div class="PageZhaocaiId" ref="wrap">
    <Article :title="data.title" :date="data.date" :rawhtml="rawhtml" :projectNumber="data.projectNumber" :source="data.source"
      :sourcePlatform="data.sourcePlatform" :bidBusinessType="data.bidBusinessType" :bidBusiness="data.bidBusiness" :trade="data.trade"
      :attachmentDtoList="data.attachmentDtoList"
    >
    <!-- info-item为Article组件的样式 -->
      <span class="collection info-item" slot="header-right" @click="collectArticle">
        <i :class="['iconfont', data.isCollect ? 'icon-shoucang1' : 'icon-shoucang']"></i><span :style="{ color: data.isCollect?'#00A64A':'#7D7D7D' }">{{data.isCollect ? '已收藏': '收藏'}}</span>
      </span>
    </Article>
  </div>
</template>

<script>
import { getArticle, getArticleContent, addCollection, cancelCollection } from '~/api/zhaocai/article'
import { formatDecimal } from '@/utils'

export default {
  props: {
    data: Object,
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$isMobile) {
        let wrap = this.$refs.wrap
        let articleContent = wrap.querySelector('.article-content')
        let width = articleContent.offsetWidth
        let detailContent = articleContent.querySelector('.detail_content')
        if (detailContent) {
          let detailChildren = []
          for (let child of detailContent.childNodes) {
            if ('STYLE' !== child.tagName &&　child.nodeName !== '#text') {
              detailChildren.push(child)
            }
          }
          detailChildren.forEach(d => {
            let detailWidth = d.offsetWidth
            if (detailWidth > width) {
              let detailHeight = d.offsetHeight
              let scale = formatDecimal(width / detailWidth, 2)
              d.style.transformOrigin = '0 0'
              d.style.transform = `scale(${scale})`
              d.style.marginBottom = `-${detailHeight * ( 1 - scale )}px`
            }
          })
        }
      }
    })
  },
  computed: {
    rawhtml() {
      if (!this.data.rawhtml) {
        return ''
      }
      let reg = /<style>[\s\S]*?<\/style>/g
      let html = this.data.rawhtml.replace(reg, function(a) {
          let reg2 = /(\n\s*)(.+{[\s\S]*?})/g
          let s = a.replace(reg2, function(a2, b2, c2) {
              return b2 + '.article-content ' + c2
          })
          return s
      })
      html = html.replace(/<meta .*?>/g, '')
      return html
    }
  },
  methods: {
    collectArticle () {
      if(this.data.isCollect === false) {
        addCollection( this.$axiosClient, this.$route.params.id ).then(res => {
          this.data.isCollect = true
          if( res.code !== 200) { this.$toast.fail('添加收藏失败！')}       
        })
      } else {
        cancelCollection( this.$axiosClient, this.$route.params.id ).then(res => {
          this.data.isCollect = false
          if( res.code != 200 ) { this.$toast.fail('取消收藏失败')}
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .icon-shoucang1 {
    color: $colorYellow;
  }
  .RootNotMobile {
    .collection {
      display: inline-block;
      width: 70px;
      margin-left: 30px;
      font-size: $fontSizeL;
      color: #7D7D7D;
      border: 1px solid transparent;
      border-radius: $borderRadiusS;
      // 添加文字不可被选中
      -moz-user-select:none;		/* 火狐 */
      -webkit-user-select:none;	/* 谷歌 */
      -ms-user-select:none;		/* IE */
      user-select:none;
      cursor: pointer;
      i {
        margin-right: 2px;
        font-size: $fontSize2XL;
      }
      /deep/ .icon-shoucang1 {
        color: $colorGreen;
      }
    }
  }
  .RootIsMobile {
    .collection {
      display: inline-block;
      vertical-align: middle;
      color: $fontColorXLight;
      border: 1px solid transparent;
      border-radius: $borderRadiusS;
      .iconfont {
        margin-right: 6px;
        color: $fontColorXLight;
      }
      /deep/ .icon-shoucang1 {
        color: $colorGreen;
      }
    }
  }
</style>

<style lang="scss">
.PageZhaocaiId {
  .article-content .detail{
    .h4_o {
      text-align: center;
    }
    .p_o {
      text-align: center;
      span + span {
        margin-left: 20px;
      }
    }
  }
}
</style>
