import { Router } from "express";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router();

import { sendMessage, getMessages } from "../controllers/message.controller.js";

router.route("/sendMessage").post(verifyJwt, sendMessage);
router.route("/getMessages/:receiverId").get(verifyJwt, getMessages);

export default router;
