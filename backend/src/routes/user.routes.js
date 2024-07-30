import {
    loginUser,
    createUser,
    logoutUser,
    refreshTokens,
    getOnlineUserList,
} from "../controllers/user.controller.js";
import { Router } from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/loginUser").post(loginUser);
router.route("/createUser").post(upload.single("avatar"), createUser);
router.route("/logoutUser").post(verifyJwt, logoutUser);
router.route("/refreshTokens").get(refreshTokens);
router.route("/getOnlineUserList").post(verifyJwt, getOnlineUserList);

export default router;
