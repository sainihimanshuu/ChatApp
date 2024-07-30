import { Input, Button } from "../input/index.js";
import { useConversationContext } from "../../context/ConversationContext.jsx";
import { useSelector } from "react-redux";

export default function ChatBox() {
    const { conversation } = useConversationContext();
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="h-full relative">
            <div className="bg-lightBrown absolute h-full w-full">
                {conversation?.length === 0 ? (
                    <h1>Start conversation</h1>
                ) : (
                    conversation.map((message) => {
                        <div
                            className={
                                "bg-darkBrown block " +
                                (user._id === sender ? "mr-0" : "ml-0")
                            }
                        >
                            {message.content}
                        </div>;
                    })
                )}
            </div>
            <div className="h-12 flex justify-between items-center bg-lightBrown absolute inset-x-0 bottom-0 border-t-4 border-red-700">
                <Input
                    type="text"
                    placeholder="message"
                    className="w-80 mt-8 ml-3"
                />
                <Button className="myButton">Send</Button>
            </div>
        </div>
    );
}
