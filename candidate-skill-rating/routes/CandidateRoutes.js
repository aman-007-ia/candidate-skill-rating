// routes/userRoutes.js
import { Router } from "express";
import CandidateController from "../controllers/CandidateController.js";
import authMiddleware from "../utils/authMiddleware.js";
const router = Router();

// public routes
router.get("/candidates", CandidateController.getAllCandidate);
router.get("/candidates/:id", CandidateController.getCandidateById);

// private routes
router.post("/candidates", authMiddleware, CandidateController.createCandidate);
router.put(
  "/candidates/:id",
  authMiddleware,
  CandidateController.updateCandidateById
);
router.delete(
  "/candidates/:id",
  authMiddleware,
  CandidateController.deleteCandidateById
);

export default router;
