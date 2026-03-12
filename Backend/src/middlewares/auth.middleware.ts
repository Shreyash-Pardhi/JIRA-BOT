import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const token = req.cookies.jwtToken;

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        (req as any).user = decoded;

        next();

    } catch {

        return res.status(401).json({ message: "Invalid token" });

    }
};