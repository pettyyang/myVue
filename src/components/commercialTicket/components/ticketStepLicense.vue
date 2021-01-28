<template>
  <div class="mStepMain-wrapper bsnsLicense-wrapper" v-loading="isLoading">
    <h1 class="mAuth-title">
      营业执照信息
      <b class="index" v-if="steps.curStep">({{ steps.curStep }}/{{ steps.allStep }})</b>
      <span class="red">温馨提示：请先上传营业执照,系统将自动填写信息，再核对识别结果</span>
    </h1>
    <el-form class="mAuth-form mAuth-form__padding" ref="businessForm" :model="businessForm" :rules="rules">
      <el-form-item class="mForm-item flex-start">
        <span class="mItem-lab">
          <em class="required_con"></em>
          营业执照
        </span>
        <div class="item-upImg">
          <theUploadPic @getFile="get_business_license">
            <template v-slot:picture v-if="fontUrl">
              <div class="same-legal-img-font">
                <img @mouseenter="isDeleteFont = true" :src="fontUrl" @load="fontImgLoad($event)" />
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
            <p class="des">上传营业执照</p>
          </div>
        </div>
        <div class="item-upInfo">
          <el-link type="primary" @click="popEg(require('../../../assets/img/eg-business.png'))">查看示例</el-link>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item" prop="custName">
        <span class="mItem-lab">
          <em class="required_con"></em>
          企业名称
        </span>
        <div class="flex">
          <el-input class="mItem-long" placeholder="请输入企业名称" v-model="businessForm.custName"></el-input>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item" prop="certNo">
        <span class="mItem-lab">
          <em class="required_con"></em>
          统一社会信用码
        </span>
        <div class="flex">
          <el-input class="mItem-long" placeholder="请输入18位统一社会信用码" v-model="businessForm.certNo"></el-input>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item">
        <span class="mItem-lab">
          <em class="required_con"></em>
          经营地址
        </span>
        <div class="flex">
          <el-input class="mItem-long" placeholder="请输入公司经营地址" v-model="businessForm.businessAddr"></el-input>
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
import { identityBusiness } from '@/api/api.js'
import { bx_upFile } from '@/api/bxBankApi.js'
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
      messages: {},
      fontUrl: '',
      isDeleteFont: '',
      businessAddr: '',
      isLoading: false,
      isShowViewPop: false,
      egSrc: '', // 查看示例
      businessForm: {
        custName: '', // 企业名称 *
        ossBusinessFaceId: '', // 营业执照oss *
        certNo: '', // 统一社会信用码 *
        businessAddr: '', // 公司经营地址
        businessFaceId: '' // 营业执照url
      },
      rules: {
        custName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { validator: this.$valid.validIptLen, trigger: 'blur' }
        ],
        certNo: [{ validator: this.$valid.validCreditCode, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getBsnsInfo()
  },
  methods: {
    // 营业执照图片加载完成
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
      image.onload = function () {
        var base64 = that.$methods.getImageBase64(image, 'a.png')
        let blobFont = that.$methods.base64ToBlob(base64)
        let theFileFont = that.$methods.blobToFile(blobFont, 'font.png')
        console.log(theFileFont)
        that.businessForm.ossBusinessFaceId = theFileFont
      }
    },
    // 获取营业执照信息
    getBsnsInfo () {
      const data = this.signUpInfo
      console.log(data, 154154)
      if (JSON.stringify(data) === '{}') return
      this.businessForm.custName = data.custName
      this.businessForm.certNo = data.certNo
      this.businessForm.businessAddr = data.businessAddr
      this.fontUrl = data.ossBusinessFaceId
      this.businessForm.businessFaceId = data.businessFaceId
      this.businessForm.ossBusinessFaceId = data.ossBusinessFaceId
      this.inputEnterName()
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
      // console.log(this.businessForm);
      this.$emit('getBusinessForm', this.businessForm)
    },
    // 上传图片，获取营业执照信息
    get_business_license (file, data) {
      console.log(file, data, 179)
      this.isLoading = true
      this.businessForm.ossBusinessFaceId = data.originUrl
      let jsonData = {
        filename: data.originUrl
      }
      identityBusiness(jsonData).then(res => {
        this.bx_upFile(file, '01')
        if (res.res === 1) {
          const bsnsInfo = JSON.parse(res.data)
          console.log(bsnsInfo, 190)
          this.$set(this.businessForm, 'custName', bsnsInfo.name)
          this.$set(this.businessForm, 'certNo', bsnsInfo.reg_num)
          this.$set(this.businessForm, 'businessAddr', bsnsInfo.address)
        }
      })
    },
    // 图片上传接口
    async bx_upFile (file, type) {
      let formData = new FormData()
      formData.set('appendix', file)
      formData.set('billType', type)
      const res = await bx_upFile(formData)
      console.log(res)
      if (res.res === 1) {
        this.$set(this.businessForm, 'businessFaceId', res.data.body.fileUrl)
      }
      this.isLoading = false
    },
    // 点击删除图片
    doDeleteImg () {
      this.fontUrl = ''
      this.isDeleteFont = false
      this.businessForm.custName = ''
      this.businessForm.certNo = ''
      this.businessForm.businessAddr = ''
      this.businessForm.businessFaceId = ''
      this.businessForm.ossBusinessFaceId = ''
    }
  },
  watch: {
    businessForm: {
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
<style scoped></style>
