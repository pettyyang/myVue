<!--企业对公账户认证-->
<template>
  <div class="audit-failed">
    <the-header :show-right="true"></the-header>
    <!-- <div class="top-name">
      <span></span>
      <span>申请开通{{ bankName }}线上贴现业务</span>
      <span></span>
    </div> -->
    <div class="step-container">
      <div class="step-box">
        <theStep></theStep>
      </div>
    </div>
    <div class="page-body">
      <!-- 审核失败 -->
      <div class="certification" v-if="status == '3' || status == '4'">
        <img src="@/assets/img/certification-icon.png" />
        <div class="retry-msg">
          <p class="prompt">您提交的资料审核失败</p>
          <p class="contact">失败原因：{{ remark_error }}</p>
          <!-- <p class="contact">如有疑问请联系客户{{ $store.state.baseServiceTel }}</p> -->
          <p class="contact">如有疑问请联系客户4000-666-8888</p>
          <el-button class="retry-btn" @click="again">重新提交信息</el-button>
        </div>
      </div>
      <!-- 认证中 -->
      <div class="certification" v-if="status == '2'">
        <img src="@/assets/img/renzhengzhong-icon.png" />
        <div class="retry-msg">
          <p class="prompt">您提交的资料平台正在审核中，请耐心等候</p>
          <p class="contact">如有疑问请联系客户4000-666-8888</p>
          <el-button class="retry-btn" :loading="refersh" @click="getStatus">刷新审核状态</el-button>
        </div>
      </div>
      <!-- 审核成功 -->
      <div class="certification" v-if="status == '1'">
        <img src="@/assets/img/success-icon.png" />
        <!-- <div class="retry-msg">
                    <p class="prompt">对公账户打款成功，验证金额完成认证</p>
                    <p class="contact">对公银行：{{bankName}}</p>
                    <p class="contact">对公账户：7638628******736287</p>
                    <div class="amount-box">
                        <el-input v-model="amount" class="amount-ipt"></el-input>
                        <span class="notice">注意：输入金额必须与打款金额一致</span>
                    </div>
                    <el-button class="retry-btn">确定</el-button>
                </div> -->
        <div class="retry-msg">
          <p class="prompt">您提交的资料审核成功</p>
          <p class="contact">如有疑问请联系客户4000-666-8888</p>
          <el-button class="retry-btn" @click="toHome">开始贴现</el-button>
        </div>
      </div>
    </div>
    <theFooter></theFooter>
  </div>
</template>
<script>
import theHeader from '_c/theHeader'
import theFooter from '_c/theFooter'
import { getAccountStatus } from '@/api/api.js'
import { mapState } from 'vuex'

import theStep from './components/theStep'
export default {
  components: {
    theHeader,
    theFooter,
    theStep
  },
  data () {
    return {
      refersh: false,
      bankName: '',
      status: '2', // 0 未申请 1 成功 2 审核中 3 驳回 4 重新填写信息
      amount: '', // 打款金额
      remark_error: '',
      jdUrl: ''
    }
  },
  created () {
    // if (this.$route.query.channel === 'jd') {
    //   this.bankName = this.$route.query.bankName
    //   this.status = this.$route.query.status
    //   this.remark_error = window.sessionStorage.getItem('jdRemark')
    //   this.jdUrl = window.sessionStorage.getItem('jdUrl')
    // } else {
    //   this.getStatus()
    // }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 获取开通状态
    getStatus () {
      if (this.refersh) return
      this.status = '2'
    },
    // 跳转到首页
    toHome () {
      this.$methods.toRouter(this.$routerPath.routerPath_index)
    },
    // 重新提交
    again () {
      const stop = true
      if (stop) return
      let params = this.$route.query
      if (params.channel === 'jd') {
        window.open(this.jdUrl)
      } else {
        switch (params.bankName) {
          case 'FUMIN':
            this.$methods.toRouter(this.$routerPath.routerPath_openFUMIN)
            break
          case 'ZBANK':
            this.$methods.toRouter(this.$routerPath.routerPath_openZBANK)
            break
          case 'ZHENX':
            this.$methods.toRouter(this.$routerPath.routerPath_openZHENX)
            break
          case 'BAIXIN':
            this.$methods.toRouter(this.$routerPath.routerPath_openBAIXIN)
            break
        }
      }
    }
  },
  mounted () {}
}
</script>
<style>
.steps-box .el-step__title {
  font-size: 14px;
}
</style>
<style scoped>
.top-name {
  margin: 40px auto;
  font-size: 24px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-name > span:first-child,
.top-name > span:last-child {
  display: inline-block;
  width: 210px;
  height: 1px;
  background: rgba(217, 217, 217, 1);
  margin: 0 22px;
}
.amount-box {
  margin-top: 16px;
}
.notice {
  font-size: 14px;
  color: #ec5448;
}
.amount-ipt {
  display: inline-block;
  width: 220px;
  height: 40px;
  margin-right: 16px;
}
.contact {
  font-size: 14px;
  color: #999;
  margin-top: 8px;
}
.retry-msg {
  display: inline-block;
  padding-top: 25px;
  position: absolute;
  top: 0;
  left: 430px;
}
.retry-msg > .prompt {
  font-size: 24px;
  color: #333;
}
.retry-btn {
  display: block;
  width: 296px;
  height: 44px;
  background: #3688ff;
  color: #fff;
  font-size: 14px;
  margin-top: 28px;
}
.certification {
  height: 86px;
  margin-top: 68px;
  position: relative;
}

.certification > img {
  display: inline-block;
  width: 86px;
  height: 86px;
  position: absolute;
  left: 330px;
  top: 0;
}
.audit-failed {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.steps-box {
  width: 900px;
  margin: 40px auto;
}
.page-body {
  width: 1280px;
  flex: 1;
  background: #fff;
  margin: 0 auto 12px auto;
}
/* // 进度条样式 */
.step-container{
  width: 1280px;
  height: 136px;
  background: #FFFFFF;
  margin: 12px auto;
}
.step-box{
  padding-top: 40px;
}
</style>
