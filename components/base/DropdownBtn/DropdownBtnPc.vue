<template>
  <Dropdown class="DropdownBtn" placement="bottom" @command="e => $emit('command', e.value, e)">
    <Button :class="btnClass" :size="size" :type="type" :plain="plain"><slot /><i class="el-icon-arrow-down el-icon--right"></i></Button>
    <DropdownMenu slot="dropdown" v-if="dict && dict.length > 0">
      <DropdownItem v-for="item in dict" :key="item.value" :command="item">
        <div class="DropdownBtn-item ellipsis">
          {{ item.label }}
        </div>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>

export default {
  props: {
    dict: Array,
    size: String,
    type: String,
    btnClass: String,
    plain: Boolean,
  },
}
</script>

<style lang="scss">
.DropdownBtn-item {
  max-width: 80px;
}
</style>