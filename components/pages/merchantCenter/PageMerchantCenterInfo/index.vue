<template>
  <div class="PageMerchantCenterInfo">
    <div class="LayoutLeftMain-header">
      <TabBtn title="企业信息" styleType="line" />
    </div>
    <div class="LayoutLeftMain-body">
      <div class="content-bar float-wrap">
        <span class="link-btn" @click="changeEdit">
          <i class="iconfont icon-bianji" />
          <span>{{isEdit ? '取消编辑' : '编辑'}}</span>
        </span>
        <span class="tips" v-if="!isEdit && this.$store.state.userInfo.isAuth === 3 && this.$store.state.userInfo.isCompleted !== 2">（请点击编辑完善企业信息）</span>
        <div class="right status" :style="{color: status.color}">{{status.label}}</div>
      </div>
      <PageMerchantCenterInfoView v-if="!isEdit" :data="formData" />
      <PageMerchantCenterInfoEdit v-if="isEdit" :data="formData" @saveSuccess="handleSaveSuccess" />
    </div>
  </div>
</template>

<script>
  import styles from '~/assets/style/vars.scss'
  import headMixin from '~/assets/js/headMixin'
  import { loadDict } from '~/utils'
  import { validatenull } from '@/utils/validate'

  export default {
    mixins: [headMixin],
    props: {
      data: Object
    },
    created() {
      loadDict(this.$axiosClient, 'audit_status').then(
        res => {
          if (!validatenull(res)) {
            let dict = res.map(v => {
              let color = ''
              switch (parseInt(v.value)) {
                case 1:
                  color = styles.colorBlue
                  break
                case 2:
                  color = styles.colorGreen
                  break
                case 3:
                  color = styles.colorRed
                  break
                case 4:
                  color = styles.fontColorXLight
                  break
                case 5:
                  color = styles.colorYellow
                  break
              }
              return {
                value: v.value ? parseInt(v.value) : null,
                label: v.label,
                color: color
              }
            })
            let dictAll = { value: 0, label: '新建' }
            dict.unshift(dictAll)
            this.statusDict = dict
          }
        },
        e => {}
      )
    },
    data() {
      return {
        isEdit: false,
        statusDict: [
          { value: 0, label: '新建' },
          { value: 1, label: '待审核', color: styles.colorBlue },
          { value: 2, label: '已通过', color: styles.colorGreen },
          { value: 3, label: '未通过', color: styles.colorRed },
          { value: 4, label: '已驳回', color: styles.fontColorXLight },
          { value: 5, label: '已撤回', color: styles.colorYellow }
        ],
        formData: JSON.parse(JSON.stringify(this.data))
      }
    },
    computed: {
      status() {
        return this.statusDict.find(d => d.value === this.data.status) || {}
      }
    },
    methods: {
      handleSaveSuccess(e) {
        this.isEdit = false
        this.formData = { ...this.formData, ...e }
      },
      changeEdit() {
        if (this.status.value === 1) {
          this.$toast.fail('企业信息已在审核中，暂时不能编辑!')
        } else {
          this.isEdit = !this.isEdit
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .PageMerchantCenterInfo {
    .content-bar {
      margin: 30px 0;
    }
    .link-btn {
      color: $colorGreen;
      font-size: $fontSizeL;
      font-weight: bold;
      cursor: pointer;
      i {
        font-size: 14px;
        margin-right: 2px;
        color: $colorGreen;
      }
      &:hover {
        color: $fontColor;
        i {
          color: $fontColor;
        }
      }
    }
    .tips {
      color: $colorRed;
    }
  }
  .RootIsMobile {
    .PageMerchantCenterInfo {
      .link-btn {
        font-size: $fontSize;
        i {
          font-size: 12px;
        }
      }
    }
  }
</style>
