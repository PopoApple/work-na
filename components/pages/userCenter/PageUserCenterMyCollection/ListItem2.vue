<template>
  <ListItem type="card" isFieldsView btnPosition="right" :route="$isMobile ? { path: '/' } : null"  :class="{'checked': allow }" @click.native="triggerChecked(allow)">
    <ListItemCol label="类型" :width="$isMobile ? 350 : 110">
      <Status :dict="typeDict" :value="data.type" />
    </ListItemCol>
    <ListItemCol label="需求标题" :width="$isMobile ? 350 : 300">
      {{ data.title }}
    </ListItemCol>
    <ListItemCol label="地区" :width="$isMobile ? 350 : 110">
      {{ data.area }}
    </ListItemCol>
    <ListItemCol label="发布时间" :width="$isMobile ? 350 : 120">
      {{ data.time }}
    </ListItemCol>
    <ListItemCol label="剩余时间" :width="$isMobile ? 350 : 100">
      <span :style="{ color: getUsableTimeColor(data.usableTime) }">
        {{ data.usableTime }}
      </span>
    </ListItemCol>
    <template v-if="!$isMobile" slot="btns">
      <a href="javascript:;" class="a-green" style="text-align: right">
        查看详情 <i class="el-icon-arrow-right" />
      </a>
    </template>
    <!-- 右下角删除标识 -->
    <div class="delete-mark iconfont icon-xuanzhongjiaobiao" :style="{ display: checked }"></div>
  </ListItem>
</template>

<script>
import styleVars from '~/assets/style/vars.scss'

  export default {
    props: {
      data: Object,
      allow: Boolean
    },
    data() {
      return {
        typeDict: [
          { value: '1', label: '招标预告', color: 'colorGreen' }
        ],
        checked: 'none'
      }
    },
    methods: {
      getUsableTimeColor() {
        return styleVars.colorRed
      },
      triggerChecked(isAllowed) {
        if (isAllowed) {
          this.checked = this.checked === 'none' ? 'block' : 'none'
          let state = { id: this.data.id, delete: this.checked === "block"}
          this.$emit('delectchecked', state )
        }
      }
    },
    watch: {
      allow(val) {
        if(val === false) { this.checked = 'none' }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .img {
    display: block;
    background: #ddd;
    width: 120px;
    height: 80px;
  }
  .title {
    display: inline-block;
    max-width: 400px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .deleteBtn {
    font-size: 22PX;
  }

   // 选择删除时样式
  .ListItem {
    border: 1px solid transparent;
  }
  .checked {
    overflow: hidden;
    // 添加文字不可被选中
    -moz-user-select:none;		/* 火狐 */
    -webkit-user-select:none;	/* 谷歌 */
    -ms-user-select:none;		/* IE */
    user-select:none;
    &:hover {
      border-radius: $borderRadius;
      border: 1px solid $colorGreen;
    }
    .delete-mark {
      position: absolute;
      bottom: -2px;
      right: -2px;
      font-size: 26px;
      color: $colorGreen;
      z-index: 20;
    }
  }


  .RootIsMobile {
    .img {
      width: 200px;
      height: 150px;
    }
    .title {
      max-width: 310px;
    }
    .price {
      color: $colorGreen;
    }
  }
</style>
