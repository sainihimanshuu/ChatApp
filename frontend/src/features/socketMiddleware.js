import {
    setStoreIsConnected,
    setStoreOnlineUsers,
} from "../features/socketSlice.js";
import { io } from "socket.io-client";

let socket = null;

const socketMiddleware = (store) => (next) => (action) => {
    if (action.type.startsWith("socket/")) {
        if (action.type === "socket/connect") {
            if (!socket) {
                socket = io("http://localhost:8000", {
                    query: {
                        userId: JSON.parse(localStorage.getItem("user"))._id,
                    },
                });

                socket.on("connect", () => {
                    console.log("listening to connect");
                    store.dispatch(setStoreIsConnected(true));
                });

                socket.on("disconnect", () => {
                    console.log("listening to disconnext");
                    store.dispatch(setStoreIsConnected(false));
                });

                socket.on("onlineUsers", (users) => {
                    console.log("listening to onlineUsers");
                    store.dispatch(setStoreOnlineUsers(users));
                });
            }
        }

        if (action.type === "socket/disconnect") {
            if (socket) {
                socket.off("connect");
                socket.off("disconnect");
                socket.off("onlineUsers");
                store.dispatch(setStoreIsConnected(false));
                socket.disconnect();
                socket = null;
            }
        }
    }

    next(action);
};

export const getSocket = () => socket;
export default socketMiddleware;
