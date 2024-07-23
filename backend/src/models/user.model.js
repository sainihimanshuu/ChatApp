import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        avatar: {
            type: {
                public_id: String,
                url: String,
            },
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        about: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//cannot acces this keyword inside an arrow function, so use a normal function
userSchema.methods = {
    isPasswordCorrect: async function (textPassword) {
        return await bcrypt.compare(textPassword, this.password);
    },

    generateAccessToken: function () {
        return jwt.sign(
            {
                id: this._id,
                username: this.username,
                email: this.email,
            },
            process.env.JWT_ACCESSTOKEN_SECRET,
            {
                expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRY,
            }
        );
    },

    generateRefreshToken: function () {
        return jwt.sign(
            {
                id: this._id,
            },
            process.env.JWT_REFRESHTOKEN_SECRET,
            {
                expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRY,
            }
        );
    },
};

const User = mongoose.model("User", userSchema);

export default User;
