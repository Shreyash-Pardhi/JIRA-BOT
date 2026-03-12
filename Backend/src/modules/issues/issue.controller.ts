import { Request, Response } from "express";
import * as issueService from "./issue.service";

export const createIssue = async (req: Request, res: Response) => {
    const issue = await issueService.createIssue(req.body);
    res.json(issue);
};