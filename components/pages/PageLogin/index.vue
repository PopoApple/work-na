<template>
  <div class="backgroundLayer" ref="pageWrap">
    <div class="backgroundImg">
      <div class="login-container">
        <div class="desc-box">
          <a href="/">
            <!-- 暂时无法使用别名@或~ -->
           <img src="~static/img/pc/logo.png" alt="">
          </a>
          <h1>
            建筑行业交流的超级航母
          </h1>
          <div class="slogan"> 
            <span>全面的政策动态，领先的施工技术</span><br/>
            <span>前卫的工程理论，广泛的专业资信</span>
          </div>
          <ul class="desc-bottom">
            <li><a href="/aPicture">关于我们</a></li>
            <li><a href="/description">免责声明</a></li>
            <li><a href="/description">版权说明</a></li>
            <li><a href="/">合作伙伴</a></li>
          </ul>
        </div> 

        <div class="login-form-box">
          <h3 class="title">{{loginTypePhone ? phoneTitle : accountTitle}}</h3>
          <div class="login-form">
            <Form ref="form" :model="form" :rules="rules" label-width="0px" :size="$isMobile ? 'medium' : null">
              <!-- 手机验证登录 -->
              <FormItem prop="phoneNum" :class="{ hide: !loginTypePhone }" ref="formItemPhoneNum">
                <Input v-model="form.phoneNum" placeholder="请输入手机号码" name="phoneNum" autocomplete="on" @keydown.enter.native="handleEnter" id="pageLoginInputPhoneNum">
                  <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
                </Input>
              </FormItem>
              <FormItem prop="verification" :class="{ hide: !loginTypePhone }" class="formItem-verification">
                <Input type="verification"  v-model="form.verification" placeholder="验证码" @keydown.enter.native="handleEnter">
                  <template slot="prepend"><i class="el-icon-lock"></i></template>
                  <template slot="append">
                    <template v-if="timer">{{ getCodeCounterText }}</template>
                    <template v-else>
                      <span class="a-green" @click="handleGetCode">{{ getCodeBtnText }}</span>
                    </template>
                  </template>
                </Input>
              </FormItem>
              <!-- 账号密码登录 -->
               <FormItem prop="username" :class="{ hide: loginTypePhone }" ref="formItemUsername">
                <Input type="username"  v-model="form.username" placeholder="请输入登录名" name="username" autocomplete="on" @keydown.enter.native="handleEnter" id="pageLoginInputUsername">
                  <template slot="prepend"><i class="el-icon-s-custom"></i></template>
                </Input>
              </FormItem>
               <FormItem prop="password" :class="{ hide: loginTypePhone }" ref="formItemPassword">
                <Input type="password"  v-model="form.password" placeholder="请输入密码" name="password" autocomplete="on" @keydown.enter.native="handleEnter" id="pageLoginInputPassword">
                  <template slot="prepend"><i class="el-icon-s-check"></i></template>
                </Input>
              </FormItem>
              <FormItem prop="verificationImg" :class="{ hide: loginTypePhone }" >
                <Input type="verificationImg"  v-model="form.verificationImg" placeholder="图片验证码" @keydown.enter.native="handleEnter" >
                  <template slot="prepend"><i class="el-icon-picture"></i></template>
                  <template slot="append">
                    <img class="codeImg" :src="`${codeImgSrc}`" @click="refreshRandomStr" />
                  </template>
                </Input>
              </FormItem>
              <FormItem :class="{ forget: true, hide: loginTypePhone}"><a>忘记密码?</a></FormItem>
            </Form>
          </div>
          <Button class='login-btn' :loading="loading" @click="loading ? null : login()">同意协议并登录</Button>
          <p class="tip">登录，表示您同意
            <Button type="text" @click="dialogVisible = true">《服务协议及隐私声明》</Button>
          </p>
          <div class="change-login-type">
            <span @click="changeLoginType">{{loginTypePhone ?  accountTitle : phoneTitle}}<i class="el-icon-d-arrow-right"></i></span>
            <div v-if="$isMobile"><nuxt-link to="/">广新纳主页  <i class="el-icon-d-arrow-right"></i></nuxt-link></div>
          </div>
        </div>
      </div>
    </div>

    <Dialog
      v-if="dialogVisible" 
      title="服务协议及隐私声明"
      top="10vh"
      :showCancelBtn="false"
      @close="dialogVisible = false"
      @confirm="dialogVisible = false"
    >
      <UserAgreement />
    </Dialog>

    <div class="mask" v-if="maskShow"></div>
  </div>
</template>

<script>
import encryption from '~/utils/encryption'
import { randomLenNum, trim } from '~/utils'
import { setCookies } from '~/utils/cookie'
import { errorTips } from '~/api/config'
import { apiLoginByAccount, apiLoginByPhoneNum, apiSendSms } from '~/api/auth'
import { apiHost } from '~/api/config'

const checkPhoneNum = (rule, value, callback) => {
  if (!/^1[0-9]*$/.test(value)) {
    return callback(new Error('手机号码不合法'))
  } else {
    callback()
  }
}

export default {
  name: 'login',
  data() {
    return {
      form: {
        phoneNum: '',
        verification: '',
        username: '',
        password: '',
        verificationImg: ''
      },
      rules: {
        phoneNum: [
           { required: true, message: '输入手机号', trigger: 'change' },
           { validator: checkPhoneNum },
           { min: 11, max: 11, message: '请输入11位数的手机号', trigger: 'change' }
        ],
        verification: [
          { required: true, message: '输入验证码', trigger: 'change' },
          { min: 6, max: 6, message: '请输入6位数的短信验证码', trigger: 'change' }
        ],
        username: [
          { required: true, message: '输入登录名', trigger: 'change' },
          { min: 3, max: 30, message: '请输入3~30字的用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '输入密码', trigger: 'change' },
          { min: 6, message: '请输入6位数以上密码', trigger: 'change' },
          { max: 20, message: '请输入20位数以下密码', trigger: 'change' }
        ],
        verificationImg: [
          { required: true, message: '输入验证码', trigger: 'change' },
          { max: 6, message: '验证码输入过长', trigger: 'change' }
        ]
      },
      // 对话框
      dialogVisible: false,
      // 切换登录方式
      phoneTitle: '手机号码登录',
      accountTitle: '账号密码登录',
      loginTypePhone: true,
      getCodeBtnText: '获取验证码',
      getCodeCounterText: null,
      timer: null,
      randomStr: '',
      loading: false,
      maskShow: false,
    }
  },
  computed: {
    codeImgSrc() {
      const prefix = !process.env.NUXT_ENV_MODE && process.client ?  '' : apiHost
      return `${prefix}/api/user/v1/code/${this.randomStr}`
    }
  },
  created() {
    this.refreshRandomStr()
  },
  methods: {
    fix360Bug() {
      if (!this.$isMobile) {
        let pageWrap = this.$refs['pageWrap']
        let inputPhoneNum = pageWrap.querySelector('#pageLoginInputPhoneNum')
        let inputUsername= pageWrap.querySelector('#pageLoginInputUsername')
        let inputPassword = pageWrap.querySelector('#pageLoginInputPassword')
        if (!this.form.phoneNum && inputPhoneNum.value) {
          this.form.phoneNum = inputPhoneNum.value
        }
        if (!this.form.username && inputUsername.value) {
          this.form.username = inputUsername.value
        }
        if (!this.form.password && inputPassword.value) {
          this.form.password = inputPassword.value
        }
      }
    },
    login() {
      this.fix360Bug() 
      let fields = this.loginTypePhone ? ['verification', 'phoneNum'] : ['username', 'password', 'verificationImg']
      let counter = fields.length
      this.$refs['form'].validateField(fields, e => {
        if (!e) {
          counter--
          if (counter > 0) {
            return
          }
          let params = this.loginTypePhone ? this.getLoginByPhoneNumParams() : this.getLoginByAccountParams()
          this.loading = true
          let api = this.loginTypePhone ? apiLoginByPhoneNum : apiLoginByAccount
          api(this.$axiosClient, params).then(res => {
            this.loading = false
            if (res.access_token) {
              this.$toast.success('登录成功，正在跳转首页...')
              this.maskShow = true
              const auth = {
                token: res.access_token,
                refresh_token: res.refresh_token,
              }
              //this.$store.commit('setAuth', auth) // mutating to store for client rendering
              // saving token in cookie for server rendering
              setCookies(auth)
              window.location.href = '/'
              //this.$router.push('/')
            } else {
              this.$toast.fail(errorTips[res.code] || '登录失败，请稍后再试')
            }
          }).catch(e => {
            this.loading = false
            this.$toast.fail('登录失败，请稍后再试')
          })
        }
      })
    },
    getLoginByPhoneNumParams() {
      let { verification, phoneNum } = this.form
      let params = {
        mobile: trim(phoneNum),
        code: verification,
      }
      return params
    },
    getLoginByAccountParams() {
      const { username, password, verificationImg } = this.form
      let credential = encryption({
        data: { credential: password },
        key: '1234567887654321',
        param: ['credential'],
      }).credential
      let params = {
        username,
        credential,
        randomStr: this.randomStr,
        code: verificationImg,
      }
      return params
    },
    handleGetCode() {
      this.$refs['form'].validateField('phoneNum', e => {
        if (!e) {
          this.getCodeBtnText = '重新获取'
          if (!this.timer) {
            this.sendSms()
            let time = 60
            this.getCodeCounterText = time + ' 秒'
            this.timer = setInterval(() => {
              time--
              this.getCodeCounterText = time + ' 秒'
              if (time === 0) {
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        }
      })
    },
    sendSms() {
      apiSendSms(this.$axiosClient, { mobile: this.form.phoneNum }).then(res => {
        if (res.code === 200) {
          this.$toast.success('发送成功')
        } else {
          this.$toast.fail(errorTips[res.code] || '发送失败，请稍后再试')
        }
      }).catch(e => {
        this.$toast.fail('发送失败，请稍后再试')
        clearInterval(this.timer)
        this.timer = null
      })
    },
    refreshRandomStr() {
      this.randomStr = randomLenNum(4, true)
    },
    changeLoginType() {
      this.loginTypePhone = !this.loginTypePhone
      this.$refs['form'].resetFields()
    },
    handleEnter(e) {
      this.login()
    },
  }
}
</script>


<style lang="scss" scoped src="./index.scss"></style>