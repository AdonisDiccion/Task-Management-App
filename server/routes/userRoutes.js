import express from 'express';

const router = express.Router();

// Controllers
import { createUser, emailVerification, loginUser } from '../controllers/userController.js';

// Middleware
import { requireSignIn } from '../middleware/authMiddleware.js';

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/verify-email', emailVerification);

router.get('/auth-check', requireSignIn, (req, res) => {
  res.json({ ok: true });
});

export default router;
