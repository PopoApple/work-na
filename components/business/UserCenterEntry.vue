<template>
  <div class="UserCenterEntry flex-wrap link-wrap">
    <template v-if="$store.state.auth">
      <Badge is-dot class="UserCenterEntry-badge" :hidden="$store.state.userInfo.type !== 2 || $store.state.userInfo.isAuth !== 3 || $store.state.userInfo.isCompleted === 2" >
        <div class="link merchant-link ellipsis">
          <i />
          <nuxt-link class="a-green" :to="$store.state.userInfo.type === 2 && $store.state.userInfo.isAuth === 3 ? '/merchantCenter/myPublish' : '/merchantCenter/ca'">
            商家中心
          </nuxt-link>
        </div>
      </Badge>
      <div class="link user-link ellipsis">
        <i />
        <nuxt-link class="a-yellow" to="/userCenter/myInfo">个人中心</nuxt-link>
      </div>
    </template>
    <template v-else-if="!$isMobile">
      <Button @click="$router.push('/login')" size="medium" class="login-btn">立即登录</Button>
    </template>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss">
.UserCenterEntry {
  .link-wrap {
    margin-top: 16px;
  }
  .link {
    width: 118px;
    a {
      vertical-align: middle;
    }
    i {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 5px;
      background-size: 100% 100%;
      vertical-align: middle;
    }
    &.merchant-link {
      i {
        background-image: url(~static/img/pc/merchant_center.png);
      }
    }
    &.user-link {
      text-align: right;
      i {
        background-image: url(~static/img/pc/user_center.png);
      }
    }
  }

  .el-button {
    width: 110px;
    padding-left: 0;
    padding-right: 0;
    background: transparent;
    border-color: $borderColorInputDark;
    &:hover {
      border-color: $colorGreen;
    }
  }
  // .el-button + .el-button {
  //   margin-left: 0;
  // }

  .login-btn {
    margin: 0 auto;
  }
}

.UserCenterEntry-badge {
  .el-badge__content.is-fixed {
    top: 6PX;
    right: 24px;
  }
}

.RootIsMobile {
  .UserCenterEntry {
    .link {
      width: 174px;
      i {
        width: 16PX;
        height: 16PX;
      }
    }
    .userName {
      width: 130px;
    }
  } 
}
</style>
