import UserList from "./UserList.jsx";
import ChatBox from "./ChatBox.jsx";

export default function ChatArea() {
    return (
        <div className="flex justify-center mt-12">
            <div className="h-96 w-3/5 border-4 border-black flex p-1">
                <div className="h-full w-2/5 border-2 border-blue-400 border-dotted">
                    <UserList />
                </div>
                <div className="h-full w-3/5 border-2 border-blue-400 border-dotted">
                    <ChatBox />
                </div>
            </div>
        </div>
    );
}
