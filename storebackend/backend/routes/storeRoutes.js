import express from "express";
import {
  addStore,
  getStores,
  getStoreUsers
} from "../controllers/storeController.js";

const router = express.Router();

router.post("/add", addStore);

router.get("/", getStores);

router.get("/:storeId/users", getStoreUsers);

export default router;