<template>
  <ElementPagination
    background
    layout="prev, pager, next"
    :total="total"
    class="Pagination"
    :class="{ circleBtn, alignRight: align === 'right' }"
    :current-page="currentPage"
    :pager-count="$isMobile ? 5 : 11"
    @current-change="handleCurrentChange"
  />
</template>

<script>
  export default {
    props: {
      circleBtn: Boolean,
      total: Number,
      align: String,
    },
    computed: {
      currentPage() {
        let page = this.$route.query['page']
        if (page && /^[1-9]\d*$/.test(page)) {
          return parseInt(page)
        } else {
          return 1
        }
      },
    },
    methods: {
      handleCurrentChange(page) {
        this.$router.push({ ...this.$route, query: { ...this.$route.query, page } })
      },
    },
  }
</script>

<style lang="scss">
.Pagination {
  &.el-pagination.is-background {
    text-align: center;
    .el-pager li {
      border-radius: $borderRadiusS;
    }
    &.circleBtn {
      .el-pager li {
        border-radius: 50%;
      }
      .number a {
        border-radius: 50%;
      }
    }
    .btn-prev, .btn-next, .el-pager li {
      height: 32px;
      line-height: 32px;
      color: $fontColorLight;
      font-weight: 500;
      background: #fff;
      min-width: auto;
    }
    .el-pager {
      li {
        width: 32px;
        border: 1px solid $borderColor;
        font-size: $fontSizeOddS;
        &.active {
          border-color: $colorGreen;
        }
        margin-left: 0;
        margin-right: 0;
      }
      li + li {
        margin-left: 12px;
      }
      .el-pager .more::before {
        line-height: inherit;
      }
    }
    .btn-prev {
      margin-right: 12px;
      &[disabled=disabled] {
        margin-right: 0;
      }
    }
    .btn-next {
      margin-left: 12px;
      &[disabled=disabled] {
        margin-left: 0;
      }
    }
    .btn-prev, .btn-next {
      &[disabled=disabled] {
        display: none;
      }
      color: $colorGreen;
      font-size: $fontSize;
    }
    .el-icon-arrow-right {
      &:before {
        content: "下一页\e6e0";
      }
    }
    .el-icon-arrow-left {
      &:before {
        content: "\e6de上一页";
      }
    }
    .number {
      padding: 0;
      a {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: $borderRadiusS;
        &:hover {
          background: $bgColorGreen;
        }
      }
    }
  }
  &.alignRight.el-pagination.is-background {
    text-align: right;
  }
}

.RootIsMobile {
  .Pagination {
    &.el-pagination.is-background {
      .btn-prev, .btn-next, .el-pager li {
        height: 56px;
        line-height: 56px;
      }
      .el-pager {
        li {
          width: 56px;
        }
      }
    }
  }
}
</style>