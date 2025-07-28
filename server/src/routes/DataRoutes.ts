// src/routes/authRoutes.ts
import { Router } from 'express';
import { Addphotos, getFolders, getphotos } from '../controllers/DataController';

const router = Router();

router.get('/photos', getphotos);
router.post('/addPhotos', Addphotos);
router.get('/getFolders', getFolders)

export default router;