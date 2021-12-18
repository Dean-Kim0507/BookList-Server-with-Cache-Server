import express from "express";
import { ping, posts } from '../controllers/controllers.js';
import caching from '../middleware/caching.js';
const router = express.Router();


router.get("/ping", ping);
router.get("/posts", caching, posts);


export default router;
