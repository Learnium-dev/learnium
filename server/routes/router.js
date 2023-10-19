const uploadContent = require('../controllers/uploadcontent.js');
const  uploadPdf = require('../controllers/uploadPdf.js');
const  createContent = require('../controllers/createContent.js');
const express = require("express");
const router = express.Router();

// Configure multer for handling file uploads
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/uploadcontent", uploadContent );
router.post("/folders", uploadContent );
router.post("/upload-pdf", upload.single('pdf'),  uploadPdf);
router.post("/create-content", upload.single('pdf'),  createContent)


module.exports =  router ;
