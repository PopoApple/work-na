<template>
  <footer>
    <div class="footer">
      <div class="footer-desc">
        <div class="footer-first">
          <div class="footer-more">
            <div>
              <img src="~static/img/pc/logo-black.png" />
            </div>
            <div>
              <span>|&nbsp;&nbsp;建筑行业信息交流的超级航母</span>
            </div>
          </div>
        </div>
        <div class="footer-second">
          <ul class="footer-more">
            <li v-for="link in links" :key="link.id">
              <a
                v-if="link.isALink"
                :key="link.url"
                :href="link.url"
                target="_blank"
              >{{ link.name }}</a>
              <nuxt-link v-else :key="link.url" :to="link.url">{{ link.name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div v-if="!$isMobile" class="footer-third">
          <ul class="footer-more">
            <div class="footer-msg-start">建筑社区</div>
            <li v-for="link in linksGxn2" :key="link.id">
              <a :href="link.url">{{ link.name }}</a>
            </li>
          </ul>
        </div>
        <div v-if="!$isMobile" class="footer-fourth">
          <ul class="footer-more-second">
            <li v-for="link in footerMsg" :key="link.id">
              <nuxt-link :key="link.url" :to="link.url">
                <i v-if="!!link.icon" :class="`el-icon-${link.icon}`" @click="menuShow = true" />
                {{ link.name }}
              </nuxt-link>
            </li>
          </ul>
          <ul class="footer-more-end">
            <li>
              <a href="#">CopyRight(©) 2019-2021广新纳</a>
            </li>
            <li>
              <a href="http://www.beian.miit.gov.cn/" target="_blank">赣ICP备19008786号</a>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="$isMobile" class="moblie-footer">
        <ul class="more">
          <li v-for="link in footerMsg" :key="link.id">
            <nuxt-link :key="link.url" :to="link.url">
              <i v-if="!!link.icon" :class="`el-icon-${link.icon}`" @click="menuShow = true" />
              {{ link.name }}
            </nuxt-link>
          </li>
        </ul>
        <div class="item">
          <span class="gxn">CopyRight(©) 2019-2021广新纳&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>
            <a
              href="http://www.beian.miit.gov.cn/"
              target="_blank"
            >|&nbsp;&nbsp;&nbsp;&nbsp;赣ICP备19008786号</a>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import { conschinaCommunity } from '~/assets/js/constants'

  const links = [
    { id: '1', name: '首页', url: '/' },
    { id: '2', name: '建材信息', miniName: '建材', url: '/material' },
    { id: '3', name: '招采信息', miniName: '招采', url: '/zhaocai' },
    { id: '4', name: '我需要', miniName: '需求', url: '/' },
    { id: '5', name: '我提供', miniName: '提供', url: '/' },
    { id: '7', name: '找工作', miniName: '工作', url: '/' },
    { id: '8', name: '联系我们', miniName: 'contact', url: '/' },
    { id: '9', name: '建筑社区', miniName: '社区', url: conschinaCommunity, isALink: true }
  ]
  export default {
    data() {
      return {
        linksGxn2: [
          {
            id: '1',
            name: '建筑规范',
            miniName: '规范',
            url: conschinaCommunity + '/portal/zyArticle/ArticleAnon/8/1'
          },
          {
            id: '2',
            name: '新闻中心',
            miniName: '新闻',
            url: conschinaCommunity + '/portal/zyArticle/ArticleAnon/1/1'
          },
          {
            id: '3',
            name: '施工管理',
            miniName: '施工',
            url: conschinaCommunity + '/portal/zyArticle/ArticleAnon/4/1'
          },
          {
            id: '4',
            name: '工程造价',
            miniName: '造价',
            url: conschinaCommunity + '/portal/zyArticle/ArticleAnon/6/1'
          },
          {
            id: '5',
            name: '招标代理',
            miniName: '招标',
            url: conschinaCommunity + '/portal/zyArticle/ArticleAnon/2/1'
          },
          {
            id: '7',
            name: '规划设计',
            miniName: '规划',
            url: conschinaCommunity + '/portal/zyArticle/ArticleAnon/3/1'
          },
          {
            id: '8',
            name: '勘察测绘',
            miniName: '勘察',
            url: conschinaCommunity + '/portal/zyArticle/ArticleAnon/7/1'
          }
        ],
        footerMsg: [
          { id: '1', name: '关于我们', url: '/aPicture' },
          { id: '2', name: '免责声明', url: '/description' },
          { id: '3', name: '版权说明', url: '/description' },
          { id: '4', name: '合作伙伴', url: '/' }
        ]
      }
    },
    computed: {
      links() {
        let arry = links
        if (this.$isMobile) {
          arry = arry.map(d => {
            return {
              ...d,
              name: d.miniName || d.name
            }
          })
        }
        return arry
      }
    }
  }
</script>
<style lang="scss" scoped>
  .footer {
    border-top: 2px $borderColorDark solid;
    background-image: url(~static/img/pc/footer.png);
    box-shadow:$shadow
  }

  .footer a:hover {
    color: $colorGreen;
  }

  .footer-desc {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 1220px;
    margin: 0 auto;
  }

  .cs-title {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }

  .cs-phone {
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    line-height: 33px;
    margin-top: 8px;
  }

  .footer-more {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer-more li:not(:last-child)::after {
    content: '|';
    margin: 0 13px;
  }

  .footer-more-end {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer-more-end a {
    font-size: $fontSizeS;
    color: $fontColorXLight;
  }

  .footer-more-end li:not(:last-child)::after {
    content: '|';
    margin: 0 13px;
    color: $fontColorXLight;
  }

  .footer-more-second {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer-more-second a {
    font-size: $fontSizeS;
    color: $fontColor;
  }

  .footer-more a{
    font-size: $fontSizeS;
    color: $fontColorXLight;
  }
  .footer-more-second li:not(:last-child)::after {
    content: ' ';
    margin: 0 8px;
  }

  .footer-msg-start{
    font-size: $fontSizeS;
    padding-right: 15px;
    font-weight: 501;
  }
  .footer-first {
    display: flex;
    align-items: center;
    padding-bottom: 29px;
    border-bottom: 1px $borderColor solid;
    width: 100%;
    margin-top: 22px;
  }

  .footer-first span {
    font-size: $fontSizeL;
    font-weight: 600;
  }

  .footer-second {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 99%;
    margin-top: 10px;
  }

  .footer-second a {
    font-size: $fontSizeS;
    color: $fontColorDark;
    font-weight: 501;
  }

  .footer-third {
    display: flex;
    justify-content: start;
    align-items: center;
    padding-bottom: 10PX;
    width: 99%;
  }

  .footer-third a {
    font-size: $fontSizeS;
    color: $fontColorXLight;
  }

  .footer-fourth {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 99%;
    padding-bottom: 30px;
   
  }


  .RootIsMobile {
    .footer {
      width: auto;
      background-image: url(~static/img/m/footer_moblie.png);
      border-top: 0;
      box-shadow: 0 0px 0px #ccc;
    }
    
    .footer-desc{
      width: auto;
    }

    .footer-first {
      width: 95%;
      margin-top: 11px;
      display: flex;
      justify-content: center;
      border-bottom:  1px  $borderColorGray solid;
    }

    .footer-first span {
      font-size: $fontSize;
      font-weight: 501;
    }

    .footer-first img{
      width: 200px;
    }

    .footer-second{
      width: 95%;
      justify-content: center;
      margin-top: 35px;
      border-bottom:  1px  $borderColorGray solid;
      padding-bottom: 35px;
    }

    .moblie-footer{
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction:column
    }
    .more {
      display: flex;
      width: 80%;
      margin-top: 35px;
      align-items: center;
      justify-content: space-between;
    }

    .more li a {
      font-weight: 400;
      font-size: $fontSizeS;
    }
    .item {
      margin-top: 35px;
      padding-bottom: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $fontSizeS;
      color: $fontColorXLight;
    }
    .item a{
       color: $fontColorXLight;
    }
  }
</style>
