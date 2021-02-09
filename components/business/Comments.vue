<template>
  <div>
    <div class="my-reply">
      <!-- 用户头像 -->
      <CcImage
        class="header-img"
        :width="$isMobile?100:45"
        :height="$isMobile?100:45"
        round
        :src="userInfo.avatar || nologinImg"
        :alt="userInfo.nikeName || ''"
      ></CcImage>
      <div class="reply-info">
        <textarea
          rows="3"
          cols="70"
          tabindex="0"
          contenteditable="true"
          id="replyInput"
          spellcheck="false"
          placeholder="输入评论..."
          ref="myReply"
          class="reply-input"
          @focus="showReplyBtn"
          @input="onDivInput($event)"
          @blur="hideReplyBtn"
        ></textarea>
      </div>
      <div class="reply-btn-box">
        <Button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</Button>
      </div>
    </div>
    <div v-if="list.length > 0">
      <div v-for="(item,i) in list" :key="i" class="author-title reply-father">
        <!-- 商户则跳转 -->
        <nuxt-link
          v-if="item&&item.merchantFlag"
          :to="{
            name: 'material-merchant-merchantDetail-id',
            params: { id: item.userId},
           }"
        >
          <CcImage
            class="header-img"
            :width="$isMobile?100:45"
            :height="$isMobile?100:45"
            round
            :src="item.avatar"
            :alt="item.userName"
          ></CcImage>
        </nuxt-link>
        <CcImage
          v-else
          class="header-img"
          :width="$isMobile?100:45"
          :height="$isMobile?100:45"
          round
          :src="item.avatar"
          :alt="item.userName"
        ></CcImage>
        <div class="author-info">
          <nuxt-link
            v-if="item&&item.merchantFlag"
            :to="{
            name: 'material-merchant-merchantDetail-id',
            params: { id: item.userId},
           }"
          >
            <span class="author-name">{{item.userName}}</span>
          </nuxt-link>
          <span v-else class="author-name">{{item.userName}}</span>
          <span class="author-time">{{item.createTime}}</span>
        </div>
        <div class="icon-btn" v-if="!item.temporary||!item.temporary">
          <span @click="showReplyInput(i,item.userName,item.id,item.id)">
            <i class="iconfont el-icon-s-comment"></i>
            <!-- <span class="icon-reply">回复({{item.replyCount}})</span> -->
            <span class="icon-reply">回复{{item.replyCount?'('+item.replyCount+')':''}}</span>
          </span>
        </div>
        <div class="talk-box">
          <p>
            <span class="reply">{{item.content}}</span>
          </p>
        </div>
        <div class="reply-box" v-show="item.replyCount>0">
          <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
            <nuxt-link
              v-if="reply&&reply.merchantFlag"
              :to="{
            name: 'material-merchant-merchantDetail-id',
            params: { id: reply.userId},
           }"
            >
              <CcImage
                class="header-img"
                :width="$isMobile?70:45"
                :height="$isMobile?70:45"
                round
                :src="reply.avatar"
                :alt="reply.userName"
              ></CcImage>
            </nuxt-link>
            <CcImage
              v-else
              class="header-img"
              :width="$isMobile?70:45"
              :height="$isMobile?70:45"
              round
              :src="reply.avatar"
              :alt="reply.userName"
            ></CcImage>
            <div class="author-info">
              <nuxt-link
                v-if="reply&&reply.merchantFlag"
                :to="{
            name: 'material-merchant-merchantDetail-id',
            params: { id: reply.userId},
           }"
              >
                <span class="author-name">{{reply.userName}}</span>
              </nuxt-link>
              <span v-else class="author-name">{{reply.userName}}</span>
              <span class="author-time">{{reply.createTime}}</span>
            </div>
            <div class="icon-btn" v-if="!reply.temporary||!reply.temporary">
              <span @click="showReplyInput(i,reply.userName,reply.id,item.id)">
                <i class="iconfont el-icon-s-comment"></i>
                <span class="icon-reply">回复</span>
              </span>
            </div>
            <div class="talk-box">
              <p>
                <span class="reply">{{reply.content}}</span>
              </p>
            </div>
          </div>
          <div class="second-more">
            <div>
              <span>共{{item.replyCount}}条回复~</span>
              <Button size="medium" v-show="!item.sShowMore" @click="handleSecondLoadMore(i)">点击加载更多</Button>
            </div>
            <span v-show="item.sShowMore">--没有更多了--</span>
          </div>
        </div>
        <div v-show="_inputShow(i)" class="my-comment-reply">
          <!-- 用户头像 -->
          <CcImage
            class="header-img"
            :width="$isMobile?70:45"
            :height="$isMobile?70:45"
            round
            :src="userInfo.avatar || nologinImg"
            :alt="userInfo.nikeName || ''"
          ></CcImage>
          <div class="reply-info">
            <textarea
              rows="1"
              cols="80"
              tabindex="0"
              contenteditable="true"
              spellcheck="false"
              placeholder="输入评论..."
              @input="onDivInput($event)"
              class="reply-input reply-comment-input"
              ref="replyInfoBox"
            ></textarea>
          </div>
          <div class="reply-btn-box">
            <Button class="reply-btn-close" size="medium" @click="closeCommentReply(i)">
              <i class="iconfont icon-orange-error" />
            </Button>
            <Button class="reply-btn" size="medium" @click="sendCommentReply(i)" type="primary">发表评论</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <Empty centerMiddle waringText="暂无数据!" />
    </div>
    <div class="footer-more">
      <Button size="medium" v-show="!fShowMore" @click="handleFirstLoadMore()">加载更多</Button>
      <span v-show="fShowMore">--没有更多了--</span>
    </div>
  </div>
</template>

<script>
  import { dateStr } from '@/utils'
  import { validatenull } from '@/utils/validate'
  import { apiCommentsList, apiAddComments, apiAddReply } from '~/api/comments'
  import { getTotalPage } from '~/utils'
  import nologinImg from '~/static/img/icon/nologin.png'
  export default {
    name: 'Comments',
    props: {
      data: Object
    },
    data() {
      return {
        nologinImg,
        list: this.data
          ? this.data.records.map(v => {
              return {
                ...v,
                inputShow: false,
                sShowMore: !v.replyCount > 0,
                sListPage: 0,
                sTotal: 0,
                sListLoading: false,
                reply: []
              }
            })
          : [],
        btnShow: false,
        index: '0',
        replyComment: '',
        fListPage: 1,
        fListLoading: false,
        fShowMore: this.data
          ? this.data.records
            ? this.data.records.length > 0
              ? false
              : true
            : true
          : true,
        to: '',
        sourceId: -1,
        parentId: -1
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo
      },
      id() {
        return this.$nuxt.$route.params.id
      },
      myName() {
        return this.$store.state.userInfo.nikeName
      },
      myHeader() {
        return this.$store.state.userInfo.avatar
      },
      totalPage() {
        return getTotalPage(this.data.total)
      }
    },
    methods: {
      showReplyBtn() {
        this.btnShow = true
        this.$nextTick(() => {
          if (!validatenull(this.$refs.myReply)) {
            this.$refs.myReply.style.padding = '8px 8px'
            this.$refs.myReply.style.border = '1px solid #00A64A'
          }
        })
      },
      hideReplyBtn() {
        this.btnShow = false
        this.$nextTick(() => {
          if (!validatenull(this.$refs.myReply)) {
            this.$refs.myReply.style.padding = '10px'
            this.$refs.myReply.style.border = '1px solid #E9EBE8'
          }
        })
      },
      showReplyInput(i, name, id, parentId) {
        this.list[this.index].inputShow = false
        this.index = i
        this.list[i].inputShow = true
        this.to = name
        this.sourceId = id
        this.parentId = parentId
        this.$nextTick(() => {
          if (!validatenull(this.$refs.replyInfoBox) && !validatenull(this.$refs.replyInfoBox[i])) {
            this.$refs.replyInfoBox[i].focus()
          }
        })
      },
      _inputShow(i) {
        return this.list[i].inputShow
      },
      sendComment() {
        if (validatenull(this.replyComment)) {
          this.$toast.fail('评论不能为空')
        } else {
          //发送评论
          let params = {
            commentContent: this.replyComment,
            originId: this.id,
            originType: 1
          }
          this.$showLoading()
          apiAddComments(this.$axiosClient, params).then(
            res => {
              this.$hideLoading()
              if (res.code === 200) {
                this.$toast.success('评论成功!稍后将显示')
                //制造模拟评论
                let temporaryComment = {}
                let input = document.getElementById('replyInput')
                let timeNow = new Date().getTime()
                let time = dateStr(timeNow)
                temporaryComment.userName = this.myName
                temporaryComment.content = this.replyComment
                temporaryComment.avatar = this.myHeader
                temporaryComment.createTime = time
                temporaryComment.replyCount = 0
                temporaryComment.inputShow = false
                temporaryComment.sShowMore = false
                temporaryComment.sListPage = 0
                temporaryComment.sTotal = 0
                temporaryComment.sListLoading = false
                temporaryComment.reply = []
                temporaryComment.temporary = true
                this.list.push(temporaryComment)
                this.replyComment = ''
                input.value = ''
              } else {
                this.$toast.fail(res.msg || '评论失败!')
              }
            },
            e => {
              this.$hideLoading()
              this.$toast.fail(e.message || '评论失败!')
            }
          )
        }
      },
      sendCommentReply(i) {
        if (validatenull(this.replyComment)) {
          this.$toast.fail('回复不能为空')
        } else {
          //发送回复
          let params = {
            commentContent: this.replyComment,
            originId: this.id,
            originType: 1,
            sourceId: this.sourceId,
            parentId: this.parentId
          }
          this.$showLoading()
          apiAddReply(this.$axiosClient, params).then(
            res => {
              this.$hideLoading()
              if (res.code === 200) {
                this.$toast.success('回复成功!稍后将显示')
                // 制造模拟回复
                let temporaryReply = {}
                let timeNow = new Date().getTime()
                let time = dateStr(timeNow)
                temporaryReply.userName = this.myName
                temporaryReply.content = this.replyComment
                temporaryReply.avatar = this.myHeader
                temporaryReply.createTime = time
                temporaryReply.replyCount = 0
                temporaryReply.temporary = true
                this.list[i].reply.push(temporaryReply)
                this.list[i].replyCount = 1 + this.list[i].replyCount
                this.replyComment = ''
                document.getElementsByClassName('reply-comment-input')[i].value = ''
              } else {
                this.$toast.fail(res.msg || '回复失败!')
              }
            },
            e => {
              this.$hideLoading()
              this.$toast.fail(e.message || '回复失败!')
            }
          )
        }
      },
      closeCommentReply(i) {
        this.list[i].inputShow = false
      },
      onDivInput: function(e) {
        this.replyComment = e.target.value
      },
      handleFirstLoadMore() {
        if (this.fListLoading || this.fListPage >= this.totalPage) {
          this.fShowMore = true
          return
        }
        this.fListLoading = true
        let page = this.fListPage + 1
        let params = {
          page: page,
          originId: this.id
        }
        this.$showLoading()
        apiCommentsList(this.$axiosClient, params).then(
          res => {
            this.$hideLoading()
            this.fListLoading = false
            if (res.code === 200) {
              if (!validatenull(res) && !validatenull(res.data) && !validatenull(res.data.records)) {
                let list = res.data.records.map(v => {
                  return {
                    ...v,
                    inputShow: false,
                    sShowMore: !v.replyCount > 0,
                    sListPage: 0,
                    sTotal: 0,
                    sListLoading: false,
                    reply: []
                  }
                })
                this.list = [...this.list, ...list]
                this.fListPage = page
                if (page >= this.totalPage) {
                  this.fShowMore = true
                }
              }
            } else {
              this.$toast.fail(res.msg || '获取评论失败!')
            }
          },
          e => {
            this.$hideLoading()
            this.fListLoading = false
          }
        )
      },
      handleSecondLoadMore(i) {
        if (validatenull(this.list[i]) || this.list[i].sListPage != 0) {
          if (
            validatenull(this.list[i]) ||
            this.list[i].sListLoading ||
            this.list[i].sListPage * 10 > this.list[i].sTotal
          ) {
            this.list[i].sShowMore = true
            return
          }
        }

        this.list[i].sListLoading = true
        let page = this.list[i].sListPage + 1
        let params = {
          page: page,
          originId: this.id,
          parentId: this.list[i].id
        }
        this.$showLoading()
        apiCommentsList(this.$axiosClient, params).then(
          res => {
            this.$hideLoading()
            this.list[i].sListLoading = false
            if (res.code === 200) {
              if (!validatenull(res) && !validatenull(res.data) && !validatenull(res.data.records)) {
                this.list[i].reply = [...this.list[i].reply, ...res.data.records]
                this.list[i].sListPage = page
                this.list[i].sTotal = res.data.total
                if (page * res.data.size > res.data.total) {
                  this.list[i].sShowMore = true
                }
              }
            } else {
              this.$toast.fail(res.msg || '获取评论失败!')
            }
          },
          e => {
            this.$hideLoading()
            this.list[i].sListLoading = false
          }
        )
      }
    }
  }
</script>


<style lang="scss" scoped>
  .empty{
    position:relative;
    height: 400px;
    width: 100%;
  }
  .my-reply{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
   
    .header-img{
      display: inline-block;
      vertical-align: top;
    }
    .reply-info{
      display: inline-block;
      margin-left: 5px;
      width: 80%;
      .reply-input{
        resize: none;
        display: inline-block;
        box-sizing: border-box;
        overflow: auto;
        width: 95% !important;
        height: 65px;
        transition: 0s;
        padding: 5px 10px;
        line-height: normal;
        color: $fontColor;
        background-color: $colorWhite;
        border-radius: 5px;
        border: 1px solid $borderColorLight;
        &:empty:before{
          content: attr(placeholder);
        }
        &:focus:before{
          content: none;
        }
        &:focus{
          padding: 8px 8px;
          border: 1px solid $colorGreen;
          box-shadow: none;
          outline: none;
        }
      }
    }     
    .reply-btn-box{
      height: 25px;
      margin: 10px 0;

      .reply-btn{
        position: relative;
        float: right;
        margin-right: 15px;
      }
      .reply-btn-close{
        position: relative;
        float: right;
        margin: 10px 0;
        padding: 0;
        border: 1px solid transparent;  //自定义边框
        outline: none; 
      }
      .reply-btn-close:hover{
        background-color: transparent;
      }
    } 
  }   
  .my-comment-reply{
    margin-top: 20px;
    padding: 10px;
    .header-img{
      display: inline-block;
      vertical-align: top;
    }
    .reply-info{
      display: inline-block;
      margin-left: 5px;
      width: 90%;
      .reply-input{
        resize: none;
        width: 95% !important;
        min-height: 20px;
        line-height: 22px;
        padding: 10px 10px;
        color: $fontColor;
        background-color: $colorWhite;
        border-radius: 5px;
        border: 1px solid $borderColorLight;
        &:empty:before{
          content: attr(placeholder);
        }
        &:focus:before{
          content: none;
        }
        &:focus{
          padding: 8px 8px;
          border: 1px solid $colorGreen;
          box-shadow: none;
          outline: none;
        }
      }
    }     
    .reply-btn-box{
      height: 25px;
      margin: 10px 0;

      .reply-btn{
        position: relative;
        float: right;
        margin-right: 15px;
      }
      .reply-btn-close{
        position: relative;
        float: right;
        margin: 10px 0;
        padding: 0;
        border: 1px solid transparent;  //自定义边框
        outline: none; 
      }
      .reply-btn-close:hover{
        background-color: transparent;
      }
    } 
  } 
  .author-title:not(:last-child){
    border-bottom: 1px solid $borderColorLight;
  }
  .author-title{
    padding: 10px;
    .header-img{
      display: inline-block;
      vertical-align: top;
    }
    .author-info{
      display: inline-block;
      margin-left: 10px;
      width: 60%;
      height: 45px;
      line-height: 20px;

      >span{
        display: block;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .author-name{
        color: $fontColor;
        font-size: $fontSizeL;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .author-time{
        color: $fontColorXLight;
      }
    }
    .icon-btn{
      color: $fontColorXLight;
      width: 30%;
      padding: 0 !important;
      float: right;
      text-align:end;
      >span{
        cursor: pointer;
        display: flex;
        justify-content: end;
        align-items: center;
        height: 30px;
        line-height: 30px;
     }
      .icon-reply:hover{
        padding: 5px;
        box-shadow: $shadow;
        color: $colorGreen;
        border-radius: $borderRadiusS;;
      }
      .iconfont{
        margin: 0 5px;
      }
    }
    .talk-box{
      margin: 0 50px;
      >p{
        margin: 10px;
      }
      .reply{
        color: $fontColorLight;
      }
    .reply-box{
      margin: 10px 0 0 50px;
      background-color: $bgColorGrayLight;
      border-radius: $borderRadius;
      }
    }
    .reply-box{
      margin: 10px 0 0 50px;
      background-color: $bgColorGrayLight;
      }
  }
  .footer-more{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    flex-direction: column;
  }
  .footer-more span{
    color: $fontColorXLight;
    font-size: $fontSizeS;
  }
  .second-more{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 20px;
    flex-direction: column;
    background-color: $colorWhite;
  }
  .second-more span{
    color: $fontColorXLight;
    font-size: $fontSizeS;
    align-self: center;
  }
  .second-more button{
    border: 1px solid transparent;
    outline: none; 
    font-size: $fontSizeS;
    padding: 5px;
    color: $colorGreen;
  }
  .RootIsMobile {
    .my-reply{
      padding: 0px;
      margin: 20px 0;
      .reply-btn-box{
        margin: 0;
        height:auto;
      }
      .reply-info{
        width: 60%;
        .reply-input{
          height: 100px;
          padding:0px
        }
      }
    }
    .author-title{
      .author-info{
        margin-left: 20px;
        width: 50%;
        height: 100px;
        line-height: 50px;
        .author-name{
          font-size: $fontSize;
        }
      }
      .icon-btn{
        width: 30%;
        height: 100px;
        >span{
          height: 100px; 
          line-height: 100px;
        }
      }
      .talk-box{
        margin: 0 10px;
        .reply-box{
          margin:20px;
        }
      }
      .reply-box{
        margin:20px;
        .author-info{
          margin-left: 10px;
          width: 50%;
          height: 70px;
          line-height: 35px;
          .author-name{
            font-size: $fontSizeS;
          }
          .author-time{
            font-size: $fontSizeS;
          }
        }
        .icon-btn{
          width: 30%;
          height: 70px;
          >span{
            height: 70px; 
            line-height: 70px;
            font-size: $fontSizeS;
          }
        }
        .reply{
          font-size: $fontSizeS;
        }
      }
    }
    .my-comment-reply{
      .reply-info{
        width: 80%;
        .reply-input{
          min-height: 45px;
          line-height: 45px;
        }
      }     
      .reply-btn-box{
        height: 60px;
      } 
    }
}
</style>

