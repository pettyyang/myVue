<template>
  <div class="mStepMain-wrapper bsnsLicense-wrapper">
    <h1 class="mAuth-title">
      对公账户信息
      <b class="index" v-if="steps.curStep">({{ steps.curStep }}/{{ steps.allStep }})</b>
      <!-- <el-checkbox v-model="isCheckSameBtn" @change="sameLegal">同法人</el-checkbox> -->
    </h1>
    <el-form class="mAuth-form mAuth-form__padding" ref="beneficiaryForm" :model="beneficiaryForm" :rules="rules">
      <el-form-item class="mForm-item" prop="bnfName">
        <span class="mItem-lab">
          <em class="required_con"></em>
          开户银行
        </span>
        <div class="flex">
          <!-- <el-input class="mItem-long" placeholder="请选择开户银行" v-model="beneficiaryForm.bnfName"></el-input> -->
          <el-select v-model="beneficiaryForm.bnfCertNo" placeholder="请选择开户支行" class="mItem-long">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item">
        <span class="mItem-lab">
          <em class="required_con"></em>
          开户城市
        </span>
        <div class="flex">
          <!-- <el-input class="mItem-long" placeholder="请选择开户城市" v-model="beneficiaryForm.bnfCertNo"></el-input> -->
          <el-select v-model="beneficiaryForm.bnfCertNo" placeholder="请选择开户城市" class="mItem-long">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item">
        <span class="mItem-lab">
          <em class="required_con"></em>
          开户支行
        </span>
        <div class="flex">
          <el-select v-model="beneficiaryForm.bnfCertNo" placeholder="请选择开户支行" class="mItem-long">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item">
        <span class="mItem-lab">
          <em class="required_con"></em>
          银行账号
        </span>
        <div class="flex">
          <el-input class="mItem-long" placeholder="请输入银行账号" v-model="beneficiaryForm.bnfCertNo"></el-input>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item">
        <span class="mItem-lab">
          <em class="required_con"></em>
          支行银联号
        </span>
        <div class="flex">
          <el-input class="mItem-long" placeholder="请输入银联账号" v-model="beneficiaryForm.bnfCertNo"></el-input>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import theUploadPic from '_c/theUploadPic'
import TypeHelper from '@/util/helper/TypeHelper'
export default {
  components: {
    // theUploadPic,
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
      legalAddr: '',
      isCheckSameBtn: false,
      certTypeList: TypeHelper.get_certType(), // 证件下拉列表
      beneficiaryForm: {
        bnfName: '', // 受益人名称
        bnfAddr: '', // 受益人地址
        bnfCertNo: '', // 受益人证件号码
        bnfValidDateType: '', // 受益人身份证有效期类型（1 长期 2 固定日期）
        bnfValidStartDate: '', // 受益人身份证有效期开始时间
        bnfValidEndDate: ' ' // 受益人身份证有效期结束时间 bnfValidDateType 为2必填
      },
      rules: {
        bnfName: [
          { required: true, message: '受益人姓名', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '最多输入30个字符',
            trigger: 'blur'
          }
        ],
        contact_mobile: [{ validator: this.$valid.validPhone, trigger: 'blur' }]
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  created () {
    this.getBsnsInfo()
  },
  methods: {
    // 获取受益人信息
    getBsnsInfo () {
      const data = this.signUpInfo
      console.log(data, 154154)
      if (JSON.stringify(data) === '{}') return
      this.beneficiaryForm.bnfName = data.bnfName
      this.beneficiaryForm.bnfAddr = data.bnfAddr
      this.beneficiaryForm.bnfCertNo = data.bnfCertNo
      this.beneficiaryForm.bnfValidDateType = data.bnfValidDateType
      this.beneficiaryForm.bnfValidStartDate = data.bnfValidStartDate
      this.beneficiaryForm.bnfValidEndDate = data.bnfValidEndDate
      this.inputEnterName()
    },
    // 同法人
    sameLegal () {
      if (this.isCheckSameBtn) {
        let leagalMsg = JSON.parse(sessionStorage.getItem('legalInfo'))
        console.log(leagalMsg, '///////////法人信息')
        if (leagalMsg) {
          for (let key in leagalMsg) {
            if (leagalMsg[key] === '') {
              this.isCheckSameBtn = false
              this.$message('请先完善法人信息')
              return
            }
          }
          console.log(leagalMsg, '///////////法人信息')
          this.beneficiaryForm.bnfName = leagalMsg.legalPersonName
          this.beneficiaryForm.bnfCertNo = leagalMsg.legalIdNum
          this.beneficiaryForm.bnfValidDateType = leagalMsg.legalValidDateType
          this.beneficiaryForm.bnfValidStartDate = leagalMsg.legalValidStartDate
          this.beneficiaryForm.bnfValidEndDate = leagalMsg.legalValidEndDate
          this.beneficiaryForm.bnfAddr = leagalMsg.legalAddr
        } else {
          this.isCheckSameBtn = false
          this.$message('请先完善法人信息')
        }
      }
    },
    inputEnterName () {
      this.$emit('getBeneficiaryForm', this.beneficiaryForm)
    },
    // 用户选择长期
    longTerm () {
      if (this.legalForm.bnfValidDateType === 1) {
        this.$set(this.legalForm, 'effective_end_date', '9999-12-31')
      }
    },
    // 用户选择固定日期
    sureTerm () {
      if (this.legalForm.bnfValidDateType === 2) {
        this.$set(this.legalForm, 'effective_end_date', '')
      }
    }
  },
  watch: {
    beneficiaryForm: {
      // 深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        this.inputEnterName()
      },
      deep: true
    }
  },
  mounted () {}
}
</script>
<style>
.bsnsLicense-wrapper .mAuth-title .el-checkbox__inner,
.bsnsLicense-wrapper .mAuth-title .el-checkbox__label,
.bsnsLicense-wrapper .mAuth-title .el-checkbox__input {
  margin: 0 !important;
}
</style>
<style scoped>
.bsnsLicense-wrapper .mAuth-title .index {
  margin-right: 30px;
}
</style>
