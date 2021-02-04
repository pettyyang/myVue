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
        <div class="grid-items">
          <div class="grid-item">
            <div class="grid-itembox">
              <p class="grid-itemone">已选择票据总张数（张）</p>
              <p class="grid-itemtwo">{{selNum}}</p>
            </div>
          </div>
          <div class="grid-item" @click="goStatus">
            <div class="grid-itembox grid-itembox-mid">
              <p class="grid-itemone">已选择总金额（元）</p>
              <p class="grid-itemtwo">{{selectAmout}}</p>
            </div>
          </div>
          <div class="grid-item">
            <div class="grid-itembox grid-itembox-last">
              <p class="grid-itemone">已选择预计成交总金额（元）</p>
              <p class="grid-itemtwo">{{selEstimatedCost}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 信息 -->
      <div class="info-container mSection-wrapper" v-loading="isSubmit">
        <perfectContract @getContractForm="getContractForm"></perfectContract>
        <perfectinVoice @getVoiceForm="getVoiceForm"></perfectinVoice>
        <perfectOther @getOtherForm="getOtherForm"></perfectOther>

        <div class="btn-sub-wrapper" style="margin-top: -12px;">
          <div class="btn-sun-checkbox">
            <el-checkbox v-model="checked1">我已知悉交易订单是否达成以商票秒融计划审核结果为准。</el-checkbox>
          </div>
          <div class="btn-sun-checkbox">
            <el-checkbox v-model="checked2">
              我已阅读并同意相关服务协议
              <a href="">《电子签章授权书》</a>
              <a href="">《信托贷款合同》</a>
              <a href="">《票据质押合同》</a>
            </el-checkbox>
          </div>
          <div class="button-box">
            <el-button  type="primary" size="small" @click="submitForm()">确定</el-button>
            <el-button  type="primary" size="small" plain @click="backApply()">返回</el-button>
          </div>
        </div>
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
import perfectContract from './components/perfectContract'
import perfectinVoice from './components/perfectinVoice'
import perfectOther from './components/perfectOther'

import { mapState } from 'vuex'
import { operateCommercialPaperInfo } from '@/api/comTicketApi.js'
export default {
  components: {
    theHeader,
    theFooter,
    theStep,
    perfectContract,
    perfectinVoice,
    perfectOther
  },
  data () {
    return {
      isLoading: false,
      checked1: false, // 条例1是否勾选
      checked2: false, // 条例2是否勾选
      selEstimatedCost: 0, // 已选中预计成交金额
      selNum: 0, // 已选中票据数据
      selectAmout: 0, // 已选中票面金额
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
      banklists: [],
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
      },
      rules: {},
      isSubmit: false, // 点击保存
      ruleForm: {},
      contractForm: {}, // 合同
      voiceForm: {}, // 发票
      otherForm: {} // 其他
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.getUserMsg()
    const params = this.$route.query
    this.selEstimatedCost = this.milliFormat(params.selEstimatedCost)
    this.selNum = params.selNum
    this.selectAmout = this.milliFormat(params.selectAmout)
  },
  watch: {

  },
  methods: {
    goStatus () {

    },
    // 获取用户登录信息
    getUserMsg () {
      if (localStorage.getItem('userToken') && this.userInfo.telephone && this.userInfo.id && JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).sessionid) {
        this.isShowRt = false
      }
    },
    // 添加千位符
    milliFormat (num) {
      let s = num.toString()
      if (/[^0-9\.]/.test(s)) return 'invalid value'
      s = s.replace(/^(\d*)$/, '$1.')
      s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1')
      s = s.replace('.', ',')
      const re = /(\d)(\d{3},)/
      while (re.test(s)) {
        s = s.replace(re, '$1,$2')
      }
      s = s.replace(/,(\d\d)$/, '.$1')
      return s.replace(/^\./, '0.')
    },
    // 点击返回
    backApply () {
      this.$router.push({ path: this.$routerPath.routerCommercial_apply })
    },
    // 获取合同信息
    getContractForm (val) {
      this.contractForm = val
      console.log('企业营业执照信息=========', this.contractForm)
    },
    // 获取发票信息
    getVoiceForm (val) {
      this.voiceForm = val
      console.log('法人信息=========', this.voiceForm)
    },
    // 获取其他信息
    getOtherForm (val) {
      this.otherForm = val
      // console.log("最终受益人信息=========", this.otherForm);
    },
    // 交易合同是否完成
    isContractForm () {
      // 其他信息和开户协议
      console.log(this.contractForm, 210210)
      if (JSON.stringify(this.contractForm) !== '{}' &&
        this.contractForm.contract_url &&
        this.contractForm.contract_no &&
        this.contractForm.contract_money
      ) {
        return true
      } else {
        this.$message('请完善交易合同信息')
        return false
      }
    },
    // 交易合同是否完成
    isVoiceForm () {
      // 其他信息和开户协议
      console.log(this.voiceForm, 210210)
      if (JSON.stringify(this.voiceForm) !== '{}' &&
        this.voiceForm.bill_url &&
        this.voiceForm.bill_buyer &&
        this.voiceForm.bill_code &&
        this.voiceForm.bill_money &&
        this.voiceForm.bill_seller &&
        this.voiceForm.bill_no &&
        this.voiceForm.bill_date
      ) {
        return true
      } else {
        this.$message('请完善发票信息')
        return false
      }
    },
    // 其他信息是否完成
    isOtherForm () {
      // 其他信息和开户协议
      console.log(this.otherForm, 210210)
      if (JSON.stringify(this.otherForm) !== '{}' &&
        this.otherForm.other_materail_url &&
        this.otherForm.bank_id &&
        this.otherForm.is_endorse_bill
      ) {
        return true
      } else {
        this.$message('请完善其他信息')
        return false
      }
    },
    // 合并数据
    mergeData () {
      // 参数1. 交易合同
      if (this.contractForm) {
        const ruleForm = this.ruleForm
        console.log(this.ruleForm, this.contractForm)
        this.ruleForm = Object.assign(ruleForm, this.contractForm)
      }
      // 参数2. 发票信息
      if (this.voiceForm) {
        const ruleForm = this.ruleForm
        this.ruleForm = Object.assign(ruleForm, this.voiceForm)
      }
      // 参数3. 其他信息
      if (this.otherForm) {
        const ruleForm = this.ruleForm
        this.ruleForm = Object.assign(ruleForm, this.otherForm)
      }
    },
    // 企业信息提交
    submitForm () {
      if (this.isContractForm() &&
      this.isVoiceForm() &&
      this.isOtherForm()
      ) {
        if (this.checked1 && this.checked2) {
          this.mergeData()
          console.log('企业信息提交', this.ruleForm)
          this.formatParams()
          const fd = this.formatParams()
          this.fetch_openbank(fd)
        } else {
          this.$message({
            type: 'warning',
            message: '请先勾选上面两个条款！',
            showClose: true
          })
        }
      }
    },
    formatParams () {
      let fd = new FormData()
      const ruleForm = this.ruleForm
      console.log(ruleForm, 292)
      for (let key in ruleForm) {
        fd.append(key, ruleForm[key])
      }
      return fd
    },
    // 提交接口
    fetch_openbank (fd) {
      if (fd) {
        this.isSubmit = true
        try {
          operateCommercialPaperInfo(fd).then(res => {
            this.isSubmit = false
            if (res.res === 1) {
              this.$message(res.msg)
              // const params = {
              //   bankName: 'BAIXIN',
              //   status: '2'
              // }
              // this.$methods.toRouter(this.$routerPath.routerPath_openRNameStepStatus, params)
              this.$methods.toRouter(this.$routerPath.routerCommercial_stepStatus)
            }
          })
        } catch (error) {
          this.isSubmit = false
          this.$message(error.message || error)
        }
      }
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
  height: 240px;
  background: #FFFFFF;
  margin: 12px auto;
  .step-box{
    padding-top: 40px;
  }
}
.grid-items{
  width: 1120px;
  height: 100px;
  background: #F6F6F6;
  margin: 20px auto 0;
  padding: 20px 27px;
  display: flex;
  .grid-item{
    flex: 1;
    .grid-itembox{
      width: 200px;
      &.grid-itembox-mid{
        margin: 0 auto;
      }
      &.grid-itembox-last{
        margin-left: 140px;
      }
      .grid-itemone{
        text-align: center;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999;
        margin-bottom: 10px;
      }
      .grid-itemtwo{
        text-align: center;
        font-size: 30px;
        font-family: DIN;
        font-weight: bold;
        color: #EEB131;
      }
    }
  }

}
.button-box{
  width: 122px;
  margin: 32px auto 0;
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
    padding: 0 0 50px 96px;
    .btn-sun-checkbox{
      margin-bottom: 12px;
    }
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
