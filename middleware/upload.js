const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file ,cb){
        cb(null, 'upload/');
    }, filename (req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'text/plain'){
        cb(null, true);
    } else {
        cb (null, false);
    }
}
const limits = {
    filesize: 1024 * 1024 * 5
}


module.exports = multer ({storage, fileFilter, limits})