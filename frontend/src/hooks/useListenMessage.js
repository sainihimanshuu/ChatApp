import { useSocketContext } from "../context/SocketContext";
import { useConversationContext } from "../context/ConversationContext.jsx";
import { useEffect } from "react";

const useListenMessage = () => {
    const { conversation, setConversation } = useConversationContext();
    const { userSocket } = useSocketContext();

    useEffect(() => {
        userSocket?.on("chat message", (msg) => {
            setConversation((prevConversation) => [...prevConversation, msg]);
            console.log(conversation);
        });

        return () => userSocket?.off("new message");
    }, [userSocket, setConversation]);
};

export default useListenMessage;
