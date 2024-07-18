import express from 'express';
import { test , getUserListing } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test); 
router.get('/listing/:id', verifyToken, getUserListing)

export default router;