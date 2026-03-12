import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../users/user.model";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../../config/env";

export const registerUser = async (data: any) => {

    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        ...data,
        password: hashedPassword
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
};

export const loginUser = async (email: string, password: string) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return { user, token };
};

export const getCurrentUser = async (token: string) => {
    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        // console.log("Decoded JWT:", decoded); // Debugging line
        const user = await User.findById(decoded.id).select("-password");
        return user;
    } catch (error) {
        throw new Error("Invalid token");
    }
}