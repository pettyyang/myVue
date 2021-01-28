<template>
  <div class="mStepMain-wrapper leagalPerson-wrapper" v-loading="isLoading">
    <h1 class="mAuth-title">
      企业法人信息
      <b class="index" v-if="steps.curStep">({{ steps.curStep }}/{{ steps.allStep }})</b>
      <span class="red">温馨提示：请先上传证件信息,系统将自动填写信息，再核对识别结果</span>
    </h1>

    <el-form class="mAuth-form mAuth-form__padding" ref="legalForm" :model="legalForm" :rules="rules" :disabled="disabled">
      <el-form-item class="mForm-item flex-start">
        <span class="mItem-lab">
          <em class="required_con"></em>
          身份证证件
        </span>
        <div class="item-upImg" style="width:240px;height:158px;">
          <theUploadPic @getFile="get_sideType_front">
            <template v-slot:picture v-if="fontUrl && !hiddenold">
              <div class="same-legal-img-font">
                <img @mouseenter="isDeleteFont = true" :src="fontUrl" @load="fontImgLoad($event)" />
              </div>
              <div class="same-legal-pic-mask" @mouseenter="isDeleteFont = true" @mouseleave="isDeleteFont = false" v-if="isDeleteFont">
                <i
                  v-if="!disabled"
                  @click="
                    fontUrl = '';
                    isDeleteFont = false;
                  "
                  class="el-icon-delete"
                ></i>
              </div>
            </template>
          </theUploadPic>
          <div class="upimg-style">
            <div class="icon"></div>
            <p class="des">身份证头像面</p>
          </div>
        </div>
        <div class="item-upImg" style="width:240px;height:158px;" ref="item-upImgback">
          <theUploadPic @getFile="get_sideType_back">
            <template v-slot:picture v-if="backUrl && !hiddenold1">
              <div class="same-legal-img-font">
                <img @mouseenter="isDeleteBack = true" :src="backUrl" @load="backImgLoad($event)" />
              </div>
              <div class="same-legal-pic-mask" @mouseenter="isDeleteBack = true" @mouseleave="isDeleteBack = false" v-if="isDeleteBack">
                <i
                  v-if="!disabled"
                  @click="
                    backUrl = '';
                    isDeleteBack = false;
                  "
                  class="el-icon-delete"
                ></i>
              </div>
            </template>
          </theUploadPic>
          <div class="upimg-style">
            <div class="icon"></div>
            <p class="des">身份证国徽面</p>
          </div>
        </div>
        <div class="item-upInfo">
          <div v-if="isTip">
            <h3>上传图片要求</h3>
            <p>1.请上传最新证件原件的彩色扫描件或者数码照，如使用复印件请加盖公章上传；</p>
            <p>2.图片格式支持：jpg/jpeg/png等</p>
            <p>3.请使用像素大于600万像素的设备拍摄，图片大小不能超过10M；</p>
          </div>
          <el-link :class="{ page2css: !isTip }" type="primary" @click="popEg(require('../../../assets/img/eg-idcard.png'))">查看示例</el-link>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item" prop="legalPersonName">
        <span class="mItem-lab">
          <em class="required_con"></em>
          法人姓名
        </span>
        <div class="flex">
          <el-input class="mItem-long" placeholder="请输入姓名" v-model="legalForm.legalPersonName"></el-input>
        </div>
      </el-form-item>

      <!-- <el-form-item class="mForm-item">
        <span class="mItem-lab">
          <em class="required_con"></em>
          证件类型
        </span>
        <div class="flex">
          <div class="mItem-long">
            <el-select @blur="ruleIdCard()" v-model="legalForm.cert_type" value-key="legalForm.cert_type" filterable placeholder="请选择证件类型">
              <el-option v-for="i in certTypeList" :key="i.val" :label="i.lab" :value="i.val"></el-option>
            </el-select>
          </div>
        </div>
      </el-form-item> -->

      <el-form-item class="mForm-item" prop="legalIdNum">
        <span class="mItem-lab">
          <em class="required_con"></em>
          证件号码
        </span>
        <div class="flex">
          <el-input class="mItem-long" placeholder="请输入证件号码" v-model="legalForm.legalIdNum"></el-input>
        </div>
      </el-form-item>
      <el-form-item class="mForm-item">
        <span class="mItem-lab">
          <em class="required_con"></em>
          证件有效期
        </span>
        <div class="flex">
          <el-radio @change="longTerm" v-model="legalForm.legalValidDateType" label="1">长期</el-radio>
          <el-radio @change="sureTerm" v-model="legalForm.legalValidDateType" label="2">固定日期</el-radio>
        </div>
      </el-form-item>
      <el-form-item class="mForm-item">
        <span class="mItem-lab">
          <em class="required_con"></em>
          证件签发日期
        </span>
        <div class="flex">
          <div class="mItem-long">
            <el-date-picker v-model="legalForm.legalValidStartDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
          </div>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item" v-if="legalForm.legalValidDateType == 2">
        <span class="mItem-lab">
          <em class="required_con"></em>
          证件到期日期
        </span>
        <div class="flex">
          <div class="mItem-long">
            <el-date-picker value-format="yyyy-MM-dd" v-model="legalForm.legalValidEndDate" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item">
        <span class="mItem-lab">
          <em class="required_con"></em>
          证件地址
        </span>
        <div class="flex">
          <el-input class="mItem-long" placeholder="请输入证件地址" v-model="legalForm.legalAddr"></el-input>
        </div>
      </el-form-item>
    </el-form>

    <!-- 查看示例 -->
    <theView :egSrc="egSrc" @closePop="closePop" v-if="isShowViewPop"></theView>
  </div>
</template>

<script>
import theUploadPic from '_c/theUploadPic'
import theView from '_c/theView'
import TypeHelper from '@/util/helper/TypeHelper'
import { identityCard } from '@/api/api.js'
import { bx_upFile } from '@/api/bxBankApi.js'
import { mapState } from 'vuex'
export default {
  name: 'bxLegalPerson',
  components: {
    theUploadPic,
    theView
  },
  props: {
    legalPersonProps: {},
    page2: {
      type: Boolean,
      default: false
    },
    steps: {
      type: Object,
      default: () => {
        return {
          curStep: 0,
          allStep: 0
        }
      }
    },
    isTip: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
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
      hiddenold: false,
      hiddenold1: false,
      isDeleteFont: false,
      fontUrl: '', // 身份证正面
      isDeleteBack: false,
      backUrl: '', // 身份证反面

      legalAddr: '', // 证件签发地
      isLoading: false, // 识别身份证时进入loading状态
      isShowViewPop: false,
      egSrc: '', // 查看示例
      certTypeList: this.page2 ? TypeHelper.get_certType1() : TypeHelper.get_certType(), // 证件下拉列表
      legalForm: {
        // cert_type: '', // 证件类型 1：身份证 2：税务登记证 3：组织机构代码证 4：营业执照 5：统一社会信用代码证
        // id_card_back: '', // 身份证反面
        // corp_mobile: '', // 法人手机号

        identityFaceId: '', // 法定代表人身份证（正）url
        identityBackId: '', // 法定代表人身份证（反）url
        ossIdentityFaceId: '', // oss 法定代表人身份证（正）url
        ossIdentityBackId: '', // oss 法定代表人身份证（反）url
        legalIdNum: '', // 证件号码 ---身份证号
        legalPersonName: '', // 法人名称
        legalValidDateType: '', // 签发类型 1 长期 2 固定日期
        legalValidStartDate: '', // 证件签发日期(开始日期)
        legalValidEndDate: '', // 证件到期日期 身份证结束有效期 ,长期填写 9999-12-31,
        legalAddr: '' // 法人身份证地址
      },
      rules: {
        legalPersonName: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' },
          { validator: this.$valid.validIptLen, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.getBsnsInfo()
  },
  methods: {
    // 获取营业执照信息
    getBsnsInfo () {
      const data = this.signUpInfo
      console.log(data, 255255)
      if (JSON.stringify(data) === '{}') return
      this.legalForm.identityFaceId = data.identityFaceId // 法定代表人身份证（正）url
      this.legalForm.identityBackId = data.identityBackId // 法定代表人身份证（反）url
      this.legalForm.ossIdentityFaceId = data.ossIdentityFaceId // oss 法定代表人身份证（正）url
      this.legalForm.ossIdentityBackId = data.ossIdentityBackId // oss 法定代表人身份证（反）url
      this.legalForm.legalIdNum = data.legalIdNum // 证件号码 ---身份证号
      this.legalForm.legalPersonName = data.legalPersonName // 法人名称
      this.legalForm.legalValidDateType = data.legalValidDateType // 签发类型 1 长期 2 固定日期
      this.legalForm.legalValidStartDate = data.legalValidStartDate // 证件签发日期(开始日期)
      this.legalForm.legalValidEndDate = data.legalValidEndDate // 证件到期日期 身份证结束有效期 ,长期填写 9999-12-31,
      this.legalForm.legalAddr = data.legalAddr // 法人身份证地址
      this.fontUrl = data.ossIdentityFaceId
      this.backUrl = data.ossIdentityBackId
      this.inputEnterName()
    },
    // 身份证正面加载完成
    fontImgLoad (evt) {
      let event = window.event || evt
      let src
      if (event.path) {
        // 谷歌
        src = event.path[0].src
      } else if (event.srcElement) {
        // 火狐
        src = event.srcElement.src
      }
      var image = new Image()
      image.src = src // 图片路径
      let that = this
      if (this.page2) return
      image.onload = function () {
        var base64 = that.$methods.getImageBase64(image, 'a.png')
        // sessionStorage.setItem('legalBase64Font',base64);
        window.window_baseFont = base64
        let blobFont = that.$methods.base64ToBlob(base64)
        let theFileFont = that.$methods.blobToFile(blobFont, 'font.png')
        that.legalForm.identityFaceId = theFileFont
      }
    },
    // 身份证反面加载完成
    backImgLoad (evt) {
      console.log(this.backUrl, 262)
      let event = window.event || evt
      let src
      if (event.path) {
        // 谷歌
        src = event.path[0].src
      } else if (event.srcElement) {
        // 火狐
        src = event.srcElement.src
      }
      var image = new Image()
      image.src = src // 图片路径
      let that = this
      if (this.page2) return
      image.onload = function () {
        var base64 = that.$methods.getImageBase64(image, 'a.png')
        // localStorage.setItem('legalBase64Back',base64);
        window.window_baseBack = base64
        let blobFont = that.$methods.base64ToBlob(base64)
        let theFileFont = that.$methods.blobToFile(blobFont, 'back.png')
        that.legalForm.identityBackId = theFileFont
      }
    },
    // 用户选择长期
    longTerm () {
      if (this.legalForm.legalValidDateType === 1) {
        this.$set(this.legalForm, 'legalValidEndDate', '9999-12-31')
      }
    },
    // 用户选择固定日期
    sureTerm () {
      if (this.legalForm.legalValidDateType === 2) {
        this.$set(this.legalForm, 'legalValidEndDate', '')
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
      this.$emit('getLegalFrom', this.legalForm)
      sessionStorage.setItem('legalInfo', JSON.stringify(this.legalForm))
      console.log(this.legalForm, '///')
    },
    // 判断是否是身份证，如果cert_type=1，是，则验证id-card是否合法
    ruleIdCard () {
      this.rules.legalIdNum = []
      let idCardType = this.legalForm.cert_type
      let o
      if (idCardType === 'ID') {
        o = { validator: this.$valid.validIdCard, trigger: 'blur' }
      } else {
        o = { required: true, message: '请输入证件号码', trigger: 'blur' }
      }
      this.rules.legalIdNum.push(o)
    },
    // 获取营业执照信息
    get_business_license (file) {
      this.legalForm.business_license = file
    },
    // 获取证件正面
    async get_sideType_front (file, fileData) {
      console.log(file, 373)
      this.hiddenold = true
      this.isLoading = true
      try {
        let jsonData = {
          filename: fileData.originUrl,
          side: 'face'
        }
        identityCard(jsonData).then(res => {
          if (res.res === 1) {
            let data = JSON.parse(res.data)
            console.log(data, 329)
            this.legalForm.legalPersonName = data.name
            this.legalForm.legalIdNum = data.num
            this.legalForm.legalAddr = data.address
            this.$set(this.legalForm, 'ossIdentityFaceId', fileData.originUrl)
            this.bx_upFile(file, '02')
          } else {
            this.fontUrl = ''
            this.$set(this.legalForm, 'ossIdentityFaceId', '')
            this.isLoading = false
          }
        })
      } catch (error) {
        this.isLoading = false
      }
    },
    // 获取证件反面
    async get_sideType_back (file, fileData) {
      this.hiddenold1 = true
      this.isLoading = true
      try {
        let jsonData = {
          filename: fileData.originUrl,
          side: 'back'
        }
        identityCard(jsonData).then(res => {
          if (res.res === 1) {
            let data = JSON.parse(res.data)
            console.log(data, 'back-393')
            let startDate = data.start_date
            startDate = `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}`
            this.legalForm.legalValidStartDate = startDate
            let endDate = data.end_date
            if (endDate === '长期') {
              this.legalForm.legalValidDateType = '1'
              this.legalForm.legalValidEndDate = '9999-12-31'
            } else {
              this.legalForm.legalValidDateType = '2'
              endDate = `${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6, 8)}`
              this.legalForm.legalValidEndDate = endDate
            }
            this.$set(this.legalForm, 'ossIdentityBackId', fileData.originUrl)
            this.bx_upFile(file, '03')
          } else {
            console.log(this.backUrl, 412)
            this.backUrl = ''
            this.$set(this.legalForm, 'ossIdentityBackId', '')
            this.isLoading = false
          }
        })
      } catch (error) {
        this.isLoading = false
      }
    },
    // 图片上传接口
    async bx_upFile (file, type) {
      let formData = new FormData()
      formData.set('appendix', file)
      formData.set('billType', type)
      try {
        const res = await bx_upFile(formData)
        console.log(res)
        if (res.res === 1) {
          this.isLoading = false
          // 02 正面
          if (type === '02') {
            this.$set(this.legalForm, 'identityFaceId', res.data.body.fileUrl)
            return
          }
          this.$set(this.legalForm, 'identityBackId', res.data.body.fileUrl)
        } else {
          this.isLoading = false
          // // 02 正面
          // if (type === '02') {
          //   this.fontUrl = ''
          //   this.legalForm.ossIdentityFaceId = '' // oss 法定代表人身份证（正）url
          //   this.$message('身份证正面上传失败，请重新上传')
          // } else {
          //   this.backUrl = ''
          //   this.legalForm.ossIdentityBackId = '' // oss 法定代表人身份证（反）url
          //   this.$message('身份证反面上传失败，请重新上传')
          // }
        }
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }
  },
  watch: {
    legalForm: {
      // 深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        this.inputEnterName()
      },
      deep: true
    },
    legalPersonProps: {
      handler (val) {
        if (val.legalPersonName) {
          this.$set(this, 'legalForm', val)
          this.fontUrl = val.ossIdentityFaceId
          this.backUrl = val.ossIdentityBackId
        }
      },
      deep: true
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.page2css {
  margin-top: 10px;
}
</style>
