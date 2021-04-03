// configs/cloudinary.config.js

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  
  params: {
    folder: 'test', // The name of the folder in cloudinary
  }
});

//                        storage: storage
const uploadCloud = multer({ storage });

module.exports = uploadCloud;
