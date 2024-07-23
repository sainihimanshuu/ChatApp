import { z } from "zod";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {
    uploadOnCloundinary,
    deleteFromCloundinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const generateTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        await User.findByIdAndUpdate(user._id, {
            $set: { refreshToken: refreshToken },
        });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "error while generating tokens");
    }
};

const createUserSchema = z.object({
    username: z
        .string()
        .regex(/^[a-zA-Z ]+$/)
        .min(3, { message: "username must be at least 3 character " })
        .max(20, { message: "username can be max 20 character" })
        .trim(),
    email: z.string().email().trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    about: z.string().optional(),
});

const createUser = asyncHandler(async (req, res) => {
    const validatedData = createUserSchema.parse(req.body);

    const isEmail = await User.findOne({ email: validatedData.email });
    if (isEmail) {
        throw new ApiError(400, "user with email already exists");
    }

    const isUsername = await User.findOne({ username: validatedData.username });
    if (isUsername) {
        throw new ApiError(400, "user with username already exists");
    }

    let userDetails = validatedData;
    if (req.file) {
        const localFilePath = req.file?.path;
        const cloudinaryResponse = await uploadOnCloundinary(localFilePath);
        const avatar = cloudinaryResponse;

        userDetails = {
            ...userDetails,
            avatar: {
                public_id: avatar.public_id,
                url: avatar.url,
            },
        };
    }

    const newUser = await User.create(userDetails);
    const user = await User.findById(newUser._id).select(
        "-password -refreshToken"
    );

    return res.status(200).json({ message: "user created successfully", user });
});

const loginUserSchema = z.object({
    email: z.string().email().trim(),
    password: z.string(),
});

const loginUser = asyncHandler(async (req, res) => {
    const validatedData = loginUserSchema.parse(req.body);

    const isUser = await User.findOne({ email: validatedData.email });
    if (!isUser) {
        throw new ApiError(400, "signup first");
    }

    const isPasswordCorrect = await isUser.isPasswordCorrect(
        validatedData.password
    );
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect password");
    }

    const { accessToken, refreshToken } = await generateTokens(isUser);
    const user = await User.findById(isUser._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        sameSite: "strict",
    };

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({ message: "login successful", user });
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user?._id, { $set: { refreshToken: "" } });

    const options = {
        httpOnly: true,
        sameSite: "strict",
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "Logout successful" });
});

const refreshTokens = asyncHandler(async (req, res) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!token) {
        throw new ApiError(401, "unauthorized access, no refresh token");
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESHTOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (token != user.refreshToken) {
        throw new ApiError(
            401,
            "unaothorized access, refresh token do not match"
        );
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    const options = {
        httpOnly: true,
        sameSite: "strict",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ message: "tokens refreshed", accessToken: accessToken });
});

export { loginUser, createUser, logoutUser, refreshTokens };
