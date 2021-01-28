<template>
    <el-container class="page-full-Home page-news">
        <the-header :show-right="true"></the-header>
        <el-main style="width: 1280px;overflow-x: hidden;" class="main-wrapper">
            <el-breadcrumb class="bread-wrapper" separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">商票秒融</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">上海银行</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="bank-box">
              <h3>上海银行</h3>
            </div>

            <div class="container-wrapper">
              <div class="container-title"><h4>选择票据</h4></div>
              <div class="apply-search">
                <div class="search-container">
                  <div class="search-items">
                    <div class="search-item">
                      <span class="search-title"><i>*</i>承兑人名称:</span>
                      <div class="search-temp">
                        <el-input
                          clearable
                          maxlength="50"
                          style="width: 180px"
                          placeholder="请输入承兑人名称"
                          v-model="value"
                        ></el-input>
                      </div>
                    </div>
                    <div class="search-item">
                      <span class="search-title"><i>*</i>票面金额:</span>
                      <div class="search-temp">
                        <el-input
                          clearable
                          maxlength="50"
                          style="width: 180px"
                          placeholder="请输入票面金额"
                          v-model="value"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="searchBtnarr">
                    <el-button type="primary" plain size="medium">搜索</el-button>
                    <el-button type="primary" size="medium" @click="addTicket">新增票据</el-button>
                  </div>
                </div>
              </div>
              <div class="table-c">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column type="selection"  width="55"></el-table-column>
                  <el-table-column prop="by_interest" sortable="custom"  label="融资方式">
                    <template slot-scope="scope">{{ scope.row.by_interest }}</template>
                  </el-table-column>
                  <el-table-column prop="by_interest" sortable="custom"  label="票号(	后6位)">
                  </el-table-column>
                  <el-table-column prop="by_interest" sortable="custom" label="承兑人">
                  </el-table-column>
                  <el-table-column prop="by_interest" sortable="custom" label="到期日">
                  </el-table-column>
                  <el-table-column prop="by_interest" sortable="custom" width="160"  label="票面金额（元）">
                  </el-table-column>
                  <el-table-column prop="by_interest" sortable="custom" width="160"  label="预计折价率（%）">
                  </el-table-column>
                  <el-table-column prop="by_interest" sortable="custom" width="180"  label="预计成交金额（元）">
                  </el-table-column>
                  <el-table-column prop="by_interest" sortable="custom"  label="操作">
                    <template slot-scope="scope">
                      <span>删除</span>
                      <span>修改</span>
                    </template>
                  </el-table-column>

                </el-table>
                <el-pagination class="pagination-c"  v-if="false"
                  @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="page_size"
                  layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>

              </div>
            </div>
        </el-main>
         <!-- 底部申请交易 -->
        <div class="container-apply">
          <div class="footer-apply">
            <el-row>
              <el-col :span="8">
                <div class="grid1">
                  <h4>直接融资</h4>
                  <p>操作流程：完善订单信息-票据质押背书</p>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid2">
                  <span class="grid2-tile">已选择</span>
                  <span class="grid2-value">1</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid3">
                  <span class="grid3-tile">预计成交金额（元）:</span>
                  <span class="grid3-value">862,950.00</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid4">
                  <p class="grid4-btn" @click="applyTrade">申请交易</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <the-footer></the-footer>
    </el-container>
</template>
<script>
import theHeader from '_c/theHeader'
import theFooter from '_c/theFooter'

export default {
  components: {
    theHeader,
    theFooter
  },
  data () {
    return {
      listData: [], // 公告列表数据
      tableData: [
        {
          by_interest: '测试'
        }
      ],
      pages: {
        pageSize: 10, // 分页条数
        curPage: 1, // 当前页
        totalPage: 800, // 总页数
        pageNum: 1 // 分页页码
      },
      value: ''
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    // 点击新增票据
    addTicket () {
      this.$router.push(this.$routerPath.routerCommercial_operate)
    },
    // 点击申请交易
    applyTrade () {
      this.$router.push(this.$routerPath.routerCommercial_perfectinfo)
    },
    handleSizeChange (val) {
      this.pages.pageNum = 1
      this.pages.pageSize = val
    },
    handleCurrentChange (val) {
      this.pages.pageNum = val
    }
  }
}
</script>
<style lang='less' scoped>
@import "../../assets/styles/common.less";
@import "../../assets/styles/model.less";
.page-news {
  .main-wrapper{
    margin-bottom: 0px;
    position: relative;
    .container-wrapper {
        padding: 0 0 96px 0;
        box-sizing: border-box;
        .container-title{
          width: 100%;
          height: 64px;
          border-bottom: 1px solid #F0F0F0;
          h4{
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-left: 29px;
            padding-top: 18px;
          }
        }
    }
  }
  .bank-box{
    width: 100%;
    height: 44px;
    background: #f8f8f8;
  }
  // 搜索栏
  .apply-search{
    width: 1216px;
    margin: 32px;
  }
  .search-container{
    display: flex;
    .search-items{
      flex: 2;
      .search-item{
        display: inline-block;
        margin-right: 32px;
        .search-title{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;
          i{
            color: #EF6459;
          }
        }
        .search-temp{
          display: inline-block;
          margin-left: 20px;
        }
      }
    }
    .searchBtnarr{
      flex: 1;
      text-align: right;
    }
  }
  // 底部申请交易样式
  .container-apply{
    width: 1280px;
    margin: 0 auto;
    background: #fff;
    margin-bottom: 12px;
    .footer-apply{
      width: 1216px;
      height: 92px;
      // padding-top: 27px;
      // padding-bottom: 21px;
      margin: 0 32px;
      border-top: 1px solid #EBEEF5;
      .grid1{
        h4{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333;
          margin-top: 18px;
          margin-bottom: 10px;
        }
      }
      .grid2{
         margin-top: 32px;
        .grid2-tile{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999;
          margin-right: 8px;
        }
        .grid2-value{
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FC9039;
        }
      }
       .grid3{
         margin-top: 17px;
        .grid3-tile{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999;
          margin-right: 8px;
        }
        .grid3-value{
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #FC9039;
        }
      }
      .grid4{
        text-align: right;
        .grid4-btn{
          width: 216px;
          height: 44px;
          background: #3688FF;
          border-radius: 4px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFEFE;
          text-align: center;
          line-height: 44px;
          margin: 23px auto;
          cursor: pointer;
        }
      }
    }
  }

}
</style>
<style  lang='less' scoped>
  .table-c {
    background: #fff;
    width: 1216px;
    margin: 12px 32px;
    box-sizing: border-box;
    /* 使表格兼容safari，不错位 */
    /deep/.el-table__body {
      width: 100%;
      table-layout: fixed !important;
    }
    .chanType {
      width: 80px;
      height: 32px;
      border-radius: 3px;
      border: 1px solid rgba(240, 240, 240, 1);
      font-size: 14px;
      font-weight: 400;
      color: rgba(54, 136, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      .zhidingzhong {
        position: absolute;
        width: 44px;
        height: 16px;
        left: 30px;
        top: 4px;
        z-index: 222;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, rgba(251, 117, 117, 1) 0%, rgba(236, 84, 72, 1) 100%);
        box-shadow: 0px 3px 5px 0px rgba(237, 86, 74, 0.2);
        border-radius: 2px;
        font-size: 12px;
        line-height: 1;
        color: #fff;
      }
    }
    .chanType1 {
      width: 22px;
      height: 22px;
      background: rgba(54, 136, 255, 0.08);
      border-radius: 50%;
      border: 1px solid rgba(54, 136, 255, 1);
      font-size: 14px;
      color: rgba(54, 136, 255, 1);
      line-height: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .billType1:before {
      content: "银";
      width: 20px;
      height: 20px;
      border: 1px solid #ec5448;
      color: #c73a30;
    }
    .billType2:before {
      content: "商";
      width: 20px;
      height: 20px;
      border: 1px solid #3688ff;
      color: #3688ff;
      background: rgba(54, 136, 255, 0.08);
    }
    .billCha {
      width: 20px;
      height: 20px;
      border: 1px solid #0d8fda;
      color: #fff;
      background: #0d89d1;
      cursor: pointer;
      border-radius: 50%;
      font-size: 10px;
      margin-right: 4px;
      line-height: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .billType:before {
      border-radius: 50%;
      font-size: 10px;
      margin-right: 4px;
      line-height: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    /deep/.el-table__header-wrapper {
      tr,
      th {
        background-color: transparent;
        // padding: 0px;
      }
      thead {
        tr {
          padding: 0 42px;
          color: #fff;
          font-weight: bold;
          box-sizing: border-box;
          background: #3688ff;
          th:first-child {
            padding-left: 2px !important;
          }
          th:last-child {
            padding-right: 2px !important;
            color: #fff;
            background: rgba(54, 136, 255, 1);
          }
        }
      }
    }
    /deep/ .el-table__fixed-header-wrapper {
      thead {
        tr {
          th:last-child {
            padding-right: 42px !important;
            color: #fff;
            background: rgba(54, 136, 255, 1);
          }
        }
      }
    }
    /deep/.el-table__body-wrapper {
      tbody {
        tr {
          // td:first-child {
          //   padding-left: 42px !important;
          // }
          // td:last-child {
          //   padding-right: 42px !important;
          // }
        }
      }
    }
    /deep/.sort-caret.ascending {
      border-bottom-color: rgba(255, 255, 255, 0.3);
    }
    /deep/.sort-caret.descending {
      border-top-color: rgba(255, 255, 255, 0.3);
    }
    /deep/.ascending .sort-caret.ascending {
      border-bottom-color: #ffffff;
    }
    /deep/.descending .sort-caret.descending {
      border-top-color: #ffffff;
    }
    .buyBtn {
      width: 88px;
      height: 32px;
      background: rgba(54, 136, 255, 1);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .bao {
        width: 32px;
        height: 32px;
        background: rgba(103, 189, 255, 0.4);
        border-radius: 4px 0px 0px 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        .cler {
          width: 20px;
          height: 20px;
          border: 1px solid rgba(255, 255, 255, 1);
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 1);
          border-radius: 50%;
        }
      }
    }
    .canbuyBtn {
      background: #03a9f4;
    }
    .myBuy {
      padding: 0 7px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .myIsBuy {
      cursor: pointer;
      .redStar {
        color: #fdf901;
      }
    }

    .btext {
      width: 88px;
      height: 32px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .zd {
        font-size: 14px;
        font-weight: 400;
        color: rgba(54, 136, 255, 1);
        cursor: pointer;
        margin-right: 20px;
      }
      .gj {
        font-size: 14px;
        font-weight: 400;
        color: rgba(54, 136, 255, 1);
        cursor: pointer;
      }
    }
    .btextCancel {
      font-size: 14px;
      font-weight: 400;
      color: rgba(54, 136, 255, 1);
      cursor: pointer;
    }
    .pagination-c {
      text-align: center;
      padding: 0;
      padding: 32px 0 73px;
      box-sizing: border-box;
    }
  }
</style>
