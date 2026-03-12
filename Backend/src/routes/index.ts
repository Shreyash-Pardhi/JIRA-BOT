import express from "express";
import issueRoutes from "../modules/issues/issue.routes";
import authRoutes from "../modules/auth/auth.routes";

const router = express.Router();

router.use("/issues", issueRoutes);
router.use("/auth", authRoutes);

export default router;