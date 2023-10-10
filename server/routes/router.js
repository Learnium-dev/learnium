
import { Router } from 'express';
import { uploadContent } from '../controllers/uploadcontent.js';

const router = Router();

router.post("/uploadcontent", uploadContent );

export default router;