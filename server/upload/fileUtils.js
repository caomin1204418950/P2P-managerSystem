var config = require('./config');
var COS = require('cos-nodejs-sdk-v5');
var fs = require('fs');
var UUID = require('uuid');

// 创建实例
var cos = new COS({
    SecretId: config.SecretId,
    SecretKey: config.SecretKey,
});

var fileUtils = {
    putObject:function (filePath,filenName,fileSize,callback) {

        // 调用方法
        cos.putObject({
            Bucket: config.Bucket, /* 必须 */ // Bucket 格式：test-1250000000
            Region: config.Region,
            Key: UUID.v1() +'_'+filenName, /* 必须 */
            TaskReady: function (tid) {
                TaskId = tid;
            },
            onProgress: function (progressData) {
                console.log(JSON.stringify(progressData));
            },
    
            // 格式1. 传入文件内容
            // Body: fs.readFileSync(filepath),
            // 格式2. 传入文件流，必须需要传文件大小
            Body: fs.createReadStream(filePath),
            ContentLength: fileSize
        }, callback);
    }
};

module.exports = fileUtils;