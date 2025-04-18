require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//In this the key name like cloud_name, api_key etc. should be same as the above. 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
     //folder name in cloudinary
      folder: 'Wanderlust_DEV',
      //array of allowed file types
      allowedFormats: async (req, file) => ['png', 'jpg', 'jpeg', 'webp'], 
    },
  });

module.exports = storage;