<template>
  <div class="PageUserCenterMyInfo" >
    <div class="LayoutLeftMain-header">
      <TabBtn title="个人信息" styleType="line" />
    </div>
    <div class="LayoutLeftMain-body">
      <div class="avatar">
        <img v-if="!isEdit" :src="data.form.avatarUrl + TOU90" alt="" class="avatar-img" :key="data.form.avatarUrl"/>
        <UploadImg v-if="isEdit" v-model="data.form.avatarUrl" @upload="file => handleUpload(file)" :showTips="false" :width="$isMobile? 240 : 90" :height="$isMobile? 240 : 90" class="avatar-img" />
        <!-- <div v-if="isEdit" class="masking">修改头像</div> -->
        <div v-if="!isEdit" class="name-for-avatar">{{data.form.name}}</div>
        <div v-if="isEdit">上传头像</div>
        <div v-if="isEdit">建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</div>
      </div>
      <div class="info">
          <div class="info-btns">
            <Button class="Button30" v-if="isEdit" @click="toggle">取消</Button>
            <Button class="Button30" v-if="isEdit" type="primary" @click="save">保存</Button>
            <Button class="Button30" v-if="!isEdit"type="primary" @click="toggle">编辑</Button>
          </div>
          <div>
            <PageUserCenterMyInfoView v-if="!isEdit" :data="data.form" />
            <PageUserCenterMyInfoEdit v-if="isEdit" v-model="data.form" ref="editForm" @name-check="nameCheck"/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import PageUserCenterMyInfoView from "./PageUserCenterMyInfoView"
import PageUserCenterMyInfoEdit from "./PageUserCenterMyInfoEdit"
import { getUserInfo, editUserInfo, uploadAvatar, nameIsCheck } from "~/api/userCenter/info"
import headMixin from '~/assets/js/headMixin'
import { TOU90 } from '~/assets/js/constants'

export default {
  mixins: [headMixin],
  name: 'PageUserCenterMyInfo',
  components: {
    PageUserCenterMyInfoView,
    PageUserCenterMyInfoEdit
  },
  props: {
    data: Object
  },
  data() {
    return {
      // 拷贝数据，防止修改信息后，点击取消的情况。
      form: {},
      isEdit: false,
      imgfile: {},
      // 昵称是否存在
      nameActive: true
    }
  },
  computed: {
    TOU90() {
      return TOU90
    }
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.data.form))
  },
  methods: {
    toggle() {
      this.isEdit = !this.isEdit
      this.data.form = JSON.parse(JSON.stringify(this.form))
      this.getinfo()
    },
    save() {
      if( this.data.form.name === this.form.name || !this.nameActive ) {
        this.$refs.editForm.$children[0].validate((valid) => {
          if (valid) {
            editUserInfo( this.$axios, this.data.form )
            .then(res => {
              if ( res.code === 200 ) {
                this.$toast.success('修改用户信息成功！')
                this.isEdit = false
                // this.getinfo()
                this.$router.go(0)
                // 更新form的值，存储最新的用户信息
                this.form = JSON.parse(JSON.stringify(this.data.form))
              } else {
                this.$toast.fail('code:' + res.code + '   修改用户信息失败！')
              }
            })
          }
        })
      } else {
        this.$alert('昵称验证未通过！')
      }
    },
    // 获取用户数据
    async getinfo () {
      let res = await getUserInfo( this.$axiosClient)
      if (res.code === 200) {
        this.data.form.avatarUrl = res.data.avatarUrl || 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1441836571,2166773131&fm=26&gp=0.jpg'
        this.data.form.name = res.data.name
        this.data.form.phone = res.data.phone
        this.data.form.born = res.data.born
        this.data.form.sex = res.data.sex
      }
    },
    // 客户端渲染
    handleUpload({file}) {
      let param = new FormData()
      param.append("file", file)
      uploadAvatar (this.$axiosClient, param).then(res => {
        this.$showLoading('头像上传中...')
        if (res.code === 200) { 
           this.$hideLoading()
           this.$toast.success('修改头像成功！')
           this.getinfo()
        } else {
          this.$hideLoading()
          this.$toast.fail('code:' + res.code + '   修改头像失败！')
        }
      })
    },
    nameCheck() {
      if( this.data.form.name === this.form.name ) {
        this.$alert('请输入新的昵称')
        return
      } 
      nameIsCheck(this.$axiosClient, this.data.form.name).then(res => {
        if( res.code === 200 ) {
          if(res.data === '该昵称已存在' ) { 
            this.nameActive = true
            this.$toast.fail('该昵称已存在！')
          }
          if(res.data === 'success') {
            this.nameActive = false
           this.$toast.success('该昵称可用！')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.RootNotMobile {
  .LayoutLeftMain-body {
    margin-top: 20px;
    display: flex;
    .avatar {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 190px;
      min-height: 280px;
      margin: 20px 20px 20px 0;
      padding: 0px 16px 45px;
      box-shadow: $shadow;
      color: $fontColorXLight;
      .avatar-img {
        display: block;
        width: 90px;
        height: 90px;
        margin: 35px;
        border-radius: 100%;
      }
      /deep/ .UploadImg {
        overflow: hidden;
        border-radius: 100%;
      }
      .masking {
        position: absolute;
        top: 35px;
        width: 90px;
        height: 90px;
        text-align: center;
        line-height: 90px;
        color: $colorWhite;
        background-color: rgba($color: #000000, $alpha: 0.5);
        border-radius: 100%;
        opacity: 0;
        transition: all 1s;
        cursor: pointer;
        &:hover {
          opacity: 1;
        }
      }
      .name-for-avatar {
        font-weight: bold;
        font-size: $fontSizeXL;
        color: $fontColor;
      }
    }
    .info {
      width: 700px;
      .info-btns {
        padding-right: 50px;
        text-align: right;
      }
      .info-form {
        margin-top: 20px;
      }
    }
  }
}
.RootIsMobile {
  .LayoutLeftMain-body {
    margin-bottom: 60px;
    .avatar {
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      margin-top: 40px;
      .avatar-img {
        display: block;
        width: 240px;
        height: 240px;
        border-radius: 100%;
      }
      /deep/ .UploadImg {
        overflow: hidden;
        border-radius: 100%;
      }
      .masking {
        position: absolute;
        display: block;
        width: 240px;
        height: 240px;
        text-align: center;
        line-height: 240px;
        color: $colorWhite;
        background-color: rgba($color: #000000, $alpha: 0.5);
        opacity: 0;
        border-radius: 100%;
        &:active {
          opacity: 1;
        }
      }
      div {
        display: inline-block;
      }
      .name-for-avatar {
        margin-top: 20px;
        font-weight: bold;
        font-size: $fontSizeXL;
        color: $fontColor;
      }
    }
    .info {
      .info-btns {
        display: flex;
        justify-content: space-between;
        padding: 30px 0;
      }
    }
  }
}
</style>
