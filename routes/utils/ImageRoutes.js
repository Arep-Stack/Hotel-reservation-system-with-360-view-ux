const express = require('express');
const multer = require('multer');
const imageController = require('../../controllers/util/ImageController');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Specify the destination for multer to store the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = 'uploads';
    const uploadFolderPath = path.join(__dirname, '../../' ,uploadFolder);
    // Create the upload folder if it doesn't exist
    if (!fs.existsSync(uploadFolderPath)) {
      fs.mkdirSync(uploadFolderPath);
    }
    cb(null, uploadFolderPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for each uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post('/image/upload', upload.single('image'), imageController.postImage);
router.get('/image/:id', imageController.getImageById);

module.exports = router;