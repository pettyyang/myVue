<template>
    <el-container class="page-full-Home page-news">
        <the-header :show-right="true"></the-header>
        <el-main style="width: 1280px;overflow-x: hidden;" class="main-wrapper">
            <el-breadcrumb class="bread-wrapper" separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">商票秒融</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">上海银行</el-breadcrumb-item>
            </el-breadcrumb>

            <div class="container-wrapper">
              <div class="container-title"><h4>新增票据</h4></div>
              <div class="price-container">
                <div class="price-content">
                  <el-row>
                    <el-col :span="12">
                      <div class="price-content">
                        <!-- 上传图片模块 -->
                        <div class="upload-img">
                          <theUploadPic @getImg="getNoteMsg"></theUploadPic>
                          <div class="upimg-style">
                            <div class="upimg-body">
                              <img src="@/assets/img/bth_common_add.png" />
                              <p style="color:#3688FF;font-size:18px;margin-top:40px;">请上传票据正面截图</p>
                              <p style="color:#999;">图片文件（.png.jpg.jpeg）5M以内</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="">
                          <!-- 表单模块 -->
                        <div class="form-container">
                          <div class="ipt">
                            <div class="bank">
                              <img src="@/assets/img/start.png" />
                              <span>承兑名称</span>
                            </div>
                            <el-input placeholder="请输入承兑行名称" v-model="dataBilInfo.bankName" style="width: 260px;" class="elinput"></el-input>
                          </div>
                          <div class="ipt">
                            <div class="bank">
                              <img src="@/assets/img/start.png" />
                              <span>票面金额</span>
                            </div>
                            <el-input placeholder="请输入票面金额" v-model="dataBilInfo.amt" style="width: 260px;" class="elinput fixed-text">
                              <span slot="suffix">万元</span>
                            </el-input>
                          </div>
                          <div class="ipt choose-date">
                            <div class="bank">
                              <img src="@/assets/img/start.png" />
                              <span>到期日期</span>
                            </div>
                            <div class="date-picker">
                              <el-date-picker class="elinput datePickerIpt" v-model="dataBilInfo.expiryDate" value-format="yyyy-MM-dd" type="date" :editable="false" align="right" placeholder="选择日期"></el-date-picker>
                              <img src="@/assets/img/ic_sj_rq.png" />
                            </div>

                            <!-- <el-input suffix-icon="el-icon-date" v-model='remitDate' class="elinput"></el-input> -->
                          </div>
                          <el-button :loading="isEnquirySuccess" class="start-btn" :disabled="isCanEnquiry" type="primary">开始计算</el-button>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>

              </div>
            </div>
        </el-main>

        <the-footer></the-footer>
    </el-container>
</template>
<script>
import theHeader from '_c/theHeader'
import theFooter from '_c/theFooter'
import theUploadPic from '_c/theUploadPic'

export default {
  components: {
    theHeader,
    theFooter,
    theUploadPic
  },
  data () {
    return {
      listData: [], // 公告列表数据
      tableData: [
        {
          by_interest: '测试'
        }
      ],
      dataBilInfo: {
        // 票据信息
        bankName: '', // 承兑行名称
        acceptBankNo: '', // 承兑行行号
        amt: '', // 票面金额
        expiryDate: '', // 汇票到期日
        draftNo: '' // 票号
      },
      value: '',
      isEnquirySuccess: false,
      isCanEnquiry: false

    }
  },
  created () {
  },
  mounted () {},
  methods: {
    // 点击申请交易
    applyTrade () {
      this.$router.push(this.$routerPath.routerCommercial_perfectinfo)
    },
    getNoteMsg () {

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

}
</style>
<style  lang='less' scoped>
/* 上传图片模块css start */
.upload-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.upimg-body {
  width: 100%;
  text-align: center;
}
.upimg-body > img {
  width: 34px;
  height: 35px;
}
.upimg-body > p {
  font-size: 14px;
  color: #666;
}
.upimg-body > p:nth-child(2) {
  margin: 19px 0 8px 0;
}
.upimg-style {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.upimg-tips{
  width: 100%;
  height: 80px;
  background: rgba(54, 136, 255, 0.06);
  border-radius: 0px 0px 4px 4px;
  .upimg-tip-one{
    span {
      display: inline-block;
      font-size: 14px;
      color: #3688FF;
      margin-top: 17px;
      margin-bottom: 8px;
      text-indent: 35px;
    }
    img {
      width: 9px;
      height: 16px;
      position: relative;
      top: 3px;
      left: 26px;
    }
  }
  .upimg-tip-two{
    font-size: 14px;
    color: #999;
    text-align: center;
  }
}
.start-btn {
  width: 268px;
  height: 44px;
  margin-left: 120px;
  font-weight: bold;
}
/* 上传图片模块css end */
  // 计算处样式
.price-container{
  width: 1280px;
  height: 367px;
  margin: 0 auto 56px;
  background: #fff;
  border-radius: 0px 0px 8px 8px;
  .price-content{
    width: auto;
    margin: 31px;
  }
}
.upload-img {
  width: 560px;
  height: 280px;
  position: relative;
  background: #FBFBFB;
  border: 1px dashed #e1e1e1;
}

/* 表单*/
.form-container {
  padding-left: 24px;
  margin-top: 51px;
}
.ipt {
  margin-bottom: 28px;
  display: flex;
}
.bank {
  display: inline-block;
  width: 122px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding-right: 24px;
  font-size: 14px;
  color: #666;
}
.bank > span {
  font-size: 14px;
  color: #666;
}
.bank > img {
  width: 9px;
  height: 16px;
  position: relative;
  top: 3px;
  margin-right: 10px;
}
.elinput {
  /* display: inline-block; */
  width: 260px;
  height: 40px;
  float: right;
}
.date-picker {
  display: inline-block;
  position: relative;
}
.date-picker > img {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
