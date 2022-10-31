<template>
  <div>
    <el-upload class="upload-demo" drag multiple action="string" :file-list="fileList" :http-request="uploadFile"
      :on-change="handleChange" :on-remove="handleRemove">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')

var cos = new COS({
  SecretId: 'AKIDulSxHSRBmEUVNG8qNkxYw585rUzJOFuP',
  SecretKey: 'Nelirz0ujLk3KRM3axNjvwpTxEIBvUqx'
});
export default {
  name: 'home',
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    //点击上传文件触发的额外事件,清空fileList
    delFile () {
      this.fileList = [];
    },
    handleChange (file, fileList) {
      this.fileList = fileList;
      // console.log(this.fileList, "sb");
    },
    //自定义上传文件
    uploadFile (file) {
      console.info(file)

      // cos.putObject({
      //   Bucket: 'test-1251732427', /* 填入您自己的存储桶，必须字段 */
      //   Region: 'ap-nanjing',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
      //   Key: file.file.name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      //   StorageClass: 'STANDARD',
      //   /* 当Body为stream类型时，ContentLength必传，否则onProgress不能返回正确的进度信息 */
      //   Body: fs.createReadStream(file.file), // 上传文件对象
      //   ContentLength: fs.statSync(file.file).size,
      //   onProgress: function (progressData) {
      //     console.log(JSON.stringify(progressData));
      //   }
      // }, function (err, data) {
      //   console.log(err || data);
      // });
      // cos.putObject({
      //   Bucket: 'test-1251732427', /* 填入您自己的存储桶，必须字段 */
      //   Region: 'ap-nanjing',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
      //   Key: file.file.name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      //   Body: file.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
      //   onProgress: function (progressData) {
      //     console.log(JSON.stringify(progressData));
      //   }
      // }, function (err, data) {
      //   console.log(err || data);
      // });

      cos.uploadFile({
        Bucket: 'test-1251732427', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.file.name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        SliceSize: 1024 * 1024 * 1,     /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */
        onTaskReady: function (taskId) {                   /* 非必须 */
          console.log(taskId);
        },
        onProgress: function (progressData) {           /* 非必须 */
          console.log(JSON.stringify(progressData));
        },
        onFileFinish: function (err, data, options) {   /* 非必须 */
          console.log(options.Key + '上传' + (err ? '失败' : '完成'));
        },
      }, function (err, data) {
        console.log(err || data);
      });
      // this.formData.append("file", file.file);
      // console.log(file.file, "sb2");
    },
    //删除文件
    handleRemove (file, fileList) {
      console.log(file, fileList);
    }
  }
}
</script>