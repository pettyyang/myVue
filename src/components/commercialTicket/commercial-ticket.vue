<template>
  <div class="home" v-loading="isloading">
    <theHeader style="flex-shrink: 0" :showRight="isShowRt">
      <template v-slot:right>
        <div class="right-btn">
          <el-button class="login-btn" type="primary" @click="toRouter(routerPath.routerPath_login)">登录</el-button>
          <el-button class="register-btn" @click="toRouter(routerPath.routerPath_register)">注册</el-button>
        </div>
      </template>
    </theHeader>
    <div class="ctttttttt" style="flex-shrink: 0">
      <the-swiper></the-swiper>
      <!-- 计算 -->
      <div class="price-container">
        <el-row>
          <el-col :span="8">
            <div class="price-content">
              <div class="price-main">
                <div class="price-box" v-loading="isIdentifyOk">
                  <!-- 上传图片模块 -->
                  <div class="upload-img">
                    <theUploadPic @getFile="getNoteMsg"></theUploadPic>
                    <div class="upimg-style">
                      <div class="upimg-body">
                        <img src="@/assets/img/bth_common_add.png" />
                        <p style="color:#3688FF;font-size:18px;margin-top:40px;">请上传票据正面截图</p>
                        <p style="color:#999;">图片文件（.png.jpg.jpeg）5M以内</p>
                      </div>
                    </div>
                    <div class="upimg-tips">
                       <div class="upimg-tip-one">
                          <img src="@/assets/img/start.png" />
                          <span>您必须为票据持有人，不支持代他人融资申请</span>
                        </div>
                        <div class="upimg-tip-two">（识别成功之后信息将自动显示）</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="">
                <!-- 表单模块 -->
              <div class="form-container">
                <div class="ipt">
                  <div class="bank">
                    <img src="@/assets/img/start.png" />
                    <span>承兑名称</span>
                  </div>
                  <el-input placeholder="请输入承兑人名称" v-model="dataBilInfo.accepterName" style="width: 260px;" class="elinput elinput-w" @change="accNameChange"></el-input>
                </div>
                <div class="ipt">
                  <div class="bank">
                    <img src="@/assets/img/start.png" />
                    <span>票面金额</span>
                  </div>
                  <el-input placeholder="请输入票面金额" v-model="dataBilInfo.amt" style="width: 260px;" class="elinput elinput-w fixed-text" @change="amtChange">
                    <span slot="suffix">万元</span>
                  </el-input>
                </div>
                <div class="ipt choose-date">
                  <div class="bank">
                    <img src="@/assets/img/start.png" />
                    <span>到期日期</span>
                  </div>
                  <div class="date-picker">
                    <el-date-picker class="elinput elinput-w datePickerIpt" v-model="dataBilInfo.maturityDate" value-format="yyyy-MM-dd" type="date" :editable="false"
                    align="right" placeholder="选择日期" @change="datePickerChange"></el-date-picker>
                    <img src="@/assets/img/ic_sj_rq.png" />
                  </div>

                  <!-- <el-input suffix-icon="el-icon-date" v-model='remitDate' class="elinput"></el-input> -->
                </div>
                <el-button :loading="isEnquirySuccess" class="start-btn" @click="startEnquiry" :disabled="isCanEnquiry" type="primary">开始计算</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="rate-content">
              <div class="rate-box">
                <div class="rate-title">今日最低利率</div>
                <div class="rate-type">
                  <el-row>
                    <el-col :span="12">
                      <div class="rate-typebox rate-position">
                        <p class="rate-typeboxp1">商票</p>
                        <p class="rate-typeboxp2">{{business_price}}</p>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="rate-typebox">
                        <p class="rate-typeboxp1">银票</p>
                        <p class="rate-typeboxp2 p2-orange">{{bank_price}}</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="rate-lists">
                <!-- <p class="cursor-p">订单管理</p>
                <p>|</p> -->
                <p class="cursor-p"  @click="popEg(while_url)">承兑人名单</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 银行列表 -->
      <div class="banks-container">
        <ul class="banks-ul">
          <li class="banks-li" v-for="item in banklists" :key="item.id">
            <div class="banks-li-tips">
              <div class="banks-li-tip banks-li-tip-radius">
                <span>单张限额：{{item.max_money}}</span><span>|</span><span>交易时间：{{item.work_time}}</span>
              </div>
              <div class="banks-li-tip">
                <span>{{item.white}}</span><span>|</span><span>{{item.lending_time}}</span>
              </div>
            </div>
            <div class="banks-items">
              <el-row>
                <el-col :span="6">
                  <div class="banks-item">
                    <div class="banks-bank">
                      <div class="banks-bankbox">
                        <p class="banks-bankCH">{{item.name}}</p>
                        <p class="banks-bankEn"></p>
                      </div>
                      <img class="banks-bankimg" :src="item.ico_url" />
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="banks-item">
                    <p class="banks-itemp1 banks-grey">贴现率(%)</p>
                    <p class="banks-itemp2 banks-orange">{{item.rate}}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="banks-item">
                    <p class="banks-itemp1 banks-grey">预计成交价</p>
                    <p class="banks-itemp2 banks-orange">{{item.business_volume}}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="banks-item banks-itemlast">
                    <div v-if="isShowRt">
                      <p class="banks-itemp1"><el-button type="primary" plain size="small" @click="goLogin">在线签约</el-button></p>

                    </div>
                    <div v-else>
                      <p class="banks-itemp1" v-if="item.business_type==='0'"><el-button type="primary" plain size="small" @click="onlineSign">在线签约</el-button></p>
                      <p class="banks-itemp2" v-else><el-button type="primary" size="small" @click="goApplyfund(item)">申请融资</el-button></p>
                    </div>
                    <p class="banks-do" v-if="item.instructions"  @click="operatGuide(item.instructions)">操作指引</p>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div v-if="item.business_type==='2'" class="banks-items-self">数票自营</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- pdf预览 -->
    <theView :egSrc="egSrc" @closePop="closePop" v-if="isShowViewPop"></theView>
    <!-- 议价交易 -->
    <theFexied v-show="false"></theFexied>
    <theFooter style="flex-shrink: 0"></theFooter>
  </div>
</template>
<script>
import theHeader from '_c/theHeader'
import theFooter from '_c/theFooter'
import theSwiper from './components/theTicketSwiper'
import theUploadPic from '_c/theUploadPic'
import theView from '_c/theView'

import theFexied from '_c/theFexied'
import { mapState } from 'vuex'
import { getTicketBillinfo, getTicketwhileList, getTicketBankLists, getTicketFinance, getTicketOperateCommercialPaper } from '@/api/comTicketApi.js'
export default {
  components: {
    theHeader,
    theFooter,
    theSwiper,
    theFexied,
    theUploadPic,
    theView
  },
  data () {
    return {
      isloading: false,
      isShowRt: true, // 是否展示右侧登陆注册
      isIdentifyOk: '', // 票据信息是否识别成功
      originUrl: '', // 票据url地址
      dataBilInfo: {
        // 票据信息
        accepterName: '', // 承兑人名称
        amt: '', // 票面金额
        maturityDate: '' // 汇票到期日
      },
      billInfo: {}, // 票据信息
      business_price: '', // 商票最低利率
      bank_price: '', // 银票最低利率
      while_url: '', // 承兑人名单
      isEnquirySuccess: false,
      isCanEnquiry: true,
      isHas: false, // 是否已签约
      banklists: [],
      egSrc: '', // pdf路径
      isShowViewPop: '' // pdf预览是否展示
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.getUserMsg()
    this.getTicketwhileList()
    this.getTicketBankLists()
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
    // 初始化获取商票秒融首页最低利率&承兑人名单
    getTicketwhileList () {
      // this.isloading = true;
      try {
        getTicketwhileList().then(res => {
          if (res.res === 1) {
            this.business_price = res.data.price.business_price
            this.bank_price = res.data.price.bank_price
            this.while_url = res.data.while_url
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    // 初始化获取商票秒融首页列表
    getTicketBankLists () {
      this.isloading = true
      try {
        getTicketBankLists().then(res => {
          if (res.res === 1) {
            this.banklists = res.data
          }
        })
      } catch (error) {
        console.log(error)
      }
      this.isloading = false
    },
    // 点击上传票据获取，票据信息
    getNoteMsg (file, data) {
      this.isIdentifyOk = true
      this.originUrl = data.originUrl
      const jsonData = {
        filename: data.originUrl
      }
      try {
        getTicketBillinfo(jsonData).then(res => {
          this.isIdentifyOk = false
          if (res.res === 1) {
            this.billInfo = res.data
            this.isCanEnquiry = false
            this.dataBilInfo.accepterName = res.data.accepterName
            this.dataBilInfo.amt = this.$BigNumberCHU(res.data.billAmt, 10000)
            const maturityDate = res.data.maturityDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
            this.dataBilInfo.maturityDate = maturityDate
          }
        })
      } catch (error) {
        this.isIdentifyOk = false
        console.log(error)
      }
    },
    // 商票秒融首页提交试算/开始计算接口
    getTicketFinance () {
      const billInfo = this.billInfo
      this.isEnquirySuccess = true
      const loadingInstance = this.$loading({
        text: '计算中'
      })
      const params = {
        accepterName: billInfo.accepterName, // 承兑人名称
        amount: billInfo.billAmt, // 票面金额
        matured_time: billInfo.maturityDate, // 到期日
        bill_no: billInfo.billNo, // 票号
        acceptBankNo: billInfo.accepterBank, // 承兑人行号
        imgUrl: this.originUrl // 票据图片url
      }
      try {
        getTicketFinance(params).then(res => {
          if (res.res === 1) {
            this.banklists = res.data
            this.isEnquirySuccess = false
            loadingInstance.close()
          }
        })
      } catch (error) {
        console.log(error)
      }
      this.isEnquirySuccess = false
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close()
      }, 1000)
    },
    // 承兑人change事件
    accNameChange () {
      this.billInfo.accepterName = this.dataBilInfo.accepterName
    },
    // 票面金额change事件
    amtChange () {
      this.billInfo.billAmt = this.dataBilInfo.amt
    },
    // 到期日点击change事件
    datePickerChange () {
      this.billInfo.maturityDate = this.dataBilInfo.maturityDate
    },
    // 点击开始计算按钮
    startEnquiry () {
      this.getTicketFinance()
    },
    // 未登录时，点击在线签约跳转至登录页
    goLogin () {
      this.$router.push(this.$routerPath.routerPath_login)
    },
    // 点击在线签约
    onlineSign () {
      this.$router.push(this.$routerPath.routerCommercial_submitInfo)
    },
    // 操作指引
    operatGuide (instructionsUrl) {
      // this.$router.push(this.$routerPath.routerCommercial_stepStatus)
      console.log(instructionsUrl)
      if (instructionsUrl && instructionsUrl.indexOf('?')) {
        const id = instructionsUrl.substr(1).split('=')[1]
        console.log(id)
        this.$router.push({ path: this.$routerPath.routerPath_newDetail, query: { id } })
      }
    },
    // 点击申请融资
    goApplyfund (item) {
      console.log(item)
      if (item.business_type === '2') {
        const params = {
          accepterName: item.accepterName || '',
          amount: item.amount || '',
          bankName: item.name || ''
        }
        if (item.business_volume === '--') {
          this.$store.commit('setCommercialApplyParams', params)
          this.$router.push(this.$routerPath.routerCommercial_apply)
        } else {
          // 已经点击了计算票据，则先调用新增票据接口
          this.saveCommercial(item)
        }
      } else {
        const id = item.id
        this.$router.push({ path: this.$routerPath.routerCommercial_QRcode, query: { id } })
      }
    },
    // 新增票据，保存事件
    saveCommercial (item) {
      const info = this.billInfo
      const params = {
        id: '', // 票据id（修改必填）
        bill_url: this.originUrl, // 票据url地址
        bank_name: info.accepterName, // 承兑人
        finance_type: item.id, // 融资类型
        bank_no: info.accepterBank, // 承兑行行号
        draft_no: info.billNo, // 票号
        face_amt: info.billAmt, // 票面金额
        expire_date: info.maturityDate // 到期日
      }
      try {
        getTicketOperateCommercialPaper(params).then(res => {
          this.$message({
            type: 'success',
            message: '票据新增成功,即将跳转!',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push({ path: this.$routerPath.routerCommercial_apply })
          }, 1100)
        })
      } catch (error) {
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
// 计算处样式
.price-container{
  width: 1280px;
  height: 367px;
  margin: 0 auto 56px;
  background: #fff;
  border-radius: 0px 0px 8px 8px;
  .price-content{
    width: 100%;
    .price-main{
        width: 420px;
        height: 367px;
        position: relative;
      .price-box{
        width: 420px;
        height: 420px;
        padding: 30px;
        background: #FBFBFB;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px 8px 0px 8px;
        position: absolute;
        left: 0px;
        bottom: 0px;
        z-index: 10;
      }
    }
  }
  .rate-content{
    .rate-box{
      width: 388px;
      height: 177px;
      background: #F9FBFF;
      margin: 51px auto 0px;
      border-radius: 4px;
      .rate-title{
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333;
        text-align: center;
        padding-top: 19px;
        margin-bottom: 30px;
      }
      .rate-type{
        text-align: center;
        .rate-position{
          position:relative;
          &::after{
            content: '';
            display: block;
            width: 1px;
            height: 50px;
            background: #DCDFE6;
            position: absolute;
            top: 20px;
            right: 0px;
          }
        }
        .rate-typeboxp1{
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #666;
          margin-bottom: 16px;
        }
        .rate-typeboxp2{
          display: inline-block;
          width: auto;
          height: 32px;
          padding: 0px 14px;
          text-align: center;
          line-height: 32px;
          background: linear-gradient(-90deg, #3688FF, #67BDFF);
          border-radius: 16px;
          font-size: 24px;
          font-family: DIN;
          font-weight: 500;
          color: #FFF;
          &.p2-orange{
            background: linear-gradient(-90deg, #FF9E3B, #FBBC52);
          }
        }
      }
    }
    .rate-lists{
      width: 388px;
      height: auto;
      margin: 46px auto 0px;
      text-align: right;
      p{
        display: inline-block;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #3688FF;
        margin-left: 12px;
        &.cursor-p{
          cursor: pointer;
        }
      }
    }
  }
}
.upload-img {
  width: 360px;
  height: 280px;
  position: relative;
  background: #FBFBFB;
  border: 1px dashed #e1e1e1;
}

// 银行列表样式
.banks-container{
  width: 1280px;
  min-height: 300px;
  margin: 0 auto 12px;
  padding: 47px 0;
  background: #fff;
  .banks-ul{
    width: auto;
    margin: 0 32px;
    .banks-li{
      width: 100%;
      height: 128px;
      background: #FFFFFF;
      box-shadow: 0px 4px 20px 0px #EEE;
      margin-bottom: 24px;
      position: relative;
      .banks-li-tips{
        width: auto;
        height: 24px;
        .banks-li-tip{
          display: inline-block;
          width: auto;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #909399;
          line-height: 24px;
          &.banks-li-tip-radius{
            background: rgba(54, 136, 255, 0.06);
            padding-left: 34px;
            margin-right: 20px;
            border-radius: 0 0 24px 0;
          }
          span{
            margin-right: 20px;
          }
        }
      }
      .banks-items{
        padding: 12px 48px 36px 34px;
        .banks-bank{
          width: 240px;
          height: 56px;
          padding-left: 48px;
          position: relative;
          .banks-bankCH{
            font-size: 26px;
            color: #000;
            margin-top: 20px;
          }
          .banks-bankimg{
            width: 40px;
            height: 40px;
            vertical-align: middle;
            position: absolute;
            left: 0px;
            top: 0px;
          }
        }
        .banks-grey{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #909399;
          text-align: center;
          margin-top: 6px;
          margin-bottom: 10px;
        }
        .banks-orange{
          font-size: 24px;
          font-family: DIN;
          font-weight: bold;
          color: #EC5448;
          text-align: center;
        }
        .banks-itemlast{
          text-align: right;
          .banks-do{
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #3688FF;
            margin-top: 14px;
            margin-right: 14px;
            cursor: pointer;
          }
        }
      }
      .banks-items-self{
        width: 56px;
        height: 16px;
        background: #A10300;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        text-align: center;
        line-height: 16px;
        color: #FFF;
        position: absolute;
        top: 0px;
        right: 0px;
      }
    }
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
  .elinput.elinput-w > input {
    width: 260px;
    color: #333;
  }
  .choose-date .el-input__prefix {
    opacity: 0;
    display: none;
  }
</style>
