<template>
    <el-container class="page-full-Home page-news" v-loading="isloading">
        <the-header :show-right="true"></the-header>
        <el-main style="width: 1280px;overflow-x: hidden;margin-top:12px;" class="main-wrapper">
          <el-breadcrumb class="bread-wrapper" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/commercial-ticket' }">商票秒融</el-breadcrumb-item>
            <!-- <el-breadcrumb-item :to="{ path: '/commercial-apply' }">票据列表</el-breadcrumb-item> -->
            <el-breadcrumb-item>二维码</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="container-wrapper">
            <div class="qrcode-main">
              <el-row>
                <el-col :span="8">
                  <div class="qrcode-imgbox">
                    <img class="qrcode-img" :src="QRcodeUrl" alt="二维码">
                    <p class="qrcode-imgbox-p">扫二维码  手机端操作</p>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="qrcode-mark">
                    <!-- <h4 class="qrcode-mark-h4">融资要求</h4>
                    <p class="qrcode-mark-p">1、开户真实性：承兑人及开户行白名单准入管理；承兑人注册地和开户行所在地一致性，商票承兑人和出票人必须保持一致；市场黑名单；</p>
                    <p class="qrcode-mark-p">2、交易真实性：发票上传OCR验真，合同上传和发票交叉验证</p>
                    <p class="qrcode-mark-p">3、票据准入审核：背书要求连续，不受理回头票，不受理备注包含“不得转让"，“委托收款”字样的票据票据流转次数不得超限（5次）。</p>
                   -->
                   {{remark}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-main>
        <the-footer></the-footer>
    </el-container>
</template>
<script>
import { getEwmInfo } from '@/api/comTicketApi.js'
import { mapState } from 'vuex'
import theHeader from '_c/theHeader'
import theFooter from '_c/theFooter'

export default {
  components: {
    theHeader,
    theFooter
  },
  computed: {
    ...mapState(['commercialApplyParams'])
  },
  data () {
    return {
      isloading: false,
      QRcodeUrl: '',
      remark: ''
    }
  },
  created () {
    this.getEwmInfo()
  },
  mounted () {},
  methods: {
    getEwmInfo () {
      this.isloading = true
      const params = {
        id: this.$route.query.id
      }
      try {
        getEwmInfo(params).then(res => {
          if (res.res === 1) {
            this.QRcodeUrl = res.data.open_ewm
            this.remark = res.data.remark
          }
        })
      } catch (error) {
        console.log(error)
      }
      this.isloading = false
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
      margin-top: 12px;
      box-sizing: border-box;
      .qrcode-main{
        margin: 58px 176px;
        .qrcode-imgbox{
          img.qrcode-img{
            display: block;
            width: 200px;
            height: 200px;
            margin: 0 auto;
            background: #244D94;
            border: 1px solid #F8F8F8;
          }
          .qrcode-imgbox-p{
            width: 200px;
            height: auto;
            margin: 0 auto;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #3688FF;
            text-align: center;
            margin-top: 11px;
          }
        }
        .qrcode-mark{
          white-space:pre-line;
          line-height: 2;
          .qrcode-mark-h4{
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333;
            margin-bottom: 29px;
          }
          .qrcode-mark-p{
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #666;
            line-height: 1.6;
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}
</style>
