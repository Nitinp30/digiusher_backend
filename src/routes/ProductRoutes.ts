import express from "express";
import { fetchProducts } from "../controllers/filterController.tsx";

const router = express.Router();

router.get("/filter", fetchProducts);

export default router;
