const imageModel = require('../../models/utils/ImageModel');
const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../../config/cloudinaryConfig');

cloudinary.config(cloudinaryConfig);

const postImage = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const generateRandomWord = () => Math.random().toString(36).substr(2, 4).toUpperCase();
    const prefix = generateRandomWord();
    const cloudinaryUpload = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((error, result) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve(result.url);
          }
        }).end(buffer);
      });
    };
    const cloudinaryUrl = await cloudinaryUpload();
    const request = {
      FILLE_NAME: originalname , 
      PATH: cloudinaryUrl,
      ID: `${prefix}-${originalname}`
    }
    const result = await imageModel.uplaodImage(request)
    if ( !result.ID ) {
      return res.status(404).json({ error: 'Uploading Image failed' });
    }else {
      return res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while uploading image.' });
  }
};
const getImageById = async (req, res) => {
  try {
      const imageId = req.params.id;
      const image = await imageModel.retrieveImage(imageId);
      if (!image) {
      return res.status(404).json({ error: 'Image not found' });
      }
      res.status(200).json(image);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching the image.' });
  }
};
module.exports = {
  postImage,
  getImageById
}