import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { redirectUrl } from "./controllers/url.controller.js";  
import passport from "passport";
import "./config/passport.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Passport
app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);
app.use("/api", urlRoutes);

// Static files from client build (PRODUCTION)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res, next) => {
    // Skip API routes and short URL redirects
    if (req.path.startsWith("/auth") || 
        req.path.startsWith("/api") || 
        req.path.match(/^\/s\/[a-zA-Z0-9_-]{6}$/)) {
      return next();
    }
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

app.get("/s/:shortUrl", redirectUrl);

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});