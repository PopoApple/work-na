<template>
  <div class="Tags">
    <template v-if="value">
      <Tag
        class="Tags-tag"
        :key="tag"
        v-for="tag in value"
        closable
        :disable-transitions="true"
        @close="handleClose(tag)">
        {{tag}}
      </Tag>
    </template>
    <template v-if="canAdd && (!maxCount || !value || value.length < maxCount)">
        <Input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          :maxlength="tagMaxLen"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </Input>
        <Button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</Button>
    </template>
  </div>
</template>

<script>
  import emitter from '~/assets/js/emitterMixin'

  export default {
    name: 'Tags',
    mixins: [emitter],
    props: {
      value: {
        type: Array,
      },
      tagMaxLen: Number,
      maxCount: Number,
      canAdd: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        inputVisible: false,
        inputValue: ''
      }
    },
    watch: {
      value(val) {
        this.dispatch('ElFormItem', 'el.form.change', [val])
      },
    },
    methods: {
      handleClose(tag) {
        let newValue = [...this.value]
        newValue.splice(this.value.indexOf(tag), 1)
        this.triggerChange(newValue)
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        if (this.value && this.value.findIndex(d => d === this.inputValue) >= 0) {
          this.$alert('不能添加重复的标签', '提示', { type: 'warning' })
          return
        }
        let inputValue = this.inputValue;
        if (inputValue) {
          let newValue = this.value ? [...this.value, inputValue] : [inputValue]
          this.triggerChange(newValue)
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      triggerChange(val) {
        let value = val.length === 0 ? null : val
        this.$emit('input', value)
      }

    }
  }
</script>

<style lang="scss">
.Tags {
  line-height: 36px;
  margin: -10px 0 0 -10px;
  display: inline-block;
  .Tags-tag {
    margin: 10px 0 0 10px;
  }
  .button-new-tag {
    margin: 10px 0 0 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    margin: 10px 0 0 10px;
    width: 90px;
    vertical-align: bottom;
  }
}
.RootIsMobile {
  .Tags {
    margin: -15px 0 0 -15px;
    .Tags-tag {
      margin: 15px 0 0 15px;
    }
    .button-new-tag {
      height: 64px;
      line-height: 64px;
    }
    .input-new-tag.el-input--small {
      margin: 15px 0 0 15px;
      width: 180px;
      .el-input__inner {
        height: 64px;
        line-height: 64px;
      }
    }
  }
}
</style>