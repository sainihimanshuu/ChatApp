import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

const verifyJwt = asyncHandler(async (req, _, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "unauthorized access, no access token");
    }
    try {
        var decoded = jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET);
    } catch (error) {
        throw new ApiError(500, "error while decoding access token");
    }

    const user = await User.findById(decoded.id).select(
        "-password -refreshToken"
    );

    if (!user) {
        throw new ApiError(403, "Invalid token");
    }

    req.user = user;

    next();
});

export default verifyJwt;
