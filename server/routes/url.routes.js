import express from "express";
import {
  createShortUrl,
  getUserUrls,
  getUrlAnalytics,
  deleteUrl,
} from "../controllers/url.controller.js";
import { protectRoute, optionalAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Anonymous can create; if logged in, it will be saved to their account
router.post("/short", optionalAuth, createShortUrl);

// Only logged-in users can see/manage their URLs
router.get("/urls", protectRoute, getUserUrls);
router.get("/urls/:shortUrl/analytics", protectRoute, getUrlAnalytics);
router.delete("/urls/:shortUrl", protectRoute, deleteUrl);

export default router;