const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    // Tentukan folder berdasarkan nama field
    switch (file.fieldname) {
      case "lampiranKTP":
        folder = "./uploads/ktp";
        break;
      case "lampiranKK":
        folder = "./uploads/kk";
        break;
      case "fotoDiri":
        folder = "./uploads/fotoDiri";
        break;
      case "paspor":
        folder = "./uploads/paspor";
        break;
      default:
        folder = "./uploads"; // Folder default
    }

    return cb(null, folder);
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = { upload };
