<template>
  <div>
    <el-steps :active="activeStep" align-center>
      <el-step title="提交资料信息"></el-step>
      <el-step title="平台审核"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: 'thestep',
  props: {
    activeStep: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {

    }
  }
}
</script>
