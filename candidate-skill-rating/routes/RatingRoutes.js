// routes/userRoutes.js
import { Router } from "express";
import authMiddleware from "../utils/authMiddleware.js";
import RatingController from "../controllers/RatingController.js";
const router = Router();

// public routes
router.get("/ratings", RatingController.getAllRating);
router.get("/ratings/:id", RatingController.getRatingById);
router.get("/aggregated-ratings", RatingController.getAggregatedSkills);

// private routes
router.post("/ratings", authMiddleware, RatingController.createRating);
router.put("/ratings/:id", authMiddleware, RatingController.updateRatingById);
router.delete(
  "/ratings/:id",
  authMiddleware,
  RatingController.deleteRatingById
);

export default router;
