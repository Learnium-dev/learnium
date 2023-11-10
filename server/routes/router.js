const uploadContent = require('../controllers/uploadcontent.js');
const  uploadPdf = require('../controllers/uploadPdf.js');
// import { createContent, askai } from '../controllers/createContent.js';
const createContent = require('../controllers/createContent.js');
// const createContent = require('../controllers/createContent.js');
// const askai = require('../controllers/createContent.js');
const  askai = require('../controllers/askai.js');
const validateFlashcardAnswer = require('../controllers/validateFlashcardAnswer.js');
const testControl = require('../controllers/testControl.js');
const express = require("express");
const router = express.Router();

// Configure multer for handling file uploads
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/uploadcontent", uploadContent );
// router.post("/folders", uploadContent );
router.post("/upload-pdf", upload.single('pdf'),  uploadPdf);
router.post("/create-content", upload.single('pdf'),  createContent)
router.post("/askai",askai)
router.post("/validateflashcardanswer", validateFlashcardAnswer)
router.post("/test", testControl)


module.exports =  router ;
