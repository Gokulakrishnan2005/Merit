import express from 'express';
import {
  createListing,
  getAllListing,
  studentDetail,
  studentlogin,
  Details,
  updateListing,
  deleteListing
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();
router.post('/create', verifyToken, createListing);
router.get('/listings',verifyToken, getAllListing);
router.post('/studentlogin', studentlogin);
router.get('/student/:id', studentDetail);
router.get('/Details/:id', Details);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);

export default router;
