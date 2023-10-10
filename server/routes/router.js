
import { Router } from 'express';
import { uploadContent } from '../controllers/uploadcontent.js';
import { uploadPdf } from '../controllers/uploadPdf.js';

// Router
const router = Router();

// Configure multer for handling file uploads
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/uploadcontent", uploadContent );
router.post("/upload-pdf", upload.single('pdf'),  uploadPdf);

export default router;