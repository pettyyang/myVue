<template>
  <div class="mStepMain-wrapper bsnsLicense-wrapper" v-loading="isLoading">
    <h1 class="mAuth-title">
      发票
      <b class="index" v-if="steps.curStep">({{ steps.curStep }}/{{ steps.allStep }})</b>
      <span class="red">请上传与贸易合同，票据背书记录一致的发票，开票日期需在一年内</span>
    </h1>
    <el-form class="mAuth-form mAuth-form__padding" ref="voiceForm" :model="voiceForm" :rules="rules">
      <el-form-item class="mForm-item flex-start">
        <span class="mItem-lab">
          <em class="required_con"></em>
          上传发票:
        </span>
        <div class="item-upImg">
          <theUploadPic @getFile="getTicketMsg">
            <template v-slot:picture v-if="voiceForm.bill_url">
              <div class="same-legal-img-font">
                <img @mouseenter="isDeleteFont = true" :src="voiceForm.bill_url" />
              </div>
              <div class="same-legal-pic-mask" @mouseenter="isDeleteFont = true" @mouseleave="isDeleteFont = false" v-if="isDeleteFont">
                <i
                  @click="doDeleteImg"
                  class="el-icon-delete"
                ></i>
              </div>
            </template>
          </theUploadPic>
          <div class="upimg-style">
            <div class="icon"></div>
            <p class="des">点击上传发票</p>
            <p style="color:#999;">支持文件格式: png、jpg</p>
          </div>
          <!-- <div class="item-tip">
            <p class="red">（必须根据要求填写内容，加盖公章后拍照上传）</p>
          </div> -->
        </div>
        <div class="item-upInfo" v-if="false">
          <el-link type="primary" @click="popEg(require('../../../assets/img/eg-business.png'))">查看示例</el-link>
        </div>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item class="mForm-item" prop="">
            <span class="mItem-lab">
              <em class="required_con"></em>
              购方名称:
            </span>
            <div class="flex">
              <el-input class="mItem-long" placeholder="请输入购方名称" v-model="voiceForm.bill_buyer"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="mForm-item" prop="">
            <span class="mItem-lab">
              <em class="required_con"></em>
              销方名称:
            </span>
            <div class="flex">
              <el-input class="mItem-long" placeholder="请输入销方名称" v-model="voiceForm.bill_seller"></el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="mForm-item" prop="">
            <span class="mItem-lab">
              <em class="required_con"></em>
              发票代码:
            </span>
            <div class="flex">
              <el-input class="mItem-long" placeholder="发票代码:" v-model="voiceForm.bill_code"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="mForm-item" prop="">
            <span class="mItem-lab">
              <em class="required_con"></em>
              发票号码:
            </span>
            <div class="flex">
              <el-input class="mItem-long" placeholder="发票号码:" v-model="voiceForm.bill_no"></el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="mForm-item" prop="">
            <span class="mItem-lab">
              <em class="required_con"></em>
              发票金额:
            </span>
            <div class="flex">
              <el-input class="mItem-long" placeholder="请输入发票金额" v-model="voiceForm.bill_money"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="mForm-item" prop="">
            <span class="mItem-lab">
              <em class="required_con"></em>
              开票日期:
            </span>
            <div class="flex">
              <el-input class="mItem-long" placeholder="请选择开票日期" v-model="voiceForm.bill_date"></el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 查看示例 -->
    <theView :egSrc="egSrc" @closePop="closePop" v-if="isShowViewPop"></theView>
  </div>
</template>

<script>
import { getTicketBillinfo } from '@/api/comTicketApi.js'

import theUploadPic from '_c/theUploadPic'
import theView from '_c/theView'

export default {
  components: {
    theUploadPic,
    theView
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
    }
  },
  data () {
    return {
      isDeleteFont: '',
      isLoading: false,
      isShowViewPop: false,
      egSrc: '', // 查看示例
      voiceForm: {
        bill_url: '', // 发票url
        bill_buyer: '', // 购方名称
        bill_code: '', // 发票代码
        bill_money: '', // 发票金额
        bill_seller: '', // 销方名称
        bill_no: '', // 发票号码
        bill_date: '' // 开票时间
      },
      rules: {
        bill_buyer: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { validator: this.$valid.validIptLen, trigger: 'blur' }
        ],
        certNo: [{ validator: this.$valid.validCreditCode, trigger: 'blur' }]
      }
    }
  },
  created () {
  },
  methods: {
    // 点击上传票据获取，票据信息
    getTicketMsg (file, data) {
      this.isIdentifyOk = true
      this.voiceForm.bill_url = data.originUrl
      const jsonData = {
        filename: data.originUrl
      }
      try {
        getTicketBillinfo(jsonData).then(res => {
          this.isIdentifyOk = false
          if (res.res === 1) {
            this.voiceForm.bill_buyer = res.data.accepterName
            this.voiceForm.bill_code = res.data.billNo
            this.voiceForm.bill_seller = res.data.payeeName
            this.voiceForm.bill_no = res.data.billNo
            this.voiceForm.bill_money = this.$BigNumberCHU(res.data.billAmt, 10000)
            const issueDate = res.data.issueDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
            this.voiceForm.bill_date = issueDate
          }
        })
      } catch (error) {
        this.isIdentifyOk = false
        console.log(error)
      }
    },
    //  打开查看示例 切换示例地址
    popEg (src) {
      this.egSrc = src
      this.isShowViewPop = !this.isShowViewPop
    },
    // 关闭查看示例
    closePop () {
      this.isShowViewPop = false
    },
    inputEnterName () {
      this.$emit('getVoiceForm', this.voiceForm)
    },

    // 点击删除图片
    doDeleteImg () {
      this.voiceForm.bill_url = ''
      this.voiceForm.bill_buyer = ''
      this.voiceForm.bill_code = ''
      this.voiceForm.bill_money = ''
      this.voiceForm.bill_seller = ''
      this.voiceForm.bill_no = ''
      this.voiceForm.bill_date = ''
    }
  },
  watch: {
    voiceForm: {
      // 深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        this.inputEnterName()
      },
      deep: true
    }
  },
  mounted () {
  }
}
</script>
<style scoped></style>
