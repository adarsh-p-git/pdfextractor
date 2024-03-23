const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const filename = `pdf-${Date.now()}-${file.originalname}`;
        cb(null, filename);
        //console.log(filename)
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
        cb(new Error('Only upload PDF files.'));
    }
};

const multerConfig = multer({
    storage,
    fileFilter
});

module.exports = multerConfig;
