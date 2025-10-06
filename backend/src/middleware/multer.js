const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // save files in /uploads
  },
  filename: (req, file, cb) => {
    // unique filename: timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
module.exports = upload;