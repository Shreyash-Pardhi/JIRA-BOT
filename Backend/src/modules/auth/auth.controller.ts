import { Request, Response } from "express";
import * as authService from "./auth.service";
import { JWT_EXPIRES_IN } from "../../config/env";

export const register = async (req: Request, res: Response) => {
    try {

        const user = await authService.registerUser(req.body);

        res.json(user);

    } catch (error: any) {

        res.status(400).json({ message: error.message });

    }
};

export const login = async (req: Request, res: Response) => {

    try {
        console.log("Login in the user: ", req.body.email);
        const { email, password } = req.body;

        const result = await authService.loginUser(email, password);

        // Calculate cookie expiry based on JWT_EXPIRES_IN
        const maxAge = typeof JWT_EXPIRES_IN === 'string'
            ? parseInt(JWT_EXPIRES_IN) * 1000 * 120
            : JWT_EXPIRES_IN;

        // Set HTTP-only cookie with JWT token
        res.cookie("jwtToken", result.token, {
            httpOnly: true,
            secure: true, // HTTPS only in production
            sameSite: "none", // IMPORTANT
            maxAge: maxAge,
            path: "/"
        });
        console.log("login completed: ", result.user.email);
        // Return user data (without token) in response
        res.json({ user: result.user });

    } catch (error: any) {

        res.status(400).json({ message: error.message });

    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        // Clear the JWT token cookie
        res.clearCookie("jwtToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            // sameSite: "strict"
        });

        res.json({ message: "Logged out successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        // console.log("getCurrentUser called with user:", req.cookies.jwtToken);
        const user = await authService.getCurrentUser(req.cookies.jwtToken)
        res.json(user);
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}