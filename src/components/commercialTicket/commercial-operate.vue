<template>
    <el-container class="page-full-Home page-news" v-loading="isloading">
        <the-header :show-right="true"></the-header>
        <el-main style="width: 1280px;overflow-x: hidden;" class="main-wrapper">
            <el-breadcrumb class="bread-wrapper" separator="/">
                <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
                <el-breadcrumb-item :to="{ path: '/commercial-ticket' }">商票秒融</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/commercial-apply' }">票据列表</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>

            <div class="container-wrapper">
              <div class="container-title"><h4>新增票据</h4></div>
              <div class="price-container">
                <div class="price-content">
                  <el-row>
                    <el-col :span="12">
                      <div class="price-content" v-loading="isIdentifyOk">
                        <!-- 上传图片模块 -->
                        <div class="upload-img">
                          <theUploadPic @getFile="getNoteMsg">
                            <template v-slot:picture v-if="originUrl">
                              <div class="same-legal-img-font">
                                <img @mouseenter="isDeleteFont = true" :src="originUrl" />
                              </div>
                              <div class="same-legal-pic-mask" @mouseenter="isDeleteFont = true" @mouseleave="isDeleteFont = false" v-if="isDeleteFont">
                                <i
                                  @click="
                                    originUrl = ''; isDeleteFont=false
                                  "
                                  class="el-icon-delete"
                                ></i>
                              </div>
                            </template>
                          </theUploadPic>
                          <div class="upimg-style">
                            <div class="upimg-body">
                              <img src="@/assets/img/bth_common_add.png" />
                              <p style="color:#3688FF;font-size:18px;margin-top:40px;">请上传票据正面截图</p>
                              <p style="color:#999;margin-bottom:4px;">图片文件（.png.jpg.jpeg）5M以内</p>
                              <p style="color:#999;">（识别成功之后信息将自动显示）</p>
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
                            <p class="ipt-tips">
                              <i class="el-icon-warning tips-warning"></i>
                              <span>温馨提示: *号信息为必填，其他信息选填，若存在背书，请按照网银中背书记录填写。</span>
                            </p>
                          </div>
                          <div class="ipt">
                            <div class="bank">
                              <img src="@/assets/img/start.png" />
                              <span>票据号码</span>
                            </div>
                            <el-input placeholder="请输入票号" v-model="dataBilInfo.billNo" class="elinput"></el-input>
                          </div>
                          <div class="ipt">
                            <div class="bank">
                              <img src="@/assets/img/start.png" />
                              <span>承兑名称</span>
                            </div>
                            <el-input placeholder="请输入承兑行名称" v-model="dataBilInfo.accepterName" class="elinput"></el-input>
                          </div>
                          <div class="ipt">
                            <div class="bank">
                              <img src="@/assets/img/start.png" />
                              <span>票面金额</span>
                            </div>
                            <el-input placeholder="请输入票面金额" v-model="dataBilInfo.amt" class="elinput fixed-text">
                              <span slot="suffix">万元</span>
                            </el-input>
                          </div>
                          <div class="ipt choose-date">
                            <div class="bank">
                              <img src="@/assets/img/start.png" />
                              <span>到期日期</span>
                            </div>
                            <div class="date-picker">
                              <el-date-picker class="elinput datePickerIpt" v-model="dataBilInfo.maturityDate" value-format="yyyy-MM-dd" type="date" :editable="false" align="right" placeholder="选择日期"></el-date-picker>
                              <img src="@/assets/img/ic_sj_rq.png" />
                            </div>

                            <!-- <el-input suffix-icon="el-icon-date" v-model='remitDate' class="elinput"></el-input> -->
                          </div>
                          <el-button :loading="isEnquirySuccess" class="start-btn" :disabled="isCanEnquiry" type="primary" @click="saveCommercial">保存</el-button>
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
import { getTicketBillinfo, ticketShowCommercialPaperInfo, getTicketOperateCommercialPaper } from '@/api/comTicketApi.js'
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
      isloading: false,
      isDeleteFont: false,
      dataBilInfo: {
        // 票据信息
        accepterName: '', // 承兑人名称
        amt: '', // 票面金额
        maturityDate: '', // 汇票到期日
        billNo: '', // 票号
        finance_type: '2', // 融资类型
        bank_no: '' // 承兑行行号
      },
      ticketId: '', // 票据id
      originUrl: '', // 票据url地址
      isIdentifyOk: false,
      isEnquirySuccess: false,
      isCanEnquiry: true

    }
  },
  created () {
    this.ticketId = this.$route.query.id
    this.ticketShowCommercialPaperInfo()
  },
  mounted () {},
  methods: {
    // 获取修改票据时，票据信息
    ticketShowCommercialPaperInfo () {
      if (!this.ticketId) return
      const params = {
        id: this.ticketId
      }
      console.log(params)
      this.isloading = true
      try {
        ticketShowCommercialPaperInfo(params).then(res => {
          if (res.res === 1) {
            this.isloading = false
            this.isCanEnquiry = false
            this.dataBilInfo.billNo = res.data.draft_no
            this.dataBilInfo.accepterName = res.data.bank_name
            this.dataBilInfo.amt = this.$BigNumberCHU(res.data.face_amt, 10000)
            const maturityDate = res.data.expire_date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
            this.dataBilInfo.maturityDate = maturityDate
            this.dataBilInfo.bank_no = res.data.bank_no
            this.originUrl = res.data.bill_url
          }
        })
      } catch (error) {
        this.isloading = false
        console.log(error)
      }
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
            this.isCanEnquiry = false
            this.dataBilInfo.billNo = res.data.billNo
            this.dataBilInfo.accepterName = res.data.accepterName
            this.dataBilInfo.amt = this.$BigNumberCHU(res.data.billAmt, 10000)
            const maturityDate = res.data.maturityDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
            this.dataBilInfo.maturityDate = maturityDate
            this.dataBilInfo.bank_no = res.data.accepterBank
          }
        })
      } catch (error) {
        this.isIdentifyOk = false
        console.log(error)
      }
    },
    // 新增/修改票据，保存事件
    saveCommercial () {
      const info = this.dataBilInfo
      this.isEnquirySuccess = true
      const params = {
        id: this.ticketId, // 票据id（修改必填）
        bill_url: this.originUrl, // 票据url地址
        bank_name: info.accepterName, // 承兑人
        finance_type: info.finance_type, // 融资类型
        bank_no: info.bank_no, // 承兑行行号
        draft_no: info.billNo, // 票号
        face_amt: info.amt, // 票面金额
        expire_date: info.maturityDate // 到期日
      }
      try {
        getTicketOperateCommercialPaper(params).then(res => {
          this.isEnquirySuccess = false
          this.$message({
            type: 'success',
            message: '保存成功,即将返回!',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push({ path: this.$routerPath.routerCommercial_apply })
          }, 1100)
        })
      } catch (error) {
        this.isEnquirySuccess = false
        console.log(error)
      }
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
  margin-top: 32px;
}
.ipt {
  margin-bottom: 20px;
  display: flex;
}
.ipt-tips{
  width: 100%;
  height: 40px;
  background: rgba(54, 136, 255, 0.1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #666;
  line-height: 40px;
  border: 1px solid #3688FF;
  .tips-warning{
    color: #409EFF;
    margin-left: 13px;
    margin-right: 7px;
  }
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
  width: 400px;
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
<style lang="less">
  .form-container .fixed-text .el-input__suffix {
    line-height: 40px;
    color: #330300;
    font-size: 14px;
    margin-right: 12px;
  }
</style>
