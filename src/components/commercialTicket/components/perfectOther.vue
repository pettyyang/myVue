<template>
  <div>
    <div class="mStepMain-wrapper bsnsLicense-wrapper" v-loading="isLoading">
      <h1 class="mAuth-title">
        其他交易材料
        <b class="index" v-if="steps.curStep">({{ steps.curStep }}/{{ steps.allStep }})</b>
        <span class="red"  v-if="steps.curStep">温馨提示：请先上传合同文件,系统将自动填写信息，再核对识别结果</span>
      </h1>
      <el-form class="mAuth-form mAuth-form__padding" ref="fileForm" :model="otherForm" :rules="rules">
        <el-form-item class="mForm-item mForm-item-upload" prop="contractNo">
          <span class="mItem-lab">
            <em class="required_con"></em>
            其他材料:
          </span>
          <div class="flex">
            <theUploadFile @getUrl="getOtherFileUrl"></theUploadFile>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="mStepMain-wrapper bsnsLicense-wrapper">
      <h1 class="mAuth-title">
        票据背书情况
        <b class="index" v-if="steps.curStep">({{ steps.curStep }}/{{ steps.allStep }})</b>
        <span class="red"  v-if="steps.curStep"></span>
      </h1>
      <el-form class="mAuth-form mAuth-form__padding" ref="bsForm" :model="otherForm" :rules="rules">
        <el-form-item class="mForm-item">
          <el-checkbox v-model="checked" @change="checkboxChange">确认票据无回头背书，背书记录中不含个体工商户、小额贷款、保理、融资租凭、金融服务等名称。</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <div class="mStepMain-wrapper bsnsLicense-wrapper">
      <h1 class="mAuth-title">
        收款账户
        <b class="index" v-if="steps.curStep">({{ steps.curStep }}/{{ steps.allStep }})</b>
        <span class="red">请核对账户及开户行信息，如信息有误，请联系平台客服处理</span>
      </h1>
      <el-form class="mAuth-form mAuth-form__padding" ref="accountForm" :model="otherForm" :rules="rules">

        <el-form-item class="mForm-item" prop="contractNo">
          <span class="mItem-lab">
            <em class="required_con"></em>
            收款账户:
          </span>
          <div class="flex">
            <el-select v-model="bankInfo.back_accountSet" placeholder="请选择" class="mItem-long">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item class="mForm-item mForm-item-account">
          <span class="mItem-lab">
            <!-- <em class="required_con"></em> -->
          </span>
          <div class="flex">
            <div class="mForm-account">
              <div class="mForm-account-bank">
                <img class="header-pic" src="@/assets/img/avator.png" />
                <span>{{ bankInfo.bank_name }}</span>
              </div>
              <div class="mForm-account-bankNo">{{bankInfo.back_accountSet}}</div>
              <div class="mForm-account-item">用户：{{bankInfo.company_name}}</div>
              <div class="mForm-account-item">开户行行号：{{bankInfo.bank_code}}</div>
              <div class="mForm-account-item">开户行：{{bankInfo.bank_childname}}</div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import { getTicketBankInfo } from '@/api/comTicketApi.js'
import theUploadFile from '_c/theUploadFile'
export default {
  components: {
    theUploadFile
  },
  props: {
    steps: {
      type: Object,
      default: () => {
        return {
          curStep: 0,
          allStep: 0
        }
      }
    },
    signUpInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      fileList: [],
      isLoading: false,
      isShowViewPop: false,
      egSrc: '', // 查看示例
      checked: false,
      bankInfo: {
        bank_name: '', // 开户行名称
        back_account: '', // 对公账户号
        back_accountSet: '', // 带省略号账户
        bank_code: '', // 开户行编码
        back_cnap: '', // 开户行银联编码
        bank_childname: '', // 开户行支行名称
        bank_childcode: '', // 支行银联号
        company_name: '' // 用户
      }, // 银行卡信息
      otherForm: {
        other_materail_url: '', // 其他交易材料url
        bank_id: '', // 卡id
        is_endorse_bill: '' // 票据背书情况（1确认、2未确认）
      },
      rules: {
        contractNo: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { validator: this.$valid.validIptLen, trigger: 'blur' }
        ]
      },
      options: [],
      value: ''
    }
  },
  created () {
    this.setEndorseBill()
    this.getTicketBankInfo()
  },
  methods: {
    // 上传其他材料时的url
    getOtherFileUrl (url) {
      console.log(url)
      this.otherForm.other_materail_url = url
    },
    // 初始化赋值背书情况
    setEndorseBill () {
      this.otherForm.is_endorse_bill = this.checked ? '1' : '2'
    },
    // 背书情况checkbox改变事件
    checkboxChange () {
      this.setEndorseBill()
    },
    // 获取银行卡信息
    getTicketBankInfo () {
      try {
        getTicketBankInfo().then(res => {
          if (res.res === 1) {
            const info = res.data
            this.bankInfo = info
            // this.bankInfo.back_accountSet = this.getHideBankNo(info.back_account)
            this.bankInfo.back_accountSet = info.back_account
            this.otherForm.bank_id = info.id
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 银行卡号*号模式
    getHideBankNo (bankNo) {
      const str = bankNo
        .match(/(\d{4})(\d{4})(\d{4})/)
        .slice(1)
        .reduce(function (value, item, index) {
        // 当index===1时，初始元素和当前元素累加并返回，value是初始值186，也是最终累加的返回值，item是当前索引下标是1的元素****。
          return index === 1 ? value + '****' : value + item
        })
      console.log(str)
      return str
    },
    inputEnterName () {
      this.$emit('getOtherForm', this.otherForm)
    }
  },
  watch: {
    otherForm: {
      // 深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        this.inputEnterName()
      },
      deep: true
    }
  },
  mounted () {
    // this.getBsnsInfo()
  }
}
</script>
<style lang="less" scoped>
  .page-full-Register .mSection-wrapper .mForm-item.mForm-item-account{
    height: 180px;
  }
  .mForm-account{
    width: 340px;
    height: 180px;
    padding: 12px;
    background: #FFFFFF;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    .mForm-account-bank{
      img{
        width: 18px;
        height: 16px;
        margin-right: 6px;
        vertical-align: middle;
      }
      span{
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333;
        vertical-align: middle;
      }
    }
    .mForm-account-bankNo{
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333;
      margin: 18px 0px 18px 23px;
    }
    .mForm-account-item{
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333;
      margin-left: 23px;
      margin-bottom: 8px;
    }
  }
</style>
