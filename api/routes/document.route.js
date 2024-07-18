import express from 'express';
import { createDocument, getAllDocuments } from '../controllers/document.controller.js';

const router = express.Router();

router.post('/document', createDocument);
router.get('/getdocuments', getAllDocuments);


export default router;