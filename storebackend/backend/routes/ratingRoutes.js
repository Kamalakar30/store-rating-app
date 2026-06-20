import express from "express";
import {
  addRating,
  getStoreRating
} from "../controllers/ratingController.js";

const router = express.Router();

router.post("/add", addRating);

router.get("/store/:storeId", getStoreRating);

export default router;