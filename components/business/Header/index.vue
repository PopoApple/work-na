<template>
  <header class="Header">
    <div class="top-bar header-bg">
      <div class="main-container">
        <div class="float-wrap box">
          <div class="left welcome">
            欢迎进入广新纳~
            <nuxt-link v-if="!$store.state.auth" class="a-green top-login-btn" to="/login">登录</nuxt-link>
          </div>
          <div v-if="$store.state.auth" class="left" style="margin-left: 10px">
            <Dropdown placement="bottom-start" @command="logout">
              <div class="userInfo">
                <UserInfo :size="28" nameFontSize="fontSizeOddS" nameColor="fontColorLight" :nameWidth="100" />
              </div>
              <DropdownMenu slot="dropdown">
                <DropdownItem @click="logout">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <HeaderBell class="header-bell" />
          </div>
          <div class="right">
            <ToolLinks />
          </div>
        </div>
      </div>
    </div>
    <div class="main-bar header-bg">
      <div class="main-container">
        <div class="box">
          <div class="header-main float-wrap">
            <div class="left">
              <img class="logo" :src="imgLogo" @click="$router.push('/')" />
            </div>
            <div class="left slogan">找建筑信息，尽在广新纳</div>
            <div class="right header-main-right">
              <div class="float-wrap">
                <div class="right publish-btn" v-if="!$store.state.auth || ($store.state.userInfo.type === 2 && $store.state.userInfo.isAuth === 3)">
                  <PublishButton />
                </div>
                <div class="right search-input">
                  <HeaderSearch />
                </div>
              </div>
            </div>
            <div class="right mobile-menu mobile-right">
              <i class="iconimg i-menu-btn" @click="menuShow = true"></i>
              <Popup
                v-model="menuShow"
                position="right"
                :duration="0.2"
              >
                <div class="pop-wrap">
                  <!-- <div class="publish-btn" v-if="!$store.state.auth || ($store.state.userInfo.type === 2 && $store.state.userInfo.isAuth === 3)">
                    <PublishButton />
                  </div> -->
                  <User />
                  <div class="header-search">
                    <HeaderSearch />
                  </div>
                  <Nav />
                  <span v-if="!!$store.state.auth" class="a-green exitLogin" @click="logout">
                    <i class="iconimg i-exit" />
                    退出登录
                  </span>
                </div>
              </Popup>
            </div>
            <div class="right mobile-header-records mobile-right" v-if="$store.state.auth">
              <nuxt-link to="/records">
                <i class="iconimg i-view_records" />
              </nuxt-link>
            </div>
            <div class="right mobile-header-bell mobile-right" v-if="$store.state.auth">
              <HeaderBell />
            </div>
            <div class="right mobile-user-info mobile-right" v-if="$store.state.auth">
              <UserInfo :size="66" :showText="false" />
            </div>
          </div>
          <div class="header-bottom float-wrap">
            <div class="left bottom-nav">
              <Nav />
            </div>
            <!-- <div class="right phone">
              <i class="iconimg i-phone" />
              <span>400-5888-8888</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { notNull } from '~/utils'
  import imgLogo from '~/static/img/pc/logo.png'
  import imgLogoM from '~/static/img/m/logo.png'
  import { setCookies, removeCookie } from '~/utils/cookie'
  import { apiUnreadMsgCount } from '~/api/common'
  import { apiDataProvincePlatform, apiDataCentralPlatform, apiDataPcaJson } from '~/api/globalData'
  import { apiUserInfo } from '~/api/auth'

  export default {
    data() {
      return {
        menuShow: false,
        msgnum: 0,
        imgLogo,
        imgLogoM,
      }
    },
    mounted() {
      if (this.$store.state.authError) {
        this.$toast.fail(this.$store.state.authError)
        this.$store.commit('setAuthError', null)
      }
      
      if (this.$store.state.auth) {
        apiUnreadMsgCount(this.$axiosClient).then(res => {
          if (res.code === 200) {
            this.$store.commit('setMsgCountComment', res.data.commentUnreadCount || 0)
            this.$store.commit('setMsgCountSys', res.data.opMessageUnreadCount || 0)
          }
        })
      }

      apiDataProvincePlatform(this.$axiosClient).then(data => {
        if (data) {
          this.$store.commit('setData', { provincePlatform: data })
        }
      })

      apiDataCentralPlatform(this.$axiosClient).then(data => {
        if (data) {
          this.$store.commit('setData', { centralPlatform: data })
        }
      })

      apiDataPcaJson(this.$axiosClient).then(data => {
        if (data) {
          this.$store.commit('setData', { chinaTree: data })
        }
      })

    },
    watch: {
      $route() {
        this.menuShow = false

        if (process.client) {
          let auth = this.$store.state.auth
          if (auth) {
            apiUserInfo(this.$axiosClient, auth.token).then(res => {
              if (res.code === 200) {
                this.$store.commit('setUserInfo', res.data)
              }
            })
          }
        }

      }
    },
    methods: {
      clearAuth() {
        removeCookie('token')
        removeCookie('refresh_token')
        this.$store.commit('setAuth', null)
      },
      logout() {
        // Code will also be required to invalidate the JWT Cookie on external API
        this.clearAuth()
        this.$router.push('/login')
      },
    },
  }
</script>
<style lang="scss">
.Header {
  .top-bar {
    height: 40px;
    line-height: 40px;
    background: $bgColorGray;
    color: $fontColorLight;
  }
  .welcome {
    margin-right: 30px;
  }
  .top-login-btn {
    display: inline-block;
    margin-left: 20px;
  }
  .userInfo {
    cursor: pointer;
    margin-top: 5px;
    .UserInfo .userName {
      position: relative;
      top: 1PX;
    }
  }
  .logo {
    display: block;
    width: 121px;
    height: 75px;
    cursor: pointer;
    position: relative;
    left: -8px;
  }
  .slogan {
    font-size: 16PX;
    font-weight: bold;
    color: $fontColorDark;
    height: 50px;
    line-height: 75px;
    padding: 0 0 0 30px;
    position: relative;
    &:before {
      content: '';
      width: 1px;
      height: 16px;
      background: $fontColorDark;
      position: absolute;
      top: 29px;
      left: 8px;
    }
  }
  .search-input {
    width: 440px;
  }
  .header-main-right {
    margin-top: 17px;
  }
  .phone {
    color: $colorYellow;
    font-size: $fontSizeXL;
    span {
      font-weight: bold;
      margin-left: 4px;
    }
  }
  .header-bottom {
    height: 40px;
    line-height: 40px;
    margin-top: 4px;
  }
  .top-nav {
    display: none;
  }
  .search-tab {
    display: none;
    text-align: left;
  }
  .mobile-right {
    display: none;
  }
}

/*------------------------- 仅PC端 -------------------------*/
.RootNotMobile {
  .Header {
    box-shadow: $shadow;
    .header-bell {
      margin-left: 5px;
    }
    .main-bar {
      height: 130px;
      padding-top: 4px;
      box-sizing: border-box;
    }
    .publish-btn {
      margin-left: 30px;
    }
  }
}
/*------------------------- 仅移动端 -------------------------*/
.RootIsMobile {
  .Header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
    height: 155px;
    background: #fff;
    .header-main {
      padding: 28px 30px;
    }
    .top-bar, .header-main-right, .slogan, .header-bottom {
      display: none;
    }
    .mobile-right {
      display: block;
    }
    .logo {
      width: 162px;
      height: 100px;
      left: -14px;
    }
    .van-popup--right {
      border-bottom-left-radius: 50px;
      border-top-left-radius: 50px;
      height: 100%;
      width: 540px;
    }
    .pop-wrap {
      padding: 50px 30px 80px;
    }
    .publish-btn {
      text-align: right;
    }
    .i-menu-btn {
      background-image: url('~static/img/m/menu-btn.png');
      width: 32px;
      height: 32px;
    }
    .header-search {
      margin: 18px 0 40px;
    }
    .exitLogin {
      font-size: 18PX;
      position: absolute;
      bottom: 100px;
      left: 80px;
      font-size: $fontSizeXL;
      i {
        margin-right: 12px;
      }
    }
    .i-exit {
      background-image: url('~static/img/m/exit.png');
      width: 18PX;
      height: 18PX;
      top: 3PX;
    }
    .mobile-header-records {
      margin-left: 46px;
      top: 20px;
      position: relative;
      opacity: 0.65;
    }
    .mobile-header-bell {
      margin-left: 34px;
      position: relative;
      top: 32px;
    }
    .mobile-menu {
      margin-left: 46px;
      position: relative;
      top: 28px;
    }
    .mobile-user-info {
      position: relative;
      top: 16px;
    }
  }
}
</style>
