require('dotenv').config();

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDNIARY_NAME,
  api_key: process.env.CLOUDNIARY_API_KEY,
  api_secret: process.env.CLOUDNIARY_API_SECRET,
  secure: true
};

module.exports = cloudinaryConfig;
