import { nanoid } from "nanoid";
import Url from "../models/url.model.js";

export const createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    const userId = req.user?._id; // Optional, for authenticated users

    if (!longUrl) {
      return res.status(400).json({ message: "Long URL is required" });
    }

    // Generate unique short URL
    let shortUrl;
    let isUnique = false;
    
    while (!isUnique) {
      shortUrl = nanoid(6);
      const existing = await Url.findOne({ shortUrl });
      if (!existing) isUnique = true;
    }

    const newUrl = new Url({
      longUrl,
      shortUrl,
      userId: userId || null,
    });

    await newUrl.save();

    res.status(201).json({
      shortUrl,
      longUrl,
      fullShortUrl: `${req.protocol}://${req.get("host")}/s/${shortUrl}`,
    });
  } catch (error) {
    console.log("Error in createShortUrl", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    const userId = req.user._id;
    const urls = await Url.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (error) {
    console.log("Error in getUserUrls", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUrlAnalytics = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const userId = req.user._id;

    const url = await Url.findOne({ shortUrl, userId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(200).json({
      shortUrl: url.shortUrl,
      longUrl: url.longUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
  } catch (error) {
    console.log("Error in getUrlAnalytics", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const userId = req.user._id;

    const url = await Url.findOneAndDelete({ shortUrl, userId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUrl", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Increment clicks
    url.clicks += 1;
    await url.save();

    res.redirect(url.longUrl);
  } catch (error) {
    console.log("Error in redirectUrl", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};