<template>
  <div class="upload-img-com">
    <!-- <el-upload
      class="upload-demo"
      action=""
      ref="upload"
      :disabled="disabled"
      :on-remove="handleRemove"
      :on-success="handlePictureCardPreview"
      :http-request="uploadImage"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
      <div slot="tip" class="el-upload__tip">支持文件格式:pdf</div>
    </el-upload> -->
    <el-upload :disabled="disabled"
    class="upload-demo"
    action="string"
    :http-request="uploadImage"
    name="files"
    :on-success="handlePictureCardPreview"
    :on-remove="handleRemove">
    <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
    <div slot="tip" class="el-upload__tip">支持文件格式:pdf</div>
    </el-upload>
  </div>
</template>

<script>
import { mapState } from 'vuex'
let OSS = require('ali-oss')
export default {
  props: {
    params: {
      default: ''
    },
    url: {
      type: String,
      default: 'https://www.xinshangpiao.com/aiecds/spkj/Oss/uploadfile'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapState(['ossInfo'])
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList, 'remove')
    },
    // 图片上传完毕
    handlePictureCardPreview (file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
      this.$emit('UploadSuccess', file)
    },
    //
    uploadImage (param) {
      const that = this
      this.$emit('getImg', param.file, that.params)
      // uploadImg(fd).then(res => {
      //   this.$emit("getFile", param.file, res.data, this.params);
      //   this.$emit("getUrl", res.data.originUrl);
      // });
      let { OSS_ENDPOINT, OSS_ACCESS_ID, OSS_ACCESS_KEY, OSS_TEST_BUCKET, OSS_MENU } = this.ossInfo
      // console.log("%c oss", "color: #cc7033", this.ossInfo);
      const client = new OSS({
        region: OSS_ENDPOINT,
        accessKeyId: OSS_ACCESS_ID,
        accessKeySecret: OSS_ACCESS_KEY,
        bucket: OSS_TEST_BUCKET
      })
      let Name = param.file.name
      const suffix = Name.substr(Name.indexOf('.'))
      const date = new Date()
      const path = OSS_MENU + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() + suffix

      client
        .put(path, param.file)
        .then(function (result) {
          let data = {}
          data.originUrl = result.url ? result.url : result.res.requestUrls[0]
          // console.log("url", data);
          that.$emit('getFile', param.file, data, that.params)
          that.$emit('getUrl', data.originUrl)
          that.dialogVisible = false
        })
        .catch(err => {
          console.log(err)
          that.dialogVisible = false
        })
    }
  },
  mounted () {}
  // watch:{
  //     dialogImageUrl(val){
  //         if(val){
  //             this.dialogVisible=true;
  //         }
  //     }
  // }
}
</script>
<style lang="less" scoped>
</style>
