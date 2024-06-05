import express from 'express';

const router =  express.Router();

// controller
import { emailVerification } from '../controllers/emailVerificationController.js';

router.get('/verify-email', emailVerification)

export default router;