<template>
  <section class="RichTextEditor">
    <div
      v-if="isClient"
      class="quill-editor"
      :content="value"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      v-quill:myQuillEditor="editorOption"
      ref="quillEditor"
    ></div>
    <input type="file" @change="change" id="upload" style="display:none;" />
  </section>
</template>

<script>
  import emitter from '~/assets/js/emitterMixin'
  import { apiAttachmentUrlForEditor } from '~/api/attachment'
  import Vue from 'vue'

  if (process.client) {
    require.ensure([], () =>　{
      var VueQuillEditor = require('vue-quill-editor/dist/ssr')
      Vue.use(VueQuillEditor)
    })
  }

  export default {
    name: 'RichTextEditor',
    mixins: [emitter],
    props: {
      value: String,
      placeholder: String
    },
    computed: {
      isClient() {
        return process.client
      },
      editorOption() {
        let container = [
          ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
          ['blockquote', 'code-block'], // 引用  代码块
          [{ header: 1 }, { header: 2 }], // 1、2 级标题
          [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
          [{ script: 'sub' }, { script: 'super' }], // 上标/下标
          [{ indent: '-1' }, { indent: '+1' }], // 缩进
          // [{'direction': 'rtl'}],                         // 文本方向
          [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
          [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
          [{ font: [] }], // 字体种类
          [{ align: [] }], // 对齐方式
          ['clean'], // 清除文本格式
          ['link', 'image'] // 链接、图片、视频
        ] //工具菜单栏配置

        let containerMobile = [
          ['bold'], // 加粗 斜体 下划线 删除线
          [{ header: 1 }, { header: 2 }], // 1、2 级标题
          [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
          [{ color: [] }], // 字体颜色、字体背景颜色
          [{ align: [] }], // 对齐方式
          ['link', 'image'] // 链接、图片、视频
        ] //工具菜单栏配置
        return {
          modules: {
            toolbar: {
              container: this.$isMobile ? containerMobile : container,
              handlers: {
                image: function(value) {
                  if (value) {
                    document.querySelector('#upload').click() // 劫持原来的图片点击按钮事件
                  } else {
                    this.quill.format('image', false)
                  }
                }
              }
            }
          },
          placeholder: this.placeholder, //提示
          readyOnly: false, //是否只读
          theme: 'snow', //主题 snow/bubble
          syntax: true //语法检测
        }
      }
    },

    watch: {
      value(val) {
        this.dispatch('ElFormItem', 'el.form.change', [val])
      }
    },

    methods: {
      onEditorBlur(editor) {
        //console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        //console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        //console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        //console.log('editor change!', editor, html, text)
        this.$emit('input', html)
      },
      change(e) {
        let file = e.target.files[0]
        apiAttachmentUrlForEditor(this.$axiosClient, file)
          .then(res => {
            let quill = this.$refs.quillEditor.__quill
            if (res.code === 200) {
              // const formdata = _.extend({}, this.formdata)
              let data = res.data
              let length = quill.getSelection().index //光标位置
              // 插入图片  图片地址
              quill.insertEmbed(length, 'image', data.data)
              // 调整光标到最后
              quill.setSelection(length + 1) //光标后移一位
            }
          })
          .catch(err => {
            // console.error(err)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title-img {
    border: 1px solid #ddd;
    background-color: #eee;
    width: 300px;
    height: 200px;
    position: relative;
    .img-loading {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      color: #fff;
      background: rgba(0,0,0,0.5);
      text-align: center;
      line-height: 200px;
    }
    img {
      display: block;
      width: 100%;
    }
  }
</style>

<style lang="scss">
  .RichTextEditor {
    .ql-editor {
      min-height: 200px;
    }
    .ql-toolbar.ql-snow {
      border: 1px solid $borderColorInput;
      border-top-right-radius: $borderRadius;
      border-top-left-radius: $borderRadius;
    }
    .ql-container.ql-snow{
      border: 1px solid $borderColorInput;
      border-bottom-right-radius: $borderRadius;
      border-bottom-left-radius: $borderRadius;
    }
    .ql-editor.ql-blank::before {
      color: $fontColorXLight;
      font-style: normal;
      font-size: $fontSize;
    }
    .ql-snow .ql-picker {
      line-height: 24px;
    }
    
    // 汉化
    .ql-snow .ql-tooltip[data-mode=link]::before {
      content: "请输入链接地址:";
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: '保存';
        padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode=video]::before {
        content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
      content: '14px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
      content: '10px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
      content: '18px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
      content: '32px';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
      content: '文本';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
      content: '标题1';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
      content: '标题2';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
      content: '标题3';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
      content: '标题4';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
      content: '标题5';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
      content: '标题6';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
      content: '标准字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
      content: '衬线字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
      content: '等宽字体';
    }
  }
</style>

