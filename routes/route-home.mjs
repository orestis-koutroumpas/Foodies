import express from 'express';
import { getHomePage } from '../controller/home-controller.mjs';

const router = express.Router();

router.get('/', getHomePage);

export default router;