<template>
  <div class="mStepMain-wrapper bsnsLicense-wrapper">
    <h1 class="mAuth-title">
      交易合同
      <b class="index" v-if="steps.curStep">({{ steps.curStep }}/{{ steps.allStep }})</b>
      <span class="red"  v-if="steps.curStep">温馨提示：请先上传合同文件,系统将自动填写信息，再核对识别结果</span>
    </h1>
    <el-form class="mAuth-form mAuth-form__padding" ref="contractForm" :model="contractForm" :rules="rules">
      <el-form-item class="mForm-item mForm-item-upload" prop="contractNo">
        <span class="mItem-lab">
          <em class="required_con"></em>
          合同文件:
        </span>
        <div class="flex">
          <theUploadFile @getUrl="getAcctractUrl"></theUploadFile>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item" prop="">
        <span class="mItem-lab">
          <em class="required_con"></em>
          合同编号:
        </span>
        <div class="flex">
          <el-input class="mItem-long" placeholder="请输入合同编号" v-model="contractForm.contractNo"></el-input>
        </div>
      </el-form-item>

      <el-form-item class="mForm-item">
        <span class="mItem-lab">
          <em class="required_con"></em>
          合同金额:
        </span>
        <div class="flex">
          <el-input class="mItem-long" placeholder="请输入合同金额" v-model="contractForm.contract_money"></el-input>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
    }
  },
  data () {
    return {
      contractForm: {
        contract_url: '', // 合同url
        contract_no: '', // 合同编号
        contract_money: '' // 合同金额
      },
      rules: {
      }
    }
  },
  created () {
  },
  methods: {
    getAcctractUrl (url) {
      console.log(url)
      this.contractForm.contract_url = url
    },
    inputEnterName () {
      // console.log(this.businessForm);
      this.$emit('getContractForm', this.contractForm)
    }
  },
  watch: {
    contractForm: {
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
  .page-full-Register .mSection-wrapper .mForm-item.mForm-item-upload{
    // height: 80px;
    margin-bottom: 30px;
    .upload-demo{
      margin-top: 20px;
    }
  }
</style>
