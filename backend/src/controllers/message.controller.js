import asyncHandler from "../utils/asyncHandler.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { io, getReceiverSocketId } from "../socket/socket.js";

const sendMessage = asyncHandler(async (req, res) => {
    const { senderId } = req.user._id;
    const { receiverId } = req.params;
    const { message } = req.body;

    let conversation = await Conversation.find({
        participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });
    }

    const newMessage = await Message.create({
        sender: senderId,
        receiver: receiverId,
        content: message,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("chat message", newMessage);
    } else {
        throw new ApiError(500, "no receiverSocketId");
    }

    return res.status(200).json({ message: "message sent", newMessage });
});

const getMessages = asyncHandler(async (req, res) => {
    const { receiverId } = req.params;
    const { senderId } = req.user._id;

    const conversation = await Conversation.find({
        participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
        return res
            .status(200)
            .json({ message: "messages fetched successfully", messages: [] });
    }

    const messages = conversation.messages;

    return res
        .status(200)
        .json({ message: "messages fetched successfully", messages });
});

export { sendMessage, getMessages };
