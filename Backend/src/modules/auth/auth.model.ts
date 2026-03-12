import mongoose from "mongoose";

// Refresh Token Schema
const RefreshTokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        token: {
            type: String,
            required: true,
            unique: true
        },
        expiresAt: {
            type: Date,
            required: true
        },
        revoked: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Session Schema
const SessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        ipAddress: {
            type: String,
            required: false
        },
        userAgent: {
            type: String,
            required: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        lastActivityAt: {
            type: Date,
            default: Date.now
        },
        expiresAt: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

// Password Reset Schema
const PasswordResetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        token: {
            type: String,
            required: true,
            unique: true
        },
        expiresAt: {
            type: Date,
            required: true
        },
        used: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
export const Session = mongoose.model("Session", SessionSchema);
export const PasswordReset = mongoose.model("PasswordReset", PasswordResetSchema);
