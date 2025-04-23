import express from 'express';
import consentUserController from '../controllers/consentUserapiController.js';

const router = express.Router();


// User detail fetchers
router.get('/all', consentUserController.getAllUsers);
router.get('/email/:email', consentUserController.getUserByEmail);
router.get('/phone/:phone', consentUserController.getUserByPhone);
router.get('/id/:id', consentUserController.getUserById);
router.get('/username/:username', consentUserController.getUserByUsername);

// Users who gave or didn't give consent
router.get('/with', consentUserController.getUsersWhoGaveConsent);
router.get('/without', consentUserController.getUsersWhoDidNotGiveConsent);


export default router;
