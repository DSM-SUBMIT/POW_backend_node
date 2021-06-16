const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.AccessKeyId,
    secretAccessKey: process.env.SecretAccessKey,
    region: process.env.REGION,
});
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'pow-bucket',
        acl: 'public-read',
        key: function(req, file, cb){
            cb(null, `${Date.now()}__${file.originalname}`);
        }
    })
});
module.exports = upload;