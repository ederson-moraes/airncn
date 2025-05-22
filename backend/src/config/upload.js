const multer = require('multer')
const path = require('path')


module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`)
        }
    })
}