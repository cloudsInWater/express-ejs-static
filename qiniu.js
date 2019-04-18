
/* eslint-disable no-undef */
/* eslint-disable no-shadow */

const qiniu = require('qiniu');

const config = {
  ak: '如果有',
  sk: '如果有',
  bucket: '如果有',
};

const upload = function (filePath, fileName, fn) {
  // 需要填写你的 Access Key 和 Secret Key
  qiniu.conf.ACCESS_KEY = config.ak;
  qiniu.conf.SECRET_KEY = config.sk;
  // 要上传的空间
  const bucket = config.bucket;
  const mac = new qiniu.auth.digest.Mac(qiniu.conf.ACCESS_KEY, qiniu.conf.SECRET_KEY);
  // 上传到七牛后保存的文件名
  const key = fileName;

  // 构建上传策略函数
  function uptoken(bucket, key) {
    const options = {
      scope: `${bucket}`,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
  }
  // 生成上传 Token
  token = uptoken(bucket, key);
  // 要上传文件的本地路径
  // var filePath = filePath;
  // 构造上传函数
  function uploadFile(uptoken, key, localFile, fn) {
    const extra = new qiniu.form_up.PutExtra();
    const config = new qiniu.conf.Config();
    const formUploader = new qiniu.form_up.FormUploader(config);
    formUploader.putFile(uptoken, key, localFile, extra, (err, respBody, respInfo) => {
      if (!err) {
        // 上传成功， 处理返回值
        // console.log(ret.hash, ret.key);
      } else {
        // 上传失败， 处理返回代码
        // console.log(err);
      }
      fn(err, respBody);
    });
  }

  // 调用uploadFile上传
  uploadFile(token, key, filePath, fn);
};

module.exports = {
  upload,
  config,
};
