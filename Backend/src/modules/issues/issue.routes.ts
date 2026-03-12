import express from "express";
import { createIssue } from "./issue.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createIssueSchema } from "../../validations/issue.validation";
import { authorize } from "../../middlewares/role.middleware";
import { authenticate } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post(
    "/",
    validate(createIssueSchema),
    authenticate,
    authorize("admin", "manager"),
    createIssue
);

export default router;