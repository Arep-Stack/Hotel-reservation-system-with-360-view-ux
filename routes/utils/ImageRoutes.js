const express = require('express');
const multer = require('multer');
const imageController = require('../../controllers/util/ImageController');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Use memory storage for Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/image/upload', upload.single('image'), imageController.postImage);
router.get('/image/:id', imageController.getImageById);

module.exports = router;