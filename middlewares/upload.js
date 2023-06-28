const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  imageOptions: {
    resize: { width: 250, height: 250 },
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
