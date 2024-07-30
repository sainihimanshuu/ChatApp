import { createContext, useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [userSocket, setUserSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const storeUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        let socket;
        if (storeUser) {
            socket = io("http://localhost:8000", {
                query: {
                    userId: storeUser._id,
                },
                reconnection: true,
            });

            setUserSocket(socket);

            socket.on("onlineUsers", (users) => {
                setOnlineUsers(users);
            });

            socket.on("reconnect", () => {
                socket.emit("reconnectUser", userId);
            });

            return () => socket.close();
        } else {
            if (socket) {
                console.log("ehool");
                socket.close();
                setUserSocket(null);
            }
        }
    }, [storeUser]);

    return (
        <SocketContext.Provider value={{ userSocket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
