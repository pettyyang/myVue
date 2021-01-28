<template>
  <div class="home page-full-Register">
    <theHeader style="flex-shrink: 0" :showRight="isShowRt">
      <template v-slot:right>
        <div class="right-btn">
          <el-button class="login-btn" type="primary" @click="toRouter(routerPath.routerPath_login)">登录</el-button>
          <el-button class="register-btn" @click="toRouter(routerPath.routerPath_register)">注册</el-button>
        </div>
      </template>
    </theHeader>
    <div class="ctttttttt" style="flex-shrink: 0">
      <div class="step-container">
        <div class="step-box">
          <theStep></theStep>
        </div>
      </div>
      <!-- 信息 -->
      <div class="info-container mSection-wrapper">
        <ticketStepLicense :steps="stepBusinessLicense"></ticketStepLicense>
        <ticketStepLegalPerson :steps="stepLegalPerson"></ticketStepLegalPerson>
        <ticketAccount :steps="stepAccount"></ticketAccount>
      </div>
    </div>
    <!-- 底部 -->
    <theFooter style="flex-shrink: 0"></theFooter>
  </div>
</template>
<script>
import theHeader from '_c/theHeader'
import theFooter from '_c/theFooter'
// import theUploadPic from '_c/theUploadPic'
import theStep from './components/theStep'
import ticketStepLicense from './components/ticketStepLicense'
import ticketStepLegalPerson from './components/ticketStepLegalPerson'
import ticketAccount from './components/ticketAccount'

import { mapState } from 'vuex'
import { } from '@/api/api.js'
export default {
  components: {
    theHeader,
    theFooter,
    theStep,
    ticketStepLicense,
    ticketStepLegalPerson,
    ticketAccount
    // theUploadPic
  },
  data () {
    return {
      isShowRt: true, // 是否展示右侧登陆注册
      dataBilInfo: {
        // 票据信息
        bankName: '', // 承兑行名称
        acceptBankNo: '', // 承兑行行号
        amt: '', // 票面金额
        expiryDate: '', // 汇票到期日
        draftNo: '' // 票号
      },
      isEnquirySuccess: false,
      isCanEnquiry: false,
      startEnquiry: '',
      isHas: false, // 是否已签约
      banklists: ['中信银行', '广发银行'],
      stepBusinessLicense: {
        curStep: 1,
        allStep: 3
      },
      stepLegalPerson: {
        curStep: 2,
        allStep: 3
      },
      stepAccount: {
        curStep: 3,
        allStep: 3
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.getUserMsg()
  },
  watch: {

  },
  methods: {
    // 获取用户登录信息
    getUserMsg () {
      if (localStorage.getItem('userToken') && this.userInfo.telephone && this.userInfo.id && JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).sessionid) {
        this.isShowRt = false
      }
    },
    // 点击在线签约
    onlineSign () {
      this.$router.push('/commercial-submitInfo')
    },
    getNoteMsg () {

    },
    dateIconClick () {

    }
  },
  mounted () {}

}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  .ctttttttt {
    flex: 1;
  }
}
.right-btn {
  height: 100%;
  line-height: 60px;
  float: right;
}
.login-btn,
.register-btn {
  width: 74px;
  height: 32px;
  line-height: 0;
  font-weight: bold;
}
.login-btn {
  background: #3688ff;
}
.register-btn {
  color: #3688ff;
}
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

// 进度条样式
.step-container{
  width: 1280px;
  height: 136px;
  background: #FFFFFF;
  margin: 12px auto;
  .step-box{
    padding-top: 40px;
  }
}
</style>

<style>
  .form-container .fixed-text .el-input__suffix {
    line-height: 40px;
    color: #330300;
    font-size: 14px;
    margin-right: 12px;
  }
  .choose-date .el-icon-circle-close {
    display: none;
  }
  .choose-date .el-input__inner {
    padding-left: 15px;
  }
  .upload-box .el-upload--picture-card {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .elinput > input {
    width: 260px;
    color: #333;
  }
  .choose-date .el-input__prefix {
    opacity: 0;
    display: none;
  }
</style>

<style lang="less">
@import "../../assets/styles/common.less";
@import "../../assets/styles/model.less";
.mSection-wrapper {
  background: none !important;
  .btn-sub-wrapper {
    background: #ffffff;
    margin-top: -40px;
    padding: 0 0 50px 196px;
  }
}
.page-full-Register {
  .myDialog222 {
    a {
      text-decoration: none;
    }
    p {
      line-height: 24px;
    }
    .tips {
      color: #999999;
      padding-left: 98px;
      margin-bottom: 22px;
      padding-top: 1px;
      box-sizing: border-box;
    }
    /deep/.el-input-number {
      width: 100%;
      .el-input__inner {
        text-align: left;
      }
    }
    /deep/ .el-form-item__error {
      left: 98px;
    }
    /deep/.el-form-item__content {
      display: flex;
      width: 100%;
      .mItem-lab {
        flex: 0 0 72px;
        height: 40px;
        color: rgba(102, 102, 102, 1);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 24px;
      }
      .flex {
        width: 100%;
      }
    }
    /deep/ .el-dialog__header {
      padding: 28px 38px 28px;
      box-sizing: border-box;
    }
    /deep/.el-dialog__headerbtn {
      top: 16px;
      right: 17px;
    }
    /deep/.el-dialog__footer {
      margin: 10px auto 10px;
      box-sizing: border-box;
      text-align: left;
    }
    /deep/.el-dialog__body {
      padding: 0 38px 10px;
      box-sizing: border-box;
    }
  }
}
</style>
