<template>
  <div class="User">
    <UserInfo v-if="!$isMobile" class="userInfo" hello nameBold />
    <UserInfo v-if="$isMobile" :size="168" nameFontSize="fontSize2XL" nameColor="fontColorDark" :nameWidth="260" />
    <UserCenterEntry class="user-center-entry" />
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
.User {
  border-radius: $borderRadius;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.RootNotMobile {
  .User {
    width: 300px;
    height: 150px;
    padding: 0 30px;
    background: $bgColorGray;
    .user-center-entry {
      margin: 20px 0 0 0;
    }
  }
}

.RootIsMobile {
  .User {
    height: 320px;
    width: 480px;
    .user-center-entry {
      margin: 40px 0 0;
    }
  }
}
</style>
