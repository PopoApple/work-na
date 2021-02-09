<template>
  <Dropdown placement="bottom" :trigger="$isMobile ? 'click' : 'hover'" @command="handleCommand">
    <div class="HeaderBell">
      <Badge is-dot :hidden="totalCount <= 0" class="item">
        <i class="iconimg i-bell" />
      </Badge>
    </div>
    <DropdownMenu slot="dropdown">
      <DropdownItem command="2">
        评论消息
        <Badge v-if="$store.state.msgCountComment > 0" :value="$store.state.msgCountComment" class="HeaderBell-list-item" />
      </DropdownItem>
      <DropdownItem command="1">
        系统消息
        <Badge v-if="$store.state.msgCountSys > 0" :value="$store.state.msgCountSys" class="HeaderBell-list-item" />
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      this.$router.push('/userCenter/myMessage?type=' + command)
    }
  },
  computed: {
    totalCount() {
      let cnt = this.$store.state.msgCountComment + this.$store.state.msgCountSys
      return cnt
    }
  },
}
</script>

<style lang="scss">
.HeaderBell {
  display: inline-block;
  cursor: pointer;
  .i-bell {
    background-image: url('~static/img/icon/bell.png');
    width: 15PX;
    height: 15PX;
  }
  .item {
    top: -8px;
    .el-badge__content.is-fixed.is-dot {
      right: 3px;
      top: 9px;
    }
  }
}
.HeaderBell-list-item {
  top: 2px;
  margin-left: 10px;
}

.RootIsMobile {
  .HeaderBell-list-item {
    top: 6px;
  }
}
</style>
