import { createServer } from "node:http";
import { Server } from "socket.io";
import app from "../../app.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    },
    connectionStateRecovery: {},
});

const userSocketIdMap = {};

const getReceiverSocketId = (receiverId) => {
    return userSocketIdMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketIdMap[userId] = socket.id;
    }
    io.emit("onlineUsers", Object.keys(userSocketIdMap));
    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
        delete userSocketIdMap[userId];
        io.emit("onlineUsers", Object.keys(userSocketIdMap));
    });
});

export { io, httpServer, getReceiverSocketId };
