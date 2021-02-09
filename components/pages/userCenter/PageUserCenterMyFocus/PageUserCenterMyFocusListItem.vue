<template>
  <ListItem :type="$isMobile ? 'card' : null" :btnsPosition="$isMobile ? 'bottom' : 'right'">
    <ListItemCol v-if="!$isMobile"  :width="$isMobile ? 48 : 36">
      <Checkbox class="checkbox" :value="checked" @change="e => $emit('check', data.id, e)"></Checkbox>
    </ListItemCol>
    <ListItemCol :width="$isMobile ? 220 : 75">
      <nuxt-link :to="{ name: 'material-merchant-merchantDetail-id', params: { id: data.merchantId } }">
        <CcImage :src="data.logoUrl ? data.logoUrl + imgSufix : ''" :width="imgSize" :height="imgSize" />
      </nuxt-link>
    </ListItemCol>
    <ListItemCol :lineHeight="26">
      <ListItemLine  fontSize="fontSizeL"  color="fontColorDark" bold :width="$isMobile ? 416 : 440">
        <nuxt-link :to="{ name: 'material-merchant-merchantDetail-id', params: { id: data.merchantId } }">
          {{data.merchantName}}
        </nuxt-link>
      </ListItemLine>
      <ListItemLine color="fontColorDark"  :width="$isMobile ? 416 : 440">
        {{data.contactName}}
      </ListItemLine>
    </ListItemCol>
    <template slot="btns">
      <DropdownBtn v-if="groupsDict && groupsDict.length > 0" :dict="groupsDict" placement="bottom" btnClass="Button30" size="small" type="primary" plain @command="(id, item) => $emit('move', id, item)">
        移动到
      </DropdownBtn>
      <Button class="Button30 btnFocus" type="danger" plain @click="$emit('cancelFocus', data.id)">取消关注</Button>
    </template>
  </ListItem>
</template>

<script>
  import { SJTOU55 } from '~/assets/js/constants'

  export default {
    props: {
      data: Object,
      groupsDict: Array,
      checked: Boolean,
    },
    computed: {
      imgSize() {
        return this.$isMobile ? 200 : 55
      },
      imgSufix() {
        return SJTOU55
      },
    },
  }
</script>

<style lang="scss" scoped>
.btnFocus {
  margin-left: 17px;
}
</style>
