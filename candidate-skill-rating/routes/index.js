import { Router } from "express";
import CandidateRoutes from "./CandidateRoutes.js";
import UserRoutes from "./userRoutes.js";
import RatingRoutes from "./RatingRoutes.js";

const router = Router();

router.use("/api", CandidateRoutes);
router.use("/api", UserRoutes);
router.use("/api", RatingRoutes);

export default router;
