import { Input, Button } from "../input/index.js";
import { useConversationContext } from "../../context/ConversationContext.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import useListenMessage from "../../hooks/useListenMessage.js";

export default function ChatBox() {
    const { conversation, setConversation, receiver } =
        useConversationContext();
    const user = useSelector((state) => state.auth.user);
    const [message, setMessage] = useState("");
    const axiosPrivate = useAxiosPrivate();
    useListenMessage();

    const handleSend = () => {
        axiosPrivate
            .post(`/message/sendMessage/${receiver._id}`, { message })
            .then((response) => {
                setConversation((prevConversation) => [
                    ...prevConversation,
                    response.data.newMessage,
                ]);
            });
        setMessage("");
    };

    return conversation ? (
        <div className="h-full relative">
            <div className="h-full w-full grid grid-cols-1 grid-rows-6">
                <div className="p-1 flex justify-start items-center border-b-red-700 border-4 row-start-1 row-end-2">
                    <img
                        className="size-12"
                        src={
                            receiver?.avatar?.url
                                ? receiver?.avatar?.url
                                : "/no-profile-picture-15257.svg"
                        }
                    />
                    <h1 className="ml-3">{receiver?.username}</h1>
                </div>
                <div className="bg-lightBrown row-start-2 row-end-6">
                    {conversation?.length === 0 ? (
                        <h1>Start conversation</h1>
                    ) : (
                        conversation.map((message) => (
                            <div
                                className={
                                    "bg-darkBrown block " +
                                    (user._id === message.sender
                                        ? "mr-0"
                                        : "ml-0")
                                }
                            >
                                {message.content}
                            </div>
                        ))
                    )}
                </div>
                <div className="flex justify-between items-center bg-lightBrown border-t-4 border-red-700 row-start-6">
                    <Input
                        type="text"
                        placeholder="message"
                        className="w-80 mt-8 ml-3"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <Button className="myButton" onClick={handleSend}>
                        Send
                    </Button>
                </div>
            </div>
        </div>
    ) : (
        <h1>Open up a chat</h1>
    );
}
