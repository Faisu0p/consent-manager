import express from 'express';
import {
  getUsersWhoGaveConsent,
  getUsersWhoDidNotGiveConsent,
} from '../controllers/consentUserapiController.js';

const router = express.Router();

router.get('/with', getUsersWhoGaveConsent);
router.get('/without', getUsersWhoDidNotGiveConsent);

export default router;
