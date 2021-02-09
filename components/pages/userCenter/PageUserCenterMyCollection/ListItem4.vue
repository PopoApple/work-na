<template>
  <ListItem :class="{'checked': allow }" @click.native="triggerChecked(allow)">
    <ListItemCol :width = "$isMobile ? 600 : 600" >
      <ListItemLine>{{jobList.title}}</ListItemLine>
      <ListItemLine>{{jobList.welfareList}}</ListItemLine>
      <ListItemLine>{{jobList.company}}</ListItemLine>
    </ListItemCol>
    <ListItemCol v-if="!$isMobile" fontSize="fontSize3XL" color="colorGreen" :bold="true">
     {{jobList.salaryInfo}}
    </ListItemCol>
    <template v-if="$isMobile" slot="infoTop">
      <div class="salary-info">{{jobList.salaryInfo}}</div>
    </template>
    <template :slot="!$isMobile ? 'infoTop' : 'infoBottom'">
      <div class="create-time">{{jobList.createTime}}</div>
    </template>
    <template v-if="!$isMobile" slot="infoBottom" >
      <a href="javascript;" class="job-detail">职位详情</a>
    </template>
    <!-- 右下角删除标识 -->
    <div class="delete-mark iconfont icon-xuanzhongjiaobiao" :style="{ display: checked }"></div>
  </ListItem>
</template>


<script>

export default {
  props: {
    allow: Boolean
  },
  data() {
    return {
      checked: 'none',
      jobList: {
        title: '招聘奥特曼适格者',
        address: '南门广场永信广场8楼',
        welfareList: '五险一金，补充医疗保险，定期体检，人身意外保险',
        company: '世界和平胜利队',
        salaryInfo: '7-9K',
        createTime: '2021-01-06'
      }
    }
  },
  methods: {
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
      bottom: -18px;
      right: 0;
      font-size: 26px;
      color: $colorGreen;
      z-index: 20;
    }
  }

  .create-time {
    margin-right: 20px;
    color: $fontColorXLight;
  }
  .job-detail {
    display: block;
    width: 97px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: $colorGreen;
    background-color: $bgColorGray;
    border-radius: $borderRadiusS;
    &:hover {
      color: $colorWhite;
      background-color: $colorGreen;
    }
  }

  .salary-info {
    color: $colorGreen;
    font-weight: bold;
  }
</style>